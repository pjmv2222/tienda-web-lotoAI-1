-- Crear tabla para estadísticas generales del sitio
CREATE TABLE IF NOT EXISTS site_stats (
    id SERIAL PRIMARY KEY,
    total_visitors INTEGER DEFAULT 0,
    total_users INTEGER DEFAULT 0,
    total_subscribers INTEGER DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    -- Constraint para que solo exista una fila
    CONSTRAINT single_row CHECK (id = 1)
);

-- Crear tabla para tracking de visitantes únicos
CREATE TABLE IF NOT EXISTS visitors (
    id SERIAL PRIMARY KEY,
    visitor_hash VARCHAR(64) UNIQUE NOT NULL,
    ip_address INET,
    user_agent TEXT,
    referer TEXT,
    first_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_visit TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    visit_count INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices para optimizar consultas
CREATE INDEX IF NOT EXISTS idx_visitors_hash ON visitors(visitor_hash);
CREATE INDEX IF NOT EXISTS idx_visitors_last_visit ON visitors(last_visit);
CREATE INDEX IF NOT EXISTS idx_site_stats_updated ON site_stats(updated_at);

-- Insertar registro inicial de estadísticas si no existe
INSERT INTO site_stats (id, total_visitors, total_users, total_subscribers, updated_at)
VALUES (1, 0, 0, 0, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;

-- Función para actualizar automáticamente el timestamp
CREATE OR REPLACE FUNCTION update_site_stats_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para actualizar timestamp automáticamente
DROP TRIGGER IF EXISTS trigger_update_site_stats_timestamp ON site_stats;
CREATE TRIGGER trigger_update_site_stats_timestamp
    BEFORE UPDATE ON site_stats
    FOR EACH ROW
    EXECUTE FUNCTION update_site_stats_timestamp();

-- Insertar algunos datos iniciales de ejemplo (opcional)
-- Puedes comentar esta sección si no quieres datos de ejemplo

-- Actualizar contadores iniciales basados en datos existentes
DO $$
DECLARE
    user_count INTEGER;
    subscriber_count INTEGER;
BEGIN
    -- Contar usuarios existentes
    SELECT COUNT(*) INTO user_count FROM users;
    
    -- Contar suscriptores activos existentes
    SELECT COUNT(DISTINCT user_id) INTO subscriber_count 
    FROM user_subscriptions 
    WHERE status = 'active' 
    AND (end_date IS NULL OR end_date > NOW());
    
    -- Actualizar estadísticas iniciales
    UPDATE site_stats 
    SET 
        total_users = user_count,
        total_subscribers = subscriber_count,
        updated_at = CURRENT_TIMESTAMP
    WHERE id = 1;
    
    RAISE NOTICE 'Estadísticas inicializadas: % usuarios, % suscriptores', user_count, subscriber_count;
END
$$;
