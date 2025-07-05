-- Crear tabla para trackear límites diarios de predicciones
-- Esta tabla mantiene un registro de cuántas predicciones se han generado por día
-- y NO se elimina cuando el usuario limpia sus predicciones visibles

CREATE TABLE IF NOT EXISTS daily_prediction_limits (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    game_type VARCHAR(50) NOT NULL,
    prediction_date DATE NOT NULL,
    predictions_generated INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices únicos para optimizar consultas
CREATE UNIQUE INDEX IF NOT EXISTS idx_daily_limits_user_game_date 
ON daily_prediction_limits (user_id, game_type, prediction_date);

-- Índices adicionales para consultas rápidas
CREATE INDEX IF NOT EXISTS idx_daily_limits_user_id 
ON daily_prediction_limits (user_id);

CREATE INDEX IF NOT EXISTS idx_daily_limits_date 
ON daily_prediction_limits (prediction_date);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_daily_limits_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger para actualizar updated_at
DROP TRIGGER IF EXISTS update_daily_limits_updated_at ON daily_prediction_limits;
CREATE TRIGGER update_daily_limits_updated_at
    BEFORE UPDATE ON daily_prediction_limits
    FOR EACH ROW
    EXECUTE FUNCTION update_daily_limits_updated_at();

-- Comentarios para documentar la tabla
COMMENT ON TABLE daily_prediction_limits IS 'Tabla para trackear límites diarios de predicciones generadas por usuario';
COMMENT ON COLUMN daily_prediction_limits.user_id IS 'ID del usuario que generó las predicciones';
COMMENT ON COLUMN daily_prediction_limits.game_type IS 'Tipo de juego (euromillon, bonoloto, etc.)';
COMMENT ON COLUMN daily_prediction_limits.prediction_date IS 'Fecha del día para el cual se generaron las predicciones';
COMMENT ON COLUMN daily_prediction_limits.predictions_generated IS 'Número de predicciones generadas en este día para este juego'; 