import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useMemo } from 'react';

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

  // Custom shader to force the black logo to be pure white based on alpha
  const logoMaterial = useMemo(() => new THREE.ShaderMaterial({
    uniforms: { tDiffuse: { value: logoTexture } },
    transparent: true,
    depthTest: false,
    side: THREE.DoubleSide,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform sampler2D tDiffuse;
      varying vec2 vUv;
      void main() {
        vec4 tex = texture2D(tDiffuse, vUv);
        // Assuming the black parts of the logo have high alpha
        if (tex.a < 0.1) discard;
        gl_FragColor = vec4(1.0, 1.0, 1.0, tex.a);
      }
    `
  }), [logoTexture]);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      
      {/* The Floating Shadovis Logo inside the Prism */}
      <mesh ref={innerRef} position={[0, 0, 0]}>
        <planeGeometry args={[1.2, 1.2]} />
        <primitive object={logoMaterial} attach="material" />
      </mesh>

      {/* The Obsidian PRISM */}
      <mesh ref={outerRef} scale={1.5}>
        <octahedronGeometry args={[1.2, 0]} />
        <MeshTransmissionMaterial
          backside={true}
          samples={4}
          thickness={0.8}
          roughness={0.15}
          transmission={1}
          ior={1.8}
          chromaticAberration={0.1}
          anisotropy={0.3}
          color="#111111"
        />
      </mesh>
      
      {/* Dramatic lighting for dark obsidian */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={4} color="#ffffff" />
      <directionalLight position={[-10, -10, -5]} intensity={2} color="#ffffff" />
      <Environment preset="studio" />
    </Float>
  );
}
