import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-black">
      <Link to="/">
        <div className="w-12 h-12">
          <img
            src="/assets/foretoken_logo.png"
            alt="Foretoken Logo"
            className="object-contain w-full h-full"
          />
        </div>
      </Link>
      {/* Add additional nav items here if needed */}
    </header>
  );
};

export default Header;
