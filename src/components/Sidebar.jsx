import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  HomeIcon,
  FireIcon,
} from "@heroicons/react/outline";

// Top-level menu
const menuItems = [
  { icon: HomeIcon, label: "Home", path: "/" },
  { icon: FireIcon, label: "Explore", path: "/explore" },
];

// Business cases
const businessCases = [
  { id: 1, title: "Low latency pre-fetching of hot Videos in a Locality", path: "/bc1" },
  { id: 2, title: "Efficient Estimation of Hashtag Trends", path: "/bc2" },
  { id: 3, title: "Median Age Estimation using Munro-Paterson Algorithm", path: "/bc3" },
  { id: 4, title: "Real-Time Viewer Analytics using Fenwick Trees", path: "/bc4" },
  { id: 5, title: "Identifying CDN Bottlenecks Using Max-Flow", path: "/bc5" },
  { id: 6, title: "View Density Analysis using Sweep Line Algorithm", path: "/bc6" },
  { id: 8, title: "Video Recommendation Using KD-Tree Embeddings", path: "/bc8" },
];

export default function Sidebar({ isOpen }) {
  const location = useLocation();
  const isExplore = location.pathname === "/explore";

  return (
    <aside
      className={`${isOpen ? "w-64" : "w-16"} bg-white border-r border-gray-300 flex flex-col transition-width duration-300 overflow-y-auto h-screen sticky top-0 font-roboto text-black`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-14 px-4 cursor-pointer select-none">
        {isOpen ? (
          <img src="/assets/youtube-icon.svg" alt="YouTube Logo" className="h-6" />
        ) : (
          <img src="/assets/youtube-logo.svg" alt="YouTube Icon" className="h-6 w-6" />
        )}
      </div>

      {/* Main menu */}
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
            <Icon className="h-6 w-6 flex-shrink-0" />
            {isOpen && <span className="text-sm truncate">{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Show Business Cases only if Explore is NOT selected */}
      {!isExplore && (
        <div className="mt-3 px-2 space-y-1">
          {businessCases.map(({ id, title, path }) => (
            <NavLink
              key={id}
              to={path}
              className={({ isActive }) =>
                `block px-3 py-2 text-sm rounded hover:bg-gray-100 truncate 
                ${isActive ? "bg-gray-200 font-semibold" : ""}`
              }
              title={title}
            >
              {isOpen ? title : title.charAt(0)}
            </NavLink>
          ))}
        </div>
      )}
    </aside>
  );
}
