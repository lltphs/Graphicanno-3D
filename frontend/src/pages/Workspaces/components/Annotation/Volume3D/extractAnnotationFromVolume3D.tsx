import { checkPointIsForeground } from "./manipulateGroundTruthOnVolume3D";

const extractAnnotationFromVolume3D = (matNVol) => {
  const annotationFlatArray = matNVol.annotation.uniforms['u_data'].value.image.data.map((value, position) => checkPointIsForeground(matNVol, position) ? 1 : 0);
  const width = matNVol.mat.uniforms['u_data'].value.image.width;
  const height = matNVol.mat.uniforms['u_data'].value.image.height;
  const depth = matNVol.mat.uniforms['u_data'].value.image.depth;
  let compressedAnnotationFlatArray = compressFlatArray(annotationFlatArray);
  return {
    'compressedAnnotationFlatArray': compressedAnnotationFlatArray,
    'width': width,
    'height': height,
    'depth': depth,
  };
}

const compressFlatArray = (flatArray) => {
  let compressedFlatArray = new Int32Array(flatArray.length);

  compressedFlatArray[0] = flatArray[0];

  compressedFlatArray[1] = 1;

  let currentIndexFromCompressedFlatArray = 1;

  for (let currentIndexFromFlatArray  = 1; currentIndexFromFlatArray < flatArray.length; currentIndexFromFlatArray++) {
    if (compressedFlatArray[currentIndexFromCompressedFlatArray - 1] == flatArray[currentIndexFromFlatArray]) {
      compressedFlatArray[currentIndexFromCompressedFlatArray] += 1;
    } else {
      currentIndexFromCompressedFlatArray += 2;
      compressedFlatArray[currentIndexFromCompressedFlatArray - 1] = flatArray[currentIndexFromFlatArray];
      compressedFlatArray[currentIndexFromCompressedFlatArray] = 1;
    }
  }
  
  compressedFlatArray = compressedFlatArray.slice(0, currentIndexFromCompressedFlatArray + 1);

  return Array.from(compressedFlatArray);
}
export default extractAnnotationFromVolume3D;