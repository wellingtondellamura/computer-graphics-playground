from PIL import Image

# Carregando a imagem em tons de cinza
gray_img = Image.open("images/girafa_gray_hardway.jpg")

# Obtendo as dimensões da imagem
width, height = gray_img.size

# Criando uma nova imagem binarizada
bin_img = Image.new('1', (width, height))

# Definindo um threshold
threshold = 128

# Aplicando a conversão para a nova imagem binarizada
for x in range(width):
    for y in range(height):
        # Obtendo o valor de cinza do pixel atual
        gray_value = gray_img.getpixel((x, y))
        
        # Atribuindo o novo valor binário ao novo pixel
        bin_value = 1 if gray_value >= threshold else 0
        bin_img.putpixel((x, y), bin_value)

# Salvando a nova imagem binarizada
bin_img.save('/images/imagem_binaria.jpg')

# Exibindo a nova imagem binarizada
bin_img.show()