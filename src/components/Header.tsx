import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-black">
      <Link to="/">
        <div className="w-12 h-12 border border-red-500">
          <img
            src="https://via.placeholder.com/48x48.png?text=FT"
            alt="Test Logo"
            className="object-contain w-full h-full"
          />
        </div>
      </Link>
    </header>
  );
};

export default Header;
