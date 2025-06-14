from keras.models import Sequential
from keras.layers import LSTM, Dense, Input

def build_model(input_shape):
    model = Sequential()
    model.add(Input(shape=input_shape))
    model.add(LSTM(units=50, return_sequences=True))
    model.add(LSTM(units=50))
    model.add(Dense(units=1))  # Ajusta según tu salida
    return model