import numpy as np
import cv2

texture = np.zeros((1,257,3))

#From 0 to 0.85 * 255: gray scale
for i in range(int(0.9*255)):
    texture[0,i] = [int(i / 0.95), int(i / 0.95), int(i / 0.95)]

#From 0.85 * 255 to 0.9 * 255: lime virtual slice
# for i in range(int(0.85*255), int(0.9*255)):
#     texture[0,i] = [0xff, 0xff, 0xff]
    # texture[0,i] = [0x00, 0xff, 0xbf, 40]

#From 0.9 * 255 to 0.95 * 255: pink virtual slice
for i in range(int(0.9*255), int(0.95*255)):
    texture[0,i] = [0xcb, 0xc0, 0xff]

#From 0.95 * 255 to 1.0 * 255: cyan virtual slice
for i in range(int(0.95*255), 257):
    texture[0,i] = [0xff, 0xff, 0x00]

cv2.imwrite('test.png', texture)