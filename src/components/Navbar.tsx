import { useState, useEffect } from 'react';
import { GraduationCap, Home, Trophy, Images, MessageCircle, Menu, X } from 'lucide-react';

export type Page = 'bosh' | 'reyting' | 'galereya' | 'chat';

interface NavbarProps {
  page: Page;
  setPage: (p: Page) => void;
}

export default function Navbar({ page, setPage }: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links: { key: Page; label: string; icon: typeof Home }[] = [
    { key: 'bosh', label: 'Bosh sahifa', icon: Home },
    { key: 'reyting', label: 'Futbol Reytingi', icon: Trophy },
    { key: 'galereya', label: 'Galereya', icon: Images },
    { key: 'chat', label: 'Muloqot', icon: MessageCircle },
  ];

  const go = (p: Page) => {
    setPage(p);
    setOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={() => go('bosh')}
            className="flex items-center gap-2 text-white font-bold text-lg group"
          >
            <span className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-emerald-500/30">
              <GraduationCap className="w-5 h-5 text-white" />
            </span>
            <span className="hidden sm:block bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              9-"D" sinf
            </span>
          </button>

          <div className="hidden md:flex items-center gap-1">
            {links.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => go(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  page === key
                    ? 'text-white bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 border border-emerald-400/30'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 space-y-1">
          {links.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => go(key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                page === key
                  ? 'text-white bg-emerald-500/20 border border-emerald-400/30'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
