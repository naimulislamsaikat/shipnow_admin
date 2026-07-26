import React from 'react';
import { useShipments } from '../../context/ShipmentContext';
import { Navigation2, MapPin, Clock3, Compass } from 'lucide-react';

const activeVehicles = [
  { id: 'T-214', route: 'LAX → PHX', eta: '1h 25m', status: 'On route' },
  { id: 'F-918', route: 'MIA → ATL', eta: '45m', status: 'Delayed' },
  { id: 'R-302', route: 'DAL → HOU', eta: '55m', status: 'On route' }
];

export const TrackingPage = () => {
  const { shipments } = useShipments();

  return (
    <div className="settings-page">
      <div className="settings-header-block">
        <div className="settings-header-icon" style={{ background: '#ECFDF5', color: '#059669' }}>
          <Navigation2 size={24} />
        </div>
        <div>
          <h1 className="settings-page-title">Live Tracking</h1>
          <p className="settings-page-desc">Monitor moving vehicles, ETAs, and shipment progress in real time.</p>
        </div>
      </div>

      <div className="settings-body">
        <section className="settings-card tracking-summary-card">
          <div className="page-header-row">
            <div>
              <h3 className="page-title">Current fleet overview</h3>
              <p className="settings-page-desc">Real-time status of active shipments and transit health.</p>
            </div>
            <button className="btn-primary-dark-sm">
              <Compass size={14} />
              <span>Sync data</span>
            </button>
          </div>

          <div className="tracking-summary-grid">
            <div className="tracking-stat-card">
              <span className="tracking-stat-label">Vehicles active</span>
              <strong>48</strong>
            </div>
            <div className="tracking-stat-card">
              <span className="tracking-stat-label">On-time rate</span>
              <strong>92%</strong>
            </div>
            <div className="tracking-stat-card">
              <span className="tracking-stat-label">Delayed routes</span>
              <strong>4</strong>
            </div>
          </div>
        </section>

        <section className="settings-card tracking-vehicle-list">
          <h3 className="page-title">Active vehicles</h3>
          <div className="tracking-table-header">
            <span>Vehicle</span>
            <span>Route</span>
            <span>ETA</span>
            <span>Status</span>
          </div>
          {activeVehicles.map((vehicle) => (
            <div key={vehicle.id} className="tracking-table-row">
              <strong>{vehicle.id}</strong>
              <span>{vehicle.route}</span>
              <span>{vehicle.eta}</span>
              <span className={`status-pill ${vehicle.status === 'Delayed' ? 'status-delayed' : 'status-onroute'}`}>
                {vehicle.status}
              </span>
            </div>
          ))}
        </section>

        <section className="settings-card">
          <div className="page-header-row">
            <div>
              <h3 className="page-title">Shipment snapshot</h3>
              <p className="settings-page-desc">Latest dispatched shipments across the network.</p>
            </div>
          </div>

          <div className="tracking-snapshot-list">
            {shipments.slice(0, 4).map((item) => (
              <div key={item.id} className="tracking-snapshot-item">
                <div>
                  <span className="shipment-id">{item.id}</span>
                  <p className="shipment-route">{item.origin} → {item.destination}</p>
                </div>
                <div className="shipment-meta">
                  <MapPin size={16} />
                  <span>{item.freightType}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
