// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Settings from "./pages/Settings";
import BusinessCase1 from "./pages/BC1";
import BusinessCase2 from "./pages/BC2";
import BusinessCase3 from "./pages/BC3";
import BusinessCase6 from "./pages/BC6";
import BusinessCase4 from "./pages/BC4";
import BusinessCase8 from "./pages/BC8";
import BusinessCase5 from "./pages/BC5";

export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <Router>
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} />
        <div className="flex flex-col flex-1 min-h-screen">
          <Topbar toggleSidebar={toggleSidebar} />
          <main className="p-4 bg-gray-50 flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/explore" element={<Explore />} />
              <Route path="/bc1" element={<BusinessCase1 />} />
              <Route path="/bc2" element={<BusinessCase2 />} />
              <Route path="/bc3" element={<BusinessCase3 />} />
              <Route path="/bc4" element={<BusinessCase4 />} />
              <Route path="/bc5" element={<BusinessCase5 />} />
              <Route path="/bc6" element={<BusinessCase6 />} />
              <Route path="/bc8" element={<BusinessCase8 />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
