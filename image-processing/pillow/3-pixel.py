from PIL import Image

# Abre a imagem
img = Image.open("images/girafa.jpg")

# acessa o pixel na posição (100, 50)
pixel = img.getpixel((100, 50))

# mostra o valor dos canais de cor do pixel
print(pixel)

# mostra o valor do canal vermelho do pixel 
print(pixel[0])

# mostra o valor do canal verde do pixel
print(pixel[1])

# mostra o valor do canal azul do pixel
print(pixel[2])

# acessa o pixel na posição (100, 50) já pegando o R, G e B
r, g, b = img.getpixel((100, 50))

# mostra os valores R, G e B do pixel
print(r, g, b)
