import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutWrapperProps {
  children: React.ReactNode;
}

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1">
        <Sidebar />
        <main
          id="main-content"
          className="flex-1 bg-white p-6 overflow-auto"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
