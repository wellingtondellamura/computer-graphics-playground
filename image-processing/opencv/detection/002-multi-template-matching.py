from imutils.object_detection import non_max_suppression
import numpy as np
import argparse
import cv2

image = "images/card.png"
template = "images/diamond.png"
threshold = 1

image = cv2.imread(image)
template = cv2.imread(template)
(tH, tW) = template.shape[:2]

cv2.imshow("Image", image)
cv2.imshow("Template", template)

imageGray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
templateGray = cv2.cvtColor(template, cv2.COLOR_BGR2GRAY)
# perform template matching
result = cv2.matchTemplate(imageGray, templateGray,	cv2.TM_CCOEFF_NORMED)
(yCoords, xCoords) = np.where(result >= threshold)
clone = image.copy()
print("[INFO] {} matched locations *before* NMS".format(len(yCoords)))
for (x, y) in zip(xCoords, yCoords):
	# draw the bounding box on the image
	cv2.rectangle(clone, (x, y), (x + tW, y + tH),
		(255, 0, 0), 3)
# show our output image *before* applying non-maxima suppression
cv2.imshow("Before NMS", clone)
cv2.waitKey(0)

# initialize our list of rectangles
rects = []
# loop over the starting (x, y)-coordinates again
for (x, y) in zip(xCoords, yCoords):
	# update our list of rectangles
	rects.append((x, y, x + tW, y + tH))
# apply non-maxima suppression to the rectangles
pick = non_max_suppression(np.array(rects))
# loop over the final bounding boxes
for (startX, startY, endX, endY) in pick:
	# draw the bounding box on the image
	cv2.rectangle(image, (startX, startY), (endX, endY), (255, 0, 0), 3)
# show the output image
cv2.imshow("After NMS", image)
cv2.waitKey(0)