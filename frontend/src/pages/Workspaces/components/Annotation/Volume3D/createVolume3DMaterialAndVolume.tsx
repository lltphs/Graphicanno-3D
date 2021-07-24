import { useLoader } from '@react-three/fiber';
import { TextureLoader, DataTexture3D, RedFormat, FloatType, LinearFilter, UniformsUtils, ShaderMaterial, BackSide } from 'three';
import { VolumeRenderShader1 } from 'three/examples/jsm/shaders/VolumeShader';

import { getDataset } from 'api/dataset'
import { ANNOTATION_TEXTURE_URL, LIVER_TEXTURE_URL } from '../constants';

const createVolume3DMaterialAndVolume = (id) => {
  const volume = getDataset(id);

  const dataTexture3D = createDataTexture3D(volume);

  const uniforms = createUniforms(dataTexture3D);

  const material = createMaterial(uniforms);

  const annotationDataTexture3D = createDataTexture3D(volume, true);

  const annotationUniforms = createUniforms(annotationDataTexture3D, true);

  const annotationMaterial = createMaterial(annotationUniforms);
  
  return {
    mat: material,
    vol: volume,
    annotation: annotationMaterial,
    windowingBound: {
      low: 0,
      high: 1
    }
  };
}

const createDataTexture3D = (volume, forAnnotation=false) => {
  const dataTexture3D = new DataTexture3D(
    forAnnotation ? volume.data.map((_)=>0) : volume.data.slice(0),
    volume.xLength,
    volume.yLength,
    volume.zLength
  );

  dataTexture3D.format = RedFormat;
  dataTexture3D.type = FloatType;
  dataTexture3D.minFilter = dataTexture3D.magFilter = LinearFilter;
  dataTexture3D.unpackAlignment = 1;

  return dataTexture3D;
}

const createUniforms = (dataTexture3D, forAnnotation=false) => {
	const grayWithAnnotationTexture = useLoader(TextureLoader, forAnnotation ? ANNOTATION_TEXTURE_URL : LIVER_TEXTURE_URL)

  const uniforms = UniformsUtils.clone(VolumeRenderShader1.uniforms);

  uniforms['u_data'].value = dataTexture3D;
  uniforms['u_size'].value.set(dataTexture3D.image.width, dataTexture3D.image.height, dataTexture3D.image.depth);
  uniforms['u_clim'].value.set(0, 1)
  uniforms['u_renderstyle'].value = forAnnotation ? 1 : 1 //mip style = 0, iso style = 1
  uniforms['u_renderthreshold'].value = 0 //for iso style, does not matter
  uniforms['u_cmdata'].value = grayWithAnnotationTexture

  return uniforms;
}

function createMaterial(uniforms) {
  return new ShaderMaterial({
    uniforms: uniforms,
    vertexShader: VolumeRenderShader1.vertexShader,
    fragmentShader: VolumeRenderShader1.fragmentShader,
    side: BackSide,
  });
}

export default createVolume3DMaterialAndVolume;