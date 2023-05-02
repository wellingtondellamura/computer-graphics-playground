from PIL import Image, ImageDraw
from collections import deque
import argparse


# receber o nome do arquivo de imagem como argumento
parser = argparse.ArgumentParser(description='Segmentação de imagem')
parser.add_argument('filename', type=str, help='Nome do arquivo de imagem')
args = parser.parse_args()

# Carregar a imagem fornecida como argumento
image = Image.open(args.filename)

# Converter para escala de cinza
gray_image = image.convert('L')


# Definir limiar
threshold = 128

# Criar uma imagem binária utilizando o limiar
binary_image = gray_image.point(lambda pixel: 0 if pixel < threshold else 255)


# Criar uma imagem vazia para marcar os pixels visitados
visited = Image.new('1', binary_image.size)

# Criar uma lista para armazenar os clusters encontrados
clusters = []

# Definir a vizinhança de 4 pixels
neighborhood = [(0, 1), (0, -1), (1, 0), (-1, 0)]

# Percorrer cada pixel da imagem binária
for x in range(binary_image.width):
    for y in range(binary_image.height):
        # Verificar se o pixel não foi visitado e é preto (objeto)
        if visited.getpixel((x, y)) == 0 and binary_image.getpixel((x, y)) == 0:
            # Iniciar uma nova busca em largura
            queue = deque([(x, y)])
            cluster = []
            
            # Enquanto a fila não estiver vazia
            while queue:
                # Obter as coordenadas do pixel atual
                current_x, current_y = queue.popleft()
                
                # Verificar se o pixel não foi visitado e é preto (objeto)
                if visited.getpixel((current_x, current_y)) == 0 and binary_image.getpixel((current_x, current_y)) == 0:
                    # Marcar o pixel como visitado
                    visited.putpixel((current_x, current_y), 1)
                    
                    # Adicionar o pixel ao cluster
                    cluster.append((current_x, current_y))
                    
                    # Adicionar os vizinhos à fila
                    for dx, dy in neighborhood:
                        new_x, new_y = current_x + dx, current_y + dy
                        if (0 <= new_x < binary_image.width) and (0 <= new_y < binary_image.height):
                            queue.append((new_x, new_y))
            
            # Adicionar o cluster à lista de clusters
            clusters.append(cluster)

print ('Número de objetos:', len(clusters))

# Criar uma cópia da imagem original
result = image.copy()

# Criar um objeto ImageDraw para desenhar nas imagens
draw = ImageDraw.Draw(result)

# Definir a cor para desenhar os clusters
color = (255, 0, 0)

# Desenhar os clusters na imagem resultante
for cluster in clusters:
    for x, y in cluster:
        draw.point((x, y), fill=color)


# Exibir a imagem com os clusters
result.show()

