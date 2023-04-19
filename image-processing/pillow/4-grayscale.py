# Existem várias maneiras de converter um pixel colorido em um valor de escala de cinza, 
# mas as proporções de R, G e B mais comuns em livros de computação gráfica envolvem simplesmente 
# tirar uma média ponderada dos valores de R, G e B de um pixel. As proporções mais comuns são:

# 1. Luminosidade (ou "Lightness"):

# A conversão de luminosidade é baseada na sensibilidade do olho humano à intensidade das cores. 
# Ela usa uma média ponderada dos valores de R, G e B, dando pesos maiores ao componente verde 
# e menores aos componentes vermelho e azul:

# gray = (0.21 * R) + (0.72 * G) + (0.07 * B)

# 2. Média (ou "Average"):

# A conversão de média simplesmente tira a média dos valores de R, G e B, dando pesos iguais a 
# cada um dos componentes:

# gray = (R + G + B) / 3

# 3. Luminosidade NTSC:

# A conversão de luminosidade NTSC é semelhante à conversão de luminosidade, mas usa pesos 
# diferentes para cada componente:

# gray = (0.299 * R) + (0.587 * G) + (0.114 * B)

# Essas conversões são relativamente simples e podem ser aplicadas a cada pixel de uma imagem 
# em RGB para criar uma nova imagem em escala de cinza. É importante notar que, embora essas 
# conversões sejam comuns em livros de computação gráfica, elas não são a única maneira de 
# converter um pixel em escala de cinza e outras conversões podem ser mais adequadas para certas 
# aplicações. Além disso, é importante lembrar que a conversão para escala de cinza perde informações 
# sobre a cor original da imagem e deve ser usada com cuidado em situações em que a cor é importante.

from PIL import Image

# Abre a imagem colorida
img = Image.open("images/girafa.jpg")

# Cria uma nova imagem em escala de cinza
gray_img = Image.new('L', img.size)

# Itera por cada pixel na imagem original e calcula a conversão em escala de cinza
for x in range(img.width):
    for y in range(img.height):
        # Obtem o valor do pixel em RGB
        r, g, b = img.getpixel((x, y))

        # Calcula o valor de escala de cinza usando a proporção NTSC
        gray_value = int(0.299 * r + 0.587 * g + 0.114 * b)

        # Define o novo pixel na imagem em escala de cinza
        gray_img.putpixel((x, y), gray_value)

# Salva a nova imagem em escala de cinza
gray_img.save("images/girafa_gray_hardway.jpg")


gray_img.show()

