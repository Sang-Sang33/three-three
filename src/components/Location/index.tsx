import { LOCATION_WIDTH } from 'components/Shelf';
import { memo, useMemo, useState } from 'react';
import * as THREE from 'three';
import { ELocationStatus } from 'types';

import { Box, Edges, ShapeProps, useCursor, useSelect } from '@react-three/drei';

import type { ColorRepresentation } from 'three';

export const LOCATION_STATUS_MAP: Record<
  ELocationStatus,
  { status: string; color: ColorRepresentation }
> = {
  1: {
    status: '报警',
    color: '#DC143C',
  },
  2: {
    status: '取空异常',
    color: '#00BFFF',
  },
  3: {
    status: '占位异常',
    color: '#DB7093',
  },
  4: {
    status: '维修',
    color: '#DA70D6',
  },
  5: {
    status: '空库库锁定',
    color: '#D8BFD8',
  },
  6: {
    status: '满库位空托托盘出库锁定',
    color: '#DDA0DD',
  },
  7: {
    status: '满库位满托盘出库锁定',
    color: '#EE82EE',
  },
  8: {
    status: '满库位满托盘',
    color: '#800080',
  },
  9: {
    status: '满库位空托托盘',
    color: '#FF00FF',
  },
  10: {
    status: '空库位',
    color: '#fbf8f8',
  },
};

export interface ILocationProps extends Omit<ShapeProps<typeof THREE.BoxGeometry>, 'id'> {
  locationStatus: ELocationStatus;
  id?: string;
}

function Location({ locationStatus, position, id, ...props }: ILocationProps) {
  const [hovered, setHover] = useState(false);
  const selected = useSelect();
  const isSelected = (selected?.[0]?.userData?.id ?? '') === id;
  const material = useMemo(() => {
    const color = isSelected ? '#ef4444' : LOCATION_STATUS_MAP[locationStatus]?.color ?? '#fbf8f8';
    return new THREE.MeshPhongMaterial({ color, transparent: true, opacity: 0.6 });
  }, [locationStatus, isSelected]);
  useCursor(hovered);
  return (
    <Box
      material={material}
      args={[LOCATION_WIDTH, LOCATION_WIDTH, LOCATION_WIDTH]}
      position={position}
      {...props}
      onPointerOver={(e) => (e.stopPropagation(), setHover(true))}
      onPointerOut={(e) => setHover(false)}
    >
      <Edges
        visible={isSelected}
        scale={1.1}
        threshold={15} // Display edges only when the angle between two faces exceeds this value (default=15 degrees)
        color="white"
      />
    </Box>
  );
}

export default memo(Location);
