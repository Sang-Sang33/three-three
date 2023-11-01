import * as THREE from 'three';
import { useRef } from 'react';
import { useHelper } from '@react-three/drei';
import type { DirectionalLight, Object3D } from 'three';
export default function Lights() {
  const directionalLightRef = useRef<DirectionalLight>(null);
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 2);

  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight
        position={[0, 50, 0]}
        color={0xffffff}
        intensity={1}
        ref={directionalLightRef}
      />
    </>
  );
}
