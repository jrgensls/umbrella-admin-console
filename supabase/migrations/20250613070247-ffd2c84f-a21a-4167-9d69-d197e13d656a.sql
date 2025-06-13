
-- Create the workspaces table
CREATE TABLE public.workspaces (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  start_date DATE NOT NULL,
  contact_email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Insert mock data for workspaces
INSERT INTO public.workspaces (name, address, start_date, contact_email) VALUES
('Copenhagen Hub', 'Vesterbrogade 123, 1620 Copenhagen', '2023-01-15', 'copenhagen@coworkspace.com'),
('Aarhus Center', 'Mindegade 6, 8000 Aarhus', '2023-03-20', 'aarhus@coworkspace.com'),
('Odense Office', 'Thomas B. Thriges Gade 2, 5000 Odense', '2023-05-10', 'odense@coworkspace.com'),
('Aalborg Space', 'Boulevarden 9, 9000 Aalborg', '2023-07-01', 'aalborg@coworkspace.com'),
('Esbjerg Point', 'Torvet 19, 6700 Esbjerg', '2023-09-15', 'esbjerg@coworkspace.com');

-- Enable Row Level Security (RLS)
ALTER TABLE public.workspaces ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access to workspaces
CREATE POLICY "Allow public read access to workspaces" 
  ON public.workspaces 
  FOR SELECT 
  TO public
  USING (true);
