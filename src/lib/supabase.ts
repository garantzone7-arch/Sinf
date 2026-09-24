import { createClient } from '@supabase/supabase-js';

const env = import.meta.env as Record<string, string | undefined>;
const supabaseUrl = env.VITE_SUPABASE_URL ?? env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = env.VITE_SUPABASE_ANON_KEY ?? env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// The public client is safe to use in the browser, but both values must be
// present before constructing it. Vite maps the connected NEXT_PUBLIC_* vars.
export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key',
);

export interface Player {
  id: string;
  name: string;
  position: string;
  rating: number;
  tezlik: number;
  zarba: number;
  pas: number;
  himoya: number;
  dribling: number;
  image_url: string | null;
  created_at: string;
}

export interface GalleryItem {
  id: string;
  image_url: string;
  caption: string | null;
  created_at: string;
}

export interface Moment {
  id: string;
  title: string;
  description: string;
  emoji: string;
  created_at: string;
}
