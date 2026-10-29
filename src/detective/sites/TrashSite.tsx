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
        <p className="text-[12px] text-slate-500">Khám xét các vật chứng bị hung thủ phi tang hoặc vứt bỏ.</p>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        {/* Item list */}
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
                <div className="flex items-center justify-between">
                  <span className="text-[13px]">{t.name}</span>
                  {isFound && <span className="text-emerald-600 text-xs">📌</span>}
                </div>
              </button>
            )
          })}
        </div>

        {/* Item detail */}
        {current && (
          <div className="sm:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-4">
            <div>
              <h3 className="text-base font-black text-slate-900">{current.name}</h3>
              <p className="text-[12px] text-slate-500 mt-1">{current.detail}</p>
            </div>



            <div className="flex justify-end pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => onPin(current.clue, `Vật chứng thùng rác: ${current.name}`)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-[12px] shadow-sm transition-colors"
              >
                <span>📌</span>
                <span>Lưu ghi chép vật chứng</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
