import {
  CubeCamera,
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Fragment, Suspense, useState } from "react";
import "./App.css";
import Ground from "./Ground";
import Guitar from "./Guitar";
import Rings from "./Rings";
import Boxes from './Box';

function CarShow() {
  return (
    <Fragment>
      <OrbitControls target={[0, 1.3, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[3, 2, 5]} />
      <color args={[0, 0, 0]} attach="background" />

      {/* make all the element reflect all light texture */}
      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <Fragment>
            <Environment map={texture} />
            <Guitar />
          </Fragment>
        )}
      </CubeCamera>

      <Rings />
      <Boxes/>
      <spotLight
        color={[1, 0.25, 0.7]}
        intensity={1.5}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <spotLight
        color={[0.14, 0.5, 1]}
        intensity={2}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
      />
      <Ground />
    </Fragment>
  );
}

function App() {
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow />
      </Canvas>
    </Suspense>
  );
}

export default App;
