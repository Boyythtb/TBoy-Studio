export const buzz = (ms = 14) => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) navigator.vibrate(ms)
}
