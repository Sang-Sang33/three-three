import { memo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

import { Color, type Mesh } from 'three';
import type { MeshProps } from '@react-three/fiber';
import { useControls } from 'leva';

function Polyhedron(props: MeshProps) {
  const polyhedronRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!polyhedronRef.current) return;
    polyhedronRef.current.rotation.x += 0.2 * delta;
    polyhedronRef.current.rotation.y += 0.05 * delta;
  });

  useControls(props.name!, {
    flatShading: {
      value: true,
      onChange: (v) => {
        polyhedronRef.current!.material.flatShading = v;
        polyhedronRef.current!.material.needsUpdate = true;
      },
    },
    color: {
      value: 'lime',
      onChange: (v) => {
        polyhedronRef.current!.material.color = new Color(v);
      },
    },
  });

  return (
    <mesh {...props} ref={polyhedronRef}>
      <icosahedronGeometry args={[1, 1]} />
    </mesh>
  );
}

export default memo(Polyhedron);
