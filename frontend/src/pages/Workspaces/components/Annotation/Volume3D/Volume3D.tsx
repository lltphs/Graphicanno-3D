import { BoxGeometry } from 'three';
import { Suspense, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useThree, extend, ReactThreeFiber, useFrame, Canvas } from '@react-three/fiber';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

const Volume3D = ({ material, xLength, yLength, zLength }) => {
  const h = 512;
  const aspect = window.innerWidth / window.innerHeight;
  
	const geometry = new BoxGeometry(xLength, yLength, zLength)
	geometry.translate(
	  xLength / 2 - 0.5,
	  yLength / 2 - 0.5,
	  zLength / 2 - 0.5
	);

  return (
    <Canvas
      className='canvas'
      orthographic={true}
      camera={{
        left: (-h * aspect) / 2,
        right: (h * aspect) / 2,
        top: h / 2,
        bottom: -h / 2,
        near: 1,
        far: 1000,
        position: [0, 0, 500],
        up: [0, 0, 1],
      }}
    >
      <Suspense fallback={null}>
        <mesh args={[geometry, material]} />
      </Suspense>
      <Controls
        xLength={xLength}
        yLength={yLength}
        zLength={zLength}
      />
    </Canvas>
  );
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      trackballControls: ReactThreeFiber.Object3DNode<TrackballControls, typeof TrackballControls>
    }
  }
}

extend({ TrackballControls });

const Controls = ({ xLength, yLength, zLength }) => {
  const { camera, gl: {domElement} } = useThree();
  
  const ref = useRef(null);

  useLayoutEffect(() => {
    if (ref) {
      ref.current.target.set(
        xLength / 2,
        yLength / 2,
        zLength / 2
        );
      }
    }, [xLength, yLength, zLength, ref]);
  
  const [wheelIsReservedForVirtualSliceRotation, setWheelIsReservedForVirtualSliceRotation] = useState(false);
  
  const handleKeyUpOrDownCallback = useCallback((event) =>
                                              handleKeyUpOrDown(
                                                event,
                                                wheelIsReservedForVirtualSliceRotation,
                                                setWheelIsReservedForVirtualSliceRotation
                                              ),
                                            [wheelIsReservedForVirtualSliceRotation]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyUpOrDownCallback);
    document.addEventListener('keyup', handleKeyUpOrDownCallback);
    return () => {
      document.removeEventListener('keydown', handleKeyUpOrDownCallback);
      document.removeEventListener('keyup', handleKeyUpOrDownCallback);
    }
  },[handleKeyUpOrDownCallback])

  useFrame(() => ref.current.update());

  return (<trackballControls
    args={ [camera, domElement] }
    ref={ ref }
    minZoom={0.5}
    maxZoom={4}
    noZoom={wheelIsReservedForVirtualSliceRotation}
  />);

}
export default Volume3D;

const handleKeyUpOrDown = (event, wheelIsReservedForVirtualSliceRotation, setWheelIsReservedForVirtualSliceRotation) => {
  if (event.shiftKey) {
    setWheelIsReservedForVirtualSliceRotation(true);
  } else if (wheelIsReservedForVirtualSliceRotation) {
    setWheelIsReservedForVirtualSliceRotation(false);
  }
}

