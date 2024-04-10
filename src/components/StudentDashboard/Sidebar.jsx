// Sidebar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Sidebar({ items }) {
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      {items.map(item => (
        <button key={item.path} className="sidebar-btn" onClick={() => navigate(item.path)}>
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default Sidebar;
