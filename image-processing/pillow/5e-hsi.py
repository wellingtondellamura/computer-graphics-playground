from PIL import Image
import math

def rgb_to_hsi(r, g, b):
    r /= 255.0
    g /= 255.0
    b /= 255.0
    intensity = (r + g + b) / 3

    min_val = min(r, g, b)
    if min_val == 0:
        saturation = 1 - 3 * min_val
    else:
        saturation = 1 - 3 * (min_val / (r + g + b))

    if saturation == 0:
        hue = 0
    else:
        numerator = 0.5 * ((r - g) + (r - b))
        denominator = math.sqrt((r - g) ** 2 + (r - b) * (g - b))
        theta = math.acos(numerator / (denominator + 1e-10))  # Add a small constant to avoid division by zero

        if b <= g:
            hue = theta
        else:
            hue = 2 * math.pi - theta

        hue = hue * (180 / math.pi)  # Convert to degrees

    return hue, saturation, intensity

def hsi_to_rgb(h, s, i):
    h = h * (math.pi / 180)  # Convert degrees to radians
    x = i * (1 - s)
    if h < 2 * math.pi / 3:
        b = x
        r = i * (1 + s * math.cos(h) / math.cos(math.pi / 3 - h))
        g = 3 * i - (r + b)
    elif h < 4 * math.pi / 3:
        h -= 2 * math.pi / 3
        r = x
        g = i * (1 + s * math.cos(h) / math.cos(math.pi / 3 - h))
        b = 3 * i - (r + g)
    else:
        h -= 4 * math.pi / 3
        g = x
        b = i * (1 + s * math.cos(h) / math.cos(math.pi / 3 - h))
        r = 3 * i - (g + b)

    return int(r * 255), int(g * 255), int(b * 255)

# Load and convert the image
image = Image.open("entrada.jpg")
pixels = image.load()
new_image = Image.new("RGB", image.size)
new_pixels = new_image.load()

for i in range(image.width):
    for j in range(image.height):
        r, g, b = pixels[i, j]
        h, s, i = rgb_to_hsi(r, g, b)
        r, g, b = hsi_to_rgb(h, s, i)
        new_pixels[i, j] = (r, g, b)

new_image.save("saida_hsi.jpg")
