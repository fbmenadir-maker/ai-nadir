"use client";
import { useState } from "react";
import CameraControls from "../components/CameraControls";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [angles, setAngles] = useState({ yaw: 0, pitch: 0, roll: 0 });

  const handleAngleChange = (a: { yaw: number; pitch: number; roll: number }) => {
    setAngles(a);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>FBM Enadir Maker</h1>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) setImage(URL.createObjectURL(file));
        }}
      />

      {image && (
        <div style={{ marginTop: 20 }}>
          <CameraControls imageUrl={image} onAngleChange={handleAngleChange} />
          <p>
            Current Angles: Yaw {angles.yaw.toFixed(1)}, Pitch {angles.pitch.toFixed(1)}, Roll {angles.roll.toFixed(1)}
          </p>
        </div>
      )}
    </div>
  );
}
