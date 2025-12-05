import { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import AppRoutes from "../routes/AppRoutes";
import Header from "./Header";
import { Menu } from "lucide-react";

export default function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Close sidebar on mobile by default, open on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F9FAFB]">
      {/* Fixed Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Floating toggle button (shows when sidebar is closed) */}
      {!isSidebarOpen && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 bg-white border border-gray-200 rounded-lg p-2 shadow-sm hover:bg-gray-50 transition-all duration-300"
        >
          <Menu size={20} className="text-gray-600" />
        </button>
      )}

      {/* Fixed Header */}
      <Header sidebarOpen={isSidebarOpen} />

      {/* Main content area */}
      <div 
        className={`flex-1 flex flex-col transition-all duration-300 ease-in-out
          ${isSidebarOpen 
            ? 'lg:ml-[290px] md:ml-[240px] ml-0' 
            : 'ml-0'
          }`}
        style={{ 
          marginTop: '64px'
        }}
      >
        {/* Scrollable Content area with padding */}
        <div className="flex-1 p-6 overflow-y-auto">
          <AppRoutes />
        </div>
      </div>
    </div>
  );
}

