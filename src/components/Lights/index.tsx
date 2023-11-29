export default function Lights() {
  return (
    <>
      <ambientLight intensity={1} color="#fff" />
      <directionalLight position={[0, 10000, 0]} color={0xffffff} intensity={1} />
    </>
  );
}
