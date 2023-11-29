import { ILayouts } from 'hooks/useLayouts';
import { create } from 'zustand';

type UnitLayoutsStoreState = {
  layouts: ILayouts;
  setlayouts: (layouts: ILayouts) => void;
};

export const useLayoutsStore = create<UnitLayoutsStoreState>((set) => ({
  layouts: { unitLength: 1, centerX: 0, centerY: 0 },
  setlayouts: (layouts) => set(() => ({ layouts })),
}));
