from PIL import Image

# Abre a imagem
img = Image.open("images/girafa.jpg")

# Obtém a largura e a altura da imagem
largura, altura = img.size

# Acessa os pixels da imagem
pixels = img.load()

# Percorre todos os pixels da imagem
for y in range(altura):
    for x in range(largura):
        # Obtém os valores dos canais RGB do pixel atual
        r, g, b = pixels[x, y]

        # Exibe as informações dos canais RGB do pixel atual
        print("Pixel ({}, {}): R = {}, G = {}, B = {}".format(x, y, r, g, b))
