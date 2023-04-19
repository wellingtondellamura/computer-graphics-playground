# Nesse exemplo, usamos o método convert() para converter a imagem em RGB para uma 
# imagem em escala de cinza usando a string "L", que é o modo de imagem em escala 
# de cinza no Pillow. A conversão de proporção NTSC é aplicada por padrão pelo método 
# convert(). Em seguida, salvamos a nova imagem em escala de cinza usando o método save(). 
# O caminho para a imagem original e para a nova imagem em escala de cinza deve ser 
# especificado no formato de string.


from PIL import Image

# Abre a imagem colorida
img = Image.open("images/girafa.jpg")

# Converte a imagem em escala de cinza
gray_img = img.convert("L")

# Salva a nova imagem em escala de cinza
gray_img.save("images/girafa_gray.jpg")

gray_img.show()