import { ITunnelProps } from 'components/Plane';
import { IShelfProps } from 'components/Shelf';
import { useMemo } from 'react';
import { IGetAreaListResultData } from 'types';

import { ILayouts } from './useLayouts';

export default function useAreaList(canvasData: IGetAreaListResultData[], layouts: ILayouts) {
  return useMemo(() => {
    const tunnels: ITunnelProps[] = [];
    const shelfs: IShelfProps[] = [];
    const { unitLength, xaxisLength, yaxisLength } = layouts;
    canvasData.forEach((canvasItem, index) => {
      const { id, canvasAreaType, fromXaxis, fromYaxis, toXaxis, toYaxis, tunnelCode } = canvasItem;
      const width = (toXaxis - fromXaxis + 1) * unitLength;
      const height = (toYaxis - fromYaxis + 1) * unitLength;
      const x = (fromXaxis - xaxisLength / 2) * unitLength + width / 2;
      const y = (fromYaxis - yaxisLength / 2) * unitLength + height / 2;
      if (canvasAreaType === 2) {
        if (!tunnelCode) return;
        tunnels.push({
          position: [x, 0, y],
          width,
          height,
          tunnelName: tunnelCode,
          id,
          renderOrder: index,
        });
      } else if (canvasAreaType === 1) {
        const x = (fromXaxis - xaxisLength / 2) * unitLength;
        const y = (fromYaxis - yaxisLength / 2) * unitLength;
        const layer = canvasItem.locationList.reduce((acc, cur) => {
          acc = Math.max(acc, cur.zaxis);
          return acc;
        }, 0);
        shelfs.push({
          position: [x, 0, y],
          id,
          layer,
          row: toXaxis - fromXaxis + 1,
          col: toYaxis - fromYaxis + 1,
        });
      }
    });
    return { tunnels, shelfs };
  }, [canvasData, layouts]);
}
