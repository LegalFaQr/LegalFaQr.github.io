import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Environment, Float } from '@react-three/drei';
import * as THREE from 'three';

export default function IntelligentSphere() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Slowly rotate the intelligence
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      
      // Slight mouse reaction
      meshRef.current.position.x = THREE.MathUtils.lerp(
        meshRef.current.position.x,
        (state.mouse.x * 2) / 4,
        0.05
      );
      meshRef.current.position.y = THREE.MathUtils.lerp(
        meshRef.current.position.y,
        (state.mouse.y * 2) / 4,
        0.05
      );
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} scale={1.5}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshDistortMaterial
          color="#ffffff"
          emissive="#ffffff"
          emissiveIntensity={0.1}
          roughness={0.1}
          metalness={0.8}
          distort={0.4} // Distorts the mesh like fluid
          speed={2} // Speed of the fluid distortion
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </mesh>
      
      {/* Studio lighting for premium reflections */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#b1e1ff" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#e5b1ff" />
      <Environment preset="city" />
    </Float>
  );
}
