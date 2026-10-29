import { MacSound } from '../MacAudio'
import type { Photo } from '../case1'

interface Props {
  photos: Photo[]
  found: Set<string>
  onInspect: (photo: Photo) => void
}

export function KhamNghiemSite({ photos, found, onInspect }: Props) {
  const visiblePhotos = photos.filter((p) => !p.requires || p.requires.every((r) => found.has(r)))

  return (
    <div className="p-5 max-w-4xl mx-auto space-y-4 font-['Be_Vietnam_Pro'] select-none">
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
        <h2 className="text-[15px] font-bold text-slate-900">Băng hình Camera an ninh & Giám định Hiện trường</h2>
        <p className="text-[12px] text-slate-500">Bấm vào từng ảnh để phóng to và sử dụng kính lúp hoặc đèn cực tím UV 365nm.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {visiblePhotos.map((p) => (
          <div
            key={p.id}
            onClick={() => {
              MacSound.click()
              onInspect(p)
            }}
            className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white hover:border-blue-500 hover:shadow-md transition-all flex flex-col"
          >
            <div className="relative aspect-[16/10] overflow-hidden bg-black grid place-items-center">
              <img
                src={`${import.meta.env.BASE_URL}${p.img ?? 'detective/bia-vu-an.jpg'}`}
                alt={p.title}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute bottom-2 right-2 rounded-lg bg-black/75 px-2 py-0.5 text-[10px] font-semibold text-white">
                {p.time}
              </span>
            </div>
            <div className="p-3">
              <p className="text-[13px] font-bold text-slate-900">{p.title}</p>
              <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">{p.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
