import numpy as np  #넘파이
from keras.preprocessing.image import ImageDataGenerator # 폴더에서  이미지 가져오기 5번쨰 단란 참고
from keras.models import Sequential, Model # 모델 레이어 구축에 필요함
from keras.layers import Dropout, Flatten, Dense, Conv2D, MaxPooling2D, GlobalAveragePooling2D # 각 레이어들 드롭아웃, 풀링 등등...
from keras import applications, Input, Sequential,regularizers # overfitting 방지 하기 위해 regularizers 이거 불러옴
from keras.losses import BinaryCrossentropy
from keras.optimizers import RMSprop, SGD, Adam # 여러 옵티마이저들
from keras.utils.data_utils import get_file
#from keras.regularizers.Regularizer import regularizers,kernel_regularizer,activity_regularizer
import tensorflow.keras.backend as K
import tensorflow as tf
from tensorflow.keras.callbacks import TensorBoard, ModelCheckpoint, ReduceLROnPlateau, LearningRateScheduler, EarlyStopping, TerminateOnNaN #콜백 함수들
import os
import cv2
from PIL import Image
from keras.preprocessing import image
from keras.applications.mobilenet import preprocess_input
import shutil

#이미지 규격 정하기 및 사전 준비
img_width, img_height = 256, 256
train_data_dir = './mask_data2/dataset' #데이터 경로
epochs = 200
batch_size = 4

#ImageDataGenerator를 사용해 폴더에서 데이터 불러오기
datagen = ImageDataGenerator(rescale=1. / 255, validation_split=0.3) #데이터셋을 train 7 validation 3으로 나눔

#train 데이터 만들기
train_generator = datagen.flow_from_directory( # datagen.flow_from_directory = 폴더 명으로 불러오는 함수 ex) with_mask 폴더에 있는 사진들은 with_mask라는 이름으로 분륜되고 without_mask 폴더에 있는 사진들은 without_mask_mask라는 이름으로 분륜됨  참고 https://keras.io/api/preprocessing/image/
      train_data_dir,
      target_size=(img_width, img_height),
      batch_size=batch_size,
      class_mode='categorical', # 이진분류 말고 카테 고리로 분류 이진 으로 해도 되지만 해본결과 카테고리로 해서 one-hot으로 가는것이 정확도가 높았음
      shuffle=True, #데이터를 무작위로 섞음
      subset='training')

val_generator = datagen.flow_from_directory(
      train_data_dir,
      target_size=(img_width, img_height),
      batch_size=batch_size,
      class_mode='categorical',
      shuffle=True,
      subset='validation')


#모델 구축하는 단락
base_model = applications.MobileNetV2(weights='imagenet', input_shape=(img_width, img_height, 3), include_top=False) # transfer learning: moblienet을 기본 네트워크로 구축해봄, weights는 imagenet에서 사용된 weights로 가져옴
base_model.trainable = False # trainable =False, include_top=False 부분은 transfer learing freeze 단계와 관련됨

x = base_model.output
x = GlobalAveragePooling2D()(x)
x = Flatten()(x)
x=Dense(1024,activation='relu')(x)
x=Dense(512,activation='relu')(x)
x = Dense(2, activation='softmax')(x)

custom_model = Model(inputs=base_model.input, outputs=x)
custom_model.summary()

#옵티마이저 설정
opt = Adam(learning_rate=0.001) #아담으로 설정. learning_rate=0.001

custom_model.compile(loss='categorical_crossentropy',
                      optimizer=opt,
                      metrics=['accuracy'])

#학습된 모델을 저장
log_dir='./logs'

#콜백 함수들 학습도중 학습이 잘안되고 있거나 진전이 없으면 정해진 epoch을 다 돌지 않고 조기 종료
checkpoint = ModelCheckpoint(os.path.join(log_dir, 'ep{epoch:03d}-loss{loss:.3f}-val_loss{val_loss:.3f}.h5'),  #모델 저장
      monitor='val_loss',
      verbose=1,
      save_weights_only=False,
      save_best_only=True,
      histogram_freq=1)
reduce_lr = ReduceLROnPlateau(monitor='val_loss', factor=0.5, patience=3, verbose=1, cooldown=0, min_lr=1e-10) #러닝레이트 감소 3 steps을 보고 val_loss가 안줄어 들었으면 러닝레이트를 반으로 줄임
early_stopping = EarlyStopping(monitor='val_loss', min_delta=0, patience=5, verbose=1) # 5 steps을 보고 val_loss가 안줄어 들었으면 학습 종료
terminate_on_nan = TerminateOnNaN() # 학습을 진행하다 weight 값이 별로면 nan 뜨면서 값이 터질 수 있는데 학습이 터지면 종료
callbacks = [ checkpoint, reduce_lr, early_stopping, terminate_on_nan]

custom_model.fit(train_generator, 
            epochs=epochs,
            steps_per_epoch=train_generator.samples//batch_size,
            validation_data=val_generator,
            validation_steps=val_generator.samples//batch_size,
            callbacks=callbacks,
            verbose=1)

#학습된 모델 저장
custom_model.save(os.path.join(log_dir, 'trained_final.h5'))