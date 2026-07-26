import React from 'react';
import { useShipments } from '../../context/ShipmentContext';
import { Search, Plus, Menu } from 'lucide-react';

export const Header = ({ toggleSidebar }) => {
  const { searchQuery, setSearchQuery, setCurrentView, user } = useShipments();

  return (
    <header className="main-header">
      <button className="sidebar-toggle-btn" onClick={toggleSidebar} aria-label="Open menu">
        <Menu size={20} />
      </button>
      <div className="header-greeting">
        <span className="greeting-sub">Hello {user.name.split(' ')[0]}!</span>
        <h1 className="greeting-title">Good Morning</h1>
      </div>

      <div className="header-actions">
        {/* Search Bar */}
        <div className="header-search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="header-search-input"
          />
        </div>

        {/* Add New Shipping CTA */}
        <button
          className="btn-add-shipment"
          onClick={() => setCurrentView('create-shipment')}
        >
          <Plus size={18} />
          <span>Add New Shipping</span>
        </button>
      </div>
    </header>
  );
};
