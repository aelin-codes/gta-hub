-- Auto-creates a users row in public schema when a new auth.users entry is made
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER SECURITY DEFINER AS $$
BEGIN
  INSERT INTO public.users (id, email, role, is_premium)
  VALUES (NEW.id, NEW.email, 'user', false)
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
