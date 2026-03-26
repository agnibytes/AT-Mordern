"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float d = length(p);
    
    vec3 color1 = vec3(0.5, 0.2, 0.9); // Purple
    vec3 color2 = vec3(0.9, 0.2, 0.6); // Pink
    vec3 color3 = vec3(0.1, 0.0, 0.2); // Dark Deep
    
    float noise = sin(p.x * 2.0 + uTime) * cos(p.y * 2.0 - uTime) * 0.5 + 0.5;
    vec3 finalColor = mix(color1, color2, noise);
    finalColor = mix(finalColor, color3, d * 0.8);
    
    gl_FragColor = vec4(finalColor, 0.4);
  }
`;

export default function ShaderGradient() {
  const meshRef = useRef();
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
    }),
    []
  );

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.material.uniforms.uTime.value = state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <mesh ref={meshRef} scale={[4, 4, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
      />
    </mesh>
  );
}
