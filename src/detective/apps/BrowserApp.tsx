import { useEffect, useState, useMemo } from 'react'
import { MacSound } from '../MacAudio'
import { usePack } from '../pack'
import type { Photo } from '../case1'
import { getCaseProfiles } from '../caseSites'
import { PhotoInspectModal } from './PhotoInspectModal'
import { FacebucSite } from '../sites/FacebucSite'
import { GiaoNhanhSite } from '../sites/GiaoNhanhSite'
import { ChoTotSite } from '../sites/ChoTotSite'
import { BankingSite } from '../sites/BankingSite'
import { SmartBuildingSite } from '../sites/SmartBuildingSite'
import { KhamNghiemSite } from '../sites/KhamNghiemSite'
import { TrashSite } from '../sites/TrashSite'
import { NhaThuocSite } from '../sites/NhaThuocSite'
import { TrafficCameraSite } from '../sites/TrafficCameraSite'

export interface Ctx {
  found: Set<string>
  find: (id: string) => void
  onOpenUrl?: (url: string) => void
}

interface SearchSuggestion {
  title: string
  url: string
  icon: string
  category: string
  desc: string
}

export function BrowserApp({ found, find, externalUrl }: Ctx & { externalUrl?: string }) {
  const pack = usePack()
  const { photos: PHOTOS, trash: TRASH } = pack
  const profiles = useMemo(() => getCaseProfiles(pack.id), [pack.id])

  const [urlInput, setUrlInput] = useState('coccoc://home')
  const [currentUrl, setCurrentUrl] = useState('coccoc://home')
  const [homeSearchQuery, setHomeSearchQuery] = useState('')
  const [inspectPhoto, setInspectPhoto] = useState<Photo | null>(null)
  const [browserToast, setBrowserToast] = useState<{ text: string; success: boolean } | null>(null)

  useEffect(() => {
    if (!browserToast) return
    const t = setTimeout(() => setBrowserToast(null), 2500)
    return () => clearTimeout(t)
  }, [browserToast])

  useEffect(() => {
    if (externalUrl) {
      setUrlInput(externalUrl)
      setCurrentUrl(externalUrl)
    }
  }, [externalUrl])

  const navigateTo = (url: string) => {
    setUrlInput(url)
    setCurrentUrl(url)
    setHomeSearchQuery('')
    MacSound.click()
  }

  // Gợi ý tìm kiếm thông minh RIÊNG BIỆT CHO TỪNG VỤ ÁN ĐỘC LẬP
  const getSuggestions = (query: string): SearchSuggestion[] => {
    const q = query.trim().toLowerCase()
    if (!q) return []

    const list: SearchSuggestion[] = []
    const caseId = pack.id

    // 1. Mạng xã hội Facebúc của vụ án hiện tại
    if (
      q.includes('face') ||
      q.includes('fb') ||
      q.includes('bảng tin') ||
      q.includes('mạng xã hội') ||
      q.includes('tin tức') ||
      q.includes('status')
    ) {
      list.push({
        title: 'Mạng xã hội Facebúc',
        url: 'https://facebuc.vn',
        icon: '👥',
        category: 'Mạng xã hội cư dân',
        desc: 'Xem bài đăng, hình ảnh và bình luận liên quan vụ việc',
      })
    }

    // Gợi ý trang cá nhân của các nhân vật chỉ thuộc vụ án này
    profiles.forEach((p) => {
      if (
        p.name.toLowerCase().includes(q) ||
        p.slug.toLowerCase().includes(q) ||
        p.role.toLowerCase().includes(q) ||
        q.includes(p.name.toLowerCase())
      ) {
        list.push({
          title: `Facebúc · ${p.name}`,
          url: `https://facebuc.vn/${p.slug}`,
          icon: p.avatar,
          category: `Trang cá nhân · @${p.slug}`,
          desc: `${p.role} · ${p.livesIn}`,
        })
      }
    })

    // 2. GiaoNhanh (VỤ 1 VÀ VỤ 6)
    if (caseId === 'hem42' || caseId === 'du-thuyen' || caseId === 'con-tin' || caseId === 'dau-gia') {
      if (
        q.includes('giao') ||
        q.includes('ship') ||
        q.includes('đơn') ||
        q.includes('vận đơn') ||
        q.includes('gps') ||
        q.includes('gn')
      ) {
        list.push({
          title: 'GiaoNhanh 24H · Tra cứu vận đơn GPS',
          url: 'https://giaonhanh.vn',
          icon: '⚡',
          category: 'Cổng giao vận',
          desc: caseId === 'hem42' ? 'Tra cứu định vị GPS đơn hàng GN-88214 của shipper Dũng lúc 21:47' : 'Tra cứu vận đơn hoả tốc GN-99801 chuyển 2 vali ra phao số 4',
        })
      }
    }

    // 3. Chợ Tốt (CHỈ VỤ 1 VÀ VỤ 2)
    if (caseId === 'hem42' || caseId === 'tu-do' || caseId === 'cau-long' || caseId === 'du-thuyen' || caseId === 'con-tin' || caseId === 'dau-gia') {
      if (
        q.includes('chợ') ||
        q.includes('chotot') ||
        q.includes('rao') ||
        q.includes('bán') ||
        q.includes('iphone') ||
        q.includes('xe') ||
        q.includes('thanh lý')
      ) {
        list.push({
          title: 'Chợ Tốt · Mua Bán Rao Vặt Đồ Cũ',
          url: 'https://chotot.vn',
          icon: '🛍️',
          category: 'Cổng rao vặt',
          desc: caseId === 'hem42' ? 'Xem tin thanh lý xe đạp điện cũ' : (caseId === 'du-thuyen' || caseId === 'con-tin' || caseId === 'dau-gia') ? 'Xem tin rao bán xe máy cũ của Nam bồi bàn' : 'Xem tin bán vội iPhone 14 Pro Max',
        })
      }
    }

    // 4. VietinBank (CHỈ VỤ 2, 3, 4, 5)
    if (caseId !== 'hem42') {
      if (
        q.includes('ngân hàng') ||
        q.includes('bank') ||
        q.includes('vietin') ||
        q.includes('tiền') ||
        q.includes('chuyển khoản') ||
        q.includes('sao kê')
      ) {
        list.push({
          title: 'VietinBank iPay Mobile · Sao Kê Biến Động',
          url: 'https://vietinbank.vn',
          icon: '🏦',
          category: 'Ngân hàng số',
          desc: 'Kiểm tra lịch sử chuyển tiền, biến động số dư trong đêm vụ án',
        })
      }
    }

    // 5. Nhà Thuốc Long Châu (CHỈ VỤ 3, 4, 5)
    if (caseId === 'hem42' || caseId === 'hoi-cho' || caseId === 'chua-phap-hoa' || caseId === 'chung-cu' || caseId === 'cong-ty-x' || caseId === 'an-mang' || caseId === 'biet-thu-x' || caseId === 'du-thuyen' || caseId === 'con-tin' || caseId === 'dau-gia') {
      if (
        q.includes('thuốc') ||
        q.includes('long châu') ||
        q.includes('y tế') ||
        q.includes('độc') ||
        q.includes('bỏng') ||
        q.includes('băng gạc')
      ) {
        list.push({
          title: 'Nhà Thuốc Long Châu · Chi Nhánh Hẻm 42',
          url: 'https://nhathuoc-longchau42.vn',
          icon: '💊',
          category: 'Hệ thống y tế & Dược phẩm',
          desc: 'Tra cứu hoá đơn bán lẻ, sổ xuất độc chất và hồ sơ sơ cứu',
        })
      }
    }

    // 6. Camera An Ninh Phường (ÁP DỤNG THEO VỊ TRÍ TỪNG VỤ)
    if (
      q.includes('camera') ||
      q.includes('an ninh') ||
      q.includes('phường') ||
      q.includes('giao thông') ||
      q.includes('ngã tư') ||
      q.includes('bãi xe') ||
      q.includes('trích xuất')
    ) {
      list.push({
        title: 'Camera An Ninh Đô Thị · Trích Xuất Băng Hình',
        url: 'https://camera-phuong.gov.vn',
        icon: '📹',
        category: 'Camera an ninh',
        desc: 'Xem băng hình camera giám sát khu vực xảy ra vụ việc',
      })
    }

    // 7. BMS Tòa Nhà Chung Cư (CHỈ RIÊNG VỤ 4)
    if (caseId === 'chung-cu' || caseId === 'cong-ty-x') {
      if (q.includes('bms') || q.includes('tòa nhà') || q.includes('cầu dao') || q.includes('mất điện') || q.includes('họng rác')) {
        list.push({
          title: 'BMS Chung Cư 42 · Hệ thống Kỹ Thuật Tòa Nhà',
          url: 'https://bms-building.vn',
          icon: '🏢',
          category: 'Vận hành toà nhà',
          desc: 'Nhật ký ngắt aptomat tổng tầng hầm, quẹt thẻ thang máy và cảm biến họng rác',
        })
      }
    }

    // 8. Smart Home IoT (CHỈ RIÊNG VỤ 5)
    if (caseId === 'an-mang' || caseId === 'biet-thu-x') {
      if (q.includes('smart') || q.includes('iot') || q.includes('ấm trà') || q.includes('nhiệt độ') || q.includes('cầu dao')) {
        list.push({
          title: 'Tuya Smart Home IoT · Cảm Biến Phòng Trà',
          url: 'https://smarthome.iot',
          icon: '🏡',
          category: 'Nhà thông minh',
          desc: 'Kiểm tra cảm biến nhiệt độ ấm trà thông minh và nhật ký cầu dao tầng 2',
        })
      }
    }

    // 9. Khám Nghiệm & Thùng rác
    if (q.includes('hiện trường') || q.includes('khám nghiệm') || q.includes('uv') || q.includes('kính lúp')) {
      list.push({
        title: 'Giám Định Kỹ Thuật Hình Sự & Đèn UV',
        url: 'coccoc://khamnghiem',
        icon: '📸',
        category: 'Pháp y hiện trường',
        desc: 'Xem lại các ảnh chụp hiện trường và dùng đèn soi UV tìm dấu vết',
      })
    }

    if (q.includes('rác') || q.includes('thùng rác') || q.includes('vứt') || q.includes('phế thải')) {
      list.push({
        title: 'Thùng Rác Khu Vực & Khám Xét Phế Thải',
        url: 'coccoc://trash',
        icon: '🗑️',
        category: 'Vật chứng thực nghiệm',
        desc: 'Lục soát các vật chứng bị hung thủ phi tang',
      })
    }

    return list
  }

  const activeSuggestions = useMemo(
    () => getSuggestions(homeSearchQuery || urlInput),
    [homeSearchQuery, urlInput, profiles, pack.id]
  )

  const handleSearchOrUrl = (query: string) => {
    let u = query.trim().toLowerCase()
    if (!u) return

    if (u.includes('://')) {
      navigateTo(u)
      return
    }

    const caseId = pack.id

    // Phân tích từ khoá tự nhiên theo đúng vụ án đang chơi
    if (u.includes('facebuc') || u.includes('fb') || u.includes('bảng tin') || u.includes('mạng xã hội')) {
      navigateTo('https://facebuc.vn')
    } else if ((caseId === 'hem42' || caseId === 'du-thuyen' || caseId === 'con-tin' || caseId === 'dau-gia') && (u.includes('giaonhanh') || u.includes('ship') || u.includes('đơn hàng') || u.includes('gps') || u.includes('ca nô') || u.includes('vali'))) {
      navigateTo('https://giaonhanh.vn')
    } else if ((caseId === 'hem42' || caseId === 'tu-do' || caseId === 'cau-long' || caseId === 'du-thuyen' || caseId === 'con-tin' || caseId === 'dau-gia') && (u.includes('chotot') || u.includes('rao vặt') || u.includes('bán') || u.includes('iphone') || u.includes('xe'))) {
      navigateTo('https://chotot.vn')
    } else if (caseId !== 'hem42' && (u.includes('vietinbank') || u.includes('ngân hàng') || u.includes('sao kê') || u.includes('chuyển khoản'))) {
      navigateTo('https://vietinbank.vn')
    } else if ((caseId === 'hoi-cho' || caseId === 'chung-cu' || caseId === 'an-mang' || caseId === 'du-thuyen' || caseId === 'con-tin' || caseId === 'dau-gia') && (u.includes('nhathuoc') || u.includes('long châu') || u.includes('longchau') || u.includes('thuốc') || u.includes('độc') || u.includes('nhuộm'))) {
      navigateTo('https://nhathuoc-longchau42.vn')
    } else if (u.includes('camera-phuong') || u.includes('camera an ninh') || u.includes('camera')) {
      navigateTo('https://camera-phuong.gov.vn')
    } else if ((caseId === 'chung-cu' || caseId === 'cong-ty-x') && (u.includes('bms') || u.includes('tòa nhà') || u.includes('cầu dao') || u.includes('họng rác'))) {
      navigateTo('https://bms-building.vn')
    } else if ((caseId === 'an-mang' || caseId === 'biet-thu-x') && (u.includes('smart') || u.includes('iot') || u.includes('ấm trà') || u.includes('nhiệt độ'))) {
      navigateTo('https://smarthome.iot')
    } else if (u.includes('hiện trường') || u.includes('khám nghiệm') || u.includes('uv')) {
      navigateTo('coccoc://khamnghiem')
    } else if (u.includes('thùng rác') || u.includes('rác') || u.includes('trash')) {
      navigateTo('coccoc://trash')
    } else {
      const matchedProfile = profiles.find(
        (p) => p.name.toLowerCase().includes(u) || p.slug.toLowerCase().includes(u)
      )
      if (matchedProfile) {
        navigateTo(`https://facebuc.vn/${matchedProfile.slug}`)
      } else {
        navigateTo(`coccoc://search?q=${encodeURIComponent(u)}`)
      }
    }
  }

  const handlePinItem = (clueId?: string, label?: string) => {
    if (!clueId) {
      MacSound.click()
      setBrowserToast({
        text: '✓ Đã ghi nhận: Thông tin này bình thường, không chứa mâu thuẫn.',
        success: false,
      })
      return
    }

    if (!found.has(clueId)) {
      find(clueId)
      MacSound.pinClue()
      setBrowserToast({
        text: `📌 Đã lưu: "${label || 'Chứng cứ quan trọng'}" vào Sổ vụ án!`,
        success: true,
      })
    } else {
      setBrowserToast({
        text: '📌 Chứng cứ này bạn đã lưu trong Sổ vụ án từ trước.',
        success: true,
      })
    }
  }

  return (
    <div className="flex h-full flex-col bg-[#ffffff] text-[#1d1d1f] font-['Be_Vietnam_Pro'] relative select-none">
      {inspectPhoto && (
        <PhotoInspectModal
          photo={inspectPhoto}
          found={found}
          find={find}
          onClose={() => setInspectPhoto(null)}
        />
      )}

      {browserToast && (
        <div
          className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-50 max-w-[90%] rounded-2xl px-4 py-2 text-[12px] font-bold shadow-2xl backdrop-blur-md border pointer-events-none transition-all ${
            browserToast.success
              ? 'bg-emerald-900 text-white border-emerald-700 shadow-md'
              : 'bg-slate-900 text-white border-slate-700 shadow-md'
          }`}
        >
          {browserToast.text}
        </div>
      )}

      {/* Cộc Cộc Tabs Bar chuẩn Mac */}
      <div className="flex items-end h-9 bg-[#e5e5ea] px-2 pt-1 gap-1 border-b border-[#0000001a] select-none">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-t-lg text-[12px] font-semibold text-slate-800 shadow-2xs max-w-[240px]">
          <span className="text-emerald-600 text-sm">🥥</span>
          <span className="truncate flex-1">
            {currentUrl.includes('facebuc.vn')
              ? 'Facebúc'
              : currentUrl.includes('giaonhanh.vn')
              ? 'GiaoNhanh Portal'
              : currentUrl.includes('chotot.vn')
              ? 'Chợ Tốt Rao Vặt'
              : currentUrl.includes('vietinbank.vn')
              ? 'VietinBank iPay'
              : currentUrl.includes('nhathuoc-longchau42.vn')
              ? 'Nhà Thuốc Long Châu 42'
              : currentUrl.includes('camera-phuong.gov.vn')
              ? 'Camera An Ninh Đô Thị'
              : currentUrl.includes('bms') || currentUrl.includes('smarthome')
              ? 'Smart IoT Hub'
              : currentUrl.includes('khamnghiem')
              ? 'Camera Hiện Trường'
              : currentUrl.includes('trash')
              ? 'Thùng rác hệ thống'
              : 'Cộc Cộc Tìm Kiếm'}
          </span>
          <span
            onClick={() => navigateTo('coccoc://home')}
            className="text-slate-400 hover:text-black cursor-pointer text-xs"
          >
            ✕
          </span>
        </div>
        <button
          type="button"
          onClick={() => navigateTo('coccoc://home')}
          className="h-6 w-6 grid place-items-center text-slate-500 hover:bg-slate-300 rounded text-sm mb-1"
          title="Mở tab mới"
        >
          +
        </button>
      </div>

      {/* Cộc Cộc Address Toolbar */}
      <div className="flex items-center gap-2 border-b border-[#00000012] bg-[#f8f9fa] px-3 py-2 relative z-40">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => navigateTo('coccoc://home')}
            className="grid h-7 w-7 place-items-center rounded-md hover:bg-slate-200 text-slate-600 text-sm"
            title="Trang chủ"
          >
            🏠
          </button>
          <button
            type="button"
            onClick={() => navigateTo('coccoc://home')}
            className="grid h-7 w-7 place-items-center rounded-md hover:bg-slate-200 text-slate-600 text-sm"
            title="Quay lại"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={() => MacSound.click()}
            className="grid h-7 w-7 place-items-center rounded-md hover:bg-slate-200 text-slate-600 text-sm"
            title="Tải lại"
          >
            ↻
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault()
            handleSearchOrUrl(urlInput)
          }}
          className="flex-1 flex items-center gap-2 rounded-full bg-[#eef0f3] border border-slate-300/60 px-3.5 py-1 text-[12px] focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500/30 focus-within:border-blue-500 transition-all relative"
        >
          <span className="text-slate-400 text-xs">🔒</span>
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Nhập tên trang web hoặc từ khóa tìm kiếm..."
            className="flex-1 bg-transparent text-slate-800 outline-none text-[12px] font-mono"
          />
          {urlInput && (
            <button
              type="button"
              onClick={() => setUrlInput('')}
              className="text-slate-400 hover:text-black text-xs"
            >
              ✕
            </button>
          )}
        </form>
      </div>

      {/* Main Web Page Content */}
      <div className="flex-1 overflow-y-auto bg-[#f0f2f5] relative">
        {/* =========================================================================
            TRANG CHỦ CỘC CỘC (NEW TAB) - TÌM KIẾM TỰ NHIÊN, KHÔNG CÓ NÚT LỐI TẮT BẤY SẴN
           ========================================================================= */}
        {(currentUrl === 'coccoc://home' || currentUrl.startsWith('coccoc://search')) && (
          <div className="min-h-full flex flex-col items-center justify-center p-6 bg-gradient-to-b from-white via-slate-50 to-[#eef2f6]">
            <div className="w-full max-w-xl text-center space-y-6">
              <div className="flex flex-col items-center">
                <span className="text-6xl mb-2 drop-shadow-sm select-none">🥥</span>
                <h2 className="text-2xl font-black tracking-tight text-emerald-700">Cộc Cộc</h2>
                <p className="text-[12px] text-slate-500 mt-0.5">Trình duyệt web và tra cứu điều tra thông tin</p>
              </div>

              {/* Ô Tìm Kiếm Chính Có Gợi Ý Autocomplete Động */}
              <div className="relative">
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSearchOrUrl(homeSearchQuery)
                  }}
                  className="relative"
                >
                  <input
                    type="text"
                    value={homeSearchQuery}
                    onChange={(e) => setHomeSearchQuery(e.target.value)}
                    placeholder="Nhập tên trang web hoặc từ khóa cần tìm..."
                    className="w-full rounded-2xl bg-white border border-slate-300 px-4 py-3.5 pl-11 pr-16 text-[13px] text-slate-800 shadow-md outline-none focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/15 transition-all"
                  />
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">🔍</span>
                  <button
                    type="submit"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl px-3.5 py-1.5 text-[11px] font-bold transition-colors shadow-2xs"
                  >
                    Tìm
                  </button>
                </form>

                {/* Gợi ý tìm kiếm động khi người chơi gõ từ */}
                {activeSuggestions.length > 0 && (
                  <div className="absolute left-0 top-full mt-2 w-full bg-white rounded-2xl border border-slate-200 shadow-2xl p-2 z-50 text-left divide-y divide-slate-100 animate-in fade-in slide-in-from-top-1 duration-150">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5">
                      Trang web & Kết quả gợi ý ({activeSuggestions.length}):
                    </p>
                    {activeSuggestions.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => navigateTo(item.url)}
                        className="w-full flex items-center gap-3 p-2.5 rounded-xl hover:bg-emerald-50 text-left transition-colors group"
                      >
                        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-slate-100 group-hover:bg-emerald-100 text-slate-800 group-hover:text-emerald-700 font-bold text-base transition-colors">
                          {item.icon}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-[13px] font-bold text-slate-900 group-hover:text-emerald-700 truncate">
                              {item.title}
                            </p>
                            <span className="text-[10px] font-mono text-slate-400 shrink-0">{item.url}</span>
                          </div>
                          <p className="text-[11px] text-slate-500 truncate">{item.desc}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <p className="text-[11px] text-slate-400">
                Gợi ý: Tìm kiếm các manh mối được nhắc tới trong tin nhắn hội thoại hoặc hồ sơ vụ án
              </p>
            </div>
          </div>
        )}

        {/* CÁC TRANG WEB THẬT SỰ - CHỈ HIỂN THỊ KHI ĐIỀU HƯỚNG TỚI */}
        {currentUrl.includes('facebuc.vn') && (
          <FacebucSite
            caseId={pack.id}
            currentUrl={currentUrl}
            found={found}
            onNavigate={navigateTo}
            onPin={handlePinItem}
            onToast={setBrowserToast}
          />
        )}

        {currentUrl.includes('giaonhanh.vn') && (
          <GiaoNhanhSite caseId={pack.id} found={found} onPin={handlePinItem} />
        )}

        {currentUrl.includes('chotot.vn') && (
          <ChoTotSite caseId={pack.id} found={found} onPin={handlePinItem} />
        )}

        {currentUrl.includes('vietinbank.vn') && (
          <BankingSite caseId={pack.id} found={found} onPin={handlePinItem} />
        )}

        {currentUrl.includes('nhathuoc-longchau42.vn') && (
          <NhaThuocSite caseId={pack.id} found={found} onPin={handlePinItem} onOpenUrl={navigateTo} />
        )}

        {currentUrl.includes('camera-phuong.gov.vn') && (
          <TrafficCameraSite caseId={pack.id} found={found} onPin={handlePinItem} onOpenUrl={navigateTo} />
        )}

        {(currentUrl.includes('bms') || currentUrl.includes('smarthome')) && (
          <SmartBuildingSite caseId={pack.id} found={found} onPin={handlePinItem} />
        )}

        {currentUrl.includes('khamnghiem') && (
          <KhamNghiemSite photos={PHOTOS} found={found} onInspect={setInspectPhoto} />
        )}

        {currentUrl.includes('trash') && (
          <TrashSite trash={TRASH} found={found} onPin={handlePinItem} />
        )}
      </div>
    </div>
  )
}
