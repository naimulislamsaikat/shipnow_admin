import React from 'react';
import { Bell, AlertTriangle, CheckCircle2 } from 'lucide-react';

const notifications = [
  { id: 1, title: 'Shipment #SH9283746 delayed', time: '2m ago', type: 'alert' },
  { id: 2, title: 'New invoice ready for review', time: '15m ago', type: 'info' },
  { id: 3, title: 'Driver Ava Morgan is online', time: '40m ago', type: 'success' }
];

export const NotificationsPage = () => {
  return (
    <div className="settings-page">
      <div className="settings-header-block">
        <div className="settings-header-icon" style={{ background: '#FEF3F2', color: '#DC2626' }}>
          <Bell size={24} />
        </div>
        <div>
          <h1 className="settings-page-title">Notifications</h1>
          <p className="settings-page-desc">Real-time alerts for shipments, safety, and delivery milestones.</p>
        </div>
      </div>

      <div className="settings-body">
        <section className="settings-card">
          <h3 className="page-title">Latest alerts</h3>
          <div className="notification-list">
            {notifications.map((item) => (
              <div key={item.id} className={`notification-item notification-${item.type}`}>
                <div className="notification-icon">
                  {item.type === 'alert' ? <AlertTriangle size={18} /> : item.type === 'success' ? <CheckCircle2 size={18} /> : <Bell size={18} />}
                </div>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="settings-card">
          <h3 className="page-title">Notification settings</h3>
          <p className="settings-page-desc">Manage which alerts should be shown immediately.</p>
          <div className="notification-settings-grid">
            <div className="notification-setting-item">
              <strong>Shipment delays</strong>
              <span>Enabled</span>
            </div>
            <div className="notification-setting-item">
              <strong>Route changes</strong>
              <span>Enabled</span>
            </div>
            <div className="notification-setting-item">
              <strong>Driver check-ins</strong>
              <span>Enabled</span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
