import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { prompt, imageUrl, angles } = await req.json();

    const res = await fetch("https://api.ai-horde.com/v2/generate/async", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // هنا نستخدم المتغير بشكل صحيح
        "x-api-key": process.env.AI_HORDE_API_KEY!,
      },
      body: JSON.stringify({
        prompt,
        init_image: imageUrl,
        width: 512,
        height: 512,
        cfg_scale: 7,
        steps: 30,
        seed: -1,
        rotation: angles.yaw,
      }),
    });

    const data = await res.json();

    return NextResponse.json({ generatedImage: data.output?.[0] || imageUrl });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to generate image" }, { status: 500 });
  }
}
