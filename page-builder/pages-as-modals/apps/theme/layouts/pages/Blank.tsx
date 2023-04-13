import React from "react";

// We created this Blank template just so we can have modal content being rendered without
// any surrounding HTML (like header and footer, which is the case with Static layout).
const Blank: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <>{children}</>;
};

export default Blank;
