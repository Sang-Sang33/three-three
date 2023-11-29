import { ICustomAreaProps } from 'components/Plane';
import { useMemo } from 'react';
import { IGetCustomAreaListResultData } from 'types';
import { ILayouts } from './useLayouts';

export default function useCustomArea(
  customAreaData: IGetCustomAreaListResultData[],
  layouts: ILayouts
) {
  return useMemo(() => {
    const { unitLength, xaxisLength, yaxisLength } = layouts;
    return customAreaData.map<ICustomAreaProps>((data, index) => {
      const { id, fromXaxis, fromYaxis, toXaxis, toYaxis, name } = data;
      const width = (toXaxis - fromXaxis + 1) * unitLength;
      const height = (toYaxis - fromYaxis + 1) * unitLength;
      const x = (fromXaxis - xaxisLength / 2) * unitLength + width / 2;
      const y = (fromYaxis - yaxisLength / 2) * unitLength + height / 2;
      return {
        position: [x, 1, y],
        width,
        height,
        name,
        id,
        renderOrder: index,
      };
    });
  }, [customAreaData, layouts]);
}
