import React from 'react';

export const UserDropdown = ({ userName, onProfile, onLogout }) => {
  return (
    <div className="user-dropdown">
      <button
        type="button"
        className="user-dropdown__trigger"
        onClick={onProfile}
      >
        {userName || 'Профиль'}
      </button>
      <button
        type="button"
        className="user-dropdown__logout"
        onClick={onLogout}
      >
        Выйти
      </button>
    </div>
  );
};
