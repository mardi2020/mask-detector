import RPi.GPIO as GPIO
import datetime as dt      
import time
import os

#camera = picamera.PiCamera()
GPIO.setmode(GPIO.BCM)

buzz = 23

usleep = lambda x:time.sleep(x/1000000.0)

TP, EP = 4, 17

def getDistance():
    fDistance = 0.0
    nStartTime, nEndTime = 0, 0
    
    GPIO.output(TP, GPIO.LOW)
    usleep(2)
    GPIO.output(TP, GPIO.HIGH)
    usleep(10)
    
    GPIO.output(TP, GPIO.LOW)
    
    while GPIO.input(EP) == GPIO.LOW :
        pass
    
    nStartTime = dt.datetime.now()
    
    while GPIO.input(EP) == GPIO.HIGH :
        pass
    
    nEndTime = dt.datetime.now()
    
    fDistance = (nEndTime - nStartTime).microseconds/29./2.
    return fDistance

def makeTone(freq):
    scale = GPIO.PWM(buzz, freq)
    scale.start(10)
    time.sleep(0.5)
    scale.stop()
    
def CapturePhoto(i):
    os.system('sudo raspistill -o test'+str(i)+'.jpg')

# main 
GPIO.setmode(GPIO.BCM)

GPIO.setup(buzz, GPIO.OUT)
GPIO.setup(TP, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(EP, GPIO.IN)
time.sleep(0.5)
i = 1
while 1 :
    fDistance = getDistance()
    print("Distance : %.4f"%(fDistance))
    
    if fDistance < 100.0 :
        makeTone(523)
        CapturePhoto(i)
        i += 1
    time.sleep(1)