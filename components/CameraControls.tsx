"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

type Props = {
  image: string | null;
  onAngleChange: (angles: { yaw: number; pitch: number; roll: number }) => void;
};

export default function CameraControls({ image, onAngleChange }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      600 / 400,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(600, 400);
    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);

    camera.position.z = 2;

    let mesh: THREE.Mesh | null = null;

    if (image) {
      const textureLoader = new THREE.TextureLoader();
      const texture = textureLoader.load(image);

      const geometry = new THREE.PlaneGeometry(2, 2);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
      });

      mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    }

    const animate = () => {
      requestAnimationFrame(animate);

      const yaw = camera.rotation.y;
      const pitch = camera.rotation.x;
      const roll = camera.rotation.z;

      onAngleChange({
        yaw,
        pitch,
        roll,
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      renderer.dispose();
      if (mountRef.current) {
        mountRef.current.innerHTML = "";
      }
    };
  }, [image]);

  return <div ref={mountRef}></div>;
}
