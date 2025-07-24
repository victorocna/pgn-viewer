import { useTheme } from '../hooks';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-button"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="theme-toggle-track">
        <div className="theme-toggle-thumb">
          <span className="theme-toggle-icon">
            {theme === 'light' ? '🌙' : '☀️'}
          </span>
        </div>
      </div>
      <span className="theme-toggle-label">
        {theme === 'light' ? 'Dark' : 'Light'} Mode
      </span>
    </button>
  );
};

export default ThemeToggle;
