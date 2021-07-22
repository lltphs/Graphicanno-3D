import numpy as np
import cv2

texture = np.zeros((1,257,3))

#From 0 to 128: gray scale
for i in range(0,128):
    texture[0, i] = [2 * i, 2 * i, 2 * i]

# From 128 to 255: liver
for i in range(128, 257):
    scale = (i - 128) * 2 / 256
    scale = 1
    blue = int(0x4b * scale)
    green = int(0x52 * scale)
    red = int(0xc1 * scale)
    texture[0,i] = [blue, green, red]

cv2.imwrite('liver.png', texture)