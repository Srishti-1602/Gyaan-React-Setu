import React, { useState } from 'react';

const createFloatSearchMenu = (key) => {
    // Define the menu options
    const menuOptions = ['A', 'B'];
  
    return (
      <div
        className="floating-menu"
        style={{
          position: 'absolute',
          top: '100%',
          left: '0',
          background: 'white',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '5px',
          boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        }}
      >
        {menuOptions.map((option, index) => (
          <div key={index} style={{ cursor: 'pointer', padding: '5px' }}>
            {option}
          </div>
        ))}
      </div>
    );
};
  
export default createFloatSearchMenu;
  