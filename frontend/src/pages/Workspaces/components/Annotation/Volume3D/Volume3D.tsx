import { BoxGeometry } from 'three';
import { Suspense, useLayoutEffect, useRef } from 'react';
import { useThree, extend, ReactThreeFiber, useFrame } from '@react-three/fiber';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';

const Volume3D = ({ material, xLength, yLength, zLength, isInMoveSliceMode }) => {
	const geometry = new BoxGeometry(xLength, yLength, zLength)
	geometry.translate(
	  xLength / 2 - 0.5,
	  yLength / 2 - 0.5,
	  zLength / 2 - 0.5
	);

  return (
    <>
      <Suspense fallback={null}>
        <mesh args={[geometry, material]} />
      </Suspense>
      <Controls
        xLength={xLength}
        yLength={yLength}
        zLength={zLength}
        isInMoveSliceMode={isInMoveSliceMode}
        />
    </>
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

const Controls = ({ xLength, yLength, zLength, isInMoveSliceMode }) => {
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
  
    useFrame((_) => isInMoveSliceMode ? null : ref.current.update());

  return (<trackballControls
    args={ [camera, domElement] }
    ref={ ref }
    minZoom={0.5}
    maxZoom={4}
  />);

}
export default Volume3D;