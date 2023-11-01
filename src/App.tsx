import Box from 'components/Box';
import Lights from 'components/Lights';
import Setup from 'components/Setup';
import { useControls } from 'leva';
import { Perf } from 'r3f-perf';
import { useMemo, useRef } from 'react';
import { OrbitControls, Stats } from '@react-three/drei';
import Polyhedron from 'components/Polyhedron';
import * as THREE from 'three';

function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { showAxes } = useControls({
    showAxes: true,
  });

  return (
    <div ref={containerRef} className="App h-full w-full">
      <Setup>
        <Box position={[2, 0, 2]} />
        <Box position={[2, 0, 0]} />
        <Box position={[0, 0, 2]} />
        <Polyhedron
          name="meshBasicMaterial"
          position={[-3, 1, -1]}
          material={new THREE.MeshBasicMaterial()}
        />
        <Polyhedron
          name="meshNormalMaterial"
          position={[-1, 1, -1]}
          material={new THREE.MeshNormalMaterial()}
        />
        <Polyhedron
          name="meshPhongMaterial"
          position={[1, 1, -1]}
          material={new THREE.MeshPhongMaterial()}
        />
        <Polyhedron
          name="meshStandardMaterial"
          position={[3, 1, -1]}
          material={new THREE.MeshStandardMaterial()}
        />
        <gridHelper args={[50, 50, 0x444444, 'teal']} />
        {showAxes && <axesHelper position={[0, 0, 0]} args={[20]}></axesHelper>}
        <Lights />
        <OrbitControls enableDamping={false} />
        <Stats showPanel={2} />
        <Perf position="bottom-right" />
      </Setup>
    </div>
  );
}

export default App;
