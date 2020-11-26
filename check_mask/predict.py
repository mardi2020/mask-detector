import cv2
import os
import numpy as np
from PIL import Image
from keras.preprocessing import image
from keras.applications.mobilenet import preprocess_input
from keras.models import load_model
from tensorflow.lite.python.interpreter import Interpreter
import time

x=300
y=250
w=200
h=200
log_dir = ''
model_dir='tflite_model.tflite'
# classes=['with_mask','without_mask']
classes=[True,False]
# path='face_0.jpg'

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
  cap = cv2.VideoCapture(0)
  while(True):
    ret, frame = cap.read()

    cv2.rectangle(frame,(x,y), (x+w,y+h), (0, 255, 0), 2)
    face = frame[y-2:y+h-2, x-2:x+w-2]
    
    # face=cv2.imread(path)
    pred_img = prepare_image(face.copy())
    predict_image(pred_img)
    result = interpreter.get_tensor(output_details[0]['index'])[0]
    idx = int(result[1])
    print(classes[idx])
    cv2.imshow('test', frame)
    ch=cv2.waitKey(1)
    if ch==27:
        break
    if ch==32:
        cv2.waitKey(0)
        cnt=cnt+1
  cap.release()
  cv2.destroyAllWindows()

if __name__ == '__main__':
	main()

