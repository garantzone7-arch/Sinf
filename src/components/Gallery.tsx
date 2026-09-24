import { useState, useEffect, useRef } from 'react';
import { Plus, X, Upload, ImageOff, Trash2, Images } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { GalleryItem } from '@/lib/supabase';

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadedUrl, setUploadedUrl] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const [lightbox, setLightbox] = useState<string | null>(null);

  useEffect(() => {
    loadGallery();
  }, []);

  async function loadGallery() {
    setLoading(true);
    const { data } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });
    setItems(data || []);
    setLoading(false);
  }

  async function uploadImage(file: File) {
    setUploading(true);
    const ext = file.name.split('.').pop();
    const fileName = `gallery-${Date.now()}.${ext}`;
    const { error } = await supabase.storage.from('class-assets').upload(fileName, file);
    if (!error) {
      const { data: urlData } = supabase.storage.from('class-assets').getPublicUrl(fileName);
      setUploadedUrl(urlData.publicUrl);
    }
    setUploading(false);
  }

  async function addGalleryItem() {
    if (!uploadedUrl) return;
    await supabase.from('gallery').insert([{ image_url: uploadedUrl, caption: caption || null }]);
    setCaption('');
    setUploadedUrl('');
    setShowModal(false);
    loadGallery();
  }

  async function deleteItem(id: string) {
    await supabase.from('gallery').delete().eq('id', id);
    loadGallery();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pt-24 pb-16">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/20 text-cyan-300 text-sm font-medium mb-4">
          <Images className="w-4 h-4" />
          Xotiralar
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
          Sinf galereyasi
        </h1>
        <p className="text-slate-400">Birga o'tgan eng zo'r daqiqalar</p>
      </div>

      <div className="flex justify-center mb-8">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold shadow-lg shadow-emerald-500/25 hover:scale-105 transition-all"
        >
          <Plus className="w-5 h-5" />
          Rasm qo'shish
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-slate-500">Yuklanmoqda...</div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 text-slate-500">
          <ImageOff className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-lg">Galereya hozircha bo'sh.</p>
          <p className="text-sm mt-1">Birinchi rasmni qo'shing — sinf xotiralari shu yerda to'planadi!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-2xl bg-slate-800/50 border border-white/10 hover:border-cyan-400/30 transition-all duration-300"
            >
              <img
                src={item.image_url}
                alt={item.caption || 'Galereya rasmi'}
                loading="lazy"
                onClick={() => setLightbox(item.image_url)}
                className="w-full h-48 object-cover cursor-pointer group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {item.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-white text-sm font-medium">{item.caption}</p>
                </div>
              )}
              <button
                onClick={() => deleteItem(item.id)}
                className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-slate-900/80 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Add modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setShowModal(false)}>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-bold text-xl">Yangi rasm qo'shish</h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-slate-400 text-sm mb-1 block">Rasm</label>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => e.target.files?.[0] && uploadImage(e.target.files[0])}
                  className="hidden"
                />
                <button
                  onClick={() => fileRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 px-4 py-6 rounded-lg bg-slate-800 border border-dashed border-white/20 text-slate-400 hover:border-emerald-400/50 hover:text-emerald-300 transition-all"
                >
                  {uploading ? (
                    <span>Yuklanmoqda...</span>
                  ) : uploadedUrl ? (
                    <img src={uploadedUrl} alt="preview" className="max-h-32 rounded-lg" />
                  ) : (
                    <>
                      <Upload className="w-6 h-6" />
                      Rasm tanlash
                    </>
                  )}
                </button>
              </div>

              <div>
                <label className="text-slate-400 text-sm mb-1 block">Izoh (ixtiyoriy)</label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-slate-800 border border-white/10 text-white focus:border-emerald-400/50 outline-none"
                  placeholder="Masalan: Sinfdoshlar maktab hovlisida"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={addGalleryItem}
                  disabled={!uploadedUrl}
                  className="flex-1 px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-500 to-cyan-500 text-white font-semibold hover:shadow-lg hover:shadow-emerald-500/25 transition-all disabled:opacity-50"
                >
                  Qo'shish
                </button>
                <button
                  onClick={() => { setShowModal(false); setUploadedUrl(''); setCaption(''); }}
                  className="px-4 py-2.5 rounded-lg bg-slate-800 border border-white/10 text-slate-300 font-medium hover:bg-slate-700 transition-all"
                >
                  Bekor
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
        >
          <img src={lightbox} alt="Katta rasm" className="max-w-full max-h-full rounded-xl" />
          <button className="absolute top-4 right-4 text-white p-2 rounded-lg bg-white/10 hover:bg-white/20">
            <X className="w-6 h-6" />
          </button>
        </div>
      )}
    </div>
  );
}
