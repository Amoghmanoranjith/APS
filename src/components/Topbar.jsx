import React, { useState, useEffect } from "react";
import {
  MenuIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export default function Topbar({ toggleSidebar }) {
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (!searchTerm) {
      removeHighlights();
      return;
    }
    highlightMatches(searchTerm);
  }, [searchTerm]);

  const highlightMatches = (term) => {
    removeHighlights();
    const bodyTextNodes = Array.from(document.body.querySelectorAll("*:not(script):not(style)"));

    bodyTextNodes.forEach((node) => {
      node.childNodes.forEach((child) => {
        if (child.nodeType === 3 && child.textContent.toLowerCase().includes(term.toLowerCase())) {
          const span = document.createElement("span");
          span.innerHTML = child.textContent.replace(
            new RegExp(`(${term})`, "gi"),
            '<mark style="background:yellow;color:black;">$1</mark>'
          );
          node.replaceChild(span, child);
        }
      });
    });
  };

  const removeHighlights = () => {
    document.querySelectorAll("mark").forEach((el) => {
      const parent = el.parentNode;
      parent.replaceChild(document.createTextNode(el.textContent), el);
      parent.normalize();
    });
  };

  return (
    <header className="flex items-center justify-between px-4 h-14 bg-white font-roboto text-textPrimary sticky top-0 z-10">
      {/* Left: Menu */}
      <div className="flex items-center space-x-4">
        <button
          type="button"
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-200 focus:outline-none"
          aria-label="Toggle Sidebar"
        >
          <MenuIcon className="h-6 w-6 text-gray-700" />
        </button>
      </div>

      {/* Center: Search Bar */}
      <form className="flex flex-1 max-w-2xl mx-6" onSubmit={(e) => e.preventDefault()}>
        <div className="flex flex-1">
          <input
            type="text"
            placeholder="Search page text"
            className="w-full px-4 py-1.5 border border-gray-300 rounded-l-full focus:outline-none focus:ring-1 focus:ring-gray-400 text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="px-4 bg-gray-100 border border-gray-300 rounded-r-full hover:bg-gray-200"
            aria-label="Search"
          >
            <SearchIcon className="h-5 w-5 text-gray-700" />
          </button>
        </div>
      </form>

      {/* Right: LinkedIn and GitHub */}
      <div className="flex items-center space-x-4">
        <a
          href="https://www.linkedin.com/in/amoghmanoranjith-navade-7703b825a/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-gray-200"
          aria-label="LinkedIn"
        >
          <FaLinkedin className="h-6 w-6 text-blue-700" />
        </a>
        <a
          href="https://github.com/amoghmanoranjith"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full hover:bg-gray-200"
          aria-label="GitHub"
        >
          <FaGithub className="h-6 w-6 text-gray-800" />
        </a>
      </div>
    </header>
  );
}
