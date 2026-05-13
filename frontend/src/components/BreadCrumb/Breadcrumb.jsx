// components/Breadcrumb.jsx
import React, { useContext } from "react";
import "./breadcrumb.css";
import { BreadcrumbContext } from "../../context/BreadcrumbContext";

const Breadcrumb = () => {
  const { breadcrumb, goBack } = useContext(BreadcrumbContext);

  if (!breadcrumb.current) return null; // hide on first page load

  return (
    <div className="breadcrumb-container">
      {breadcrumb.previous && (
        <span className="breadcrumb-prev" onClick={goBack}>
          {breadcrumb.previous.replace("/", "") || "Home"}
        </span>
      )}
      {breadcrumb.previous && <span className="breadcrumb-separator">→</span>}
      <span className="breadcrumb-current">
        {breadcrumb.current.replace("/", "") || "Home"}
      </span>
    </div>
  );
};

export default Breadcrumb;