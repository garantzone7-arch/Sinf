import { Send, Users, MessageCircle, ExternalLink, Info } from 'lucide-react';

const TELEGRAM_URL = 'https://t.me/';

export default function Chat() {
  return (
    <div className="max-w-5xl mx-auto px-4 pt-24 pb-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-sm font-medium mb-4">
          <MessageCircle className="w-4 h-4" />
          Muloqot
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3">
          Sinfniki — rasmiy guruh
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Sinfdoshlar bilan doim aloqada bo'lib turish, yangiliklardan xabardor bo'lish va o'zaro gaplashish uchun Telegram guruhimizga qo'shiling!
        </p>
      </div>

      {/* Telegram card */}
      <div className="relative bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-400/20 rounded-3xl p-8 sm:p-12 overflow-hidden group">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl group-hover:bg-cyan-500/30 transition-colors duration-500" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl group-hover:bg-blue-500/30 transition-colors duration-500" />

        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center mb-6 shadow-xl shadow-cyan-500/30 group-hover:scale-110 transition-transform duration-300">
            <Send className="w-10 h-10 text-white" />
          </div>

          <h2 className="text-2xl font-bold text-white mb-2">9-"D" sinf rasmiy guruhi</h2>
          <p className="text-slate-400 mb-6 max-w-md">
            Sinfdoshlar va o'qituvchilar bir joyda to'plangan. Dars jadvali, vazifalar va barcha e'lonlar shu yerda!
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 mb-8">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/50 border border-white/10 text-slate-300 text-sm">
              <Users className="w-4 h-4 text-cyan-400" />
              Barcha sinfdoshlar a'zo
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900/50 border border-white/10 text-slate-300 text-sm">
              <Info className="w-4 h-4 text-cyan-400" />
              Faqat sinfdoshlar uchun
            </div>
          </div>

          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 transition-all duration-200"
          >
            <Send className="w-5 h-5" />
            Guruhga qo'shilish
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
        {[
          {
            icon: MessageCircle,
            title: 'Tezkor gaplashish',
            text: 'Sinfdoshlar bilan bir zumda xabar almashish va muhim maslahatlar berish.',
            color: 'from-cyan-400 to-blue-500',
          },
          {
            icon: Info,
            title: 'E\'lonlar va yangiliklar',
            text: 'Dars jadvalidagi o\'zgarishlar va sinf yangiliklari birinchi bo\'lib shu yerda.',
            color: 'from-emerald-400 to-cyan-500',
          },
          {
            icon: Users,
            title: 'Bitta jamoa',
            text: 'Barcha sinfdoshlar va o\'qituvchilar bir joyda — hech kim aloqadan tashqarida qolmaydi.',
            color: 'from-amber-400 to-orange-500',
          },
        ].map((c, i) => (
          <div
            key={i}
            className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 hover:border-white/20 hover:bg-slate-900/70 transition-all duration-200"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${c.color} flex items-center justify-center mb-4`}>
              <c.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-white font-bold text-lg mb-2">{c.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{c.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
