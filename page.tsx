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

      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) setImage(URL.createObjectURL(file));
        }}
      />

      {image && (
        <div id="camera-container">
          <CameraControls
            imageUrl={image}
            onAngleChange={(a) => setAngles(a)}
          />
        </div>
      )}

      {image && (
        <p id="anglesDisplay">
          Current Angles: Yaw {angles.yaw.toFixed(1)}, Pitch {angles.pitch.toFixed(1)}, Roll {angles.roll.toFixed(1)}
        </p>
      )}

      <footer>تطوير من طرف: حوامرية نذير</footer>
    </div>
  );
}
