import cv2
import os
import numpy as np
from PIL import Image
from keras.preprocessing import image
from keras.applications.mobilenet import preprocess_input
from keras.models import load_model
from tensorflow.lite.python.interpreter import Interpreter
import time


log_dir = ''
model_dir='tflite_model.tflite'
classes=['with_mask','without_mask']

interpreter = Interpreter(model_dir)
interpreter.allocate_tensors()
input_details = interpreter.get_input_details()
output_details = interpreter.get_output_details()

height = input_details[0]['shape'][1]
width = input_details[0]['shape'][2]

floating_model = (input_details[0]['dtype'] == np.float32)
input_mean = 127.5
input_std = 127.5

#얼굴 검출 코드
def get_face(frame):
  gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
  xml = 'haarcascade_frontalface_default.xml'
  face_cascade = cv2.CascadeClassifier(xml)
  faces = face_cascade.detectMultiScale(gray, 1.03, 5)
  # 얼굴 하나만 검출
  if len(faces):  
    return faces[0]
  else:
      return 'no'

def prepare_image(img):
    cvt_image = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    image_resized = cv2.resize(cvt_image, (width, height))
    input_data = np.expand_dims(image_resized, axis=0)
    if floating_model:
        input_data = (np.float32(input_data) - input_mean) / input_std
    return input_data

def predict_image(input_data):
	interpreter.set_tensor(input_details[0]['index'],input_data)
	interpreter.invoke()

def main():
        pred_img = prepare_image(face.copy())
        predict_image(pred_img)
        result = interpreter.get_tensor(output_details[0]['index'])[0]
        idx = int(result[1])
        print(classes[idx])

if __name__ == '__main__':
	main()

