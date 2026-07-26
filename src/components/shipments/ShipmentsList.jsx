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
  TrendingUp,
  TrendingDown,
  Calendar,
  Box,
  Trash2,
  Eye
} from 'lucide-react';

export const ShipmentsList = () => {
  const {
    shipments,
    activeTab,
    setActiveTab,
    searchQuery,
    setSearchQuery,
    setSelectedShipment,
    setCurrentView,
    deleteShipment
  } = useShipments();

  const [dateRange, setDateRange] = useState('This Month');
  const [selectedRows, setSelectedRows] = useState([]);

  const summaryStats = [
    { label: 'Total Shipments', val: '1,284', change: 'Up by 4.6% this week', isPositive: true },
    { label: 'Pending', val: '285', change: 'Up by 3.7% this week', isPositive: true },
    { label: 'Delivery', val: '594', change: 'Down 4.2% from last week', isPositive: false },
    { label: 'Completed', val: '405', change: 'Up by 3.9% this week', isPositive: true }
  ];

  const tabs = ['All', 'Completed', 'Delivery', 'Pending'];

  const filteredShipments = shipments.filter((item) => {
    const matchesTab =
      activeTab === 'All' ||
      item.statusBadge.toLowerCase() === activeTab.toLowerCase() ||
      item.status.toLowerCase().includes(activeTab.toLowerCase());

    const matchesSearch =
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.carrier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesTab && matchesSearch;
  });

  const toggleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((r) => r !== id) : [...prev, id]
    );
  };

  const getBadgeClass = (badge) => {
    switch (badge) {
      case 'Completed':
      case 'Delivered':
        return 'table-badge completed';
      case 'Delivery':
      case 'In Transit':
      case 'Out for Delivery':
        return 'table-badge delivery';
      case 'Pending':
      case 'Processing':
      default:
        return 'table-badge pending';
    }
  };

  return (
    <div className="shipments-page">
      {/* Page Header */}
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

      {/* Top 4 KPI Summary Cards */}
      <div className="shipments-kpi-row">
        {summaryStats.map((st, idx) => (
          <div key={idx} className="shipment-summary-card">
            <div className="summary-top">
              <span className="summary-label">{st.label}</span>
              <span className={`summary-trend ${st.isPositive ? 'positive' : 'negative'}`}>
                {st.isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {st.change}
              </span>
            </div>
            <h2 className="summary-val">{st.val}</h2>
          </div>
        ))}
      </div>

      {/* Filter Bar & Controls */}
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
              placeholder="Search id, company, etc"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <button className="btn-tool-outline">
            <Filter size={15} />
            <span>Filter</span>
          </button>

          <div className="select-wrapper">
            <Calendar size={14} className="select-icon" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="select-tool-outline"
            >
              <option value="This Month">This Month</option>
              <option value="Last Month">Last Month</option>
              <option value="This Quarter">This Quarter</option>
            </select>
          </div>

          <div className="view-switch-btns">
            <button
              className="view-btn"
              title="Grid View"
              onClick={() => setCurrentView('shipments-grid')}
            >
              <Grid size={16} />
            </button>
            <button
              className="view-btn active"
              title="List View"
              onClick={() => setCurrentView('shipments-list')}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Data Table */}
      <div className="full-table-card">
        <div className="table-responsive">
          <table className="shipments-full-table">
            <thead>
              <tr>
                <th><input type="checkbox" /></th>
                <th>Shipping ID</th>
                <th>Company</th>
                <th>Carrier</th>
                <th>Product Category</th>
                <th>Weight</th>
                <th>Route</th>
                <th>Date</th>
                <th>Progress</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredShipments.map((item) => (
                <tr key={item.id} className={selectedRows.includes(item.id) ? 'selected-row' : ''}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(item.id)}
                      onChange={() => toggleSelectRow(item.id)}
                    />
                  </td>
                  <td>
                    <div className="shipping-id-cell">
                      <button
                        className="id-link font-semibold"
                        onClick={() => setSelectedShipment(item)}
                      >
                        {item.id}
                      </button>
                      <span className="freight-sub">{item.freightType}</span>
                    </div>
                  </td>
                  <td>
                    <div className="company-cell">
                      <div className="comp-avatar">
                        <Box size={14} />
                      </div>
                      <div>
                        <div className="comp-title">{item.company}</div>
                        <div className="comp-sub">{item.category}</div>
                      </div>
                    </div>
                  </td>
                  <td><span className="carrier-tag">{item.carrier}</span></td>
                  <td>{item.category}</td>
                  <td>{item.weight}</td>
                  <td>
                    <div className="route-cell">
                      <div className="origin-txt">{item.origin} <span className="sub-tag">(Origin)</span></div>
                      <div className="dest-txt">{item.destination} <span className="sub-tag">(Destination)</span></div>
                    </div>
                  </td>
                  <td>
                    <div className="date-cell">
                      <div>{item.shipDate} - {item.shipTime} <span className="sub-tag">(ATD)</span></div>
                      <div>{item.estDeliveryDate} - {item.estDeliveryTime} <span className="sub-tag">(ETA)</span></div>
                    </div>
                  </td>
                  <td>
                    <div className="progress-cell">
                      <div className="progress-track">
                        <div className="progress-fill" style={{ width: `${item.progress}%` }} />
                      </div>
                      <span className="progress-pct">{item.progress}%</span>
                    </div>
                  </td>
                  <td>
                    <span className={getBadgeClass(item.statusBadge)}>
                      • {item.statusBadge}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button
                        className="act-btn"
                        title="View Details"
                        onClick={() => setSelectedShipment(item)}
                      >
                        <Eye size={15} />
                      </button>
                      <button
                        className="act-btn delete"
                        title="Delete Shipment"
                        onClick={() => deleteShipment(item.id)}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Pagination */}
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
    </div>
  );
};
