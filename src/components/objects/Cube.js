import { useBox } from "@react-three/cannon";

export default function Cube(props) {
  const [ref] = useBox(() => ({ ...props }));

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshStandardMaterial color="rgb(51, 153, 255)" />
    </mesh>
  );
}
