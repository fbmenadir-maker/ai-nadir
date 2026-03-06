const generateImage = async () => {
  if (!image) return;
  setLoading(true);
  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: "Generate new image from uploaded image",
        imageUrl: image,
        angles,
      }),
    });
    const data = await res.json();
    if (data.generatedImage) setImage(data.generatedImage);
  } catch (err) {
    console.error(err);
    alert("حدث خطأ أثناء توليد الصورة!");
  } finally {
    setLoading(false);
  }
};
