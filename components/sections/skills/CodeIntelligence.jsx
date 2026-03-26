"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Float, MeshDistortMaterial, Sphere } from "@react-three/drei";
import * as THREE from "three";

const SKILLS = [
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#ffffff" },
  { name: "GSAP", color: "#88CE02" },
  { name: "Three.js", color: "#ff3333" },
  { name: "Python", color: "#3776AB" },
  { name: "Node.js", color: "#339933" },
  { name: "Tailwind", color: "#06B6D4" },
  { name: "TypeScript", color: "#3178C6" }
];

function SkillNode({ name, color, position, speed }) {
  const ref = useRef();
  
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    ref.current.position.y = position[1] + Math.sin(time * speed + position[0]) * 0.2;
    ref.current.rotation.y += 0.01;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <mesh ref={ref} position={position}>
        <Text
          fontSize={0.2}
          color={color}
          anchorX="center"
          anchorY="middle"
        >
          {name}
        </Text>
      </mesh>
    </Float>
  );
}

function Nucleus() {
  const mesh = useRef();
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.x = Math.cos(time / 4) * 0.2;
    mesh.current.rotation.y = Math.sin(time / 4) * 0.2;
  });

  return (
    <Sphere ref={mesh} args={[0.4, 64, 64]}>
      <MeshDistortMaterial
        color="#a855f7"
        speed={3}
        distort={0.4}
        radius={1}
        emissive="#a855f7"
        emissiveIntensity={0.5}
      />
    </Sphere>
  );
}

export default function CodeIntelligence() {
  const nodes = useMemo(() => {
    return SKILLS.map((skill, i) => {
      const angle = (i / SKILLS.length) * Math.PI * 2;
      const radius = 1.6 + Math.random() * 0.4;
      const pos = [
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        (Math.random() - 0.5) * 1,
      ];
      
      // Safety check for NaN
      const safePos = pos.map(v => isNaN(v) ? 0 : v);

      return {
        ...skill,
        position: safePos,
        speed: 0.5 + Math.random() * 1
      };
    });
  }, []);

  return (
    <div className="w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Nucleus />
        {nodes.map((node, i) => (
          <SkillNode key={i} {...node} />
        ))}
      </Canvas>
    </div>
  );
}
