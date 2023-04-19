from PIL import Image

# Abre a imagem
img = Image.open("images/girafa.jpg")

# Obtém as dimensões da imagem
height, width = img.size

# Obtém o formato da imagem
format = img.format

# Obtém o modo de cor da imagem
mode = img.mode

# Exibe as informações da imagem
print("Formato: %s, Dimensões: %sx%s, Modo: %s" % (format, width, height, mode))

# Obtém as informações sobre a imagem
info = img.info

# Exibe a lista de chaves do dicionário
print("Chaves disponíveis: {}".format(info.keys()))

for chave in info.keys():
    valor = info.get(chave)
    print("{}: {}".format(chave, valor))