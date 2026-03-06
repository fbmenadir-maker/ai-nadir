import "./globals.css";

export const metadata = {
  title: "AI Nadir Maker",
  description: "توليد الصور ثلاثية الأبعاد والتحكم بالزوايا",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar">
      <body>{children}</body>
    </html>
  );
}
