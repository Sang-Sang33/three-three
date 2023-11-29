import { Canvas } from '@react-three/fiber';
import { PropsWithChildren } from 'react';

function Setup({ children }: PropsWithChildren) {
  return (
    <Canvas
      camera={{
        fov: 30,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 5000,
        position: [0, 600, 1500],
      }}
      gl={{ logarithmicDepthBuffer: true, antialias: true }}
      dpr={[1, 2]}
      shadows={'soft'}
    >
      <color attach="background" args={[0x444444]} />
      {children}
    </Canvas>
  );
}

export default Setup;
