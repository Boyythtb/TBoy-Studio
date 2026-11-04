import { useState } from 'react'
import { MacSound } from '../MacAudio'
import type { TrashItem } from '../case1'

interface Props {
  trash: TrashItem[]
  found: Set<string>
  onPin: (clueId?: string, label?: string) => void
}

export function TrashSite({ trash, found, onPin }: Props) {
  const [activeItem, setActiveItem] = useState<string | null>(trash[0]?.id || null)
  const current = trash.find((t) => t.id === activeItem) || trash[0]

  return (
    <div className="p-5 max-w-4xl mx-auto space-y-4 font-['Be_Vietnam_Pro'] select-none">
      <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs">
        <h2 className="text-[15px] font-bold text-slate-900">Thùng rác khu vực & Khám nghiệm phế thải</h2>
        <p className="text-[12px] text-slate-500">Khám xét các vật chứng và tệp tài liệu được phục hồi trong quá trình điều tra.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {/* Danh sách tệp/vật phẩm */}
        <div className="space-y-2">
          {trash.map((t) => {
            const isSelected = current?.id === t.id
            const isFound = t.clue ? found.has(t.clue) : false

            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  MacSound.click()
                  setActiveItem(t.id)
                }}
                className={`w-full text-left p-3 rounded-xl border transition-all ${
                  isSelected
                    ? 'bg-blue-50 border-blue-400 text-blue-900 font-bold'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between gap-1">
                  <span className="text-[13px] truncate flex items-center gap-1.5">
                    <span>📄</span>
                    <span>{t.name}</span>
                  </span>
                  {isFound && <span className="text-emerald-600 text-xs shrink-0">📌</span>}
                </div>
              </button>
            )
          })}
        </div>

        {/* Nội dung chi tiết vật chứng */}
        {current && (
          <div className="sm:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  {current.kind}
                </span>
                <span className="rounded-full bg-emerald-50 text-emerald-700 font-bold text-[9px] px-2 py-0.5 border border-emerald-200">
                  TÀI LIỆU ĐÃ PHỤC HỒI
                </span>
              </div>
              <h3 className="text-base font-black text-slate-900 mt-1 flex items-center gap-1.5">
                <span>{current.name}</span>
              </h3>

              <div className="text-[12px] text-slate-700 mt-2 bg-slate-50 p-3.5 rounded-xl border border-slate-100 leading-relaxed font-sans">
                {current.detail}
              </div>
            </div>

            {current.clue && (
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {found.has(current.clue) ? '✓ Đã ghim vào sổ tay' : 'Chưa ghim vào sổ tay'}
                </span>
                <button
                  type="button"
                  onClick={() => onPin(current.clue, current.name)}
                  className={`px-4 py-2 rounded-xl text-[12px] font-bold transition-all shadow-xs ${
                    found.has(current.clue)
                      ? 'bg-slate-100 text-slate-400 cursor-default'
                      : 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer active:scale-95'
                  }`}
                >
                  {found.has(current.clue) ? '📌 Đã ghim manh mối' : '📌 Ghim manh mối này'}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
