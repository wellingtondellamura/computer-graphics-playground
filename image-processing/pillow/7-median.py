from PIL import Image

# Abre a imagem cinza
img = Image.open("images/t-graum.png")

gray_img = img.convert("L")

# Cria uma nova imagem em escala de cinza
median_img = Image.new('L', img.size)

# Itera por cada pixel na imagem original e calcula a conversão em escala de cinza
for x in range(2,gray_img.width-1):
    for y in range(2,gray_img.height-1):
        # Obtem o valor do pixel em RGB
        gray = gray_img.getpixel((x, y))

        # median of 3x3 window
        pixels = []
        for i in range(-1, 2):
            for j in range(-1, 2):
                pixels.append(gray_img.getpixel((x + i, y + j)))
        pixels.sort()
        median_value = pixels[4]
        
        # Define o novo pixel na imagem em escala de cinza
        median_img.putpixel((x, y), median_value)

# Salva a nova imagem em escala de cinza
median_img.save("images/median-t-graum.jpg")


median_img.show()

