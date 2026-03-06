"use client";
import { useState } from "react";
import CameraControls from "../components/CameraControls";
import "./globals.css";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [angles, setAngles] = useState({ yaw: 0, pitch: 0, roll: 0 });

  return (
    <div>
      <h1>FBM Enadir Maker</h1>
      {/* باقي الكود كما هو */}
    </div>
  );
}
