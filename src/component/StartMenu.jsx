import React from "react";

const StartMenu = ({ count, operations, onSelectOperation }) => {
  return (
    <div className="menu-container">
      {count > 0 && <h3>You got {count} answers!</h3>}
      <div className="button-group">
        {Object.entries(operations).map(([key, op]) => (
          <button
            key={key}
            onClick={() => onSelectOperation(key)}
            title={op.description}
          >
            {op.icon} {op.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StartMenu;