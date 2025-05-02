const Header = ({ toggleTheme, isDarkMode }) => {
  return (
    <div className="header">
      <h1>Aitana's Flash Cards</h1>
      <button
        className="theme-toggle"
        onClick={toggleTheme}
        aria-label="Toggle dark mode"
      >
        {isDarkMode ? "🌙" : "☀️"}
      </button>
    </div>
  );
};

export default Header;
