import { Line } from "@react-three/drei";

export default function Axis() {
  return (
    <>
      <Line
        points={[
          [0, 0, 0],
          [100, 0, 0],
        ]}
        color="red"
      />
      <Line
        points={[
          [0, 0, 0],
          [0, 100, 0],
        ]}
        color="green"
      />
      <Line
        points={[
          [0, 0, 0],
          [0, 0, 100],
        ]}
        color="blue"
      />
    </>
  );
}
