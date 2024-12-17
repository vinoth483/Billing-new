import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Invoice from './components/Invoice';
import Quotation from './components/Quotation';
import CatExtract from './components/CatExtract';
import DeliveryChalan from './components/DeliveryChalan';
import Purchase from './components/Purchase';
import Customer from './components/Customer';
import MarketingAnalysis from './components/MarketingAnalysis'; // New Component
import User from './components/User'; // New Component
import Company from './components/Company'; // New Component
import Bill from './components/Bill';
import './style/layout.css'; // Import your layout styles
import './style/sidebar.css'; // Import your sidebar styles

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Dashboard />} /> {/* Default route for /dashboard */}
          <Route path="Invoice" element={<Invoice />} />
          <Route path="Quotation" element={<Quotation />} />
          <Route path="CatExtract" element={<CatExtract />} />
          <Route path="DeliveryChalan" element={<DeliveryChalan />} />
          <Route path="Purchase" element={<Purchase />} />
          <Route path="Customer" element={<Customer />} />
          <Route path="MarketingAnalysis" element={<MarketingAnalysis />} /> {/* New Route */}
          <Route path="User" element={<User />} /> {/* New Route */}
          <Route path="Company" element={<Company />} /> {/* New Route */}
          <Route path="Bill" element={<Bill />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
