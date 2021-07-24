import numpy as np
import cv2

src = cv2.imread('templatet.png')

des = src[410:411,2:-105]

des = np.concatenate((np.zeros((1,100,3)),des), 1)

cv2.imwrite('liver_preset.png', des)
# texture = np.zeros((1,257,3))

# #From 0 to 128: gray scale
# for i in range(0,257):
#     texture[0, i] = [255, 255, 255]
#     # texture[0, i] = [i, i, i]

# # From 128 to 255: liver
# min_val = int((-311 + 1024)/2048*257)
# max_val = int((394 + 1024)/2048*257)
# mid_val = int((min_val + max_val) / 2)
# for i in range(min_val, max_val):
#     # scale = (i - min_val) / (max_val - min_val)
#     scale = 1
#     blue = int(0x4b * scale)
#     green = int(0x52 * scale)
#     red = int(0xc1 * scale)
#     texture[0,i] = [blue, green, red]

# cv2.imwrite('liver.png', texture)