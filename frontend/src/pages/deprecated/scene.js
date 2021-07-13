import Visualize3D from './visualize3d'
import { TrackballControls } from '@react-three/drei'

const { useThree } = require('@react-three/fiber')
const { useEffect, useRef, Suspense, useLayoutEffect } = require('react')

const Scene = ({ geometry, material, NRRD }) => {
  const {
    camera,
    gl: { domElement },
  } = useThree()
  const trackballControlsRef = useRef(null)
  const nrrd = NRRD;

  useEffect(() => {
    // trackballControlsRef.current.target.set(76, 188, 188)
  }, [])
  
  
	useLayoutEffect(() => {
	  // if (boxGeoRef) {
	  //   boxGeoRef.current.translate(
	  //     NRRD.xLength / 2 - 0.5,
	  //     NRRD.yLength / 2 - 0.5,
	  //     NRRD.zLength / 2 - 0.5
	  //   )
	  // }
	  if (trackballControlsRef) {
		trackballControlsRef.current.target.set(
			nrrd.xLength / 2,
			nrrd.yLength / 2,
			nrrd.zLength / 2
			);
	  }
	}, [nrrd.xLength, nrrd.yLength, nrrd.zLength, trackballControlsRef])
  return (
    <>
      <Suspense fallback={null}>
        <Visualize3D
          geometry={geometry}
          material={material}
        />
      </Suspense>
      <TrackballControls
        args={[camera, domElement]}
        ref={trackballControlsRef}
        minZoom={0.5}
        maxZoom={4}
      />
    </>
  )
}

export default Scene
