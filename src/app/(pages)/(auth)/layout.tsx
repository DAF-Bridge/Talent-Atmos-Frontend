export default function AuthPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div style={{ backgroundImage: "url('/login-bg.svg')" }}>{children}</div>
    </>
  );
}
