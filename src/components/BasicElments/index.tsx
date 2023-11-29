import { ContactShadows, Environment, OrbitControls, Shadow, Sky, Stats } from '@react-three/drei';

export default function BasicElements() {
  return (
    <>
      <OrbitControls enableDamping={false} />
      <Stats />
      <fog attach="fog" args={['#edf0f7', 100, 10000]} />
      <Environment preset="city" />
      <Sky distance={450000} sunPosition={[0, 1, 0]} inclination={0} azimuth={0.25} />\
      <Shadow
        color="black"
        colorStop={0}
        opacity={0.5}
        fog={false} // Reacts to fog (default=false)
      />
      <ContactShadows
        frames={1}
        position={[0, -0.5, 0]}
        scale={10}
        opacity={0.4}
        far={1}
        blur={2}
      />
    </>
  );
}
