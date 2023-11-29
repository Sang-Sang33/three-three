import { SHELF_WIDTH } from 'components/Shelf';
import { memo, useMemo } from 'react';
import * as THREE from 'three';
import { ELocationStatus } from 'types';

import { Box } from '@react-three/drei';

import type { ColorRepresentation, Vector3Tuple } from 'three';

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
    status: '空库位入库锁定',
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

export interface ILocationProps {
  locationStatus: ELocationStatus;
  position: Vector3Tuple;
}

function Location({ locationStatus, position }: ILocationProps) {
  const material = useMemo(() => {
    const color = LOCATION_STATUS_MAP[locationStatus]?.color ?? '#fbf8f8';
    return new THREE.MeshPhongMaterial({ color, transparent: true, opacity: 0.6 });
  }, [locationStatus]);

  return (
    <Box
      material={material}
      args={[SHELF_WIDTH, SHELF_WIDTH, SHELF_WIDTH]}
      position={position}
    ></Box>
  );
}

export default memo(Location);
