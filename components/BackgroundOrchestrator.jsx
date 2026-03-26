"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as random from "maath/random";

function ParticleField(props) {
  const ref = useRef();
  const sphere = useMemo(() => {
    const data = random.inSphere(new Float32Array(5001), { radius: 1.5 });
    for (let i = 0; i < data.length; i++) {
        if (isNaN(data[i])) data[i] = 0;
    }
    return data;
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
    
    // React to cursor slightly if needed
    if (state.pointer) {
        ref.current.rotation.x += (state.pointer.y * 0.01);
        ref.current.rotation.y += (state.pointer.x * 0.01);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#a855f7"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function BackgroundOrchestrator() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleField />
      </Canvas>
    </div>
  );
}
