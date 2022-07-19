import numpy as np
import cv2
#https://docs.opencv.org/4.x/d7/d7b/classcv_1_1BackgroundSubtractorMOG2.html
#https://www.apriorit.com/dev-blog/445-computer-vision-with-opencv
capture = cv2.VideoCapture(0)

fgbg = cv2.createBackgroundSubtractorMOG2()

while(1):
    ret, frame = capture.read()
    cv2.imshow('original', frame)
    fgmask = fgbg.apply(frame)
    cv2.imshow('frame',fgmask)
    k = cv2.waitKey(30) & 0xff
    if k == 27:
        break

capture.release()
cv2.destroyAllWindows()