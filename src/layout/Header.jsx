import { useMemo, useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Bell, User2 } from "lucide-react";
import SearchInput from "../components/common/SearchInput";
import ActionModal from "../components/common/ActionModal";
import rejectKyc from "../assets/image/rejectKyc.svg";

const ROUTE_TITLES = {
  "/": "Dashboard",
  "/approvals": "Approvals",
  "/jobs": "Jobs",
  "/cleaners": "Cleaners",
  "/customers": "Customers",
  "/payments": "Payments & Escrow",
  "/settings": "Settings",
};

function humanizeSegment(segment) {
  if (!segment) return "";
  return segment
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export default function Header({
  extraCrumbs = [],
  title,
  onSearchChange,
  searchPlaceholder = "Search",
  sidebarOpen = true,
}) {
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // ✅ ADD THIS
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const breadcrumbs = useMemo(() => {
    const { pathname } = location;
    if (pathname === "/") {
      return [{ label: ROUTE_TITLES["/"], path: "/" }, ...extraCrumbs];
    }
    const segments = pathname.split("/").filter(Boolean);
    const crumbs = segments.map((segment, index) => {
      const path = "/" + segments.slice(0, index + 1).join("/");
      const label = ROUTE_TITLES[path] || humanizeSegment(segment);
      return { label, path };
    });
    return [...crumbs, ...extraCrumbs];
  }, [location, extraCrumbs]);

  const currentTitle =
    title || (breadcrumbs.length ? breadcrumbs[breadcrumbs.length - 1].label : "");

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <>
      <header
        className={`fixed top-0 right-0 z-30 flex items-center justify-between bg-white px-6 py-4 border-b border-gray-200 transition-all duration-300 ease-in-out
        ${sidebarOpen ? "lg:left-[290px] md:left-[240px] left-0" : "left-0"}`}
      >
        <div>
          <nav className="flex items-center gap-1 mb-1 text-[14px]">
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <span key={crumb.path || `${crumb.label}-${index}`}>
                  {!isLast ? (
                    <Link
                      to={crumb.path || "#"}
                      className="text-[#7E7E87] font-normal hover:text-[#1C1C1C] transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="font-semibold text-[#1C1C1C]">{crumb.label}</span>
                  )}
                  {!isLast && <span className="mx-1 text-[#7E7E87]">/</span>}
                </span>
              );
            })}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <SearchInput placeholder={searchPlaceholder} onChange={onSearchChange} />

          <button
            type="button"
            className="relative inline-flex items-center justify-center w-9 h-9 rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
          >
            <Bell size={16} />
            <span className="absolute -top-0.5 -right-0.5 inline-flex h-3 w-3 rounded-full bg-blue-500 border-2 border-white" />
          </button>

          <div className="relative">
            <button
              ref={buttonRef}
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
            >
              <User2 size={18} />
            </button>

            {/* Overlay */}
            {isDropdownOpen && (
              <div
                className="fixed inset-0 bg-black/10 z-50"
                onClick={() => setIsDropdownOpen(false)}
              />
            )}

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-2 w-64 bg-white rounded-[16px] shadow-lg border border-gray-200 z-50 overflow-hidden"
              >
                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <User2 size={20} className="text-gray-600" />
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#1C1C1C]">John Doe</p>
                  </div>

                  <span className="px-2.5 py-1 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md">
                    Admin
                  </span>
                </div>

                {/* Profile Link */}
                <Link
                  to="/settings"
                  onClick={() => setIsDropdownOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                    <User2 size={18} className="text-gray-600" />
                  </div>
                  <span className="text-sm font-medium text-[#1C1C1C]">My Profile</span>
                </Link>

                {/* Logout */}
                <div className="p-4 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsLogoutModalOpen(true); // ✅ OPEN MODAL HERE
                    }}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm font-medium text-[#1C1C1C] hover:bg-gray-50 transition-colors text-center"
                  >
                    Log out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Logout Modal */}
      <ActionModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        illustration={<img src={rejectKyc} alt="Logout illustration" className="max-h-40" />}
        title="Logout Account"
        description="Are you sure you want to logout your account?"
        primaryLabel="Logout"
        onPrimary={() => {
          setIsLogoutModalOpen(false);
          console.log("Logged out");
        }}
        hideSecondary
      />
    </>
  );
}
