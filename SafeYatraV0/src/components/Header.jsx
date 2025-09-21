// Header.jsx
import React from 'react';
import { Bell, Menu, Moon, Sun, MessageCircle } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Header = ({ setSidebarOpen }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b dark:border-gray-700">
      <div className="flex items-center justify-between px-2 py-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors lg:hidden"
          >
            <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
          
          
            <div className='flex items-center gap-0 '>
                  <img src="/newlogo.png" alt=""  className="h-30 w-30 text-blue-600 dark:text-blue-400" />
                  <div>
                       <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Safe-Yatra</h1>
                       <p className="text-sm text-gray-600 dark:text-gray-400">Real-time tourist safety monitoring</p>
                  </div>
                
            </div>
       
            
        </div>
        
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <MessageCircle className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-blue-500 rounded-full"></span>
          </button>
          
          <button className="relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <Bell className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
          </button>
          
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="h-5 w-5 text-yellow-500" />
               
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </button>
          
          <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
            <span className="text-white text-sm font-medium">AD</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;