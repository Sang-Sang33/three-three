import { Canvas } from '@react-three/fiber';
import { PropsWithChildren } from 'react';

function Setup({ children }: PropsWithChildren) {
  return (
    <Canvas
      camera={{
        fov: 45,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 1000,
        position: [-50, 100, 50],
      }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={[0x444444]} />
      {children}
    </Canvas>
  );
}

export default Setup;
