import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  FireIcon,
  CogIcon,
} from "@heroicons/react/outline";

const menuItems = [
  { icon: HomeIcon, label: "Home", path: "/" },
  { icon: FireIcon, label: "Explore", path: "/explore" },
];

export default function Sidebar({ isOpen }) {
  return (
    <aside
      className={`${isOpen ? "w-64" : "w-16"
        } bg-white border-r border-gray-300 flex flex-col transition-width duration-300 overflow-y-auto h-screen sticky top-0 font-roboto text-black`}
    >
      <div className="flex items-center justify-center h-14 px-4 cursor-pointer select-none">
        {isOpen ? (
          <img
            src="/assets/youtube-icon.svg"
            alt="YouTube Logo"
            className="h-6"
          />
        ) : (
          <img
            src="/assets/youtube-logo.svg"
            alt="YouTube Icon"
            className="h-6 w-6"
          />
        )}
      </div>

      <nav className="flex flex-col mt-2 space-y-1 px-2">
        {menuItems.map(({ icon: Icon, label, path }) => (
          <NavLink
            key={label}
            to={path}
            className={({ isActive }) =>
              `flex items-center space-x-4 px-3 py-2 rounded w-full text-left hover:bg-gray-100 
               ${isActive ? "bg-gray-200 font-semibold" : ""}`
            }
          >
            <Icon className="h-6 w-6" />
            {isOpen && <span className="text-sm">{label}</span>}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
