import { memo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

import type { Mesh } from 'three';
import type { MeshProps } from '@react-three/fiber';

const Box = (props: MeshProps) => {
  const boxRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!boxRef.current) return;
    boxRef.current.rotation.x += 1 * delta;
    boxRef.current.rotation.y += 0.5 * delta;
  });

  return (
    <mesh {...props} ref={boxRef}>
      <boxGeometry />
      <meshBasicMaterial color={0x00ff00} wireframe />
    </mesh>
  );
};

export default memo(Box);
