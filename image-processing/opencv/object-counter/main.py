import cv2
import imutils
import numpy

image = cv2.imread("images/coins3.jpg")
cv2.imshow("1 original", image)

image_gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
cv2.imshow("2 gray", image_gray)

image_blur = cv2.medianBlur(image_gray, 5)
cv2.imshow("3 mediana", image_blur)

image_res ,image_thresh = cv2.threshold(image_blur,230,255,cv2.THRESH_BINARY_INV + 
                                            cv2.THRESH_OTSU)
print("Limiar: ", image_res)
cv2.imshow("4 limiar", image_thresh)

kernel = numpy.ones((5,5),numpy.uint8)
morpho = cv2.morphologyEx(image_thresh,cv2.MORPH_DILATE ,kernel)
cv2.imshow("5 morfologia: ", morpho)

kernel2 = numpy.ones((5,5),numpy.uint8)
morpho = cv2.morphologyEx(morpho,cv2.MORPH_DILATE ,kernel2)
cv2.imshow("6 morfologia: ", morpho)

cnts = cv2.findContours(morpho.copy(), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

cnts = imutils.grab_contours(cnts)
objects = str(len(cnts))

text = "Objetos encontrados:"+str(objects)
cv2.putText(image, text, (10, 25),  cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 1)

print(objects)
cv2.imshow("7 contagem", image)

cv2.waitKey(0)