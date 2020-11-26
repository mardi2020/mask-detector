#모델 평가
from keras.models import load_model
test_data_dir = './test_temp2'
log_dir = 'logs'
img_width, img_height = 256, 256

datagen = ImageDataGenerator(rescale=1. / 255)
test_generator = datagen.flow_from_directory(
    test_data_dir,
    target_size=(img_width, img_height),
    class_mode='categorical',
    shuffle=False)



model = load_model(os.path.join(log_dir, 'trained_final.h5'))
model.summary()
print("-- Evaluate --")
scores = model.evaluate(test_generator)
print("%s: %.2f%%" %(model.metrics_names[1], scores[1]*100))