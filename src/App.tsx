import { useState } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import FootballRating from './components/FootballRating';
import Gallery from './components/Gallery';
import Chat from './components/Chat';
import type { Page } from './components/Navbar';

function App() {
  const [page, setPage] = useState<Page>('bosh');

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar page={page} setPage={setPage} />
      <main>
        {page === 'bosh' && <Home setPage={setPage} />}
        {page === 'reyting' && <FootballRating />}
        {page === 'galereya' && <Gallery />}
        {page === 'chat' && <Chat />}
      </main>

      <footer className="border-t border-white/10 py-8 px-4 text-center">
        <p className="text-slate-500 text-sm">
          9-"D" sinf rasmiy sayti · 2025-2026 o'quv yili
        </p>
      </footer>
    </div>
  );
}

export default App;
