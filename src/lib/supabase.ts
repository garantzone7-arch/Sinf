import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
