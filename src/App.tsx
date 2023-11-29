import BasicElements from 'components/BasicElments';
import Floor from 'components/Floor';
import Lights from 'components/Lights';
import { CustomArea, Tunnel } from 'components/Plane';
import Setup from 'components/Setup';
import Shelf from 'components/Shelf';
import useAreaList from 'hooks/useAreaList';
import useCustomArea from 'hooks/useCustomArea';
import useLayouts from 'hooks/useLayouts';
import { useControls } from 'leva';
import GetAreaList from 'mock/GetAreaList.json';
import GetCustomAreaList from 'mock/GetCustomAreaList.json';
import GetMain from 'mock/GetMain.json';
import { useEffect, useRef } from 'react';
import { useLayoutsStore } from 'stores';
import { IGetAreaList, IGetCustomAreaList } from 'types';

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { showAxes } = useControls({
    showAxes: true,
  });
  const layouts = useLayouts(GetMain);
  const setlayouts = useLayoutsStore((state) => state.setlayouts);
  const { tunnels, shelfs } = useAreaList((GetAreaList as IGetAreaList).resultData, layouts);
  const customAreas = useCustomArea((GetCustomAreaList as IGetCustomAreaList).resultData, layouts);

  useEffect(() => {
    setlayouts(layouts);
  }, [layouts]);

  return (
    <div ref={containerRef} className="App h-full w-full">
      <Setup>
        {showAxes && <axesHelper position={[0, 0, 0]} args={[1000]}></axesHelper>}
        <Lights />
        <BasicElements />
        <Floor {...GetMain.resultData} />
        {tunnels.map((tunnel) => (
          <Tunnel {...tunnel} key={tunnel.id} />
        ))}
        {customAreas.map((customArea) => (
          <CustomArea {...customArea} key={customArea.id} />
        ))}
        {shelfs.map((shelf) => (
          <Shelf {...shelf} key={shelf.id} />
        ))}
      </Setup>
    </div>
  );
}

export default App;
