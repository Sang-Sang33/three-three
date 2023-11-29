import { memo } from 'react';
import { IBasicProps } from 'types';

import { Text } from '@react-three/drei';

import type { ColorRepresentation } from 'three';
export interface IPlaneProps extends IBasicProps {
  id?: string;
  name: string;
  planeColor: ColorRepresentation;
  borderWidth: number;
  borderColor: ColorRepresentation;
}

function Plane({
  position = [0, 0, 0],
  width,
  height,
  name,
  planeColor,
  borderColor,
  borderWidth = 2,
}: IPlaneProps) {
  return (
    <group position={position} rotation={[-Math.PI / 2, 0, 0]} name={name}>
      <mesh>
        <planeGeometry args={[width - borderWidth, height - borderWidth]} />
        <meshBasicMaterial color={planeColor} opacity={0.6} transparent />
      </mesh>
      {/* 右边框 */}
      <mesh position={[width / 2, 0, 0]}>
        <planeGeometry args={[borderWidth, height]} />
        <meshBasicMaterial color={borderColor} />
      </mesh>
      {/* 左边框 */}
      <mesh position={[(width / 2) * -1, 0, 0]}>
        <planeGeometry args={[borderWidth, height]} />
        <meshBasicMaterial color={borderColor} />
      </mesh>
      {/* 上边框 */}
      <mesh position={[0, height / 2, 0]}>
        <planeGeometry args={[width, borderWidth]} />
        <meshBasicMaterial color={borderColor} />
      </mesh>
      {/* 下边框 */}
      <mesh position={[0, (height / 2) * -1, 0]}>
        <planeGeometry args={[width, borderWidth]} />
        <meshBasicMaterial color={borderColor} />
      </mesh>
      <Text color="black" anchorX="center" anchorY="middle" fontSize={20} position={[0, 0, 10]}>
        {name}
      </Text>
    </group>
  );
}

export interface ICustomAreaProps extends IBasicProps {
  name: string;
  id?: string;
  renderOrder: number;
}

export const CustomArea = memo(function (tunnelProps: ICustomAreaProps) {
  return (
    <Plane {...tunnelProps} borderWidth={1} borderColor={'#38bdf8'} planeColor={'transparent'} />
  );
});

export interface ITunnelProps extends IBasicProps {
  tunnelName: string;
  id?: string;
  renderOrder: number;
}

export const Tunnel = memo(function Tunnel(tunnelProps: ITunnelProps) {
  return (
    <Plane
      {...tunnelProps}
      name={tunnelProps.tunnelName}
      borderWidth={2}
      borderColor={'#facc15'}
      planeColor={'#16a34a'}
    />
  );
});

export default memo(Plane);
