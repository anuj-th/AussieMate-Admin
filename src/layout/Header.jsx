import { useMemo, useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Bell, CircleUserRound, User2 } from "lucide-react";
import SearchInput from "../components/common/SearchInput";
import Button from "../components/common/Button";
import NotificationsPanel from "./NotificationsPanel";
import profile from "../assets/icon/profile.svg";

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
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const notifRef = useRef(null);
  const notifButtonRef = useRef(null);

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
      const clickedOutsideDropdown =
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target);

      const clickedOutsideNotif =
        notifRef.current &&
        !notifRef.current.contains(event.target) &&
        notifButtonRef.current &&
        !notifButtonRef.current.contains(event.target);

      if (clickedOutsideDropdown) {
        setIsDropdownOpen(false);
      }

      if (clickedOutsideNotif) {
        setIsNotifOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    if (isNotifOpen) setIsNotifOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotifOpen(!isNotifOpen);
    if (isDropdownOpen) setIsDropdownOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 right-0 z-30 flex items-center justify-between bg-white px-6 py-4 border-b border-gray-200 transition-all duration-300 ease-in-out
        ${sidebarOpen 
          ? 'lg:left-[240px] xl:left-[290px] left-0' 
          : 'left-0'
        }`}
    >
      <div className={`${!sidebarOpen ? "pl-10" : ""}`}>
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
                  <span className="font-semibold text-[#1C1C1C]">
                    {crumb.label}
                  </span>
                )}
                {!isLast && (
                  <span className="mx-1 text-[#7E7E87]">/</span>
                )}
              </span>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:block">
          <SearchInput
            placeholder={searchPlaceholder}
            onChange={onSearchChange}
          />
        </div>

        <div className="relative">
          <button
            ref={notifButtonRef}
            type="button"
            onClick={toggleNotifications}
            className="relative inline-flex items-center justify-center w-9 h-9 text-gray-600 cursor-pointer"
          >
            <Bell size={20} />
            <span className="absolute -top-[-5px] -right-[-8px] inline-flex h-[10px] w-[10px] rounded-full bg-blue-500 border-2 border-white" />
          </button>

          <NotificationsPanel
            isOpen={isNotifOpen}
            panelRef={notifRef}
          />
        </div>

        <div className="relative">
          <button
            ref={buttonRef}
            type="button"
            onClick={toggleDropdown}
            className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#F9F9F9] border-2 border-[#F2F2F2] text-gray-700 cursor-pointer"
          >
            <img src={profile} alt="Profile" className="h-5 w-5" />
          </button>

          {/* Backdrop Overlay */}
          {isDropdownOpen && (
            <div
              className="fixed inset-0 "
              onClick={() => setIsDropdownOpen(false)}
            />
          )}

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute right-0 mt-2 w-64 bg-white rounded-[16px] shadow-lg border border-gray-200 z-60 overflow-hidden"
            >
              {/* User Info Section */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <img src={profile} alt="Profile" className="w-5 h-5 object-cover" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-[#1C1C1C]">John Doe</p>
                </div>
                <span className="px-2.5 py-1 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-md">
                  Admin
                </span>
              </div>

              {/* My Profile Link */}
              <Link
                to="/settings"
                onClick={() => setIsDropdownOpen(false)}
                className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-white  flex items-center justify-center">
                <CircleUserRound size={20} className="text-gray-600"/>
                </div>
                <span className="text-sm font-medium text-[#1C1C1C]">My Profile</span>
              </Link>

              {/* Logout Button */}
              <div className="p-3 border-t border-gray-200">
                <Button
                  fullWidth
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsDropdownOpen(false);
                    // Add your logout logic here
                    console.log("Logout clicked");
                  }}
                >
                  Log out
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

    </header>
  );
}

