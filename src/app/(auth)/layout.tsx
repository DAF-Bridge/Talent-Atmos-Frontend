export default function AuthPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body style={{ backgroundImage: "url('/login-bg.svg')" }}>
        {children}
      </body>
    </html>
  );
}
