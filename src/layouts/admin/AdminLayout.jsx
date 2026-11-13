// import React, { useState } from 'react';
// import Sidebar from './Sidebar';
// import Topbar from './Navbar';

// export default function AdminLayout({ children }) {
  
//   const [isDarkMode, setIsDarkMode] = useState(true);

//   const toggleTheme = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   return (
//     <div className={`flex min-h-screen ${isDarkMode ? 'bg-[#07090E] text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
     
//       <Sidebar isDarkMode={isDarkMode} />

      
//       <div className="flex-1 flex flex-col">
//         <Topbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
//         <main className={`p-8 flex-1 ${isDarkMode ? 'bg-[#07090E]' : 'bg-gray-100'}`}>
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// }






// import { Outlet } from "react-router-dom";
// import Sidebar from "./Sidebar";
// import Topbar from "./Navbar";

// export function AdminLayout() {
//   return (
//     <div className="flex h-screen overflow-hidden bg-background">
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main area: Navbar on top, scrollable page content below */}
//       <div className="flex flex-1 flex-col overflow-hidden">
//         <Topbar />
//         <main className="flex-1 overflow-y-auto p-4 md:p-6">
//           {/* ← THIS is what was missing. Child routes render here. */}
//           <Outlet />
//         </main>
//       </div>
//     </div>
//   );
// }

// export default AdminLayout;



import { useTheme } from "@/contexts/themeContext";
import Sidebar from "./Sidebar";
import Topbar from "./Navbar";
import { Outlet } from "react-router-dom";

export function AdminLayout() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <Sidebar isDarkMode={isDarkMode} />

      {/* Main area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Topbar
          isDarkMode={isDarkMode}
          toggleTheme={toggleTheme}
        />

        <main className="flex-1 overflow-y-auto bg-background p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;