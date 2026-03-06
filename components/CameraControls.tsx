"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

interface Props {
  imageUrl: string;
  onAngleChange?: (angles: { yaw: number; pitch: number; roll: number }) => void;
}

export default function CameraControls({ imageUrl, onAngleChange }: Props) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ camera }) => {
    if (onAngleChange) {
      const euler = new THREE.Euler().setFromQuaternion(camera.quaternion);
      onAngleChange({
        yaw: THREE.MathUtils.radToDeg(euler.y),
        pitch: THREE.MathUtils.radToDeg(euler.x),
        roll: THREE.MathUtils.radToDeg(euler.z)
      });
    }
  });

  return (
    <Canvas style={{ height: 400 }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <mesh ref={meshRef}>
        <planeGeometry args={[4, 4]} />
        <meshBasicMaterial map={new THREE.TextureLoader().load(imageUrl)} />
      </mesh>
      <OrbitControls enablePan={false} enableZoom={false} />
    </Canvas>
  );
}
