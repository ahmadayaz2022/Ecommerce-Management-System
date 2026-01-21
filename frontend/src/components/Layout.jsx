// components/layout/Layout.jsx
import Sidebar from "./Sidebar";
import Header from "./layout/Header";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
