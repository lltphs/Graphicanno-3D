import nrrd
import visvis as vv
from skimage.measure import marching_cubes
import numpy as np

annotation = nrrd.read('nrrd/14/annotation.nrrd')[0]

verts, faces, normals, values = marching_cubes(annotation, 0.9)
vv.mesh(verts, faces, normals, values, texture='textures/liver.png')
vv.use().Run()