# Nesse exemplo, usamos o método Image.open() para abrir a imagem em escala de cinza. 
# Em seguida, usamos o método convert() para converter a imagem em escala de cinza em 
# um formato monocromático, especificando o modo de imagem "1". 
# O parâmetro dither é configurado como None para desativar o dithering, que é a técnica 
# de simular cores adicionais em uma imagem monocromática para evitar o aparecimento de faixas. 
# Por fim, salvamos a nova imagem monocromática usando o método save(). 
# O caminho para a imagem em escala de cinza e para a nova imagem monocromática deve ser
#  especificado no formato de string.

# O dithering é uma técnica de processamento de imagens que é usada para simular cores adicionais 
# em uma imagem monocromática ou em escala de cinza, a fim de evitar o aparecimento de faixas ou padrões. 
# A técnica é baseada na disposição de pontos de diferentes cores em um padrão que é projetado para 
# enganar o olho humano e criar a ilusão de uma cor adicional.

# Em uma imagem monocromática, cada pixel pode ter apenas dois valores possíveis: preto ou branco. 
# Ao converter uma imagem em tons de cinza para uma imagem monocromática, é comum que a imagem resultante
#  apresente um efeito de faixas ou padrões, especialmente em áreas com transições suaves de tons de cinza.

# O dithering resolve esse problema adicionando pontos de cores diferentes em uma determinada área da imagem.
# Esses pontos de cores diferentes são colocados em um padrão aleatório, a fim de simular um tom de cinza 
# intermediário. A adição desses pontos cria a ilusão de que há uma cor adicional, quando na verdade é 
# apenas uma combinação de pontos de cores diferentes.

# Existem diferentes tipos de padrões de dithering que podem ser usados para criar a ilusão de uma cor 
# adicional. Os padrões mais comuns incluem o padrão de Bayer, o padrão de pontos aleatórios e o 
# padrão de difusão de erro.

# No entanto, é importante notar que, embora o dithering possa ajudar a melhorar a qualidade visual 
# de uma imagem monocromática, ele não pode adicionar informações que não existem na imagem original. 
# Portanto, a escolha de usar ou não o dithering dependerá das necessidades específicas do projeto ou
# da aplicação em questão.

from PIL import Image

# Abre a imagem em escala de cinza
gray_img = Image.open("images/girafa_gray_hardway.jpg")

# Converte a imagem em monocromático
mono_img = gray_img.convert(mode="1", dither=None)

# Salva a nova imagem em monocromático
mono_img.save("images/girafa_binary.jpg")

# mostra a imagem
mono_img.show()


# O algoritmo padrão usado pelo Pillow no modo "1" para converter uma imagem em tons de cinza para uma 
# imagem binarizada é o algoritmo de limiarização global de Otsu.

# Modos de cor:

#     "1": Modo binário (preto e branco). Cada pixel é representado por um único bit, indicando preto ou branco.
#     "L": Modo de escala de cinzas. Cada pixel é representado por um único byte, indicando níveis de cinza de 0 (preto) a 255 (branco).
#     "P": Modo de paleta. A imagem usa uma paleta de cores para definir os tons da imagem. Cada pixel é representado por um único byte, que é um índice na paleta.
#     "RGB": Modo de cor verdadeira. Cada pixel é representado por três bytes (RGB), com cada byte representando a intensidade de vermelho, verde e azul, respectivamente.
#     "RGBA": Similar ao modo RGB, mas com um canal adicional para transparência (alfa).
#     "CMYK": Modo de cor usado em impressão que utiliza os canais ciano, magenta, amarelo e preto.
#     "YCbCr": Modo de cor usado em processamento de vídeo e imagem, onde Y é a luminância e Cb e Cr são os componentes de crominância.

