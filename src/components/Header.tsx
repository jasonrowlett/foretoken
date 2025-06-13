import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-black">
      <Link to="/" className="text-white text-xl font-bold">
        Foretoken
      </Link>
      {/* Add additional nav items here if needed */}
    </header>
  );
};

export default Header;
