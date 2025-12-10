import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PageHeader({
  title,
  subtitle,
  role,
  showBackArrow = true,
  onBack
}) {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine if back arrow should be shown
  // Don't show on dashboard/home page
  const shouldShowBack = showBackArrow && location.pathname !== "/";

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate(-1);
    }
  };

  if (!title) return null;

  return (
    <div className="flex items-center justify-between flex-wrap gap-3 mb-4.5">
      <div className="flex items-center gap-3">
        {shouldShowBack && (
          <button
            onClick={handleBack}
            className="flex items-center justify-center w-8 h-8 "
            aria-label="Go back"
          >
            <ArrowLeft size={20} className="text-black cursor-pointer" />
          </button>
        )}
        <div className="flex flex-col">
          <h1 className="text-primary font-semibold text-[16px]">
            {title}
          </h1>
          {subtitle && (
            <span className="text-primary-light text-sm">
              {subtitle}
            </span>
          )}
        </div>
      </div>

      {role && (
        <span className="inline-flex items-center px-3 py-1 rounded-full border text-xs font-medium text-primary-light border-gray-200">
          {role}
        </span>
      )}
    </div>
  );
}

