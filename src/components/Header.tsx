import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-black">
      <Link to="/">
        <img
          src="/assets/foretoken_logo.png"
          alt="Foretoken Logo"
          className="h-10 w-10"
        />

      </Link>
      {/* Add additional nav items here if needed */}
    </header>
  );
};

export default Header;
