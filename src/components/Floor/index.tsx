import { memo, useMemo } from 'react';
import { useLayoutsStore } from 'stores';
import { IGetMainResultData } from 'types';

const FLOOR_DEPTH = 10;

function Floor({ xaxisLength, yaxisLength }: IGetMainResultData) {
  const unitLength = useLayoutsStore((state) => state.layouts.unitLength);
  const { width, height } = useMemo(() => {
    return {
      width: (xaxisLength + 2) * unitLength,
      height: (yaxisLength + 2) * unitLength,
    };
  }, [xaxisLength, yaxisLength, unitLength]);

  return (
    <mesh position={[0, FLOOR_DEPTH * -1, 0]}>
      <boxGeometry args={[width, FLOOR_DEPTH, height]} />
      <meshPhongMaterial color={'#e0e2e8'} />
    </mesh>
  );
}

export default memo(Floor);
