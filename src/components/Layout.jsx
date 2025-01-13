// src/components/Layout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // Optional: CSS for layout styling

const Layout = () => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="content">
        <Outlet /> {/* This is where the routed components will be displayed */}
      </div>
    </div>
  );
};

export default Layout;
