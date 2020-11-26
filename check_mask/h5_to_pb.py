from tensorflow import keras

model_dir=''
model=keras.models.load_model(model_dir,compile=False)
path='./'
model.save(path,save_format="tf")