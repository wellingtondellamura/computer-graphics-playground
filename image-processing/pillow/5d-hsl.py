from PIL import Image
import colorsys

def rgb_to_hsl(r, g, b):
    # Normalizar valores de RGB de 0-255 para 0-1
    r, g, b = r / 255.0, g / 255.0, b / 255.0
    h, l, s = colorsys.rgb_to_hls(r, g, b)
    # Convertendo h, l, s de 0-1 para 360, 100, 100
    return h * 360, l * 100, s * 100

def hsl_to_rgb(h, s, l):
    # Convertendo h, s, l de 360, 100, 100 para 0-1
    h, s, l = h / 360, s / 100, l / 100
    r, g, b = colorsys.hls_to_rgb(h, l, s)
    # Convertendo de volta para 0-255
    return int(r * 255), int(g * 255), int(b * 255)

# Carregar imagem e converter para RGB
image = Image.open("entrada.jpg")
image_rgb = image.convert("RGB")
pixels = image_rgb.load()

# Nova imagem em RGB para armazenar os resultados da conversão HSL para RGB
new_image = Image.new("RGB", image_rgb.size)
new_pixels = new_image.load()

# Processar cada pixel
for i in range(image_rgb.width):
    for j in range(image_rgb.height):
        r, g, b = pixels[i, j]
        h, l, s = rgb_to_hsl(r, g, b)
        # Aqui você pode manipular h, s, l se necessário
        r, g, b = hsl_to_rgb(h, s, l)
        new_pixels[i, j] = (r, g, b)

# Salvar a nova imagem
new_image.save("saida_hsl.jpg")
