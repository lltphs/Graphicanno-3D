import { GRAY_WITH_ANNOTATION_TEXTURE_URL } from './constants'
import { onKeyPressed, showSlice } from './utils'
import isEqual from 'lodash/isEqual'

const { useLoader, useFrame } = require('@react-three/fiber')
const {
  useRef,
  useLayoutEffect,
  useState,
  useEffect,
  useMemo,
} = require('react')
const {
  TextureLoader,
  DataTexture3D,
  RedFormat,
  FloatType,
  LinearFilter,
  UniformsUtils,
  BackSide,
  ShaderMaterial,
  BoxGeometry,
} = require('three')
const { NRRDLoader } = require('three/examples/jsm/loaders/NRRDLoader')
const {
  VolumeRenderShader1,
} = require('three/examples/jsm/shaders/VolumeShader')

const Visualize3D = ({ geometry, material }) => {
  const [isPrint, setIsPrint] = useState(false)
  const boxGeoRef = useRef()
  const materialRef = useRef()
  
  return (
    // <mesh>
    //   <boxGeometry
    //     ref={boxGeoRef}
    //     args={[NRRD.xLength, NRRD.yLength, NRRD.zLength]}
    //   />
    //   <shaderMaterial
    //     ref={materialRef}
    //     uniforms={uniforms}
    //     vertexShader={VolumeRenderShader1.vertexShader}
    //     fragmentShader={VolumeRenderShader1.fragmentShader}
    //     side={BackSide}
    //   />
    // </mesh>
    <mesh args={[geometry, material]} />
  )
}

export default Visualize3D
