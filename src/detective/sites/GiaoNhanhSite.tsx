import { useState } from 'react'
import { MacSound } from '../MacAudio'
import { getDeliveryOrders } from '../caseSites'

interface Props {
  caseId: string
  found: Set<string>
  onPin: (clueId?: string, label?: string) => void
}

export function GiaoNhanhSite({ caseId, found, onPin }: Props) {
  const deliveryOrders = getDeliveryOrders(caseId)
  const [deliverySearchQuery, setDeliverySearchQuery] = useState('')

  // Trạng thái mở khóa đơn hàng nội bộ
  const [unlockedOrders, setUnlockedOrders] = useState<Set<string>>(() => {
    try {
      const raw = localStorage.getItem(`tboy.detective.unlockedOrders.${caseId}`)
      return raw ? new Set(JSON.parse(raw)) : new Set<string>()
    } catch {
      return new Set<string>()
    }
  })
  const [inputCodes, setInputCodes] = useState<Record<string, string>>({})
  const [errorMsgs, setErrorMsgs] = useState<Record<string, string>>({})
  const [activeHints, setActiveHints] = useState<Record<string, boolean>>({})

  const handleUnlockOrder = (orderId: string, codes?: string[]) => {
    if (!codes || codes.length === 0) return
    const inputVal = (inputCodes[orderId] || '').trim().toLowerCase().replace(/\s+/g, '')

    if (!inputVal) {
      setErrorMsgs((prev) => ({ ...prev, [orderId]: 'Vui lòng nhập mã định danh Driver ID!' }))
      return
    }

    const matched = codes.some((c) => {
      const clean = c.trim().toLowerCase().replace(/\s+/g, '')
      return clean === inputVal || inputVal.includes(clean) || clean.includes(inputVal)
    })

    if (matched) {
      MacSound.confrontSuccess()
      const nextSet = new Set(unlockedOrders)
      nextSet.add(orderId)
      setUnlockedOrders(nextSet)
      try {
        localStorage.setItem(`tboy.detective.unlockedOrders.${caseId}`, JSON.stringify(Array.from(nextSet)))
      } catch {
        // ignore
      }
      setErrorMsgs((prev) => ({ ...prev, [orderId]: '' }))
    } else {
      MacSound.confrontFail()
      setErrorMsgs((prev) => ({
        ...prev,
        [orderId]: '❌ Mã định danh không đúng! Hãy kiểm tra lại thông tin tài xế shipper.',
      }))
    }
  }

  return (
    <div className="min-h-full bg-slate-50 text-slate-900 pb-10 font-['Be_Vietnam_Pro'] select-none">
      {/* Header GiaoNhanh */}
      <div className="bg-gradient-to-r from-orange-600 to-amber-600 text-white px-5 py-4 shadow-md flex items-center justify-between select-none">
        <div className="flex items-center gap-2.5">
          <span className="text-3xl">⚡</span>
          <div>
            <h1 className="text-lg font-black tracking-tight">GIAO NHANH 24H</h1>
            <p className="text-[11px] opacity-90">Hệ thống tra cứu vận đơn & Định vị hành trình Shipper</p>
          </div>
        </div>
        <span className="rounded-full bg-white/20 px-3 py-1 text-[11px] font-bold">Cổng Điều Phối Xe Nội Bộ</span>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Ô Tra Cứu Vận Đơn */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs space-y-3">
          <h3 className="text-[13px] font-bold text-slate-800 uppercase tracking-wider">Tra cứu lộ trình đơn hàng:</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={deliverySearchQuery}
              onChange={(e) => setDeliverySearchQuery(e.target.value)}
              placeholder="Nhập mã vận đơn (VD: GN-88214) hoặc tên tài xế (Dũng, Nam, Sơn)..."
              className="flex-1 rounded-xl bg-slate-50 border border-slate-300 px-3.5 py-2 text-[12px] text-slate-900 outline-none focus:border-orange-500 focus:bg-white transition-all font-mono"
            />
            <button
              type="button"
              onClick={() => MacSound.click()}
              className="px-5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-[12px] shadow-2xs transition-colors"
            >
              Tra cứu
            </button>
          </div>
        </div>

        {/* Danh Sách Đơn Hàng */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1 select-none">
            <p className="text-[12px] font-bold text-slate-700 uppercase">Danh sách vận đơn trong khung giờ 20h - 22h:</p>
            <span className="text-[11px] text-slate-500 font-mono">{deliveryOrders.length} bản ghi</span>
          </div>

          {deliveryOrders
            .filter(
              (o) =>
                !deliverySearchQuery ||
                `${o.id} ${o.driver} ${o.pickup} ${o.drop}`.toLowerCase().includes(deliverySearchQuery.toLowerCase())
            )
            .map((order) => {
              const isFound = order.clueId ? found.has(order.clueId) : false
              const isLocked = Boolean(order.locked && !unlockedOrders.has(order.id))

              return (
                <div
                  key={order.id}
                  className={`bg-white rounded-2xl border p-5 shadow-2xs space-y-3.5 transition-all ${
                    isLocked ? 'border-orange-300 bg-orange-50/20' : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[13px] font-bold text-orange-600 bg-orange-50 px-2.5 py-1 rounded-lg border border-orange-200 flex items-center gap-1">
                        {isLocked && <span>🔒</span>}
                        <span>{order.id}</span>
                      </span>
                      <div>
                        <p className="text-[13px] font-bold text-slate-900">Tài xế: {order.driver}</p>
                        <p className="text-[11px] text-slate-500">
                          SĐT: {order.driverPhone} · Giờ nhận: {order.time}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <span
                        className={`rounded-full font-bold text-[11px] px-2.5 py-0.5 select-none ${
                          isLocked ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {isLocked ? '🔒 Lộ trình bị khóa' : order.status}
                      </span>

                      {isLocked ? (
                        <button
                          type="button"
                          disabled
                          className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-bold border border-slate-300 bg-slate-100 text-slate-400 cursor-not-allowed"
                        >
                          <span>🔒</span>
                          <span>Cần mở khóa GPS</span>
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onPin(order.clueId, order.clueLabel || `Lịch trình GPS đơn hàng ${order.id}`)}
                          className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-bold border transition-all ${
                            isFound
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                              : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 hover:border-slate-400 shadow-2xs'
                          }`}
                          title="Trích xuất và lưu lịch trình vào hồ sơ điều tra"
                        >
                          <span>{isFound ? '📌' : '📋'}</span>
                          <span>{isFound ? 'Đã trích xuất' : 'Trích xuất hồ sơ'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-2 text-[12px] text-slate-700 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <p>
                      <strong>Nơi lấy:</strong> {order.pickup}
                    </p>
                    <p>
                      <strong>Nơi giao:</strong> {order.drop}
                    </p>
                    <p>
                      <strong>Cước phí:</strong> {order.fee}
                    </p>
                    <p>
                      <strong>Thời gian:</strong> {order.time}
                    </p>
                  </div>

                  {/* KHUNG KHÓA BẢO MẬT LỘ TRÌNH GPS RIÊNG CỦA GIAONHANH */}
                  {isLocked ? (
                    <div className="rounded-2xl border-2 border-orange-400/50 bg-gradient-to-br from-orange-50 to-amber-50 p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🔐</span>
                        <div>
                          <h4 className="text-[12px] font-bold text-orange-900 uppercase tracking-wide">
                            Lộ trình GPS bảo mật nội bộ
                          </h4>
                          <p className="text-[10px] text-orange-800">
                            Để giải mã tọa độ vệ tinh bóc trần di chuyển của shipper, yêu cầu quyền điều hành.
                          </p>
                        </div>
                      </div>

                      <div className="bg-white/90 p-3 rounded-xl border border-orange-200 text-[11px] text-slate-700 leading-relaxed font-sans">
                        <p className="font-bold text-orange-700 mb-0.5">Nhiệm vụ điều tra:</p>
                        <p>{order.lockPrompt}</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={inputCodes[order.id] || ''}
                            onChange={(e) => {
                              const val = e.target.value
                              setInputCodes((prev) => ({ ...prev, [order.id]: val }))
                              setErrorMsgs((prev) => ({ ...prev, [order.id]: '' }))
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleUnlockOrder(order.id, order.lockCodes)
                            }}
                            placeholder="Nhập Driver ID (4 chữ số)..."
                            className="flex-1 rounded-xl bg-white border border-orange-300 px-3.5 py-2 text-[12px] font-mono text-slate-900 outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-400/30 shadow-inner"
                          />
                          <button
                            type="button"
                            onClick={() => handleUnlockOrder(order.id, order.lockCodes)}
                            className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-[11px] shadow-sm active:scale-95 transition-all shrink-0"
                          >
                            Xác thực GPS
                          </button>
                        </div>

                        {errorMsgs[order.id] && (
                          <p className="text-[11px] font-semibold text-red-600 bg-red-50 p-2 rounded-lg border border-red-200">
                            {errorMsgs[order.id]}
                          </p>
                        )}

                        {order.lockHint && (
                          <div>
                            <button
                              type="button"
                              onClick={() => {
                                MacSound.click()
                                setActiveHints((prev) => ({ ...prev, [order.id]: !prev[order.id] }))
                              }}
                              className="text-[10px] text-orange-700 hover:text-orange-900 font-semibold flex items-center gap-1"
                            >
                              <span>💡</span>
                              <span>{activeHints[order.id] ? 'Ẩn gợi ý' : 'Gợi ý nơi tìm Driver ID?'}</span>
                            </button>
                            {activeHints[order.id] && (
                              <p className="mt-1 text-[10px] text-slate-600 bg-white/80 p-2 rounded-lg border border-orange-200 italic">
                                {order.lockHint}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* Timeline tracking sau khi đã mở khóa */
                    <div className="pt-2">
                      <p className="text-[11px] font-bold text-slate-500 uppercase mb-2 select-none flex items-center gap-1">
                        <span>📡</span>
                        <span>Nhật ký toạ độ GPS vệ tinh:</span>
                      </p>
                      <div className="space-y-1.5 pl-3 border-l-2 border-orange-500 bg-orange-50/30 p-2 rounded-r-xl">
                        {order.timeline.map((step, idx) => (
                          <div key={idx} className="text-[11px] text-slate-700">
                            <span className="font-bold text-orange-700 font-mono">{step.time}:</span> {step.event}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
