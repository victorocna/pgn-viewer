import { useTheme } from '../hooks';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="menu-item pl-12 pr-8 py-2 cursor-pointer text-sm flex justify-between items-center no-underline"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span className="theme-toggle-label">
        {theme === 'light' ? 'Dark' : 'Light'} Mode
      </span>
      <div className="theme-toggle-track">
        <div className="theme-toggle-thumb"></div>
      </div>
    </button>
  );
};

export default ThemeToggle;
