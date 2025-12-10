import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  ShieldCheck,
  Briefcase,
  Users2,
  UserCog,
  WalletCards,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import logo from '../assets/icon/logoo.svg';

export default function Sidebar({ isOpen, toggleSidebar }) {
  const menu = [
    { name: "Dashboard", path: "/", icon: LayoutGrid },
    { name: "Approvals", path: "/approvals", icon: ShieldCheck },
    { name: "Jobs", path: "/jobs", icon: Briefcase },
    { name: "Cleaners", path: "/cleaners", icon: Users2 },
    { name: "Customers", path: "/customers", icon: UserCog },
    { name: "Payments & Escrow", path: "/payments", icon: WalletCards },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  return (
    <>
      {/* Overlay for mobile and medium screens */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 lg:hidden transition-opacity duration-300 ease-in-out"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 h-screen bg-white z-40 overflow-hidden transition-all duration-300 ease-in-out
        ${isOpen 
          ? 'left-0 w-[290px] lg:w-[240px] xl:w-[290px] border-r border-gray-200' 
          : '-left-[290px] lg:-left-[240px] xl:-left-[290px] w-0'
        }`}
        style={{ overflow: isOpen ? "visible" : "hidden" }}
      >
        <div className={`h-full flex flex-col justify-between transition-all duration-300 ${isOpen ? 'p-4 opacity-100' : 'p-0 opacity-0 pointer-events-none'}`}>
        {/* USER HEADER */}
        <div>
          <div className="flex items-center gap-3 p-3 bg-gray-100 rounded-xl mb-6 border border-gray-200 border-b border-[#EDEEF3]">
            <img
              src={logo}
              className="w-10 h-10"
              alt="Logo"
            />
            <div className="flex-1">
              <p className="font-semibold">AussieMate</p>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
            <button
              onClick={toggleSidebar}
              className="text-gray-600 hover:text-gray-800 cursor-pointer lg:block hidden"
            >
              {isOpen ? (
                <ChevronRight size={18} />
              ) : (
                <ChevronLeft size={18} />
              )}
            </button>
          </div>

          {/* MENU ITEMS */}
          <nav className="flex flex-col gap-3">
            {menu.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  onClick={() => {
                    // Close sidebar on mobile when item is clicked
                    if (window.innerWidth < 1024) {
                      toggleSidebar();
                    }
                  }}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors
                    ${isActive 
                      ? "bg-[#F9FAFB] text-blue-600 font-medium border border-[#EBF2FD]" 
                      : "text-gray-600 hover:bg-gray-100"}`
                  }
                >
                  <Icon size={18} />
                  {item.name}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* LOGOUT */}
        <button className="flex items-center gap-3 text-gray-600 hover:bg-gray-100 px-3 py-2 rounded-lg">
          <LogOut size={18} />
          Logout
        </button>
        </div>
      </div>
    </>
  );
}

