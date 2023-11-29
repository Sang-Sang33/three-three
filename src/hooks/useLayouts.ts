import { useMemo } from 'react';
import { IGetMain } from 'types';

const MAP_WIDTH = 1500;

export default function useLayouts(mainData: IGetMain) {
  return useMemo(() => {
    const {
      resultData: { xaxisLength, yaxisLength },
    } = mainData;
    const unitLength = Math.ceil(MAP_WIDTH / Math.max(xaxisLength, yaxisLength));
    const centerX = (unitLength * xaxisLength) / 2;
    const centerY = (unitLength * yaxisLength) / 2;
    return {
      unitLength,
      centerX,
      centerY,
      xaxisLength,
      yaxisLength,
    };
  }, [mainData]);
}

export type ILayouts = ReturnType<typeof useLayouts>;
