import React from "react";

const spinnerStyle: React.CSSProperties = {
  border: "4px solid #f3f3f3",
  borderTop: "4px solid #3498db",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  animation: "spin 1s linear infinite",
  margin: "auto",
};

const spinnerKeyframes = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

export const Spinner = () => {
  return (
    <>
      <style>{spinnerKeyframes}</style>
      <div style={spinnerStyle}></div>
    </>
  );
}
