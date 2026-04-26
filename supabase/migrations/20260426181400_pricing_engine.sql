-- Migration: Pricing Engine and 3-layer pricing logic
-- Date: 2026-04-26

-- Tabla de materiales/partidas (Price Master)
CREATE TABLE IF NOT EXISTS public.price_master (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE, -- Código BCCM si aplica
    name TEXT NOT NULL,
    unit TEXT NOT NULL,
    
    -- Lógica de Precios en Capas
    price_official_bccm NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    price_manual_wilson NUMERIC(10, 2), -- Nullable, prioridad máxima
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Tabla de Presupuestos (Cabecera)
CREATE TABLE IF NOT EXISTS public.budgets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_name TEXT NOT NULL,
    address TEXT NOT NULL,
    
    -- Coeficiente Global (Multiplicador)
    current_multiplier NUMERIC(5, 2) NOT NULL DEFAULT 1.00, -- ej. 1.10 para un +10%
    
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    status TEXT DEFAULT 'draft'
);

-- Vista calculada (Opcional, para facilitar lectura desde frontend)
-- Calcula el precio final dinámicamente:
-- COALESCE(price_manual_wilson, price_official_bccm) * <multiplier>
