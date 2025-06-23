-- Paso 1: Asegurarnos de que is_verified tenga los valores correctos
UPDATE users 
SET is_verified = COALESCE(verified, is_verified, false);

-- Paso 2: Crear un índice en is_verified para optimizar las consultas
CREATE INDEX IF NOT EXISTS idx_users_is_verified ON users(is_verified);

-- Paso 3: Eliminar el campo verified
ALTER TABLE users DROP COLUMN IF EXISTS verified;

-- Paso 4: Agregar un comentario a la tabla para documentación
COMMENT ON COLUMN users.is_verified IS 'Campo unificado que indica si el usuario ha verificado su email';
