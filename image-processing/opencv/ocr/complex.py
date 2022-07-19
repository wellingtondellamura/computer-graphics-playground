# Import required packages
import cv2
import pytesseract

pytesseract.pytesseract.tesseract_cmd = 'C:\\Program Files\\Tesseract-OCR\\tesseract.exe'

# Read image from which text needs to be extracted
img = cv2.imread("images/sample.jpg")
# cv2.imshow("image", img)

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
# cv2.imshow("gray", gray)

ret, thresh1 = cv2.threshold(gray, 0, 255, cv2.THRESH_OTSU | cv2.THRESH_BINARY_INV)
# cv2.imshow("threh", thresh1)

rect_kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (18, 18))
dilation = cv2.dilate(thresh1, rect_kernel, iterations = 1)
# cv2.imshow("threh", dilation)

contours, hierarchy = cv2.findContours(dilation, cv2.RETR_EXTERNAL,
 												cv2.CHAIN_APPROX_NONE)
im2 = img.copy()

file = open("recognized.txt", "w+")
file.write("")
file.close()
i = 0
for cnt in contours:
	x, y, w, h = cv2.boundingRect(cnt)
	i = i + 1
	rect = cv2.rectangle(im2, (x, y), (x + w, y + h), (0, 255, 0), 2)
	cropped = im2[y:y + h, x:x + w]
	# cv2.imshow("rect "+ str(i), cropped)
	file = open("recognized.txt", "a")
	text = pytesseract.image_to_string(cropped)
	print(pytesseract.image_to_boxes(cropped))
	print(text)
	file.write(text)
	file.write("\n")
	file.close
cv2.waitKey(0)