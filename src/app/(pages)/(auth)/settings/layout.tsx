import BigFooter from "@/components/layout/BigFooter";
import NavigationBar from "@/components/layout/Navbar/NavBar";
import SettingSidebar from "@/components/layout/SettingSidebar";

export default function ListingPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NavigationBar />
      <div className="flex flex-row bg-white">
        <SettingSidebar />
        <main className="flex-grow p-4">{children}</main>
      </div>
      <BigFooter />
    </>
  );
}
