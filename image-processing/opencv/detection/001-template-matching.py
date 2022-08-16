import cv2
#https://docs.opencv.org/4.x/d4/dc6/tutorial_py_template_matching.html
image = "images/coke.png"
template = "images/coke-template.png"

image = cv2.imread(image)
template = cv2.imread(template)
cv2.imshow("Image", image)
cv2.imshow("Template", template)

imageGray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
templateGray = cv2.cvtColor(template, cv2.COLOR_BGR2GRAY)

result = cv2.matchTemplate(imageGray, templateGray, cv2.TM_CCOEFF_NORMED)
(minVal, maxVal, minLoc, maxLoc) = cv2.minMaxLoc(result)

(startX, startY) = maxLoc
endX = startX + template.shape[1]
endY = startY + template.shape[0]

cv2.rectangle(image, (startX, startY), (endX, endY), (0, 255, 0), 3)
cv2.imshow("Output", image)
cv2.waitKey(0)