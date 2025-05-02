const Header = ({ toggleTheme, isDarkMode, toggleSettings, setOperation }) => {
  const handleHomeClick = () => {
    setOperation("");  // This will return to the operations menu
  };
  return (
    <div className="header">
      <h1>Aitana's Flash Cards</h1>
      <div className="header-buttons">
      <button
          className="home-button"
          onClick={handleHomeClick}
          aria-label="Return to menu"
        >
          🏠
        </button>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? "🌙" : "☀️"}
      </button>
      <button
        className="settings-toggle"
        aria-label="Open settings"
        onClick={toggleSettings}
      >
        ⚙️
      </button>
      </div>
    </div>
  );
};

export default Header;
