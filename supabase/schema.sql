-- GTA 6 Hub Database Schema

-- Enable pgvector if it's available for semantic search embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- Videos table
CREATE TABLE IF NOT EXISTS videos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform TEXT NOT NULL CHECK (platform IN ('youtube', 'twitch')),
  external_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  channel_name TEXT NOT NULL,
  channel_url TEXT,
  thumbnail_url TEXT,
  published_at TIMESTAMPTZ,
  transcript TEXT,
  embedding VECTOR(1536), -- For Gemini/OpenAI embeddings (1536 dims)
  excluded BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Categories table (with self-referential parent_id for sub-categories)
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL
);

-- Video-Categories join table (many-to-many)
CREATE TABLE IF NOT EXISTS video_categories (
  video_id UUID REFERENCES videos(id) ON DELETE CASCADE,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  PRIMARY KEY (video_id, category_id)
);

-- Video timestamps table (deep linking)
CREATE TABLE IF NOT EXISTS video_timestamps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID REFERENCES videos(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  seconds INT NOT NULL CHECK (seconds >= 0)
);

-- Users table (mirrors and extends Supabase Auth users)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY, -- references auth.users(id)
  email TEXT UNIQUE NOT NULL,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'admin', 'superuser')),
  is_premium BOOLEAN DEFAULT false,
  razorpay_customer_id TEXT,
  stripe_customer_id TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Subscriptions table (tracks Stripe and Razorpay subscriptions)
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  razorpay_subscription_id TEXT UNIQUE,
  stripe_subscription_id TEXT UNIQUE,
  status TEXT CHECK (status IN ('active', 'cancelled', 'past_due', 'completed', 'unpaid')),
  auto_renew BOOLEAN DEFAULT true,
  current_period_end TIMESTAMPTZ,
  last_charged_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Favorites table (user-saved videos)
CREATE TABLE IF NOT EXISTS favorites (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  video_id UUID REFERENCES videos(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, video_id)
);

-- Follows table (creators or categories)
CREATE TABLE IF NOT EXISTS follows (
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  target_type TEXT NOT NULL CHECK (target_type IN ('creator', 'category')),
  target_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (user_id, target_type, target_id)
);

-- Takedown requests table
CREATE TABLE IF NOT EXISTS takedown_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  video_id UUID REFERENCES videos(id) ON DELETE SET NULL,
  requester_email TEXT NOT NULL,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Admin Audit Log Table
CREATE TABLE IF NOT EXISTS admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES users(id),
  action TEXT NOT NULL,
  details TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- ROW-LEVEL SECURITY CONFIGURATION --

-- Enable RLS on all tables
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE video_timestamps ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
ALTER TABLE takedown_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to check if current user is an admin or superuser
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN SECURITY DEFINER AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND (role = 'admin' OR role = 'superuser')
  );
END;
$$ LANGUAGE plpgsql;

-- Helper function to check if current user is a superuser
CREATE OR REPLACE FUNCTION is_superuser()
RETURNS BOOLEAN SECURITY DEFINER AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid() AND role = 'superuser'
  );
END;
$$ LANGUAGE plpgsql;

-- 1. Policies for `videos`
DROP POLICY IF EXISTS "Allow public read on non-excluded videos" ON videos;
CREATE POLICY "Allow public read on non-excluded videos" 
  ON videos FOR SELECT 
  USING (excluded = false OR is_admin());

DROP POLICY IF EXISTS "Allow admin write/delete on videos" ON videos;
CREATE POLICY "Allow admin write/delete on videos" 
  ON videos FOR ALL 
  USING (is_admin());

-- 2. Policies for `categories`
DROP POLICY IF EXISTS "Allow public read on categories" ON categories;
CREATE POLICY "Allow public read on categories" 
  ON categories FOR SELECT 
  TO public 
  USING (true);

DROP POLICY IF EXISTS "Allow admin write/delete on categories" ON categories;
CREATE POLICY "Allow admin write/delete on categories" 
  ON categories FOR ALL 
  USING (is_admin());

-- 3. Policies for `video_categories`
DROP POLICY IF EXISTS "Allow public read on video_categories" ON video_categories;
CREATE POLICY "Allow public read on video_categories" 
  ON video_categories FOR SELECT 
  TO public 
  USING (true);

DROP POLICY IF EXISTS "Allow admin write/delete on video_categories" ON video_categories;
CREATE POLICY "Allow admin write/delete on video_categories" 
  ON video_categories FOR ALL 
  USING (is_admin());

-- 4. Policies for `video_timestamps`
DROP POLICY IF EXISTS "Allow public read on video_timestamps" ON video_timestamps;
CREATE POLICY "Allow public read on video_timestamps" 
  ON video_timestamps FOR SELECT 
  TO public 
  USING (true);

DROP POLICY IF EXISTS "Allow admin write/delete on video_timestamps" ON video_timestamps;
CREATE POLICY "Allow admin write/delete on video_timestamps" 
  ON video_timestamps FOR ALL 
  USING (is_admin());

-- 5. Policies for `users`
DROP POLICY IF EXISTS "Allow users to read own data" ON users;
CREATE POLICY "Allow users to read own data" 
  ON users FOR SELECT 
  USING (auth.uid() = id OR is_admin());

DROP POLICY IF EXISTS "Allow admin update on users" ON users;
CREATE POLICY "Allow admin update on users"
  ON users FOR UPDATE
  USING (is_admin());

-- 6. Policies for `subscriptions`
DROP POLICY IF EXISTS "Allow users to read own subscriptions" ON subscriptions;
CREATE POLICY "Allow users to read own subscriptions" 
  ON subscriptions FOR SELECT 
  USING (auth.uid() = user_id OR is_admin());

-- 7. Policies for `favorites`
DROP POLICY IF EXISTS "Allow users to read own favorites" ON favorites;
CREATE POLICY "Allow users to read own favorites" 
  ON favorites FOR SELECT 
  USING (auth.uid() = user_id OR is_admin());

DROP POLICY IF EXISTS "Allow users to manage own favorites" ON favorites;
CREATE POLICY "Allow users to manage own favorites" 
  ON favorites FOR ALL 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 8. Policies for `follows`
DROP POLICY IF EXISTS "Allow users to read own follows" ON follows;
CREATE POLICY "Allow users to read own follows" 
  ON follows FOR SELECT 
  USING (auth.uid() = user_id OR is_admin());

DROP POLICY IF EXISTS "Allow users to manage own follows" ON follows;
CREATE POLICY "Allow users to manage own follows" 
  ON follows FOR ALL 
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- 9. Policies for `takedown_requests`
DROP POLICY IF EXISTS "Allow anyone to submit takedown request" ON takedown_requests;
CREATE POLICY "Allow anyone to submit takedown request" 
  ON takedown_requests FOR INSERT 
  WITH CHECK (true);

DROP POLICY IF EXISTS "Allow users to read own takedown requests" ON takedown_requests;
CREATE POLICY "Allow users to read own takedown requests" 
  ON takedown_requests FOR SELECT 
  USING (is_admin() OR requester_email = (SELECT email FROM users WHERE id = auth.uid()));

DROP POLICY IF EXISTS "Allow admin manage takedown requests" ON takedown_requests;
CREATE POLICY "Allow admin manage takedown requests" 
  ON takedown_requests FOR ALL 
  USING (is_admin());

-- 10. Policies for `admin_audit_logs`
DROP POLICY IF EXISTS "Allow admin select/insert audit logs" ON admin_audit_logs;
CREATE POLICY "Allow admin select/insert audit logs"
  ON admin_audit_logs FOR ALL
  USING (is_admin());


-- Database Alterations for Processor Geo-Routing
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS processor TEXT CHECK (processor IN ('stripe', 'razorpay'));
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS billing_country TEXT;
ALTER TABLE subscriptions ADD COLUMN IF NOT EXISTS billing_currency TEXT;

-- Database Performance Indexes
CREATE INDEX IF NOT EXISTS idx_videos_published_at ON videos(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_video_categories_ids ON video_categories(video_id, category_id);
CREATE INDEX IF NOT EXISTS idx_videos_fts ON videos USING GIN(to_tsvector('english', title || ' ' || COALESCE(description, '')));

