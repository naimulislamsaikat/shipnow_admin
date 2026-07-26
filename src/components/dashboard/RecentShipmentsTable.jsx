import React, { useState } from 'react';
import { useShipments } from '../../context/ShipmentContext';
import { Search, Filter, MoreHorizontal, ArrowUpDown } from 'lucide-react';

export const RecentShipmentsTable = () => {
  const { shipments, setSelectedShipment } = useShipments();
  const [filterText, setFilterText] = useState('');

  const recent = shipments.filter((item) =>
    item.id.toLowerCase().includes(filterText.toLowerCase()) ||
    item.company.toLowerCase().includes(filterText.toLowerCase()) ||
    item.carrier.toLowerCase().includes(filterText.toLowerCase())
  ).slice(0, 5);

  const getStatusClass = (status) => {
    switch (status) {
      case 'In Transit':
        return 'status-pill status-transit';
      case 'Out for Delivery':
        return 'status-pill status-out';
      case 'Delivered':
      case 'Completed':
        return 'status-pill status-delivered';
      case 'Processing':
      case 'Pending':
      default:
        return 'status-pill status-processing';
    }
  };

  return (
    <div className="dashboard-card recent-shipments-card">
      <div className="card-header border-b">
        <h3 className="card-title">Recent Shipments</h3>
        <div className="table-header-controls">
          <div className="table-search-box">
            <Search size={15} />
            <input
              type="text"
              placeholder="Search shipment..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
          </div>
          <button className="table-icon-btn" title="Filter">
            <Filter size={16} />
          </button>
          <button className="table-icon-btn" title="Options">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>

      <div className="table-wrapper">
        <table className="recent-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Shipping ID <ArrowUpDown size={12} className="inline ml-1" /></th>
              <th>Company</th>
              <th>Carrier</th>
              <th>Route</th>
              <th>Shipping Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((shipment) => (
              <tr key={shipment.id}>
                <td><input type="checkbox" /></td>
                <td>
                  <button
                    className="id-link-btn"
                    onClick={() => setSelectedShipment(shipment)}
                  >
                    {shipment.id}
                  </button>
                </td>
                <td>
                  <div className="company-cell">
                    <span className="comp-name">{shipment.company}</span>
                    <span className="comp-cat">{shipment.category}</span>
                  </div>
                </td>
                <td><span className="carrier-badge">{shipment.carrier}</span></td>
                <td>
                  <span className="route-txt">{shipment.origin} → {shipment.destination}</span>
                </td>
                <td>{shipment.shipDate}</td>
                <td>
                  <span className={getStatusClass(shipment.status)}>
                    {shipment.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
