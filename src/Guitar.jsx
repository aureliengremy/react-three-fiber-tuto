import { useLoader } from '@react-three/fiber'
import React, { useEffect } from 'react'
import { Mesh } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'


const Guitar = () => {
    const gltf = useLoader(
        GLTFLoader, "/models/guitar/scene.gltf"
    )

    useEffect(()=> {
        gltf.scene.scale.set(1.5, 1.5, 1.5);
        gltf.scene.position.set(0, 1.5, 0);
        gltf.scene.traverse((object)=> {
            if(object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
            }
        });
    }, [gltf])
  return (
    <primitive object={gltf.scene}/>
  )
}

export default Guitar