/* eslint-disable no-unused-vars */
import { useState } from "react";
import { useBox } from "@react-three/cannon";

export default function Cube(props) {
  const [ref] = useBox(() => ({ mass: 0, ...props }));
  const [color, setColor] = useState("orange");

  return (
    <mesh castShadow ref={ref} userData={{ color }}>
      <boxGeometry />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
