import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial, useTexture } from '@react-three/drei';
import * as THREE from 'three';

export default function InteractivePrism() {
  const outerRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  // Load the Shadovis logo
  const logoTexture = useTexture('/logo.png');

  useFrame((state) => {
    if (outerRef.current && innerRef.current) {
      // Slowly rotate the glass prism
      outerRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      outerRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      
      // Make the logo counter-rotate slightly or stay mostly upright
      innerRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;

      // Mouse reaction parallax
      const targetX = (state.mouse.x * 2) / 4;
      const targetY = (state.mouse.y * 2) / 4;

      outerRef.current.position.x = THREE.MathUtils.lerp(outerRef.current.position.x, targetX, 0.05);
      outerRef.current.position.y = THREE.MathUtils.lerp(outerRef.current.position.y, targetY, 0.05);
      
      innerRef.current.position.x = THREE.MathUtils.lerp(innerRef.current.position.x, targetX, 0.05);
      innerRef.current.position.y = THREE.MathUtils.lerp(innerRef.current.position.y, targetY, 0.05);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      
      {/* The Floating Shadovis Logo inside the Prism */}
      <mesh ref={innerRef} position={[0, 0, 0]}>
        <planeGeometry args={[1.2, 1.2]} />
        <meshBasicMaterial 
          map={logoTexture} 
          transparent={true} 
          side={THREE.DoubleSide} 
          depthTest={false}
        />
      </mesh>

      {/* The Refracting Glass PRISM */}
      <mesh ref={outerRef} scale={1.5}>
        {/* Octahedron looks like a beautiful diamond/prism */}
        <octahedronGeometry args={[1.2, 0]} />
        <MeshTransmissionMaterial
          backside={true}
          samples={4}
          thickness={0.5}
          roughness={0.05}
          transmission={1}
          ior={1.5}
          chromaticAberration={0.06}
          anisotropy={0.1}
          color="#ffffff"
        />
      </mesh>
      
      {/* Studio lighting for glass refractions */}
      <ambientLight intensity={1} />
      <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={1} color="#ffffff" />
      <Environment preset="studio" />
    </Float>
  );
}
