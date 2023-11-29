import { OrbitControls, Stats, Grid } from '@react-three/drei';

export default function BasicElements() {
  return (
    <>
      <OrbitControls enableDamping={false} />
      <Stats />
      <gridHelper args={[20000, 150, '#fff', '#fff']} position={[0, -24, 0]} />
      <fog attach="fog" args={['#edf0f7', 100, 10000]} />
    </>
  );
}
