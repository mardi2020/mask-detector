import tensorflow as tf

model_dir='./'
path='./tflite_model.tflite'
converter=tf.lite.TFLiteConverter.from_saved_model(model_dir)
converter.target_spec.supported_ops=[tf.lite.OpsSet.TFLITE_BUILTINS,tf.lite.OpsSet.SELECT_TF_OPS]
tflite_model=converter.convert()
open(path,'wb').write(tflite_model)