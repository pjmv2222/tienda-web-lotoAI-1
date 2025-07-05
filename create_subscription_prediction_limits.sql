-- Crear tabla para trackear límites de predicciones por suscripción
-- Esta tabla mantiene un registro de cuántas predicciones se han generado por plan de suscripción
-- y NO se elimina cuando el usuario limpia sus predicciones visibles

CREATE TABLE IF NOT EXISTS subscription_prediction_limits (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    game_type VARCHAR(50) NOT NULL,
    subscription_id INTEGER NOT NULL DEFAULT 0, -- 0 para plan básico sin suscripción
    predictions_generated INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices únicos para optimizar consultas
CREATE UNIQUE INDEX IF NOT EXISTS idx_subscription_limits_user_game_subscription 
ON subscription_prediction_limits (user_id, game_type, subscription_id);

-- Índices adicionales para consultas rápidas
CREATE INDEX IF NOT EXISTS idx_subscription_limits_user_id 
ON subscription_prediction_limits (user_id);

CREATE INDEX IF NOT EXISTS idx_subscription_limits_subscription_id 
ON subscription_prediction_limits (subscription_id);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_subscription_limits_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
DROP TRIGGER IF EXISTS update_subscription_limits_updated_at ON subscription_prediction_limits;
CREATE TRIGGER update_subscription_limits_updated_at
    BEFORE UPDATE ON subscription_prediction_limits
    FOR EACH ROW
    EXECUTE FUNCTION update_subscription_limits_updated_at();

-- Comentarios para documentar la tabla
COMMENT ON TABLE subscription_prediction_limits IS 'Tabla para trackear límites de predicciones generadas por suscripción';
COMMENT ON COLUMN subscription_prediction_limits.user_id IS 'ID del usuario que generó las predicciones';
COMMENT ON COLUMN subscription_prediction_limits.game_type IS 'Tipo de juego (euromillon, bonoloto, etc.)';
COMMENT ON COLUMN subscription_prediction_limits.subscription_id IS 'ID de la suscripción (0 para plan básico sin suscripción)';
COMMENT ON COLUMN subscription_prediction_limits.predictions_generated IS 'Número de predicciones generadas para este plan/juego'; 