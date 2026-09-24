import { useState, useEffect, useMemo, useRef } from 'react';
import { ArrowUpDown, Star, Zap, Shield, Footprints, Crosshair, Circle, Plus, X, Pencil, Trash2, Upload, ImageOff } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Player } from '@/lib/supabase';

type SortKey = 'rating' | 'tezlik' | 'zarba' | 'pas' | 'himoya' | 'dribling';

const statLabels: { key: SortKey; label: string; icon: typeof Star }[] = [
  { key: 'rating', label: 'Reyting', icon: Star },
  { key: 'tezlik', label: 'Tezlik', icon: Footprints },
  { key: 'zarba', label: 'Zarba', icon: Crosshair },
  { key: 'pas', label: 'Pas', icon: Zap },
  { key: 'himoya', label: 'Himoya', icon: Shield },
  { key: 'dribling', label: 'Dribling', icon: Circle },
];

const positions = ['Hujumchi', 'Yarim himoyachi', 'Himoyachi', 'Darvozabon'];

function ratingColor(value: number): string {
  if (value >= 88) return 'from-amber-400 to-yellow-500';
  if (value >= 83) return 'from-emerald-400 to-cyan-500';
  if (value >= 78) return 'from-blue-400 to-indigo-500';
  return 'from-slate-400 to-slate-500';
}

function statColor(value: number): string {
  if (value >= 90) return 'text-emerald-400';
  if (value >= 80) return 'text-cyan-400';
  if (value >= 70) return 'text-blue-400';
  if (value >= 60) return 'text-amber-400';
  return 'text-slate-500';
}

function statBar(value: number): string {
  if (value >= 90) return 'bg-emerald-400';
  if (value >= 80) return 'bg-cyan-400';
  if (value >= 70) return 'bg-blue-400';
  if (value >= 60) return 'bg-amber-400';
  return 'bg-slate-500';
}

const emptyForm = {
  name: '',
  position: 'Hujumchi',
  rating: 75,
  tezlik: 75,
  zarba: 75,
  pas: 75,
  himoya: 75,
  dribling: 75,
  image_url: '' as string,
};

export default function FootballRating() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortKey>('rating');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadPlayers();
  }, []);

  async function loadPlayers() {
    setLoading(true);
    const { data } = await supabase.from('players').select('*').order('rating', { ascending: false });
    setPlayers(data || []);
    setLoading(false);
  }

  const sorted = useMemo(() => {
    const arr = [...players];
    arr.sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      return b[sortBy] - a[sortBy];
    });
    return arr;
  }, [players, sortBy]);

  async function uploadImage(file: File) {
    setUploading(true);
    const ext = file.name.split('.').pop();
    const fileName = `player-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('class-assets').upload(fileName, file);
    if (!error) {
      const { data: urlData } = supabase.storage.from('class-assets').getPublicUrl(fileName);
      setForm((f) => ({ ...f, image_url: urlData.publicUrl }));
    }
    setUploading(false);
  }

  async function savePlayer() {
    if (!form.name.trim()) return;
    const payload = {
      name: form.name,
      position: form.position,
      rating: Number(form.rating),
      tezlik: Number(form.tezlik),
      zarba: Number(form.zarba),
      pas: Number(form.pas),
      himoya: Number(form.himoya),
      dribling: Number(form.dribling),
      image_url: form.image_url || null,
    };
    if (editingId) {
      await supabase.from('players').update(payload).eq('id', editingId);
    } else {
      await supabase.from('players').insert([payload]);
    }
    setForm(emptyForm);
    setEditingId(null);
    setShowModal(false);
    loadPlayers();
  }

  function editPlayer(p: Player) {
    setForm({
      name: p.name,
      position: p.position,
      rating: p.rating,
      tezlik: p.tezlik,
      zarba: p.zarba,
      pas: p.pas,
      himoya: p.himoya,
      dribling: p.dribling,
      image_url: p.image_url || '',
    });
    setEditingId(p.id);
    setShowModal(true);
  }

  async function deletePlayer(id: string) {
    await supabase.from('players').delete().eq('id', id);
    loadPlayers();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/20 text-amber-300 text-sm font-medium mb-4">
          <Star className="w-4 h-4" />
          FIFA uslubida
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
          Sinf Futbol Reytingi
        </h1>
        <p className="text-slate-400">Eng zo'r o'yinchilarni saralab ko'rib chiqing</p>
      </div>

      {/* Sort + Add */}
      <div className="flex flex-col items-center gap-4 mb-10">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="flex items-center gap-1 text-slate-400 text-sm mr-2">
            <ArrowUpDown className="w-4 h-4" />
            Saralash:
          </div>
          {statLabels.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setSortBy(key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                sortBy === key
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25'
                  : 'bg-slate-800/50 text-slate-400 border border-white/10 hover:text-white hover:border-white/20'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>
        <button
          onClick={() => { setForm(emptyForm); setEditingId(null); setShowModal(true); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold shadow-lg shadow-emerald-500/25 hover:scale-105 transition-all"
        >
          <Plus className="w-5 h-5" />
          O'yinchi qo'shish
        </button>
      </div>

      {/* Cards */}
      {loading ? (
        <div className="text-center py-12 text-slate-500">Yuklanmoqda...</div>
      ) : sorted.length === 0 ? (
        <div className="text-center py-12 text-slate-500">
          <ImageOff className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>Hozircha o'yinchilar yo'q. Birinchi o'yinchini qo'shing!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {sorted.map((player, idx) => (
            <div
              key={player.id}
              className="group relative bg-gradient-to-b from-slate-800/80 to-slate-900/80 border border-white/10 rounded-2xl overflow-hidden hover:border-emerald-400/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-emerald-500/10"
              style={{ animation: `fadeInUp 0.4s ease-out ${idx * 0.05}s both` }}
            >
              <div className={`h-1.5 bg-gradient-to-r ${ratingColor(player.rating)}`} />

              <div className="relative h-44 bg-slate-800 overflow-hidden">
                {player.image_url ? (
                  <img
                    src={player.image_url}
                    alt={player.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-24 h-24 rounded-full bg-slate-700/50 flex items-center justify-center">
                      <span className="text-4xl font-black text-slate-600">
                        {player.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />

                <div className="absolute top-3 right-3 flex flex-col items-center">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${ratingColor(player.rating)} flex items-center justify-center shadow-lg`}>
                    <span className="text-2xl font-black text-white">{player.rating}</span>
                  </div>
                  <span className="text-[10px] text-white/70 font-bold mt-0.5">OVR</span>
                </div>

                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-900/80 backdrop-blur-sm border border-white/20 text-xs font-semibold text-white">
                  {player.position}
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-white font-bold text-lg leading-tight">{player.name}</h3>
                </div>

                {/* Edit/Delete buttons */}
                <div className="absolute top-3 right-20 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => editPlayer(player)}
                    className="w-8 h-8 rounded-lg bg-slate-900/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:text-emerald-400 transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => deletePlayer(player.id)}
                    className="w-8 h-8 rounded-lg bg-slate-900/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="p-4 space-y-2.5">
                {([
                  { label: 'Tezlik', value: player.tezlik, icon: Footprints },
                  { label: 'Zarba', value: player.zarba, icon: Crosshair },
                  { label: 'Pas', value: player.pas, icon: Zap },
                  { label: 'Himoya', value: player.himoya, icon: Shield },
                  { label: 'Dribling', value: player.dribling, icon: Circle },
                ] as const).map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-3">
                    <Icon className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                    <span className="text-slate-400 text-xs w-14 shrink-0">{label}</span>
                    <div className="flex-1 h-1.5 bg-slate-700/50 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${statBar(value)} rounded-full transition-all duration-500`}
                        style={{ width: `${value}%` }}
                      />
                    </div>
                    <span className={`text-xs font-bold w-6 text-right ${statColor(value)}`}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-xl">{editingId ? 'O\'yinchini tahrirlash' : 'Yangi o\'yinchi'}</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Image upload */}
              <div>
                <label className="text-slate-400 text-sm mb-1 block">O'yinchi rasmi</label>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])}
                  className="hidden"
                />
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-slate-800 border border-dashed border-white/20 text-slate-400 hover:border-emerald-400/50 hover:text-emerald-300 transition-all"
                >
                  {uploading ? (
                    <span>Yuklanmoqda...</span>
                  ) : form.image_url ? (
                    <img src={form.image_url} alt="preview" className="w-12 h-12 rounded-full object-cover" />
                  ) : (
                    <>
                      <Upload className="w-5 h-5" />
                      Rasm tanlash
                    </>
                  )}
                </button>
              </div>

              <div>
                <label className="text-slate-400 text-sm mb-1 block">Ism</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-white/10 text-white focus:border-emerald-400/50 outline-none"
                  placeholder="O'yinchi ismi"
                />
              </div>

              <div>
                <label className="text-slate-400 text-sm mb-1 block">Pozitsiya</label>
                <select
                  value={form.position}
                  onChange={(e) => setForm({ ...form, position: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-white/10 text-white focus:border-emerald-400/50 outline-none"
                >
                  {positions.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>

              {/* Stats sliders */}
              {([
                { key: 'rating', label: 'Reyting' },
                { key: 'tezlik', label: 'Tezlik' },
                { key: 'zarba', label: 'Zarba' },
                { key: 'pas', label: 'Pas' },
                { key: 'himoya', label: 'Himoya' },
                { key: 'dribling', label: 'Dribling' },
              ] as const).map(({ key, label }) => (
                <div key={key}>
                  <label className="text-slate-400 text-sm mb-1 flex justify-between">
                    <span>{label}</span>
                    <span className="text-emerald-400 font-bold">{form[key]}</span>
                  </label>
                  <input
                    type="range"
                    min={40}
                    max={99}
                    value={form[key]}
                    onChange={(e) => setForm({ ...form, [key]: Number(e.target.value) })}
                    className="w-full accent-emerald-500"
                  />
                </div>
              ))}

              <div className="flex gap-3 pt-2">
                <button
                  onClick={savePlayer}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
                >
                  {editingId ? 'Saqlash' : 'Qo\'shish'}
                </button>
                <button
                  onClick={() => setShowModal(false)}
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
