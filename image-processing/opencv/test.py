import cv2
import numpy as np
# Abrindo a Imagem ---------------------------------------------
#img = cv2.imread('opencvteste.jpg', cv2.IMREAD_COLOR)
#cv2.namedWindow('Imagem Carregada')
#cv2.imshow('Imagem Carregada', img)
#cv2.waitKey()
# Filtro da Média ----------------------------------------------
img = cv2.imread('images/clown-fish.jpg')
median = cv2.medianBlur(img, 77)
compare = np.concatenate((img, median), axis=1) #Comparação lado a lado
cv2.imshow('img', compare)
cv2.waitKey(0)
cv2.destroyAllWindows