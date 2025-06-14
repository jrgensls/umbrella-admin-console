
-- Create order status enum
CREATE TYPE public.order_status_enum AS ENUM (
  'pending',
  'confirmed', 
  'invoiced',
  'cancelled',
  'refunded'
);

-- Create the orders table
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  date DATE NOT NULL,
  company_name TEXT NOT NULL,
  company_email TEXT NOT NULL,
  company_phone TEXT,
  company_vat_number TEXT,
  company_address TEXT,
  contact_person TEXT,
  contact_title TEXT,
  workspace_id UUID NOT NULL,
  workspace_name TEXT NOT NULL,
  reference TEXT,
  total_amount DECIMAL(12,2) NOT NULL,
  currency TEXT DEFAULT 'DKK',
  status order_status_enum NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_by_admin UUID,
  notes TEXT,
  purchase_order_number TEXT
);

-- Add constraints
ALTER TABLE public.orders ADD CONSTRAINT orders_workspace_id_fkey 
  FOREIGN KEY (workspace_id) REFERENCES public.workspaces(id) ON DELETE RESTRICT;

ALTER TABLE public.orders ADD CONSTRAINT orders_created_by_admin_fkey 
  FOREIGN KEY (created_by_admin) REFERENCES auth.users(id) ON DELETE SET NULL;

ALTER TABLE public.orders ADD CONSTRAINT orders_total_amount_check 
  CHECK (total_amount >= 0);

ALTER TABLE public.orders ADD CONSTRAINT orders_company_email_check 
  CHECK (company_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$');

ALTER TABLE public.orders ADD CONSTRAINT orders_company_vat_number_check 
  CHECK (company_vat_number IS NULL OR length(company_vat_number) >= 8);

-- Create indexes for performance
CREATE INDEX idx_orders_workspace_date ON public.orders(workspace_id, date);
CREATE UNIQUE INDEX idx_orders_order_number ON public.orders(order_number);
CREATE INDEX idx_orders_status_date ON public.orders(status, date);
CREATE INDEX idx_orders_company_email ON public.orders(company_email);
CREATE INDEX idx_orders_company_name ON public.orders(company_name);
CREATE INDEX idx_orders_company_vat_number ON public.orders(company_vat_number) WHERE company_vat_number IS NOT NULL;
CREATE INDEX idx_orders_workspace_status_date ON public.orders(workspace_id, status, date DESC);
CREATE INDEX idx_orders_company_phone ON public.orders(company_phone) WHERE company_phone IS NOT NULL;
CREATE INDEX idx_orders_contact_person ON public.orders(contact_person);
CREATE INDEX idx_orders_purchase_order_number ON public.orders(purchase_order_number);
CREATE INDEX idx_orders_reference_gin ON public.orders USING gin(to_tsvector('english', reference));
CREATE INDEX idx_orders_created_at ON public.orders(created_at DESC);

-- Function to generate order numbers
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TEXT AS $$
DECLARE
  year_part TEXT;
  sequence_num INTEGER;
  order_num TEXT;
BEGIN
  year_part := EXTRACT(YEAR FROM NOW())::TEXT;
  
  SELECT COALESCE(MAX(CAST(SUBSTRING(order_number FROM 7) AS INTEGER)), 0) + 1
  INTO sequence_num
  FROM public.orders
  WHERE order_number LIKE '#' || year_part || '-%';
  
  order_num := '#' || year_part || '-' || LPAD(sequence_num::TEXT, 6, '0');
  
  RETURN order_num;
END;
$$ LANGUAGE plpgsql;

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Function to validate workspace name matches workspace
CREATE OR REPLACE FUNCTION public.validate_workspace_name()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.workspace_name != (
    SELECT name FROM public.workspaces WHERE id = NEW.workspace_id
  ) THEN
    RAISE EXCEPTION 'workspace_name must match the referenced workspace name';
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-generate order number if not provided
CREATE OR REPLACE FUNCTION public.set_order_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.order_number IS NULL OR NEW.order_number = '' THEN
    NEW.order_number := public.generate_order_number();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create audit log table for order status changes
CREATE TABLE public.order_status_audit (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  old_status order_status_enum,
  new_status order_status_enum NOT NULL,
  changed_by UUID REFERENCES auth.users(id),
  changed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  notes TEXT
);

-- Function to log status changes
CREATE OR REPLACE FUNCTION public.log_order_status_change()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.status != NEW.status THEN
    INSERT INTO public.order_status_audit (order_id, old_status, new_status, changed_by, notes)
    VALUES (NEW.id, OLD.status, NEW.status, auth.uid(), 'Status changed via update');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers with correct syntax
CREATE TRIGGER set_order_number_trigger
  BEFORE INSERT ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.set_order_number();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER validate_workspace_name_trigger
  BEFORE INSERT OR UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_workspace_name();

CREATE TRIGGER log_order_status_change_trigger
  AFTER UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION public.log_order_status_change();

-- Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_status_audit ENABLE ROW LEVEL SECURITY;

-- RLS Policies for orders table
-- Service role has full access
CREATE POLICY "Service role has full access to orders"
  ON public.orders
  FOR ALL
  TO service_role
  USING (true);

-- Public read access for now (will be refined based on auth implementation)
CREATE POLICY "Public read access to orders"
  ON public.orders
  FOR SELECT
  TO public
  USING (true);

-- Public insert access for now (will be refined based on auth implementation)
CREATE POLICY "Public insert access to orders"
  ON public.orders
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Public update access for now (will be refined based on auth implementation)
CREATE POLICY "Public update access to orders"
  ON public.orders
  FOR UPDATE
  TO public
  USING (true);

-- RLS Policies for audit table
CREATE POLICY "Public read access to order status audit"
  ON public.order_status_audit
  FOR SELECT
  TO public
  USING (true);

-- Sample data
INSERT INTO public.orders (
  date, company_name, company_email, company_phone, company_vat_number,
  company_address, contact_person, contact_title, workspace_id, workspace_name,
  reference, total_amount, currency, status, notes
) VALUES 
-- Sample 1: Confirmed desk reservation for startup
(
  CURRENT_DATE,
  'TechStart ApS',
  'contact@techstart.dk',
  '+45 12 34 56 78',
  'DK12345678',
  'Startup Street 42, 2100 Copenhagen',
  'Maria Hansen',
  'Co-Founder',
  (SELECT id FROM public.workspaces LIMIT 1),
  (SELECT name FROM public.workspaces LIMIT 1),
  'Hot desk reservation for 2 people, 3 months',
  450000,
  'DKK',
  'confirmed',
  'Startup package with flexible terms'
),
-- Sample 2: Invoiced meeting room booking for enterprise
(
  CURRENT_DATE - INTERVAL '1 day',
  'Enterprise Solutions A/S',
  'procurement@enterprise.dk',
  '+45 87 65 43 21',
  'DK87654321',
  'Corporate Boulevard 123, 2300 Copenhagen S',
  'Lars Nielsen',
  'Facilities Manager',
  (SELECT id FROM public.workspaces LIMIT 1),
  (SELECT name FROM public.workspaces LIMIT 1),
  'Conference room A - Full day booking with AV equipment',
  125000,
  'DKK',
  'invoiced',
  'Annual corporate client - priority booking'
),
-- Sample 3: Confirmed catering order with PO number
(
  CURRENT_DATE - INTERVAL '2 days',
  'Global Consulting Group',
  'events@globalconsulting.com',
  '+45 55 44 33 22',
  'DK55443322',
  'Business Park 1, 2630 Taastrup',
  'Anne Petersen',
  'Event Coordinator',
  (SELECT id FROM public.workspaces LIMIT 1),
  (SELECT name FROM public.workspaces LIMIT 1),
  'Catering for 50 people - lunch meeting with dietary requirements',
  375000,
  'DKK',
  'confirmed',
  'Vegetarian and gluten-free options included'
);

-- Update the last sample with PO number
UPDATE public.orders 
SET purchase_order_number = 'PO-2024-GCG-0891'
WHERE company_name = 'Global Consulting Group';
