import cv2
import numpy as np

data = np.load('backend/sample.npy')
cv2.imshow('test', data[10])
cv2.waitKey()