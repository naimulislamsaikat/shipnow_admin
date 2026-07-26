import React from 'react';
import { Truck, Layers, Shield } from 'lucide-react';

const fleetOverview = [
  { name: 'Road Fleet', count: 128, uptime: '98%', badge: 'Primary' },
  { name: 'Air Freight', count: 22, uptime: '95%', badge: 'Expedited' },
  { name: 'Ocean Carriers', count: 18, uptime: '96%', badge: 'Global' }
];

const fleetAssets = [
  { id: 'F-100', type: 'Truck', status: 'Active', eta: '2h 40m' },
  { id: 'F-224', type: 'Plane', status: 'Loading', eta: '5h 10m' },
  { id: 'F-317', type: 'Ship', status: 'Docked', eta: 'N/A' }
];

export const FleetsPage = () => {
  return (
    <div className="settings-page">
      <div className="settings-header-block">
        <div className="settings-header-icon" style={{ background: '#F5F3FF', color: '#4F46E5' }}>
          <Truck size={24} />
        </div>
        <div>
          <h1 className="settings-page-title">Fleet Management</h1>
          <p className="settings-page-desc">Manage vehicles, carriers, and capacity across your logistics network.</p>
        </div>
      </div>

      <div className="settings-two-col">
        <section className="settings-card">
          <h3 className="page-title">Fleet Overview</h3>
          <div className="fleet-overview-grid">
            {fleetOverview.map((fleet) => (
              <div key={fleet.name} className="fleet-overview-card">
                <span className="fleet-overview-title">{fleet.name}</span>
                <div className="fleet-overview-value">{fleet.count}</div>
                <div className="fleet-overview-meta">
                  <span>{fleet.uptime}</span>
                  <span className="status-pill status-onroute">{fleet.badge}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="settings-card">
          <div className="page-header-row">
            <div>
              <h3 className="page-title">Asset health</h3>
              <p className="settings-page-desc">Critical maintenance status across active assets.</p>
            </div>
            <button className="btn-primary-dark-sm">
              <Layers size={14} />
              <span>Review</span>
            </button>
          </div>
          <div className="fleet-assets-list">
            {fleetAssets.map((asset) => (
              <div key={asset.id} className="fleet-asset-item">
                <div>
                  <strong>{asset.id}</strong>
                  <p>{asset.type}</p>
                </div>
                <div className="fleet-asset-meta">
                  <span>{asset.status}</span>
                  <span>{asset.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
