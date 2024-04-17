
# O método Image.new() tem a seguinte assinatura:
#     Image.new(mode, size, color=0)

#     mode (obrigatório): Uma string que define o modo da imagem. Este modo define o tipo e a profundidade de cor da imagem. Alguns exemplos comuns de modos incluem:
#         'RGB': Imagem colorida sem transparência.
#         'RGBA': Imagem colorida com transparência.
#         'L': Imagem em escala de cinza.
#         '1': Imagem binária (preto e branco).

#     size (obrigatório): Uma tupla que define o tamanho da imagem em pixels, no formato (width, height).

#     color (opcional): Define a cor inicial da imagem. O padrão é 0, que geralmente representa preto. O formato do valor da cor depende do modo da imagem:
#         Para 'RGB' e 'RGBA', você pode fornecer uma tupla com três ou quatro valores, respectivamente (por exemplo, (255, 255, 255) para branco em 'RGB', ou (255, 255, 255, 128) para branco semitransparente em 'RGBA').
#         Para 'L', basta um valor entre 0 (preto) e 255 (branco).
#         Para '1', 0 representa preto e 1 representa branco.


from PIL import Image

# Carregando a imagem em tons de cinza
img = Image.open("images/girafa.jpg")

# Obtendo as dimensões da imagem
width, height = img.size

# Criando uma nova imagem
img_r = Image.new("RGB", (width, height))
img_g = Image.new("RGB", (width, height))
img_b = Image.new("RGB", (width, height))


for x in range(width):
    for y in range(height):        
        r, g, b = img.getpixel((x, y))
        img_r.putpixel((x, y), (r, r, r))
        img_g.putpixel((x, y), (g, g, g))
        img_b.putpixel((x, y), (b, b, b))


# Exibindo a nova imagem no canal Red
img_r.show()

# Exibindo a nova imagem no canal Green
img_g.show()

# Exibindo a nova imagem no canal Blue
img_b.show()

