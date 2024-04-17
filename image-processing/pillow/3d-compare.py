from PIL import Image

# Carregando a imagem em tons de cinza
img = Image.open("images/girafa.jpg")

# Obtendo as dimensões da imagem
width, height = img.size

# Criando uma nova imagem
img_rgb = Image.new("RGB", (width, height))
img_gray = Image.new("L", (width, height))


for x in range(width):
    for y in range(height):        
        r, g, b = img.getpixel((x, y))
        img_rgb.putpixel((x, y), (r, r, r))
        img_gray.putpixel((x, y), r)

img_rgb.show()
img_gray.show()

img_rgb.save("images/girafa_rgb.bmp")
img_gray.save("images/girafa_gray.bmp")
