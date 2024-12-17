import React, { useState } from 'react';
import { 
  BiHome, BiUser, BiMoney, BiDetail, 
  BiTime, BiSupport, BiChevronRight, 
  BiChevronLeft, BiBarChartAlt2 
} from 'react-icons/bi';
import { IoIosSettings } from 'react-icons/io';
import { Link, useLocation } from 'react-router-dom';
import '../style/sidebar.css';

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setIsCollapsed((prev) => !prev);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : 'expanded'}`}>
      <div
        className="toggle-button"
        onClick={toggleSidebar}
        aria-label={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
      >
        {isCollapsed ? <BiChevronRight className="toggle-icon" /> : <BiChevronLeft className="toggle-icon" />}
      </div>
      <div className="logo">
        <h2>{!isCollapsed && 'AI Billing Software'}</h2>
      </div>
      <div className="menu">
        <div className="menu--list">
          <Link
            to="/dashboard"
            className={`item ${isActive('/dashboard') ? 'active' : ''}`}
          >
            <BiHome className="icon" />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>
          <Link
            to="/dashboard/Invoice"
            className={`item ${isActive('/dashboard/Invoice') ? 'active' : ''}`}
          >
            <BiUser className="icon" />
            {!isCollapsed && <span>Invoice</span>}
          </Link>
          <Link
            to="/dashboard/Quotation"
            className={`item ${isActive('/dashboard/Quotation') ? 'active' : ''}`}
          >
            <BiMoney className="icon" />
            {!isCollapsed && <span>Quotation</span>}
          </Link>
          <Link
            to="/dashboard/CatExtract"
            className={`item ${isActive('/dashboard/CatExtract') ? 'active' : ''}`}
          >
            <BiDetail className="icon" />
            {!isCollapsed && <span>CatExtract</span>}
          </Link>
          <Link
            to="/dashboard/DeliveryChalan"
            className={`item ${isActive('/dashboard/DeliveryChalan') ? 'active' : ''}`}
          >
            <BiTime className="icon" />
            {!isCollapsed && <span>Delivery Chalan</span>}
          </Link>
          <Link
            to="/dashboard/Purchase"
            className={`item ${isActive('/dashboard/Purchase') ? 'active' : ''}`}
          >
            <BiSupport className="icon" />
            {!isCollapsed && <span>Purchase</span>}
          </Link>
          <Link
            to="/dashboard/Customer"
            className={`item ${isActive('/dashboard/Customer') ? 'active' : ''}`}
          >
            <IoIosSettings className="icon" />
            {!isCollapsed && <span>Customer</span>}
          </Link>
          <Link
            to="/dashboard/MarketingAnalysis"
            className={`item ${isActive('/dashboard/MarketingAnalysis') ? 'active' : ''}`}
          >
            <BiBarChartAlt2 className="icon" />
            {!isCollapsed && <span>Marketing Analysis</span>}
          </Link>
          <Link
            to="/dashboard/User"
            className={`item ${isActive('/dashboard/User') ? 'active' : ''}`}
          >
            <BiUser className="icon" />
            {!isCollapsed && <span>User</span>}
          </Link>
          <Link
            to="/dashboard/Company"
            className={`item ${isActive('/dashboard/Company') ? 'active' : ''}`}
          >
            <BiDetail className="icon" />
            {!isCollapsed && <span>Company</span>}
          </Link>
          <Link
            to="/dashboard/Bill"
            className={`item ${isActive('/dashboard/Bill') ? 'active' : ''}`}
          >
            <BiMoney className="icon" />
            {!isCollapsed && <span>Bill Verification</span>}
          </Link>
        </div>
      </div>
      <div className="footer">
        {!isCollapsed && <p></p>}
      </div>
    </div>
  );
};

export default Sidebar;
