// context/BreadcrumbContext.jsx
import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const BreadcrumbContext = createContext();

const BreadcrumbProvider = ({ children }) => {
  const [breadcrumb, setBreadcrumb] = useState({ previous: null, current: null });
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setBreadcrumb(prev => ({
      previous: prev.current, // old current becomes previous
      current: location.pathname // new current page
    }));
  }, [location]);

  const goBack = () => {
    if (breadcrumb.previous) navigate(breadcrumb.previous);
  };

  return (
    <BreadcrumbContext.Provider value={{ breadcrumb, goBack }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export default BreadcrumbProvider;