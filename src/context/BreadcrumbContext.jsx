import { createContext, useContext, useState } from "react";

const BreadcrumbContext = createContext();

export function BreadcrumbProvider({ children }) {
  const [extraCrumbs, setExtraCrumbs] = useState([]);
  const [parentBreadcrumbOnClick, setParentBreadcrumbOnClick] = useState(null);

  return (
    <BreadcrumbContext.Provider value={{ 
      extraCrumbs, 
      setExtraCrumbs,
      parentBreadcrumbOnClick,
      setParentBreadcrumbOnClick
    }}>
      {children}
    </BreadcrumbContext.Provider>
  );
}

export function useBreadcrumb() {
  const context = useContext(BreadcrumbContext);
  if (!context) {
    throw new Error("useBreadcrumb must be used within BreadcrumbProvider");
  }
  return context;
}

