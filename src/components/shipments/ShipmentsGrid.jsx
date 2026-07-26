import React, { useState } from 'react';
import { useShipments } from '../../context/ShipmentContext';
import {
  Search,
  Filter,
  Plus,
  Grid,
  List,
  ChevronLeft,
  ChevronRight,
  Box,
  MoreVertical
} from 'lucide-react';

export const ShipmentsGrid = () => {
  const {
    shipments,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    setSelectedShipment,
    setCurrentView
  } = useShipments();

  const [sortBy, setSortBy] = useState('Newest');

  const tabs = ['All', 'Delivered', 'In Transit', 'Processing', 'Out for Delivery'];

  // Filter & Search Logic
  const filteredShipments = shipments.filter((shipment) => {
    const matchesTab =
      activeTab === 'All' ||
      shipment.status.toLowerCase() === activeTab.toLowerCase() ||
      (activeTab === 'Delivered' && shipment.status === 'Completed');

    const matchesSearch =
      shipment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.destination.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.carrier.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'In Transit':
        return 'badge-pill badge-transit';
      case 'Out for Delivery':
        return 'badge-pill badge-out';
      case 'Delivered':
      case 'Completed':
        return 'badge-pill badge-delivered';
      case 'Processing':
      case 'Pending':
      default:
        return 'badge-pill badge-processing';
    }
  };

  return (
    <div className="shipments-page">
      {/* Top Header Row */}
      <div className="page-header-row">
        <div>
          <div className="breadcrumb">
            <span onClick={() => setCurrentView('dashboard')}>Dashboard</span> / <span>Shipments</span>
          </div>
          <h1 className="page-title">Shipments</h1>
        </div>

        <button className="btn-primary-dark" onClick={() => setCurrentView('create-shipment')}>
          <Plus size={18} />
          <span>New Shipment</span>
        </button>
      </div>

      {/* Filter Tabs & Toolbar */}
      <div className="shipments-toolbar-container">
        <div className="tabs-row">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="toolbar-controls">
          <div className="toolbar-search-input">
            <Search size={16} />
            <input
              type="text"
              placeholder="Search Shipment"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="toolbar-filter-group">
            <button className="btn-tool-outline">
              <Filter size={15} />
              <span>Filter</span>
            </button>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="select-tool-outline"
            >
              <option value="Newest">Sort by: Newest</option>
              <option value="Oldest">Sort by: Oldest</option>
              <option value="Progress">Sort by: Progress</option>
            </select>

            <div className="view-switch-btns">
              <button
                className="view-btn active"
                title="Grid View"
                onClick={() => setCurrentView('shipments-grid')}
              >
                <Grid size={16} />
              </button>
              <button
                className="view-btn"
                title="List View"
                onClick={() => setCurrentView('shipments-list')}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="shipments-cards-grid">
        {filteredShipments.map((shipment) => (
          <div
            key={shipment.id}
            className="shipment-card-item"
            onClick={() => setSelectedShipment(shipment)}
          >
            <div className="card-top-head">
              <span className="card-id-text">{shipment.id}</span>
              <span className={getStatusBadgeClass(shipment.status)}>{shipment.status}</span>
              <button className="card-options-btn" onClick={(e) => e.stopPropagation()}>
                <MoreVertical size={16} />
              </button>
            </div>

            <div className="card-company-block">
              <div className="company-logo-avatar">
                <Box size={18} className="text-purple-600" />
              </div>
              <div className="company-details">
                <h4 className="company-name">{shipment.company}</h4>
                <span className="company-cat">{shipment.category}</span>
              </div>
            </div>

            {/* Route Timeline */}
            <div className="card-route-timeline">
              <div className="route-node">
                <span className="node-dot purple" />
                <div className="node-txt">
                  <span className="node-label">Origin</span>
                  <strong className="node-city">{shipment.origin}</strong>
                  <span className="node-date">{shipment.shipDate} - {shipment.shipTime}</span>
                </div>
              </div>

              <div className="route-node">
                <span className="node-dot destination-dot" />
                <div className="node-txt">
                  <span className="node-label">Destination</span>
                  <strong className="node-city">{shipment.destination}</strong>
                  <span className="node-date">{shipment.estDeliveryDate} - {shipment.estDeliveryTime}</span>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="card-progress-footer">
              <div className="progress-label-row">
                <span>Progress: <strong>{shipment.progress}%</strong></span>
                <span className="carrier-tag">Carrier: <strong>{shipment.carrier}</strong></span>
              </div>
              <div className="progress-bar-track">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${shipment.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Footer */}
      <div className="pagination-footer">
        <span className="results-count">Show 12 of {filteredShipments.length} results</span>
        <div className="page-buttons-list">
          <button className="page-nav-btn" disabled><ChevronLeft size={16} /></button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <span className="page-dots">..</span>
          <button className="page-btn">16</button>
          <button className="page-btn"><ChevronRight size={16} /></button>
        </div>
      </div>
    </div>
  );
};
