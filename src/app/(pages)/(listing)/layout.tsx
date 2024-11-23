import BigFooter from "@/components/layout/BigFooter";
import NavigationBar from "@/components/layout/Navbar/NavBar";

export default function ListingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavigationBar />
      {children}
      <BigFooter />
    </>
  );
}
