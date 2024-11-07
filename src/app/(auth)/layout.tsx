export default function AuthPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className="h-[100vh] w-[100vw] overflow-hidden"
        style={{ backgroundImage: "url('/login-bg.svg')" }}
      >
        {children}
      </body>
    </html>
  );
}
