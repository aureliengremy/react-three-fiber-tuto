import { useFrame } from '@react-three/fiber'
import React, { Fragment, useRef } from 'react'
import { Color } from 'three'

const Rings = () => {
    const itemRef = useRef([])

    useFrame((state) => {
        // generate different position for all different rings
        for(let i = 0; i < itemRef.current.length; i++) {
            let mesh = itemRef.current[i]
            let z = (i - 7 ) * 3.5
            mesh.position.set(0, 0, -z)

            // change size of the rings depend of the distance of the center (guitar)
            let dist = Math.abs(z)
            mesh.scale.set(1 - dist * 0.04, 1 - dist * 0.04, 1 - dist * 0.04)

            let colorScale = 1;
            if(dist > 2){
                colorScale = 1 - (Math.min(dist, 12) - 2)/ 10;
            }
            colorScale *= 0.5

            // change color of the rings
            if( i % 2 == 1 ) {
                mesh.material.emissive = new Color(1, 0.5, 0 ).multiplyScalar(1)
            } else {
                mesh.material.emissive = new Color(1, 1, 0.1).multiplyScalar(1)
            }
        }
    })

  return (
    <Fragment>
        {[0,0,0,0,0,0,0,0,0,0,0,0,0,0].map((v,i) => (
            <mesh 
                castShadow
                receiveShadow
                position={[0,0,0]}
                key={i}
                ref={(element) => (itemRef.current[i] = element)}
                >
                    <torusGeometry args={[3.50, 0.05, 16, 100]}/>
                    <meshStandardMaterial emissive={[0.5,0.5,0.5]} color={[0,0,0]}/>
            </mesh>
        ))}
    </Fragment>
  )
}

export default Rings