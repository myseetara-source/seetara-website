import { AdminProvider } from "@/context/AdminContext";

export const metadata = {
  title: "Admin Panel | Seetara",
  description: "Seetara Admin Dashboard",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminProvider>
      {children}
    </AdminProvider>
  );
}

