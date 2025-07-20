import numpy as np
import tensorflow as tf
from tensorflow.keras.datasets import mnist
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense, Flatten
from tensorflow.keras.optimizers import Adam
from tensorflow.keras.utils import to_categorical

# 1. Load MNIST
(x_train, y_train), (x_test, y_test) = mnist.load_data()

# 2. Use only 10,000 samples
x_train = x_train[:10000]
y_train = y_train[:10000]

# 3. Normalize and one-hot encode
x_train = x_train.astype("float32") / 255.0
x_test = x_test.astype("float32") / 255.0

y_train = to_categorical(y_train, 10)
y_test = to_categorical(y_test, 10)

# 4. Build model
model = Sequential([
    Flatten(input_shape=(28, 28)),
    Dense(400, activation='relu'),
    Dense(10, activation='relu'),
    Dense(10, activation='softmax'),
])

# 5. Compile
model.compile(
    optimizer=Adam(learning_rate=0.01),
    loss='categorical_crossentropy',
    metrics=['accuracy']
)

# 6. Train
model.fit(x_train, y_train, epochs=20, batch_size=32, validation_data=(x_test, y_test))

# 7. Save as .keras
model.save("best_model_98acc.keras")
print("✅ Model trained on 10,000 samples and saved as mnist_model.keras")
