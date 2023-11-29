import { Box, ShapeProps } from '@react-three/drei';
import { memo, useMemo } from 'react';
import * as THREE from 'three';

function BracketShape(props: ShapeProps<typeof THREE.BoxGeometry>) {
  const meshLambertMaterial = useMemo(() => new THREE.MeshPhongMaterial({ color: '#3b82f6' }), []);
  return <Box {...props} material={meshLambertMaterial}></Box>;
}

export default memo(BracketShape);
