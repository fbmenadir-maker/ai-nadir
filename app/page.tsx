"use client";
import { useState } from "react";
import CameraControls from "../components/CameraControls";
import "./globals.css";

export default function Home() {
  const [image, setImage] = useState<string | null>(null);
  const [angles, setAngles] = useState({ yaw: 0, pitch: 0, roll: 0 });
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!image) return;
    setLoading(true);

    try {
      const imgResp = await fetch(image);
      const blob = await imgResp.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64data = reader.result?.toString().split(",")[1];
        const res = await fetch("https://api.theaiengine.com/v1/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer YOUR_API_KEY"
          },
          body: JSON.stringify({
            model: "SDXL",
            prompt: `Generate an image from this input at yaw:${angles.yaw}, pitch:${angles.pitch}, roll:${angles.roll}`,
            init_image: base64data,
            guidance_scale: 7.5,
            steps: 30,
            width: 512,
            height: 512
          })
        });

        const data = await res.json();
        if (data && data.output && data.output.length > 0) {
          setGeneratedImage(`data:image/png;base64,${data.output[0]}`);
        }
        setLoading(false);
      };
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

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
          <CameraControls imageUrl={image} onAngleChange={(a) => setAngles(a)} />
        </div>
      )}

      {image && (
        <p id="anglesDisplay">
          Current Angles: Yaw {angles.yaw.toFixed(1)}, Pitch {angles.pitch.toFixed(1)}, Roll {angles.roll.toFixed(1)}
        </p>
      )}

      {image && (
        <button className="generate-btn" onClick={handleGenerate} disabled={loading}>
          {loading ? "Generating..." : "Generate"}
        </button>
      )}

      {generatedImage && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <h2>Generated Image</h2>
          <img src={generatedImage} alt="Generated" style={{ maxWidth: "100%" }} />
        </div>
      )}

      <footer>تطوير من طرف: حوامرية نذير</footer>
    </div>
  );
}
