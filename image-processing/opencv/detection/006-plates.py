import cv2
import numpy as np



plateCascade = cv2.CascadeClassifier('haarcascades/haarcascade_russian_plate_number.xml')

img = cv2.imread('images/car2.png')
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

plates = plateCascade.detectMultiScale(gray)

print(plates)
i = 0
for (x,y,w,h) in plates:
    cv2.rectangle(gray,(x,y),(x+w,y+h),(255,0,0),2)
    plate = gray[y: y+h, x:x+w]
    i+=1
    cv2.imshow("plate"+ str(i), plate)

if cv2.waitKey(0) & 0xFF == ord('q'):
    cv2.destroyAllWindows()