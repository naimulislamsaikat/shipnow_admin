import React, { useState } from 'react';
import { useShipments } from '../../context/ShipmentContext';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie,
  Tooltip
} from 'recharts';
import {
  warehouseTopMetrics,
  warehouseInventoryData,
  warehouseStorageTable,
  warehousePackagesList,
  warehouseActivityLog
} from '../../data/mockData';
import {
  Truck,
  TrendingUp,
  Filter,
  MoreHorizontal,
  Box,
  CheckSquare,
  PlusCircle,
  FileText
} from 'lucide-react';

export const Warehouse = () => {
  const { setCurrentView } = useShipments();
  const [activeFreight, setActiveFreight] = useState('Road Freight');
  const [activeFloor, setActiveFloor] = useState('Floor 1');
  const [packageTab, setPackageTab] = useState('All');

  const freightOptions = ['Road Freight', 'Rail Freight', 'Ocean Freight', 'Air Freight'];

  const filteredPackages = warehousePackagesList.filter((pkg) => {
    if (packageTab === 'All') return true;
    return pkg.status.toLowerCase() === packageTab.toLowerCase();
  });

  return (
    <div className="warehouse-page">
      {/* Top Header Row */}
      <div className="page-header-row">
        <div>
          <div className="breadcrumb">
            <span onClick={() => setCurrentView('dashboard')}>Dashboard</span> / <span>Warehouse</span>
          </div>
          <h1 className="page-title">Warehouse</h1>
        </div>

        {/* Freight Type Pills */}
        <div className="freight-pills-bar">
          {freightOptions.map((f) => (
            <button
              key={f}
              className={`freight-pill-btn ${activeFreight === f ? 'active' : ''}`}
              onClick={() => setActiveFreight(f)}
            >
              <Truck size={14} />
              <span>{f}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Top Row Grid: KPI Stats, Inventory Bar Chart, Capacity Donut */}
      <div className="warehouse-top-grid">
        {/* Left Stats Cards */}
        <div className="wh-stats-col">
          {warehouseTopMetrics.map((stat) => (
            <div key={stat.id} className="wh-stat-card">
              <span className="wh-stat-title">{stat.title}</span>
              <div className="wh-stat-val-row">
                <h2 className="wh-stat-val">{stat.value}</h2>
                {stat.unit && <span className="wh-stat-unit">{stat.unit}</span>}
                <span className="badge-growth positive">
                  <TrendingUp size={12} /> {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Center Inventory Bar Chart */}
        <div className="dashboard-card wh-inventory-card">
          <div className="card-header">
            <div>
              <span className="card-title">Warehouse Inventory</span>
              <div className="wh-inv-total-row">
                <h2 className="card-value">10,000</h2>
                <span className="metric-unit">packages</span>
              </div>
            </div>
            <button className="icon-menu-btn" title="Options">
              <MoreHorizontal size={18} />
            </button>
          </div>

          <div className="wh-chart-wrapper" style={{ width: '100%', height: 150 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={warehouseInventoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="custom-tooltip">
                          <p className="tooltip-label">{data.category}</p>
                          <p className="tooltip-value">{data.count.toLocaleString()} pkgs ({data.percentage}%)</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]} barSize={32}>
                  {warehouseInventoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="wh-inv-labels-grid">
            {warehouseInventoryData.map((item) => (
              <div key={item.category} className="wh-inv-label-item">
                <span className="wh-cat-name">{item.category}</span>
                <span className="wh-cat-pct">{item.percentage}% - {item.count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Capacity Usage Donut */}
        <div className="dashboard-card wh-capacity-card">
          <div className="card-header">
            <span className="card-title">Capacity Usage</span>
            <button className="icon-menu-btn" title="Options">
              <MoreHorizontal size={18} />
            </button>
          </div>

          <div className="wh-donut-wrapper" style={{ width: '100%', height: 150, position: 'relative' }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Used', value: 62.5, color: '#7C4DFF' },
                    { name: 'Empty', value: 37.5, color: '#18181B' }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  <Cell fill="#7C4DFF" />
                  <Cell fill="#18181B" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-center-label">
              <span className="donut-sub">Total Usage</span>
              <span className="donut-val">62.5%</span>
            </div>
          </div>

          <div className="wh-shelves-footer">
            <div className="shelf-info">
              <strong>40 shelves</strong>
              <span>Loaded</span>
            </div>
            <div className="shelf-info">
              <strong>24 shelves</strong>
              <span>Empty</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Row Grid: Warehouse Storage Table & Package Status */}
      <div className="warehouse-mid-grid">
        {/* Storage Table Card */}
        <div className="dashboard-card wh-storage-card">
          <div className="card-header border-b">
            <h3 className="card-title">Warehouse Storage</h3>
            <div className="table-header-controls">
              <button className="btn-tool-outline">
                <Filter size={14} /> Filter
              </button>
              <div className="dropdown-wrapper">
                <select className="card-dropdown">
                  <option>Sort by: Section</option>
                  <option>Sort by: Floor</option>
                  <option>Sort by: Usage</option>
                </select>
              </div>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="recent-table">
              <thead>
                <tr>
                  <th>Floor</th>
                  <th>Section</th>
                  <th>Category</th>
                  <th>Storage Used</th>
                  <th>Percentage</th>
                  <th>Available Space</th>
                </tr>
              </thead>
              <tbody>
                {warehouseStorageTable.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.floor}</td>
                    <td><strong className="text-purple-600">{row.section}</strong></td>
                    <td>{row.category}</td>
                    <td>
                      <div className="progress-bar-track" style={{ width: 120 }}>
                        <div className="progress-bar-fill" style={{ width: `${row.percentage}%` }} />
                      </div>
                    </td>
                    <td><strong>{row.percentage}%</strong></td>
                    <td><span className="text-muted">{row.available}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Package Status Card */}
        <div className="dashboard-card wh-package-status-card">
          <div className="card-header">
            <h3 className="card-title">Package Status</h3>
            <button className="icon-menu-btn" title="Options">
              <MoreHorizontal size={18} />
            </button>
          </div>

          <div className="wh-pkg-tabs">
            {['All', 'Expected', 'Received', 'Sent'].map((t) => (
              <button
                key={t}
                className={`wh-pkg-tab-btn ${packageTab === t ? 'active' : ''}`}
                onClick={() => setPackageTab(t)}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="wh-pkg-list">
            {filteredPackages.map((pkg) => (
              <div key={pkg.id} className="wh-pkg-item">
                <div className="wh-pkg-icon">
                  <Box size={18} />
                </div>
                <div className="wh-pkg-info">
                  <strong className="wh-pkg-id">{pkg.id}</strong>
                  <span className="wh-pkg-date">{pkg.date}</span>
                </div>
                <span className={`status-pill ${
                  pkg.status === 'Sent' ? 'status-transit' :
                  pkg.status === 'Received' ? 'status-delivered' : 'status-out'
                }`}>
                  {pkg.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row Grid: Interactive Warehouse Map & Activity Log */}
      <div className="warehouse-bottom-grid">
        {/* Interactive Warehouse Map */}
        <div className="dashboard-card wh-map-card">
          <div className="card-header border-b">
            <h3 className="card-title">Warehouse Map</h3>
            <div className="floor-switch-btns">
              {['Floor 1', 'Floor 2', 'Floor 3'].map((fl) => (
                <button
                  key={fl}
                  className={`floor-btn ${activeFloor === fl ? 'active' : ''}`}
                  onClick={() => setActiveFloor(fl)}
                >
                  {fl}
                </button>
              ))}
            </div>
          </div>

          <div className="wh-map-layout">
            <div className="wh-map-sections-grid">
              {/* Electronics Block */}
              <div className="map-section-block">
                <div className="block-head">
                  <span>Electronics</span>
                </div>
                <div className="shelves-grid">
                  <span className="shelf-box loaded">A1</span>
                  <span className="shelf-box loaded">A2</span>
                  <span className="shelf-box">A3</span>
                </div>
                <div className="block-foot">Available Space: <strong>20/100</strong></div>
              </div>

              {/* Home & Kitchen Block */}
              <div className="map-section-block">
                <div className="block-head">
                  <span>Home & Kitchen</span>
                </div>
                <div className="shelves-grid">
                  <span className="shelf-box loaded">C1</span>
                  <span className="shelf-box loaded">C2</span>
                  <span className="shelf-box loaded">C3</span>
                </div>
                <div className="block-foot">Available Space: <strong>10/100</strong></div>
              </div>

              {/* Automotive Parts Block */}
              <div className="map-section-block">
                <div className="block-head">
                  <span>Automotive Parts</span>
                </div>
                <div className="shelves-grid">
                  <span className="shelf-box loaded">D1</span>
                  <span className="shelf-box">D2</span>
                  <span className="shelf-box">D3</span>
                </div>
                <div className="block-foot">Available Space: <strong>50/100</strong></div>
              </div>

              {/* Sports Equipment Block */}
              <div className="map-section-block">
                <div className="block-head">
                  <span>Sports Equipment</span>
                </div>
                <div className="shelves-grid">
                  <span className="shelf-box loaded">F1</span>
                  <span className="shelf-box">F2</span>
                  <span className="shelf-box">F3</span>
                </div>
                <div className="block-foot">Available Space: <strong>45/100</strong></div>
              </div>

              {/* Apparel Block */}
              <div className="map-section-block full-width">
                <div className="block-head">
                  <span>Apparel</span>
                </div>
                <div className="shelves-grid horizontal">
                  <span className="shelf-box loaded">B1</span>
                  <span className="shelf-box loaded">B2</span>
                  <span className="shelf-box loaded">B3</span>
                  <span className="shelf-box loaded">B4</span>
                  <span className="shelf-box loaded">B5</span>
                  <span className="shelf-box loaded">B6</span>
                  <span className="shelf-box loaded">B7</span>
                  <span className="shelf-box loaded">B8</span>
                  <span className="shelf-box">B9</span>
                  <span className="shelf-box">B10</span>
                </div>
                <div className="block-foot">Available Space: <strong>20/100</strong></div>
              </div>

              {/* Beauty & Health Block */}
              <div className="map-section-block">
                <div className="block-head">
                  <span>Beauty & Health</span>
                </div>
                <div className="shelves-grid">
                  <span className="shelf-box loaded">E1</span>
                  <span className="shelf-box loaded">E2</span>
                  <span className="shelf-box loaded">E3</span>
                  <span className="shelf-box">E4</span>
                </div>
                <div className="block-foot">Available Space: <strong>30/100</strong></div>
              </div>
            </div>

            <div className="map-legend-row">
              <span className="legend-item"><span className="legend-box available" /> Available</span>
              <span className="legend-item"><span className="legend-box full" /> Full / Occupied</span>
            </div>
          </div>
        </div>

        {/* Activity Log */}
        <div className="dashboard-card wh-activity-card">
          <div className="card-header border-b">
            <h3 className="card-title">Warehouse Activity Log</h3>
            <button className="icon-menu-btn" title="Options">
              <MoreHorizontal size={18} />
            </button>
          </div>

          <div className="activity-timeline-list">
            {warehouseActivityLog.map((log) => (
              <div key={log.id} className="activity-item">
                <div className="activity-icon-avatar">
                  {log.icon === 'CheckSquare' ? <CheckSquare size={16} /> :
                   log.icon === 'PlusCircle' ? <PlusCircle size={16} /> :
                   log.icon === 'Truck' ? <Truck size={16} /> : <FileText size={16} />}
                </div>
                <div className="activity-content">
                  <p className="activity-text">
                    <strong className="user-mention">{log.user}</strong> {log.action}
                  </p>
                  <span className="activity-timestamp">{log.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
