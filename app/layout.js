export const metadata = {
  title: "Inf.C",
  description: "Your custom chatbot",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
