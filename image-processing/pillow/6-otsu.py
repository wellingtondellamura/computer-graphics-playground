from PIL import Image

# Abrir a imagem em tons de cinza
gray_img = Image.open("imagem_em_tons_de_cinza.jpg").convert("L")

# Converter para uma imagem binarizada usando o algoritmo de Otsu
threshold = gray_img.convert("L").point(lambda x: 255 if x > gray_img.convert("L").point(lambda x: x).quantile(0.5) else 0, "1")

# Salvar a imagem binarizada
threshold.save("imagem_binarizada_otsu.jpg")
