import { initializeApp, type FirebaseApp } from 'firebase/app'
import {
  getDatabase,
  onValue,
  ref,
  get as fbGet,
  set as fbSet,
  update as fbUpdate,
  remove as fbRemove,
  type Database,
} from 'firebase/database'
import { getAuth, onAuthStateChanged, signInAnonymously, type Auth } from 'firebase/auth'

export type StoreMode = 'local' | 'cloud'

export interface Store {
  mode: StoreMode
  ensureAuth: () => Promise<string>
  uid: () => string | null
  sub: <T>(path: string, cb: (value: T | null) => void) => () => void
  get: <T>(path: string) => Promise<T | null>
  set: (path: string, value: unknown) => Promise<void>
  update: (path: string, patch: Record<string, unknown>) => Promise<void>
  remove: (path: string) => Promise<void>
}

/* ------------------------------------------------------------------ helpers */

export function randomId(len = 12) {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let out = ''
  const bytes = new Uint8Array(len)
  crypto.getRandomValues(bytes)
  for (let i = 0; i < len; i++) out += alphabet[bytes[i] % alphabet.length]
  return out
}

const ROOM_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export function randomRoomCode(len = 4) {
  let out = ''
  const bytes = new Uint8Array(len)
  crypto.getRandomValues(bytes)
  for (let i = 0; i < len; i++) out += ROOM_ALPHABET[bytes[i] % ROOM_ALPHABET.length]
  return out
}

/* -------------------------------------------------------------- local store */

const LOCAL_DB = 'masoi.db.v1'
const LOCAL_UID = 'masoi.uid.v1'
const CHANNEL = 'masoi.channel.v1'

type Json = Record<string, unknown>

function splitPath(path: string) {
  return path.split('/').filter(Boolean)
}

function readPath(root: Json, path: string): unknown {
  let node: unknown = root
  for (const key of splitPath(path)) {
    if (node == null || typeof node !== 'object') return null
    node = (node as Json)[key]
  }
  return node ?? null
}

function writePath(root: Json, path: string, value: unknown) {
  const keys = splitPath(path)
  if (!keys.length) return
  let node: Json = root
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]
    if (node[key] == null || typeof node[key] !== 'object') node[key] = {}
    node = node[key] as Json
  }
  const last = keys[keys.length - 1]
  if (value === null || value === undefined) delete node[last]
  else node[last] = value
}

function createLocalStore(): Store {
  const listeners = new Set<{ path: string; cb: (v: unknown) => void; last: string }>()
  let channel: BroadcastChannel | null = null

  const notify = () => {
    const root = JSON.parse(localStorage.getItem(LOCAL_DB) || '{}') as Json
    for (const entry of listeners) {
      const value = readPath(root, entry.path)
      const serialised = JSON.stringify(value ?? null)
      if (serialised !== entry.last) {
        entry.last = serialised
        entry.cb(value)
      }
    }
  }

  try {
    channel = new BroadcastChannel(CHANNEL)
    channel.onmessage = () => notify()
  } catch {
    channel = null
  }

  window.addEventListener('storage', (e) => {
    if (e.key === LOCAL_DB) notify()
  })

  const commit = (mutate: (root: Json) => void) => {
    const root = JSON.parse(localStorage.getItem(LOCAL_DB) || '{}') as Json
    mutate(root)
    localStorage.setItem(LOCAL_DB, JSON.stringify(root))
    notify()
    channel?.postMessage('change')
  }

  // Mỗi tab là một người chơi riêng khi chạy offline (sessionStorage),
  // nhờ vậy có thể mở nhiều tab trên cùng máy để thử ván đấu.
  const getUid = () => {
    let uid = sessionStorage.getItem(LOCAL_UID)
    if (!uid) {
      uid = `u_${randomId(10)}`
      sessionStorage.setItem(LOCAL_UID, uid)
    }
    return uid
  }

  return {
    mode: 'local',
    ensureAuth: async () => getUid(),
    uid: () => sessionStorage.getItem(LOCAL_UID),
    sub<T>(path: string, cb: (v: T | null) => void) {
      const root = JSON.parse(localStorage.getItem(LOCAL_DB) || '{}') as Json
      const entry = {
        path,
        cb: cb as (v: unknown) => void,
        last: JSON.stringify(readPath(root, path) ?? null),
      }
      listeners.add(entry)
      entry.cb(readPath(root, path))
      return () => {
        listeners.delete(entry)
      }
    },
    async get<T>(path: string) {
      const root = JSON.parse(localStorage.getItem(LOCAL_DB) || '{}') as Json
      return (readPath(root, path) as T) ?? null
    },
    async set(path, value) {
      commit((root) => writePath(root, path, value))
    },
    async update(path, patch) {
      commit((root) => {
        const current = readPath(root, path)
        const next =
          current && typeof current === 'object' ? { ...(current as Json), ...patch } : { ...patch }
        writePath(root, path, next)
      })
    },
    async remove(path) {
      commit((root) => writePath(root, path, null))
    },
  }
}

/* ----------------------------------------------------------- firebase store */

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string | undefined,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string | undefined,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL as string | undefined,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string | undefined,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string | undefined,
}

export const hasCloudConfig = Boolean(firebaseConfig.apiKey && firebaseConfig.databaseURL)

function createFirebaseStore(): Store {
  let app: FirebaseApp | null = null
  let db: Database | null = null
  let auth: Auth | null = null

  const boot = () => {
    if (!app) {
      app = initializeApp(firebaseConfig as Record<string, string>)
      db = getDatabase(app)
      auth = getAuth(app)
    }
    return { db: db!, auth: auth! }
  }

  const authPromise = (() => {
    const { auth: a } = boot()
    return new Promise<string>((resolve, reject) => {
      if (a.currentUser) {
        resolve(a.currentUser.uid)
        return
      }
      const stop = onAuthStateChanged(a, (user) => {
        if (user) {
          stop()
          resolve(user.uid)
        }
      })
      signInAnonymously(a).catch((err) => {
        stop()
        reject(err)
      })
    })
  })()

  return {
    mode: 'cloud',
    ensureAuth: () => authPromise,
    uid: () => boot().auth.currentUser?.uid ?? null,
    sub<T>(path: string, cb: (v: T | null) => void) {
      const { db: d } = boot()
      const r = ref(d, path)
      return onValue(r, (snap) => cb((snap.val() as T) ?? null))
    },
    async get<T>(path: string) {
      const { db: d } = boot()
      const snap = await fbGet(ref(d, path))
      return (snap.val() as T) ?? null
    },
    async set(path, value) {
      const { db: d } = boot()
      await fbSet(ref(d, path), value)
    },
    async update(path, patch) {
      const { db: d } = boot()
      await fbUpdate(ref(d, path), patch)
    },
    async remove(path) {
      const { db: d } = boot()
      await fbRemove(ref(d, path))
    },
  }
}

export const store: Store = hasCloudConfig ? createFirebaseStore() : createLocalStore()

export const paths = {
  meta: (code: string) => `rooms/${code}/meta`,
  players: (code: string) => `rooms/${code}/players`,
  votes: (code: string) => `rooms/${code}/votes`,
  secrets: (code: string) => `rooms/${code}/secrets`,
  secret: (code: string, uid: string) => `rooms/${code}/secrets/${uid}`,
  night: (code: string) => `rooms/${code}/secrets/_night`,
  actions: (code: string) => `rooms/${code}/actions`,
  action: (code: string, uid: string) => `rooms/${code}/actions/${uid}`,
  player: (code: string, uid: string) => `rooms/${code}/players/${uid}`,
  vote: (code: string, uid: string) => `rooms/${code}/votes/${uid}`,
  /* --------------------------------------------------------- secret code */
  sc: (code: string) => `rooms/${code}/sc`,
  scKeys: (code: string) => `rooms/${code}/scKeys`,
  scKey: (code: string, uid: string) => `rooms/${code}/scKeys/${uid}`,
  scGuesses: (code: string) => `rooms/${code}/scGuesses`,
  scGuess: (code: string, uid: string) => `rooms/${code}/scGuesses/${uid}`,
  /* ---------------------------------------------------------- sea battle */
  sb: (code: string) => `rooms/${code}/sb`,
  sbKeys: (code: string) => `rooms/${code}/sbKeys`,
  sbKey: (code: string, uid: string) => `rooms/${code}/sbKeys/${uid}`,
  sbShots: (code: string, uid: string) => `rooms/${code}/sb/shots/${uid}`,
  /* ------------------------------------------------------- truth or dare */
  tod: (code: string) => `rooms/${code}/tod`,
}
