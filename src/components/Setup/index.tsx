import { Canvas, CanvasProps } from '@react-three/fiber';
import { PropsWithChildren } from 'react';

type IProps = CanvasProps & PropsWithChildren;

function Setup({ children, ...props }: IProps) {
  return (
    <Canvas
      camera={{
        fov: 30,
        aspect: window.innerWidth / window.innerHeight,
        near: 0.1,
        far: 10000,
        position: [0, 1500, 1500],
      }}
      gl={{ logarithmicDepthBuffer: true, antialias: true }}
      dpr={[1, 2]}
      shadows={'soft'}
      {...props}
    >
      <color attach="background" args={[0x444444]} />
      {children}
    </Canvas>
  );
}

export default Setup;
