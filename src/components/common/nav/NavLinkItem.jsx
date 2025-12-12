import React from 'react';
import { NavLink } from 'react-router-dom';

export const NavLinkItem = ({ to, children }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? 'nav-link nav-link--active' : 'nav-link'
      }
    >
      {children}
    </NavLink>
  );
};
