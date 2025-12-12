import React from 'react';
import { BrowserRouter } from 'react-router-dom';

export const WithRouter = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

