import { useLoader } from '@react-three/fiber';
import { TextureLoader, DataTexture3D, RedFormat, FloatType, LinearFilter, UniformsUtils, ShaderMaterial, BackSide } from 'three';
import { NRRDLoader } from 'three/examples/jsm/loaders/NRRDLoader';
import { VolumeRenderShader1 } from 'three/examples/jsm/shaders/VolumeShader';
import { GRAY_WITH_ANNOTATION_TEXTURE_URL } from '../constants';

const createVolume3DMaterialAndVolume = (nrrdUrl) => {
	const volume = useLoader(NRRDLoader, nrrdUrl);

  const dataTexture3D = createDataTexture3D(volume);

  const uniforms = createUniforms(dataTexture3D);

  const material = createMaterial(uniforms);
  
  return {
    mat: material,
    vol: volume
  };
}

const createDataTexture3D = (volume) => {
  const dataTexture3D = new DataTexture3D(
    volume.data.slice(0),
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

const createUniforms = (dataTexture3D) => {
	const grayWithAnnotationTexture = useLoader(TextureLoader, GRAY_WITH_ANNOTATION_TEXTURE_URL)

  const uniforms = UniformsUtils.clone(VolumeRenderShader1.uniforms);

  uniforms['u_data'].value = dataTexture3D;
  uniforms['u_size'].value.set(dataTexture3D.image.width, dataTexture3D.image.height, dataTexture3D.image.depth);
  uniforms['u_clim'].value.set(0, 1)
  uniforms['u_renderstyle'].value = 0 //mips style = 0, iso style = 1
  uniforms['u_renderthreshold'].value = 0.15 //for iso style, does not matter
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