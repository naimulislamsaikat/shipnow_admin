import React from 'react';
import { shipmentAlertsSummary } from '../../data/mockData';
import { MoreHorizontal, ArrowUpRight, AlertTriangle, ShieldAlert, CloudRain } from 'lucide-react';

export const ShipmentAlerts = () => {
  const { totalDelays, badges, alertsList } = shipmentAlertsSummary;

  return (
    <div className="dashboard-card shipment-alerts-card">
      <div className="card-header">
        <div>
          <span className="card-title">Shipment Alerts</span>
        </div>
        <button className="icon-menu-btn" title="Options">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="alerts-subhead">
        <h2 className="alerts-count">{totalDelays}</h2>
        <span className="alerts-subtext">Delays Detected</span>
      </div>

      {/* Alert Pill Cards */}
      <div className="alert-badges-grid">
        {badges.map((b) => (
          <div key={b.id} className="alert-badge-card" style={{ backgroundColor: b.color }}>
            <span className="badge-num" style={{ color: b.textColor }}>{b.count}</span>
            <span className="badge-txt" style={{ color: b.textColor }}>{b.label}</span>
          </div>
        ))}
      </div>

      {/* Alert List Items */}
      <div className="alert-items-list">
        {alertsList.map((item) => {
          const IconComp = item.type.includes('Customs')
            ? ShieldAlert
            : item.type.includes('Weather')
            ? CloudRain
            : AlertTriangle;

          return (
            <div key={item.id} className="alert-item">
              <div className="alert-item-icon">
                <IconComp size={16} />
              </div>
              <div className="alert-item-details">
                <div className="alert-type-title">{item.type}</div>
                <div className="alert-meta">
                  <span className="alert-id">{item.id}</span> • {item.freight} • {item.date}
                </div>
              </div>
              <button className="alert-action-btn" title="Inspect Alert">
                <ArrowUpRight size={16} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
