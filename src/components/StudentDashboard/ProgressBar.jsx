// A simple progress bar component to show course progress.

import React from 'react';

function ProgressBar({ progress }) {
  const containerStyles = {
    height: 20,
    width: '100%',
    backgroundColor: "#e0e0de",
    borderRadius: 50,
  };

  const fillerStyles = {
    height: '100%',
    width: `${progress}%`,
    backgroundColor: 'blue',
    borderRadius: 'inherit',
    textAlign: 'right',
  };

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span>{`${progress}%`}</span>
      </div>
    </div>
  );
}

export default ProgressBar;
