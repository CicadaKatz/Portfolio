import React from 'react';
import { useTheme } from './ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-slate-700 dark:text-gray-100 hover:text-primary dark:hover:text-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-md"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5" /> 
      ) : (
        <Sun className="h-5 w-5" /> // Let color be inherited from button text for consistency
      )}
    </button>
  );
};

export default ThemeToggle; 