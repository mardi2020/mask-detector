import RPi.GPIO as GPIO
import datetime as dt      
import time
import requests
import predict
import json

GPIO.setmode(GPIO.BCM)
buzz = 23
usleep = lambda x:time.sleep(x/1000000.0)
TP, EP = 4, 17

URL ='https://m6lhwe6p4g.execute-api.us-east-1.amazonaws.com/dev/mask-history'

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

# main 
GPIO.setmode(GPIO.BCM)

GPIO.setup(buzz, GPIO.OUT)
GPIO.setup(TP, GPIO.OUT, initial=GPIO.LOW)
GPIO.setup(EP, GPIO.IN)
time.sleep(0.5)

while 1 :
    fDistance = getDistance()
    #print("Distance : %.4f"%(fDistance))
    
    if fDistance < 100.0 :
        makeTone(523)
        prediction = predict.main()
        today = dt.datetime.today().strftime("%Y-%m-%d")
        senddict = {'date':today, 'withMask':prediction}
        #print(senddict)
        res = requests.put(URL, data=json.dumps(senddict))
        print("Predicted : ", prediction)
        print(res.text)
        
    time.sleep(1)
