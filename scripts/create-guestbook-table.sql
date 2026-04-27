-- Create guestbook table
CREATE TABLE IF NOT EXISTS public.guestbook (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  is_approved BOOLEAN DEFAULT FALSE
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_guestbook_approved ON public.guestbook(is_approved);
CREATE INDEX IF NOT EXISTS idx_guestbook_created_at ON public.guestbook(created_at DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE public.guestbook ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert messages
CREATE POLICY "Anyone can insert guestbook messages" ON public.guestbook
FOR INSERT WITH CHECK (true);

-- Allow anyone to view only approved messages
CREATE POLICY "Anyone can view approved messages" ON public.guestbook
FOR SELECT USING (is_approved = true);

-- Grant permissions
GRANT SELECT, INSERT ON public.guestbook TO anon, authenticated;

