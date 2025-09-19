// App.js
import React, { useState, useEffect } from 'react';

const ThemeToggle = ({ darkMode, toggleTheme }) => {
  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300"
      aria-label="Toggle theme"
    >
      <div className="relative w-10 h-6 flex items-center">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Sun icon */}
          <svg
            className={`w-4 h-4 text-yellow-500 transition-opacity duration-300 ${darkMode ? 'opacity-0' : 'opacity-100'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 2a1 1 0 011 1v1a1 1 0 01-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
              clipRule="evenodd"
            />
          </svg>
          
          {/* Moon icon */}
          <svg
            className={`w-4 h-4 text-blue-400 transition-opacity duration-300 ${darkMode ? 'opacity-100' : 'opacity-0'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </div>
        
        {/* Toggle circle */}
        <div
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${darkMode ? 'translate-x-5' : 'translate-x-0'}`}
        ></div>
      </div>
    </button>
  );
};

const Card = ({ children, className = '' }) => {
  return (
    <div className={`rounded-xl p-6 shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 ${className}`}>
      {children}
    </div>
  );
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Load theme from localStorage on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else {
      // Check for system preference if no saved theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
    }
  }, []);

  // Update localStorage and document class when theme changes
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-bold">Theme Switcher</h1>
          <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
        </header>

        {/* Introduction */}
        <Card className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Dark/Light Theme Demo</h2>
          <p className="mb-4">
            This React application demonstrates a theme switcher that uses Tailwind CSS for styling and persists the user's theme preference in localStorage.
          </p>
          <p>
            The current theme is <span className="font-bold">{darkMode ? 'Dark' : 'Light'}</span>. Click the toggle button to switch themes.
          </p>
        </Card>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <h3 className="text-xl font-semibold mb-3">Persistent Theme</h3>
            <p>Your theme preference is saved in localStorage and will be remembered between visits.</p>
          </Card>
          
          <Card>
            <h3 className="text-xl font-semibold mb-3">Responsive Design</h3>
            <p>This application is fully responsive and works on mobile, tablet, and desktop devices.</p>
          </Card>
          
          <Card>
            <h3 className="text-xl font-semibold mb-3">Smooth Transitions</h3>
            <p>Enjoy smooth transitions when switching between light and dark themes.</p>
          </Card>
        </div>

        {/* Sample Content */}
        <Card>
          <h2 className="text-2xl font-semibold mb-4">Sample Content</h2>
          <p className="mb-4">
            This section demonstrates how different elements look in both light and dark modes. The toggle button at the top right controls the theme across the entire application.
          </p>
          
          <div className="flex space-x-4 mb-6">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors">
              Primary Button
            </button>
            <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
              Secondary Button
            </button>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h3 className="text-lg font-medium mb-2">Form Elements</h3>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-transparent"
              />
              <select className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-transparent">
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default App;