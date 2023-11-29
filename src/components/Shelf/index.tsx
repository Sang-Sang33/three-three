import Location, { ILocationProps } from 'components/Location';
import { memo, useMemo } from 'react';
import * as THREE from 'three';
import { generateUUID } from 'three/src/math/MathUtils';

import { ShapeProps } from '@react-three/drei';

import BracketShape from './BracketShape';

import type { Vector3Tuple } from 'three';
export interface IShelfProps {
  layer: number;
  row: number;
  col: number;
  position: Vector3Tuple;
  locationsMatrix: ILocationProps[][];
  id?: string;
}

type IRacket = Omit<ShapeProps<typeof THREE.BoxGeometry>, 'id'> & { id: string };

export const SPACING = 2;
export const BIN_WIDTH = 4;
export const SHELF_WIDTH = 44;
export const LAYER_LENGTH = 40;
export const LOCATION_WIDTH = SHELF_WIDTH - BIN_WIDTH * 2;

function Shelf({ layer, position, row, col, locationsMatrix }: IShelfProps) {
  const brackets = useMemo(() => {
    const length = layer * LAYER_LENGTH;
    const width = row * SHELF_WIDTH;
    const height = SHELF_WIDTH;
    // 垂直贯穿梁
    const zBrackets: IRacket[] = [];
    const zArgs: IRacket['args'] = [BIN_WIDTH, length, BIN_WIDTH];
    for (let i = 0; i <= row; i++) {
      if (i === 0 || i === row || i % 2 === 0) {
        zBrackets.push(
          {
            args: zArgs,
            position: [i * SHELF_WIDTH, length / 2, 0],
            id: generateUUID(),
          },
          {
            args: zArgs,
            position: [i * SHELF_WIDTH, length / 2, SHELF_WIDTH],
            id: generateUUID(),
          }
        );
      }
    }
    // 横向贯穿梁
    const xBrackets: IRacket[] = [];
    const xArgs: IRacket['args'] = [width + BIN_WIDTH, BIN_WIDTH, BIN_WIDTH];
    for (let i = 1; i <= layer; i++) {
      xBrackets.push(
        {
          args: xArgs,
          position: [width / 2, i * LAYER_LENGTH, 0],
          id: generateUUID(),
        },
        {
          args: xArgs,
          position: [width / 2, i * LAYER_LENGTH, height],
          id: generateUUID(),
        }
      );
    }
    // 纵向承接梁
    const yBrackets: IRacket[] = [];
    const yArgs: IRacket['args'] = [BIN_WIDTH, BIN_WIDTH, SHELF_WIDTH];
    for (let i = 1; i <= layer; i++) {
      for (let j = 0; j <= row; j++) {
        if (j === 0 || j === row || j % 2 === 0) {
          yBrackets.push({
            args: yArgs,
            position: [j * SHELF_WIDTH, i * LAYER_LENGTH, SHELF_WIDTH / 2],
            id: generateUUID(),
          });
        }
      }
    }
    return [...zBrackets, ...xBrackets, ...yBrackets];
  }, [row, layer]);

  return (
    <group>
      {new Array(col).fill(0).map((_, index) => (
        <group
          position={[
            position[0],
            position[1],
            position[2] + index * (SHELF_WIDTH + SPACING + BIN_WIDTH),
          ]}
          key={index + 'shelf-group'}
        >
          {brackets.map(({ id, ...extra }) => (
            <BracketShape {...extra} key={id} />
          ))}
          {(locationsMatrix?.[index] ?? []).map(({ id, ...location }) => (
            <Location key={id} {...location} />
          ))}
        </group>
      ))}
    </group>
  );
}

export default memo(Shelf);
