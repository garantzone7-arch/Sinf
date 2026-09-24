/*
# Create tables for class website (single-tenant, no auth)

1. New Tables
- `players` — football players with FIFA-style stats (name, position, rating, speed, shot, pass, defense, dribbling, image_url)
- `gallery` — photo gallery entries (image_url, caption)
- `moments` — funny/memorable moments (title, description, emoji)
2. Security
- Enable RLS on all tables.
- Allow anon + authenticated full CRUD because the data is intentionally shared/public (no sign-in).
*/

CREATE TABLE IF NOT EXISTS players (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  position text NOT NULL,
  rating int NOT NULL DEFAULT 70,
  tezlik int NOT NULL DEFAULT 70,
  zarba int NOT NULL DEFAULT 70,
  pas int NOT NULL DEFAULT 70,
  himoya int NOT NULL DEFAULT 70,
  dribling int NOT NULL DEFAULT 70,
  image_url text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE players ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_players" ON players;
CREATE POLICY "anon_select_players" ON players FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_players" ON players;
CREATE POLICY "anon_insert_players" ON players FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_players" ON players;
CREATE POLICY "anon_update_players" ON players FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_players" ON players;
CREATE POLICY "anon_delete_players" ON players FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS gallery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url text NOT NULL,
  caption text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_gallery" ON gallery;
CREATE POLICY "anon_select_gallery" ON gallery FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_gallery" ON gallery;
CREATE POLICY "anon_insert_gallery" ON gallery FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_gallery" ON gallery;
CREATE POLICY "anon_update_gallery" ON gallery FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_gallery" ON gallery;
CREATE POLICY "anon_delete_gallery" ON gallery FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS moments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  emoji text NOT NULL DEFAULT '😂',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE moments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_moments" ON moments;
CREATE POLICY "anon_select_moments" ON moments FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_moments" ON moments;
CREATE POLICY "anon_insert_moments" ON moments FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_moments" ON moments;
CREATE POLICY "anon_update_moments" ON moments FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_moments" ON moments;
CREATE POLICY "anon_delete_moments" ON moments FOR DELETE
  TO anon, authenticated USING (true);
