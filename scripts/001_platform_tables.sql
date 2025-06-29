-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create users table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create user addresses table
CREATE TABLE IF NOT EXISTS public.user_addresses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  street TEXT NOT NULL,
  city TEXT NOT NULL,
  postal_code TEXT,
  country TEXT NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payment cards table
CREATE TABLE IF NOT EXISTS public.payment_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  last_four TEXT NOT NULL,
  brand TEXT NOT NULL,
  exp_month INTEGER NOT NULL,
  exp_year INTEGER NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tour categories table
CREATE TABLE IF NOT EXISTS public.tour_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create tours table
CREATE TABLE IF NOT EXISTS public.tours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  duration_days INTEGER,
  max_participants INTEGER,
  category_id UUID REFERENCES public.tour_categories(id),
  image_url TEXT,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tour_id UUID NOT NULL REFERENCES public.tours(id) ON DELETE CASCADE,
  booking_date TIMESTAMP WITH TIME ZONE NOT NULL,
  participants INTEGER NOT NULL DEFAULT 1,
  total_amount DECIMAL(10,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create payments table
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES public.bookings(id) ON DELETE SET NULL,
  card_id UUID REFERENCES public.payment_cards(id) ON DELETE SET NULL,
  amount DECIMAL(10,2) NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for users table
CREATE POLICY "Users can view own profile" ON public.users
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own profile" ON public.users
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for user_addresses table
CREATE POLICY "Users can view own addresses" ON public.user_addresses
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own addresses" ON public.user_addresses
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own addresses" ON public.user_addresses
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own addresses" ON public.user_addresses
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for payment_cards table
CREATE POLICY "Users can view own cards" ON public.payment_cards
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cards" ON public.payment_cards
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own cards" ON public.payment_cards
  FOR DELETE USING (auth.uid() = user_id);

-- Create RLS policies for bookings table
CREATE POLICY "Users can view own bookings" ON public.bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookings" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings" ON public.bookings
  FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for payments table
CREATE POLICY "Users can view own payments" ON public.payments
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own payments" ON public.payments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Tours and tour categories are public (readable by all authenticated users)
CREATE POLICY "Authenticated users can view tours" ON public.tours
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view tour categories" ON public.tour_categories
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_user_addresses_user_id ON public.user_addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_payment_cards_user_id ON public.payment_cards(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_user_id ON public.bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_user_id ON public.payments(user_id);
CREATE INDEX IF NOT EXISTS idx_tours_category_id ON public.tours(category_id);
