# O algoritmo de Otsu é um algoritmo de limiarização global que determina um limiar ótimo para 
# a binarização de uma imagem em escala de cinza. Esse limiar é determinado a partir da análise 
# da distribuição dos níveis de cinza na imagem, e o objetivo é separar a imagem em dois grupos, 
# um de pixels com intensidade acima do limiar e outro de pixels com intensidade abaixo do limiar.


from PIL import Image
import matplotlib.pyplot as plt

# Carrega a imagem
img = Image.open('images/man.png')

# Converte para tons de cinza
gray_img = img.convert('L')

# Cria o histograma da imagem
histogram = gray_img.histogram()


# cria uma lista com os valores de intensidade (0-255)
grays = list(range(256))

# cria um gráfico de barras com o histograma
plt.bar(grays, histogram)


# exibe o gráfico
plt.show()

# Calcula a probabilidade de cada nível de cinza
total_pixels = sum(histogram)
probability = [float(h) / total_pixels for h in histogram]

# Calcula a média global
mean = sum([i * probability[i] for i in range(len(histogram))])

# Calcula a variância entre classes para cada possível limiar
max_variance = 0
threshold = 0
for t in range(len(histogram)):
    # Calcula as probabilidades abaixo e acima do limiar
    prob_below = sum(probability[:t+1])
    prob_above = sum(probability[t+1:])    
    # Se a probabilidade acima do limiar for zero, pula para o próximo limiar
    if prob_above == 0:
        continue
    
    # Calcula as médias abaixo e acima do limiar
    mean_below = sum([i * probability[i] for i in range(t+1)]) / prob_below
    mean_above = sum([i * probability[i] for i in range(t+1, len(histogram))]) / prob_above
    # Calcula a variância entre classes
    variance = prob_below * prob_above * (mean_below - mean_above) ** 2
    # Atualiza o limiar e a variância máxima
    if variance > max_variance:
        max_variance = variance
        threshold = t

# Binariza a imagem usando o limiar ótimo
binary_img = gray_img.point(lambda x: 255 if x > threshold else 0, '1')

print("Threshold:", threshold)

# Salva a imagem binarizada
binary_img.save("imagem_binarizada_otsu.jpg")

# Exibe a imagem binarizada
binary_img.show()
