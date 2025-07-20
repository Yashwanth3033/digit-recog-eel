import eel
from tensorflow.keras.models import load_model
import numpy as np

model = load_model("./training/models/best_model_98acc.keras")
cnn_model = load_model("./training/models/cnn_model_2.keras")

eel.init('web')

@eel.expose
def predict_digit(img_data):
    img_data_arr = np.array(img_data, dtype=np.float32)

    # Normalize to [0, 1] and reshape to (1, 28, 28)
    arr = img_data_arr / 255.0
    arr = arr.reshape(1, 28, 28)

    predictions = model.predict(arr)[0]
    prediction_dict = {str(i): round(float(score) * 100, 2) for i, score in enumerate(predictions)}

    print("✅ Prediction:", prediction_dict)
    return prediction_dict

@eel.expose
def predict_digit_cnn(img_data):
    img_data_arr = np.array(img_data, dtype=np.float32)

    # For CNN
    arr = np.array(img_data_arr, dtype=np.float32).reshape(1, 28, 28, 1) / 255.0
    predictions = cnn_model.predict(arr)[0]

    prediction_dict = {str(i): round(float(score) * 100, 2) for i, score in enumerate(predictions)}

    print("✅ Prediction:", prediction_dict)
    return prediction_dict

eel.start('index.html', size=(1200, 800), mode="edge")
# eel.start('index.html', size=(800, 600), mode='firefox')

