import { useState } from 'react';

const SettingsMenu = ({ 
  isOpen, 
  onClose, 
  arithmaticLimit, 
  setArithmaticLimit,
  timeLimit,
  setTimeLimit,
  goal,
  setGoal
}) => {
  const [tempSettings, setTempSettings] = useState({
    arithmaticLimit,
    timeLimit,
    goal
  });

  const handleSave = () => {
    setArithmaticLimit(tempSettings.arithmaticLimit);
    setTimeLimit(tempSettings.timeLimit);
    setGoal(tempSettings.goal);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="settings-overlay">
      <div className="settings-modal">
        <h2>Settings</h2>
        <div className="settings-content">
          <div className="setting-item">
            <label htmlFor="arithmaticLimit">Arithmatic Number Limit:</label>
            <input
              type="number"
              id="arithmaticLimit"
              value={tempSettings.arithmaticLimit}
              onChange={(e) => setTempSettings(prev => ({
                ...prev,
                arithmaticLimit: parseInt(e.target.value)
              }))}
              min="1"
              max="100"
            />
          </div>
          <div className="setting-item">
            <label htmlFor="timeLimit">Arithmatic Time Limit (minutes):</label>
            <input
              type="number"
              id="timeLimit"
              value={tempSettings.timeLimit}
              onChange={(e) => setTempSettings(prev => ({
                ...prev,
                timeLimit: parseInt(e.target.value)
              }))}
              min="1"
              max="60"
            />
          </div>
          <div className="setting-item">
            <label htmlFor="goal">Arithmatic Goal:</label>
            <input
              type="number"
              id="goal"
              value={tempSettings.goal}
              onChange={(e) => setTempSettings(prev => ({
                ...prev,
                goal: parseInt(e.target.value)
              }))}
              min="1"
              max="1000"
            />
          </div>
        </div>
        <div className="settings-actions">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsMenu;