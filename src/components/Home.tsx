import { useState, useEffect } from 'react';
import { Trophy, Users, Sparkles, ArrowRight, Plus, ImageOff, MessageCircle, Zap, ShieldCheck, TrendingUp } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Moment } from '@/lib/supabase';
import type { Page } from './Navbar';

interface HomeProps { setPage: (p: Page) => void; }

const stats = [
  { icon: Users, label: 'O‘quvchilar', value: '24', note: 'bir jamoa', color: 'from-cyan-400 to-blue-500' },
  { icon: Trophy, label: 'Futbol reytingi', value: '92', note: 'eng yuqori OVR', color: 'from-amber-300 to-orange-500' },
  { icon: Sparkles, label: 'Xotiralar', value: '128', note: 'va hali davom etadi', color: 'from-fuchsia-400 to-pink-500' },
];

export default function Home({ setPage }: HomeProps) {
  const [moments, setMoments] = useState<Moment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddMoment, setShowAddMoment] = useState(false);
  const [newMoment, setNewMoment] = useState({ title: '', description: '', emoji: '😂' });

  useEffect(() => { loadMoments(); }, []);
  async function loadMoments() {
    setLoading(true);
    const { data } = await supabase.from('moments').select('*').order('created_at', { ascending: false }).limit(6);
    setMoments(data || []); setLoading(false);
  }
  async function addMoment() {
    if (!newMoment.title.trim() || !newMoment.description.trim()) return;
    await supabase.from('moments').insert([newMoment]);
    setNewMoment({ title: '', description: '', emoji: '😂' }); setShowAddMoment(false); loadMoments();
  }

  return (
    <div className="space-y-20 pb-20">
      <section className="relative overflow-hidden pt-28 sm:pt-36 pb-10">
        <div className="hero-grid absolute inset-0 opacity-60" />
        <div className="absolute -left-32 top-20 size-80 rounded-full bg-cyan-500/20 blur-[110px]" />
        <div className="absolute right-0 top-10 size-96 rounded-full bg-fuchsia-500/15 blur-[120px]" />
        <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 lg:grid-cols-[1.1fr_.9fr] lg:px-8">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
              <span className="status-dot" /> 2025—2026 / 9-D sinf
            </div>
            <h1 className="text-5xl font-black leading-[.95] tracking-tight text-white sm:text-7xl lg:text-8xl">
              Bir sinf.<br /><span className="neon-text">Bir jamoa.</span>
            </h1>
            <p className="mt-7 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">Bilimda oldinda, maydonda dadil, xotiralarda abadiy. 9-D sinfning rasmiy raqamli makoni.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => setPage('reyting')} className="group flex items-center justify-center gap-3 rounded-xl bg-cyan-300 px-5 py-3.5 font-bold text-slate-950 shadow-[0_0_35px_rgba(103,232,249,.25)] transition hover:-translate-y-0.5 hover:bg-cyan-200">
                <Trophy className="size-5" /> Reytingni ko‘rish <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </button>
              <a href="https://t.me/+aTTiYbTAxn9hMDIy" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 font-bold text-white transition hover:border-cyan-300/50 hover:bg-white/10">
                <MessageCircle className="size-5 text-cyan-300" /> Sinf chatiga qo‘shilish
              </a>
            </div>
            <div className="mt-10 flex items-center gap-6 text-sm text-slate-500"><span className="flex items-center gap-2"><ShieldCheck className="size-4 text-emerald-400" /> Ochiq va xavfsiz</span><span className="flex items-center gap-2"><Zap className="size-4 text-amber-300" /> Jonli yangilanadi</span></div>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:ml-auto">
            <div className="football-orb absolute -right-3 -top-6 z-20 flex size-20 items-center justify-center rounded-3xl border border-cyan-200/30 bg-slate-900/80 shadow-[0_0_45px_rgba(34,211,238,.25)]"><Trophy className="size-9 text-amber-300" /></div>
            <div className="rounded-[2rem] border border-white/10 bg-white/[.06] p-4 shadow-2xl backdrop-blur-xl">
              <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/80 p-6">
                <div className="flex items-center justify-between"><div><p className="text-xs uppercase tracking-[.2em] text-slate-500">Class identity</p><p className="mt-2 text-3xl font-black text-white">9-D <span className="text-cyan-300">UNITED</span></p></div><div className="rounded-2xl bg-cyan-300/10 p-3"><TrendingUp className="size-6 text-cyan-300" /></div></div>
                <div className="mt-8 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-white/5 p-4"><p className="text-xs text-slate-500">Motto</p><p className="mt-2 font-bold text-white">“Birga — kuchliroq”</p></div><div className="rounded-2xl bg-white/5 p-4"><p className="text-xs text-slate-500">Team OVR</p><p className="mt-2 text-3xl font-black text-amber-300">88</p></div></div>
                <div className="mt-6 flex items-end gap-1.5"><span className="h-10 flex-1 rounded-t bg-cyan-300/30" /><span className="h-16 flex-1 rounded-t bg-cyan-300/40" /><span className="h-12 flex-1 rounded-t bg-fuchsia-300/40" /><span className="h-24 flex-1 rounded-t bg-cyan-300" /><span className="h-20 flex-1 rounded-t bg-fuchsia-400" /><span className="h-28 flex-1 rounded-t bg-amber-300" /></div>
                <p className="mt-3 text-center text-xs text-slate-500">Har kuni yangi rekord</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-4 px-4 sm:grid-cols-3 lg:px-8">
        {stats.map(({ icon: Icon, label, value, note, color }) => <div key={label} className="glass-card group rounded-2xl p-5 transition hover:-translate-y-1"><div className="flex items-center justify-between"><div className={`flex size-11 items-center justify-center rounded-xl bg-gradient-to-br ${color}`}><Icon className="size-5 text-slate-950" /></div><span className="text-xs text-slate-500">LIVE</span></div><div className="mt-5 flex items-end gap-3"><strong className="text-3xl font-black text-white">{value}</strong><span className="pb-1 text-sm text-slate-400">{label}</span></div><p className="mt-1 text-xs text-slate-500">{note}</p></div>)}
      </section>

      <section className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="mb-8 flex items-end justify-between"><div><p className="mb-2 text-xs font-semibold uppercase tracking-[.22em] text-fuchsia-300">Sinf kundaligi</p><h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">Eng prikol momentlar</h2><p className="mt-2 text-sm text-slate-400">Biz unutmaydigan, lekin o‘qituvchi unutishni istaydigan voqealar.</p></div><button onClick={() => setShowAddMoment(true)} className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-cyan-300/40 hover:bg-white/10 sm:flex"><Plus className="size-4" /> Moment qo‘shish</button></div>
        {loading ? <div className="py-12 text-center text-slate-500">Yuklanmoqda...</div> : moments.length === 0 ? <div className="rounded-2xl border border-dashed border-white/10 py-14 text-center text-slate-500"><ImageOff className="mx-auto mb-3 size-10 opacity-50" /><p>Hozircha momentlar yo‘q.</p></div> : <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">{moments.map((m, i) => <article key={m.id} className={`glass-card mb-5 break-inside-avoid rounded-2xl p-6 transition hover:-translate-y-1 hover:border-cyan-300/30 ${i === 0 ? 'bg-gradient-to-br from-fuchsia-500/10 to-transparent' : ''}`}><div className="flex items-start justify-between gap-4"><span className="text-3xl">{m.emoji}</span><span className="text-xs text-slate-600">0{i + 1}</span></div><h3 className="mt-5 text-lg font-bold leading-tight text-white">{m.title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">{m.description}</p></article>)}</div>}
      </section>

      {showAddMoment && <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-md" onClick={() => setShowAddMoment(false)}><div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900 p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}><h3 className="text-xl font-bold text-white">Yangi moment qo‘shish</h3><div className="mt-5 flex flex-col gap-4"><input value={newMoment.emoji} onChange={(e) => setNewMoment({ ...newMoment, emoji: e.target.value })} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300/50" placeholder="Emoji" maxLength={4} /><input value={newMoment.title} onChange={(e) => setNewMoment({ ...newMoment, title: e.target.value })} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300/50" placeholder="Sarlavha" /><textarea value={newMoment.description} onChange={(e) => setNewMoment({ ...newMoment, description: e.target.value })} className="resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-cyan-300/50" rows={3} placeholder="Voqeani tasvirlang" /><div className="flex gap-3"><button onClick={addMoment} className="flex-1 rounded-xl bg-cyan-300 px-4 py-3 font-bold text-slate-950">Qo‘shish</button><button onClick={() => setShowAddMoment(false)} className="rounded-xl border border-white/10 px-4 py-3 font-semibold text-slate-300">Bekor</button></div></div></div></div>}
    </div>
  );
}
