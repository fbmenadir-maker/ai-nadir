"use client";

import { useState } from "react";
import { generateImage } from "../lib/aiHorde";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [angle, setAngle] = useState("front view");

  const generate = async () => {
    const fullPrompt = `${prompt}, ${angle}, cinematic lighting, ultra realistic`;
    const res = await generateImage(fullPrompt);
    console.log(res); // لاحقًا يمكن عرض الصورة الناتجة
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>AI Nadir Camera</h1>

      <input
        placeholder="Describe image..."
        onChange={(e) => setPrompt(e.target.value)}
      />

      <div style={{ marginTop: 10 }}>
        <button onClick={() => setAngle("front view")}>Front</button>
        <button onClick={() => setAngle("left view")}>Left</button>
        <button onClick={() => setAngle("right view")}>Right</button>
        <button onClick={() => setAngle("top view")}>Top</button>
      </div>

      <button onClick={generate} style={{ marginTop: 20 }}>
        Generate
      </button>
    </div>
  );
}
