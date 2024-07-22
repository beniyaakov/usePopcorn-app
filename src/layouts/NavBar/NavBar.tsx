import React from "react";
import Logo from "./Logo";

type NavBarProps = {
  children:React.ReactNode
}

export default function NavBar({children}:NavBarProps) {
  return (
    <nav className="nav-bar">
          <Logo />
        {children}
    </nav>
  );
}
