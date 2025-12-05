import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function PageHeader({ 
  title, 
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
    <div className="flex items-center gap-3 mb-4.5">
      {shouldShowBack && (
        <button
          onClick={handleBack}
          className="flex items-center justify-center w-8 h-8 "
          aria-label="Go back"
        >
          <ArrowLeft size={20} className="text-black cursor-pointer" />
        </button>
      )}
      <h1 className="text-primary font-semibold text-[16px]">
        {title}
      </h1>
    </div>
  );
}

