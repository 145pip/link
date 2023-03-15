import { useBox } from "@react-three/cannon";

export default function Cube(props) {
  const [ref] = useBox(() => ({ ...props }));

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  );
}
