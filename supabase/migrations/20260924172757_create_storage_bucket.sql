/*
# Create storage bucket for class images

1. Storage
- Create 'class-assets' bucket (public) for player and gallery images
- Allow public read access
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('class-assets', 'class-assets', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "anon_upload_class_assets" ON storage.objects;
CREATE POLICY "anon_upload_class_assets" ON storage.objects FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_read_class_assets" ON storage.objects;
CREATE POLICY "anon_read_class_assets" ON storage.objects FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_delete_class_assets" ON storage.objects;
CREATE POLICY "anon_delete_class_assets" ON storage.objects FOR DELETE
  TO anon, authenticated USING (true);
