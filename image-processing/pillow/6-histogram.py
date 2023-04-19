from PIL import Image
import matplotlib.pyplot as plt

# carrega a imagem em escala de cinza
gray_img = Image.open("imagem.png").convert("L")

# cria o histograma da imagem
histogram = gray_img.histogram()

# cria uma lista com os valores de intensidade (0-255)
intensidades = list(range(256))

# cria um gráfico de barras com o histograma
plt.bar(intensidades, histogram)

# exibe o gráfico
plt.show()
