import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function Layout({ children }) {
  
  const [isDarkMode, setIsDarkMode] = useState(true);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`flex min-h-screen ${isDarkMode ? 'bg-[#07090E] text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
     
      <Sidebar isDarkMode={isDarkMode} />

      
      <div className="flex-1 flex flex-col">
        <Topbar isDarkMode={isDarkMode} toggleTheme={toggleTheme} />
        <main className={`p-8 flex-1 ${isDarkMode ? 'bg-[#07090E]' : 'bg-gray-100'}`}>
          {children}
        </main>
      </div>
    </div>
  );
}