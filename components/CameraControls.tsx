"use client";

import React, { useEffect } from "react";

interface CameraControlsProps {
  imageUrl: string;
  onAngleChange: (angle: number) => void;
}

export default function CameraControls({ imageUrl, onAngleChange }: CameraControlsProps) {

  useEffect(() => {
    onAngleChange(0);
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <img
        src={imageUrl}
        alt="preview"
        style={{
          width: "100%",
          maxWidth: "500px",
          borderRadius: "10px"
        }}
      />

      <div style={{ marginTop: "20px" }}>
        <button onClick={() => onAngleChange(-45)}>Rotate Left</button>
        <button onClick={() => onAngleChange(45)} style={{ marginLeft: "10px" }}>
          Rotate Right
        </button>
      </div>
    </div>
  );
}
