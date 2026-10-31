import React from 'react';
import logoImage from '../images/Logo.png';
export default function Topbar({ isDarkMode, toggleTheme }) {
  return (
    <header className={`${isDarkMode ? 'bg-[#0B0F19] border-gray-800/80 text-white' : 'bg-white border-gray-200 text-gray-800'} border-b h-20 px-8 flex items-center justify-between transition-colors duration-200`}>
      
      <div className="flex items-center gap-3">
        <div className={`inline-block  ${
  isDarkMode ? 'bg-white' : 'bg-transparent'
}`}>
  <img 
    src={logoImage} 
    alt="Koda Store Logo" 
    className="h-13 w-31 object-contain" 
  />
</div>
        

        <div>
          <h2 className={`text-lg font-bold tracking-wide ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>Koda Dashboard</h2>
          <p className="text-xs text-gray-400">E-Commerce Admin Panel</p>
        </div>
        
      </div>

      
      <div className="flex items-center gap-3">
        {/* زر الإشعارات */}
        <button className={`p-2.5 rounded-xl border cursor-pointer transition-colors relative flex items-center justify-center ${isDarkMode ? 'bg-[#111827] border-gray-800 text-gray-300 hover:bg-gray-800' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
  </svg>
  {/* النقطة الحمراء للتنبيه */}
  <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full border-2 border-[#111827]"></span>
</button>

{/* زر الشمس / الوضع الليلي بالـ SVG */}
<button 
  onClick={toggleTheme}
  className={`p-2.5 rounded-xl cursor-pointer border transition-colors flex items-center justify-center ${isDarkMode ? 'bg-[#111827] border-gray-800 text-gray-300 hover:bg-gray-800' : 'bg-gray-50 border-gray-200 text-gray-600'}`}>
  {isDarkMode ? (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21m8.966-8.966h-2.25m-13.5 0H3m15.364 6.364l-1.591-1.591M6.758 6.758L5.167 5.167m12.728 0l-1.591 1.591M6.758 17.242l-1.591 1.591M12 18a6 6 0 100-12 6 6 0 000 12z" />
    </svg>
  ) : (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
    </svg>
  )}
</button>

        <div className={`flex items-center gap-3 px-3 py-1.5 cursor-pointer rounded-2xl border ${isDarkMode ? 'bg-[#111827] border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-700 to-cyan-400 text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/30">
            A
          </div>
          <div className="hidden lg:block text-left pr-2">
            <span className={`block text-sm font-bold ${isDarkMode ? 'text-gray-100' : 'text-gray-800'}`}>
              ADMIN
            </span>
            <span className={`block text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Admin
            </span>
          </div>
        </div>

        
        <button className="flex items-center gap-1.5 rounded-lg bg-red-500 px-3 py-2 text-xs font-semibold text-white shadow-sm transition-colors duration-200 hover:bg-red-600 cursor-pointer">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
        <polyline points="16 17 21 12 16 7" />
        <line x1="21" y1="12" x2="9" y2="12" />
      </svg>

      Logout
    </button>
      </div>
    </header>
  );
}