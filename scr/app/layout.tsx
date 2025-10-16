import "../styles/global.css";

export const metadata = {
  title: "My App",
  description: "Next.js + Prisma + NextAuth + Tailwind Project",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        {children}
      </body>
    </html>
  );
}
