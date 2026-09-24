import { useState, useEffect } from 'react';
import { Trophy, Users, Sparkles, ArrowRight, Plus, ImageOff } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Moment } from '@/lib/supabase';
import type { Page } from './Navbar';

interface HomeProps {
  setPage: (p: Page) => void;
}

export default function Home({ setPage }: HomeProps) {
  const [moments, setMoments] = useState<Moment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddMoment, setShowAddMoment] = useState(false);
  const [newMoment, setNewMoment] = useState({ title: '', description: '', emoji: '😂' });

  useEffect(() => {
    loadMoments();
  }, []);

  async function loadMoments() {
    setLoading(true);
    const { data } = await supabase
      .from('moments')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(6);
    setMoments(data || []);
    setLoading(false);
  }

  async function addMoment() {
    if (!newMoment.title.trim() || !newMoment.description.trim()) return;
    await supabase.from('moments').insert([newMoment]);
    setNewMoment({ title: '', description: '', emoji: '😂' });
    setShowAddMoment(false);
    loadMoments();
  }

  return (
    <div className="space-y-24 pb-16">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-400/20 text-emerald-300 text-sm font-medium mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            2025-2026 o'quv yili
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-4 leading-tight">
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
              9-"D" sinfga
            </span>
            <br />
            <span className="text-3xl sm:text-4xl md:text-5xl text-slate-300 font-bold">
              xush kelibsiz!
            </span>
          </h1>

          <p className="text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Bizning sinfning eng prikol momentlari, futbol yulduzlari va eng so'nggi yangiliklar — hammasi shu yerda.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setPage('reyting')}
              className="group flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 transition-all duration-200"
            >
              <Trophy className="w-5 h-5" />
              Futbol reytingini ko'rish
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => setPage('galereya')}
              className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-all duration-200"
            >
              Galereyaga o'tish
            </button>
          </div>
        </div>
      </section>

      {/* Quick stats */}
      <section className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { icon: Users, label: 'Sinfdoshlar', value: 'Hammasi bir joyda', color: 'from-emerald-400 to-cyan-400' },
            { icon: Trophy, label: 'Futbol', value: 'FIFA uslubidagi kartalar', color: 'from-amber-400 to-orange-400' },
            { icon: Sparkles, label: 'Prikol momentlar', value: 'Eng esda qolarli voqealar', color: 'from-pink-400 to-rose-400' },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-slate-900/50 border border-white/10 rounded-2xl p-5 text-center hover:border-white/20 hover:bg-slate-900/70 transition-all duration-200"
            >
              <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                <s.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm text-slate-300 font-medium">{s.label}</div>
              <div className="text-xs text-slate-500 mt-1">{s.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest moments */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-1">Eng prikol momentlar</h2>
            <p className="text-slate-400 text-sm">Sinfdagi eng esda qolarli voqealar</p>
          </div>
          <button
            onClick={() => setShowAddMoment(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 text-sm font-medium hover:bg-emerald-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Moment qo'shish</span>
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12 text-slate-500">Yuklanmoqda...</div>
        ) : moments.length === 0 ? (
          <div className="text-center py-12 text-slate-500">
            <ImageOff className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>Hozircha momentlar yo'q. Birinchi bo'lib qo'shing!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {moments.map((m) => (
              <div
                key={m.id}
                className="group bg-slate-900/50 border border-white/10 rounded-2xl p-6 hover:border-emerald-400/30 hover:bg-slate-900/70 transition-all duration-200 hover:-translate-y-1"
              >
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-3xl">{m.emoji}</span>
                  <h3 className="text-white font-bold text-lg leading-tight group-hover:text-emerald-300 transition-colors">
                    {m.title}
                  </h3>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed">{m.description}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Add moment modal */}
      {showAddMoment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowAddMoment(false)}>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-white font-bold text-xl mb-4">Yangi moment qo'shish</h3>
            <div className="space-y-4">
              <div>
                <label className="text-slate-400 text-sm mb-1 block">Emoji</label>
                <input
                  type="text"
                  value={newMoment.emoji}
                  onChange={(e) => setNewMoment({ ...newMoment, emoji: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-white/10 text-white focus:border-emerald-400/50 outline-none"
                  placeholder="😂"
                  maxLength={4}
                />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">Sarlavha</label>
                <input
                  type="text"
                  value={newMoment.title}
                  onChange={(e) => setNewMoment({ ...newMoment, title: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-white/10 text-white focus:border-emerald-400/50 outline-none"
                  placeholder="Masalan: Darsda uxlab qolgan Akmal"
                />
              </div>
              <div>
                <label className="text-slate-400 text-sm mb-1 block">Voqeani tasvirlang</label>
                <textarea
                  value={newMoment.description}
                  onChange={(e) => setNewMoment({ ...newMoment, description: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-white/10 text-white focus:border-emerald-400/50 outline-none resize-none"
                  rows={3}
                  placeholder="Nima sodir bo'ldi?"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={addMoment}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
                >
                  Qo'shish
                </button>
                <button
                  onClick={() => setShowAddMoment(false)}
                  className="px-4 py-2.5 rounded-lg bg-slate-800 border border-white/10 text-slate-300 font-medium hover:bg-slate-700 transition-all"
                >
                  Bekor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
