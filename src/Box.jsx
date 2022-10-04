import React, { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3 } from "three";

const Box = ({ color }) => {
  const box = useRef();
  const time = useRef(0);
  const [position, setPosition] = useState(getInitialPosition());
  const [xRotSpeed] = useState(() => Math.random());
  const [yRotSpeed] = useState(() => Math.random());
  const [scale] = useState(() => Math.pow(Math.random(), 2.0) * 0.5 + 0.05);

  function getInitialPosition() {
    let v = new Vector3((Math.random() * 2 - 1) * 3, Math.random() * 2.5 + 0.1, (Math.random() * 2 - 1) * 15); 
    if(v.x < 0) v.x -= 1.75;
    if(v.x > 0) v.x += 1.75;

    return v;
  }

  function resetPosition() {
    // the first position will be: from -3 to +3, from 0.1 to 2.6, from -1.5 to +1.5
    let v = new Vector3((Math.random() * 2 - 1) * 3, Math.random() * 2.5 + 0.1, Math.random() * 10 + 10); 
    // make more random position
    if(v.x < 0) v.x -= 1.75;
    if(v.x > 0) v.x += 1.75;

    setPosition(v);
  }

  useFrame(
    (state, delta) => {
      time.current += delta * 1.2;
      let newZ = position.z - (time.current);

      if(newZ < -10) {
        resetPosition();
        time.current = 0;
      }

    // Make the box move from Z
    //   box.current.position.set(
    //     position.x, 
    //     position.y, 
    //     newZ, 
    //   )
      // delta is how long it is past before the last render
      box.current.rotation.x += delta * xRotSpeed;
      box.current.rotation.y += delta * yRotSpeed;
    },
    [xRotSpeed, yRotSpeed, position]
  );

  return (
    <mesh
      ref={box}
      rotation-x={Math.PI * 0.5}
      scale={scale}
      castShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} envMapIntensity={0.15} />
    </mesh>
  );
}

const Boxes = () => {
  const [arr] = useState(() => {
    // make 100 box
    let a = [];
    for(let i = 0; i < 100; i++) a.push(0);
    return a;
  });

  return <>
  {/* even and odd box will have different color */}
    {arr.map((e, i) => <Box key={i} color={i % 2 === 0 ? [1, 0.5, 0] : [1, 1, 0.1] }/>)}
  </>
}

export default Boxes;