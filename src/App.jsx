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
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

const CarShow = () => {
  return (
    <Fragment>
      <OrbitControls target={[0, 1.4, 0]} maxPolarAngle={1.45} />
      <PerspectiveCamera makeDefault fov={50} position={[0, 2, 6]} />
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

      <EffectComposer>
        {/* Make the scene and models more blur when you move back with the camera */}
        {/* <DepthOfField focusDistance={0.0035} focalLength={0.01} bokehScale={3} height={480} /> */}
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={2.3} // The bloom intensity.
          width={300} // render width
          height={300} // render height
          kernelSize={5} // blur kernel size
          // luminanceThreshold={0.8} // luminance threshold. Raise this value to mask out darker elements in the scene.
          // luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
        />
        <ChromaticAberration
          blendFunction={BlendFunction.NORMAL} // blend mode
          offset={[0.0006, 0.0006]} // color offset
        />
      </EffectComposer>

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
