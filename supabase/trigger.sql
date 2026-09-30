-- Auto-creates a users row in public schema when a new auth.users entry is made
-- and syncs the role into app_metadata so JWT-based is_admin() works immediately.
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.users (id, email, role, is_premium)
  VALUES (NEW.id, NEW.email, 'user', false)
  ON CONFLICT (id) DO NOTHING;

  -- Sync default role into auth JWT claims (app_metadata)
  UPDATE auth.users
  SET raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role": "user"}'::jsonb
  WHERE id = NEW.id;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
