import array
import numpy as np
import cv2 as cv

img = cv.imread('ex1.png')

cv.imshow('imagem',img)

kernel = np.ones((5,5),np.uint8)

kernel2 = np.array(
[
    [0,0,1,0,0],
    [0,1,1,1,0],
    [1,1,1,1,1],
    [0,1,1,1,0],
    [0,0,1,0,0],
], np.uint8
)

erosion = cv.erode(img,kernel,iterations = 1)
cv.imshow('erosão',erosion)

dilat = cv.dilate(img,kernel,iterations = 10)
cv.imshow('dilatacao',dilat)

dilat2 = cv.dilate(img,kernel2,iterations = 10)
cv.imshow('dilatacao2',dilat2)

cv.waitKey(0)