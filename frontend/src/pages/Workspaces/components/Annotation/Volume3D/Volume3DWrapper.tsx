import { Canvas } from '@react-three/fiber';
import Volume3D from './Volume3D';

const Volume3DWrapper = ({ material, xLength, yLength, zLength, isInMoveSliceMode }) => {
  const h = 512;
  const aspect = window.innerWidth / window.innerHeight;

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
      <Volume3D
        material={material}
        xLength={xLength}
        yLength={yLength}
        zLength={zLength}
        isInMoveSliceMode={isInMoveSliceMode}
      />
    </Canvas>
  );
};
export default Volume3DWrapper;