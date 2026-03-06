// lib/aiHorde.ts
export async function generateImage(prompt: string) {
  const response = await fetch("https://stablehorde.net/api/v2/generate/async", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": process.env.AI_HORDE_API_KEY || "0000000000"
    },
    body: JSON.stringify({
      prompt: prompt,
      params: { width: 1024, height: 1024, steps: 30, cfg_scale: 7 },
      models: ["SDXL 1.0"]
    })
  });

  return response.json();
}
