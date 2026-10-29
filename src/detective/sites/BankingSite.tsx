import { useState } from 'react'
import { getBankTransactions } from '../caseSites'

interface Props {
  caseId: string
  found: Set<string>
  onPin: (clueId?: string, label?: string) => void
}

export function BankingSite({ caseId, found, onPin }: Props) {
  const transactions = getBankTransactions(caseId)
  const [filterType, setFilterType] = useState<'all' | 'in' | 'out'>('all')

  const filtered = transactions.filter((tx) => {
    if (filterType === 'in') return tx.type === 'in'
    if (filterType === 'out') return tx.type === 'out'
    return true
  })

  return (
    <div className="min-h-full bg-[#f0f4f9] text-slate-900 pb-12 font-['Be_Vietnam_Pro'] select-none">
      {/* VietinBank Header Xanh Dương Sang Trọng */}
      <div className="bg-gradient-to-r from-[#003B71] to-[#0060AF] text-white px-5 py-4 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-white text-[#003B71] font-black text-xl shadow-xs">
            V
          </div>
          <div>
            <h1 className="text-base font-black tracking-tight flex items-center gap-2">
              <span>VietinBank iPay Mobile</span>
              <span className="rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 border border-emerald-400/30">Sao Kê Số Điện Tử</span>
            </h1>
            <p className="text-[11px] text-sky-200">Tra cứu biến động số dư và lệnh chuyển tiền</p>
          </div>
        </div>

        <div className="text-right hidden sm:block">
          <p className="text-[11px] text-sky-200">Trạng thái kết nối</p>
          <p className="text-[12px] font-bold text-emerald-300">● Bảo mật 256-bit SSL</p>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-5">
        {/* Account Summary Card */}
        <div className="bg-gradient-to-br from-[#003B71] to-[#00274D] text-white rounded-2xl p-5 shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <p className="text-[11px] text-sky-200 uppercase tracking-wider font-semibold">Tài khoản đối soát điều tra:</p>
            <h2 className="text-lg font-black tracking-wide font-mono mt-0.5">
              {transactions[0]?.accountName || 'CHỦ TÀI KHOẢN NGÂN HÀNG'}
            </h2>
            <p className="text-[12px] text-sky-300 font-mono">Số TK: {transactions[0]?.accountNo || '1088xxxx789'}</p>
          </div>

          <div className="sm:text-right">
            <p className="text-[11px] text-sky-200 uppercase">Số dư khả dụng hiện tại:</p>
            <p className="text-2xl font-black text-amber-300 tracking-tight font-mono">
              {transactions[0]?.balanceAfter || '142.500 VND'}
            </p>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div className="flex gap-2 text-[12px] font-bold">
            <button
              type="button"
              onClick={() => setFilterType('all')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filterType === 'all' ? 'bg-[#003B71] text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
              }`}
            >
              Tất cả biến động
            </button>
            <button
              type="button"
              onClick={() => setFilterType('out')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filterType === 'out' ? 'bg-[#003B71] text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
              }`}
            >
              Tiền chi ra (-)
            </button>
            <button
              type="button"
              onClick={() => setFilterType('in')}
              className={`px-3 py-1 rounded-lg transition-colors ${
                filterType === 'in' ? 'bg-[#003B71] text-white' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
              }`}
            >
              Tiền nhận vào (+)
            </button>
          </div>

          <span className="text-[11px] text-slate-500 font-mono">{filtered.length} giao dịch</span>
        </div>

        {/* Transactions List */}
        <div className="space-y-3">
          {filtered.map((tx) => {
            const isFound = tx.clueId ? found.has(tx.clueId) : false
            const isOut = tx.type === 'out'

            return (
              <div
                key={tx.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs hover:shadow-xs transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
              >
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <div
                    className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl font-bold text-lg ${
                      isOut ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-emerald-50 text-emerald-600 border border-emerald-200'
                    }`}
                  >
                    {isOut ? '↗' : '↙'}
                  </div>

                  <div className="min-w-0 flex-1 space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                        {tx.id}
                      </span>
                      <span className="text-[11px] text-slate-500">{tx.time}</span>
                    </div>
                    <p className="text-[13px] font-bold text-slate-900 leading-snug">{tx.content}</p>
                    <p className="text-[11px] text-slate-500">Số dư sau giao dịch: <strong className="font-mono text-slate-700">{tx.balanceAfter}</strong></p>
                  </div>
                </div>

                <div className="flex sm:flex-col items-end justify-between w-full sm:w-auto shrink-0 gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <span
                    className={`text-base font-black font-mono tracking-tight ${
                      isOut ? 'text-red-600' : 'text-emerald-600'
                    }`}
                  >
                    {tx.amount}
                  </span>

                  <button
                    type="button"
                    onClick={() => onPin(tx.clueId, tx.clueLabel || `Lệnh chuyển khoản ${tx.id}: ${tx.amount}`)}
                    className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-[11px] font-bold border transition-all ${
                      isFound
                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300 hover:border-slate-400 shadow-2xs'
                    }`}
                    title="Trích xuất lệnh giao dịch vào hồ sơ điều tra"
                  >
                    <span>{isFound ? '📌' : '📋'}</span>
                    <span>{isFound ? 'Đã lưu chứng từ' : 'Trích xuất chứng từ'}</span>
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
