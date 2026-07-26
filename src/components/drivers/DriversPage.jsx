import React from 'react';
import { Users, Star, Shield } from 'lucide-react';

const drivers = [
  { name: 'Ava Morgan', status: 'Online', rating: 4.9, route: 'Chicago → Detroit' },
  { name: 'Leo Carter', status: 'Offline', rating: 4.7, route: 'Dallas → Nashville' },
  { name: 'Mia Chen', status: 'Online', rating: 4.8, route: 'San Diego → Phoenix' }
];

export const DriversPage = () => {
  return (
    <div className="settings-page">
      <div className="settings-header-block">
        <div className="settings-header-icon" style={{ background: '#FEF3C7', color: '#D97706' }}>
          <Users size={24} />
        </div>
        <div>
          <h1 className="settings-page-title">Driver Roster</h1>
          <p className="settings-page-desc">Track driver availability, ratings, and active routes.</p>
        </div>
      </div>

      <div className="settings-two-col">
        <section className="settings-card">
          <h3 className="page-title">Top pilots</h3>
          <div className="profile-summary-grid">
            {drivers.map((driver) => (
              <div key={driver.name} className="profile-summary-card">
                <div className="profile-summary-top">
                  <div>
                    <h4>{driver.name}</h4>
                    <p>{driver.route}</p>
                  </div>
                  <span className={`status-pill ${driver.status === 'Online' ? 'status-onroute' : 'status-delayed'}`}>
                    {driver.status}
                  </span>
                </div>
                <div className="profile-summary-stat">
                  <Star size={16} />
                  <strong>{driver.rating}</strong>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="settings-card">
          <div className="page-header-row">
            <div>
              <h3 className="page-title">Driver policies</h3>
              <p className="settings-page-desc">Safety, compliance, and route readiness for your team.</p>
            </div>
          </div>
          <div className="driver-policy-list">
            <div className="driver-policy-item">
              <Shield size={18} />
              <div>
                <strong>Safety audits</strong>
                <p>Quarterly reviews completed for 100% of active drivers.</p>
              </div>
            </div>
            <div className="driver-policy-item">
              <Shield size={18} />
              <div>
                <strong>License checks</strong>
                <p>All licenses and certifications are current.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
