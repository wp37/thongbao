import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield, Clock, BookOpen, Users, Phone, MessageCircle,
  ChevronDown, ChevronUp, AlertTriangle, CheckCircle2,
  Monitor, FileText, Layers, CalendarDays, ArrowRight,
  Zap, Star, Globe, Award, Target, ExternalLink,
  Timer, Bell, Sparkles, GraduationCap, Building2, UserCheck
} from 'lucide-react';

// =================== COUNTDOWN HOOK ===================
function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  function calculateTimeLeft() {
    const diff = targetDate.getTime() - new Date().getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      expired: false,
    };
  }
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);
  return timeLeft;
}

// =================== DATA ===================
const keyTasks = [
  {
    icon: Monitor,
    title: "Đăng nhập TEMIS",
    desc: "Truy cập hệ thống TEMIS bằng tài khoản đã được cấp. Kiểm tra thông tin cá nhân và cập nhật nếu cần.",
    color: "from-blue-500 to-cyan-500",
    bgLight: "bg-blue-50 border-blue-200",
    priority: "Ngay lập tức"
  },
  {
    icon: BookOpen,
    title: "Hoàn thành Module BDTX",
    desc: "Học các module bồi dưỡng trên Kho học liệu số TEMIS hoặc các nền tảng LMS liên kết. Chú ý các module: GVPT15, QLPT18.",
    color: "from-emerald-500 to-teal-500",
    bgLight: "bg-emerald-50 border-emerald-200",
    priority: "Trong tuần"
  },
  {
    icon: FileText,
    title: "Báo cáo Kết quả",
    desc: "Báo cáo kết quả BDTX trên hệ thống TEMIS có đính kèm minh chứng. Kết quả từ LMS liên kết sẽ cập nhật tự động.",
    color: "from-amber-500 to-orange-500",
    bgLight: "bg-amber-50 border-amber-200",
    priority: "Trước 20/03"
  }
];

const instructions = [
  {
    id: 1,
    title: "Cách Báo cáo BDTX trên TEMIS",
    icon: FileText,
    content: [
      "Đăng nhập tài khoản TEMIS cá nhân tại trang web chính thức",
      "Vào mục 'Báo cáo BDTX' → Chọn năm học 2024-2025",
      "Nhập kết quả bồi dưỡng và đính kèm minh chứng (hình ảnh, file PDF...)",
      "Nếu sử dụng nền tảng LMS liên kết → Kết quả sẽ tự động cập nhật",
      "Nếu tự học → Cần báo cáo thủ công và chờ Hiệu trưởng / Phòng GD&ĐT phê duyệt",
      "Kiểm tra lại trạng thái phê duyệt sau khi gửi báo cáo"
    ]
  },
  {
    id: 2,
    title: "Kho Học liệu Số trên TEMIS",
    icon: Layers,
    content: [
      "Truy cập 'Kho học liệu dùng chung' trên hệ thống TEMIS",
      "Bao gồm cả học liệu dạng văn bản và module số hóa",
      "Một số module tiêu biểu:",
      "• GVPT15: Ứng dụng CNTT trong dạy học",
      "• QLPT18: Ứng dụng CNTT trong quản lý nhà trường",
      "• Quản lý cảm xúc, Giáo dục hòa nhập...",
      "Sau khi hoàn thành module, kết quả sẽ được ghi nhận trên hệ thống"
    ]
  },
  {
    id: 3,
    title: "Lịch trình Hành động",
    icon: CalendarDays,
    content: [
      "🔴 NGAY LẬP TỨC: Đăng nhập TEMIS, kiểm tra tài khoản, cập nhật thông tin",
      "🟡 NGẮN HẠN (Trong tuần): Bắt đầu học module BDTX, thực hiện bồi dưỡng",
      "🟢 DÀI HẠN (Trước 20/03/2026): Hoàn tất báo cáo, đính kèm minh chứng",
      "Chọn nền tảng LMS liên kết để tự động hóa báo cáo cho năm sau",
      "Hotline hỗ trợ TEMIS: 1800.8000 (nhánh 2)"
    ]
  }
];

const timeline = [
  { step: 1, title: "Kiểm tra tài khoản TEMIS", date: "Ngay hôm nay", status: "urgent", desc: "Đăng nhập và xác minh thông tin cá nhân trên hệ thống TEMIS" },
  { step: 2, title: "Bắt đầu học Module BDTX", date: "Trong tuần này", status: "active", desc: "Truy cập Kho học liệu số, chọn và bắt đầu các module bồi dưỡng" },
  { step: 3, title: "Hoàn thành bồi dưỡng", date: "Tuần tới", status: "pending", desc: "Hoàn tất tất cả module được yêu cầu, lưu lại minh chứng" },
  { step: 4, title: "Báo cáo kết quả trên TEMIS", date: "Trước 15/03/2026", status: "pending", desc: "Nhập kết quả và đính kèm minh chứng lên hệ thống" },
  { step: 5, title: "Chờ phê duyệt", date: "Trước 20/03/2026", status: "pending", desc: "Hiệu trưởng và Phòng GD&ĐT phê duyệt kết quả BDTX" },
];

const importantNotes = [
  "Tất cả giáo viên và CBQL PHẢI hoàn thành BDTX trước ngày 20/03/2026",
  "Kết quả BDTX là căn cứ đánh giá chuẩn nghề nghiệp hàng năm",
  "Nền tảng LMS liên kết giúp tự động cập nhật kết quả — tiết kiệm thời gian",
  "Liên hệ Hotline TEMIS: 1800.8000 nhánh 2 nếu gặp sự cố kỹ thuật",
  "Liên hệ thầy Võ Ngọc Tùng (Zalo: 0814666040) để được hỗ trợ trực tiếp"
];

// =================== COMPONENTS ===================

const CountdownUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
  <div className="flex flex-col items-center">
    <div className="relative">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center shadow-lg">
        <span className="text-2xl sm:text-3xl font-black text-white tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-yellow-400 animate-pulse" />
    </div>
    <span className="text-white/80 text-xs sm:text-sm font-medium mt-2 uppercase tracking-wider">{label}</span>
  </div>
);

const AccordionItem: React.FC<{
  item: typeof instructions[0];
  isOpen: boolean;
  onToggle: () => void;
}> = ({ item, isOpen, onToggle }) => (
  <motion.div
    layout
    className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
  >
    <button
      onClick={onToggle}
      className="w-full flex items-center gap-4 p-5 sm:p-6 text-left hover:bg-gray-50 transition-colors"
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shrink-0 shadow-md">
        <item.icon className="w-6 h-6 text-white" />
      </div>
      <div className="grow">
        <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
        <p className="text-sm text-gray-500 mt-0.5">{item.content.length} bước thực hiện</p>
      </div>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen ? 'bg-blue-100 text-blue-600 rotate-180' : 'bg-gray-100 text-gray-400'}`}>
        <ChevronDown className="w-5 h-5" />
      </div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="px-5 sm:px-6 pb-6 pt-2">
            <div className="space-y-3">
              {item.content.map((line, idx) => (
                <motion.div
                  key={idx}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-3"
                >
                  {line.startsWith('•') ? (
                    <>
                      <div className="w-2 h-2 rounded-full bg-indigo-400 mt-2 shrink-0" />
                      <p className="text-gray-700 leading-relaxed">{line.slice(2)}</p>
                    </>
                  ) : line.startsWith('🔴') || line.startsWith('🟡') || line.startsWith('🟢') ? (
                    <p className="text-gray-700 leading-relaxed font-medium bg-gray-50 px-4 py-2 rounded-lg border border-gray-100 w-full">{line}</p>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                      <p className="text-gray-700 leading-relaxed">{line}</p>
                    </>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

// =================== MAIN APP ===================
const App: React.FC = () => {
  const deadline = new Date('2026-03-20T23:59:59+07:00');
  const countdown = useCountdown(deadline);
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    })
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">

      {/* ========== URGENT BANNER ========== */}
      <div className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white py-2.5 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9InAiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTTAgMjBMMjAgMEw0MCAyMEwyMCA0MFoiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA4KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3ApIi8+PC9zdmc+')] opacity-30" />
        <div className="flex items-center justify-center gap-2 relative z-10">
          <Bell className="w-4 h-4 animate-bounce" />
          <span className="font-bold text-sm sm:text-base">
            ⚡ THÔNG BÁO KHẨN — Hạn chót: 20/03/2026 — Tất cả GV & CBQL phải hoàn thành BDTX!
          </span>
        </div>
      </div>

      {/* ========== HERO SECTION ========== */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-800 to-blue-900" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9InAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMS41IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDYpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3ApIi8+PC9zdmc+')] opacity-50" />

        {/* Decorative orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl" />
        <div className="absolute top-40 right-1/3 w-48 h-48 bg-cyan-400/10 rounded-full blur-2xl" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16 lg:py-20">
          {/* School badge */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 mb-6">
              <Building2 className="w-5 h-5 text-yellow-400" />
              <span className="text-white/90 font-medium text-sm sm:text-base">Trường THCS Nguyễn Văn Bảnh</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
              <span className="block text-yellow-400 mb-2">📋 THÔNG BÁO</span>
              Thực hiện Báo cáo BDTX
              <br />
              <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
                trên Hệ thống TEMIS
              </span>
            </h1>

            <p className="text-blue-200 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed mt-4">
              Năm học 2024-2025 · Căn cứ Công văn 862 của Sở GD&ĐT Vĩnh Long
              <br />và Công văn 813 của UBND Xã Nhuận Phú Tân
            </p>
          </motion.div>

          {/* Principal info */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 mb-10"
          >
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/15">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-lg">
                <Award className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white/60 text-xs uppercase tracking-wider">Hiệu trưởng</p>
                <p className="text-white font-bold text-base">Huỳnh Trung Đông</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 border border-white/15">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center shadow-lg">
                <UserCheck className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white/60 text-xs uppercase tracking-wider">Hỗ trợ kỹ thuật</p>
                <p className="text-white font-bold text-base">Võ Ngọc Tùng · Zalo 0814666040</p>
              </div>
            </div>
          </motion.div>

          {/* Countdown */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="text-center"
          >
            <p className="text-white/70 text-sm font-medium mb-4 uppercase tracking-widest flex items-center justify-center gap-2">
              <Timer className="w-4 h-4" /> Thời gian còn lại đến hạn chót
            </p>
            {countdown.expired ? (
              <div className="inline-flex items-center gap-3 bg-red-500/30 backdrop-blur-md rounded-2xl px-8 py-4 border border-red-400/30">
                <AlertTriangle className="w-6 h-6 text-red-300" />
                <span className="text-red-200 font-bold text-xl">ĐÃ HẾT HẠN!</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-3 sm:gap-5">
                <CountdownUnit value={countdown.days} label="Ngày" />
                <span className="text-white/40 text-2xl font-light mt-[-20px]">:</span>
                <CountdownUnit value={countdown.hours} label="Giờ" />
                <span className="text-white/40 text-2xl font-light mt-[-20px]">:</span>
                <CountdownUnit value={countdown.minutes} label="Phút" />
                <span className="text-white/40 text-2xl font-light mt-[-20px]">:</span>
                <CountdownUnit value={countdown.seconds} label="Giây" />
              </div>
            )}
          </motion.div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 40C360 90 720 10 1080 50C1260 70 1380 60 1440 40V100H0V40Z" fill="#f8fafc" />
          </svg>
        </div>
      </header>

      {/* ========== KEY TASKS ========== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-10"
        >
          <motion.div variants={fadeUp} custom={0}>
            <span className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
              <Target className="w-4 h-4" /> Nhiệm vụ trọng tâm
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
              3 Việc Cần Làm Ngay
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Mỗi giáo viên và CBQL cần hoàn thành đầy đủ 3 nhiệm vụ dưới đây trước hạn 20/03/2026
            </p>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5 sm:gap-6">
          {keyTasks.map((task, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="group relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Top gradient bar */}
              <div className={`h-1.5 bg-gradient-to-r ${task.color}`} />

              <div className="p-6">
                {/* Priority badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${task.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <task.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${task.bgLight} border`}>
                    {task.priority}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {task.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm">
                  {task.desc}
                </p>
              </div>

              {/* Bottom step indicator */}
              <div className="px-6 pb-5">
                <div className="flex items-center gap-2 text-sm font-medium text-blue-600 group-hover:text-blue-700">
                  <span>Bước {idx + 1}/3</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ========== IMPORTANT NOTES ========== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-2xl border border-amber-200 p-6 sm:p-8 shadow-sm"
        >
          <div className="flex items-start gap-4 mb-5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0 shadow-md">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-amber-900">7 Điều Quan Trọng Cần Nhớ</h3>
              <p className="text-amber-700 text-sm mt-1">Vui lòng đọc kỹ và ghi nhớ</p>
            </div>
          </div>
          <div className="space-y-3">
            {importantNotes.map((note, idx) => (
              <motion.div
                key={idx}
                initial={{ x: -10, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.08 }}
                className="flex items-start gap-3 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-amber-100"
              >
                <span className="w-7 h-7 rounded-full bg-amber-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <p className="text-gray-800 leading-relaxed">{note}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ========== DETAILED INSTRUCTIONS ========== */}
      <section className="bg-gradient-to-b from-slate-50 to-white py-12 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-10"
          >
            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
                <BookOpen className="w-4 h-4" /> Hướng dẫn chi tiết
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
                Hướng Dẫn Thực Hiện
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Nhấn vào từng mục để xem hướng dẫn chi tiết từng bước
              </p>
            </motion.div>
          </motion.div>

          <div className="space-y-4">
            {instructions.map((item) => (
              <AccordionItem
                key={item.id}
                item={item}
                isOpen={openAccordion === item.id}
                onToggle={() => setOpenAccordion(openAccordion === item.id ? null : item.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ========== TIMELINE ========== */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-10"
        >
          <motion.div variants={fadeUp} custom={0}>
            <span className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
              <Clock className="w-4 h-4" /> Tiến trình thực hiện
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 mb-3">
              Lộ Trình 5 Bước
            </h2>
          </motion.div>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-emerald-500 to-gray-300" />

          <div className="space-y-6">
            {timeline.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ x: -30, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="relative flex gap-5 sm:gap-6"
              >
                {/* Step circle */}
                <div className={`relative z-10 w-12 h-12 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-lg text-white font-black text-lg
                  ${item.status === 'urgent' ? 'bg-gradient-to-br from-red-500 to-rose-600 animate-pulse' :
                    item.status === 'active' ? 'bg-gradient-to-br from-blue-500 to-indigo-600' :
                      'bg-gradient-to-br from-gray-300 to-gray-400'}`}
                >
                  {item.step}
                </div>

                {/* Content card */}
                <div className={`grow bg-white rounded-2xl border p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow
                  ${item.status === 'urgent' ? 'border-red-200' :
                    item.status === 'active' ? 'border-blue-200' : 'border-gray-200'}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                    <h3 className="font-bold text-gray-900 text-lg">{item.title}</h3>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full w-fit
                      ${item.status === 'urgent' ? 'bg-red-100 text-red-700' :
                        item.status === 'active' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-600'}`}
                    >
                      {item.date}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== CONTACT / SUPPORT ========== */}
      <section className="bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-900 py-12 sm:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9InAiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMS41IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDQpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI3ApIi8+PC9zdmc+')] opacity-50" />
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-indigo-400/10 rounded-full blur-3xl" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-10"
          >
            <motion.div variants={fadeUp} custom={0}>
              <span className="inline-flex items-center gap-2 bg-white/10 text-white/80 rounded-full px-4 py-1.5 text-sm font-semibold mb-4 border border-white/15 backdrop-blur-sm">
                <Phone className="w-4 h-4" /> Hỗ trợ & Liên hệ
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mb-3">
                Cần Hỗ Trợ?
              </h2>
              <p className="text-blue-200 max-w-xl mx-auto">
                Liên hệ ngay để được hỗ trợ thao tác trên hệ thống TEMIS
              </p>
            </motion.div>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Zalo Support */}
            <motion.a
              href="https://zalo.me/0814666040"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 p-6 text-center hover:bg-white/15 transition-all cursor-pointer"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform">
                <MessageCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-1">Zalo Hỗ Trợ</h3>
              <p className="text-blue-200 font-medium mb-2">Thầy Võ Ngọc Tùng</p>
              <p className="text-yellow-400 font-black text-xl">0814 666 040</p>
              <div className="mt-4 flex items-center justify-center gap-2 text-blue-300 text-sm font-medium group-hover:text-white transition-colors">
                <span>Nhấn để mở Zalo</span>
                <ExternalLink className="w-4 h-4" />
              </div>
            </motion.a>

            {/* Hotline */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 p-6 text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-1">Hotline TEMIS</h3>
              <p className="text-blue-200 font-medium mb-2">Hỗ trợ kỹ thuật hệ thống</p>
              <p className="text-yellow-400 font-black text-xl">1800.8000</p>
              <p className="text-blue-300 text-sm mt-2">Nhánh 2</p>
            </motion.div>

            {/* School */}
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/15 p-6 text-center sm:col-span-2 lg:col-span-1"
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-white font-bold text-lg mb-1">Trường THCS</h3>
              <p className="text-blue-200 font-medium mb-2">Nguyễn Văn Bảnh</p>
              <p className="text-white/70 text-sm">
                Xã Nhuận Phú Tân, Tỉnh Vĩnh Long
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="bg-gray-900 text-gray-400 py-8 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="w-6 h-6 text-blue-400" />
            <span className="text-white font-bold text-lg">Trường THCS Nguyễn Văn Bảnh</span>
          </div>
          <p className="text-sm mb-2">
            Thông báo Thực hiện Báo cáo BDTX trên Hệ thống TEMIS — Năm học 2024-2025
          </p>
          <p className="text-xs text-gray-500">
            Hiệu trưởng: Huỳnh Trung Đông · Hỗ trợ: Võ Ngọc Tùng (Zalo: 0814666040)
          </p>
          <div className="mt-4 pt-4 border-t border-gray-800 text-xs text-gray-600">
            © 2026 Trường THCS Nguyễn Văn Bảnh · Thiết kế bởi Võ Ngọc Tùng
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
