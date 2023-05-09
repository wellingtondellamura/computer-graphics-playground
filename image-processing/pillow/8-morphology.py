# Passo a passo para aplicar a erosão manualmente em uma folha de papel:

#  Identifique o elemento estruturante que será usado para a erosão. 
# Para este exemplo, vamos usar um elemento estruturante de tamanho 3x3 em forma de cruz.

#   0 1 0
#   1 1 1
#   0 1 0

#     Coloque o elemento estruturante em cima da folha de papel, alinhando-o com um pixel da borda branca do objeto. 
#     A posição central do elemento estruturante deve estar em cima do pixel.
#     Verifique se todos os pixels brancos cobertos pelo elemento estruturante estão contidos no objeto. 
#     Se todos estiverem, marque o pixel central do elemento estruturante como branco na nova imagem.
#     Repita os passos 3 e 4 para cada pixel da borda branca do objeto. 
#     Continue fazendo isso até percorrer todas as bordas do objeto.
#     A nova imagem será o resultado da erosão, onde o objeto branco será reduzido devido ao desgaste de suas bordas.

# Ao realizar esses passos manualmente, você poderá visualizar como a erosão remove gradualmente os 
# pixels da borda do objeto branco, reduzindo sua área.


from PIL import Image

def dilatacao(imagem, elemento_estruturante):
    largura, altura = imagem.size
    resultado = Image.new("1", (largura, altura), 0)
    
    for y in range(altura):
        for x in range(largura):
            if imagem.getpixel((x, y)) == 1:
                for i in range(len(elemento_estruturante)):
                    for j in range(len(elemento_estruturante[0])):
                        if elemento_estruturante[i][j] == 1:
                            if 0 <= x + j < largura and 0 <= y + i < altura:
                                resultado.putpixel((x + j, y + i), 1)
    
    return resultado

def erosao(imagem, elemento_estruturante):
    largura, altura = imagem.size
    resultado = Image.new("1", (largura, altura), 1)
    
    for y in range(altura):
        for x in range(largura):
            for i in range(len(elemento_estruturante)):
                for j in range(len(elemento_estruturante[0])):
                    if elemento_estruturante[i][j] == 1:
                        if 0 <= x + j < largura and 0 <= y + i < altura:
                            if imagem.getpixel((x + j, y + i)) == 0:
                                resultado.putpixel((x, y), 0)
                                break
                else:
                    continue
                break
    
    return resultado

# Exemplo de uso:
imagem = Image.open('images/girafa_binary.jpg')
elemento_estruturante = [
    [0, 1, 0],
    [1, 1, 1],
    [0, 1, 0]
]

# Dilatação
# imagem_dilatada = dilatacao(imagem, elemento_estruturante)
# imagem_dilatada.show()

# Erosão
imagem_erodida = erosao(imagem, elemento_estruturante)
imagem_erodida.show()
