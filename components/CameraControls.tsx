"use client";

import { useState } from "react";

export default function CameraControls() {

  const [angle, setAngle] = useState(0);

  const rotateLeft = () => {
    setAngle(angle - 45);
  };

  const rotateRight = () => {
    setAngle(angle + 45);
  };

  const reset = () => {
    setAngle(0);
  };

  return (
    <div className="controls">
      <button onClick={rotateLeft}>Rotate Left</button>
      <button onClick={rotateRight}>Rotate Right</button>
      <button onClick={reset}>Reset</button>

      <p>Angle: {angle}°</p>
    </div>
  );
}
