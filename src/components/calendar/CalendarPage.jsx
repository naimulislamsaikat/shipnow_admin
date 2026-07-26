import React from 'react';
import { CalendarDays, Clock3, Truck, MapPin } from 'lucide-react';

const calendarDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const bookedDays = [3, 5, 8, 12, 16, 19, 23, 27];
const upcomingShipments = [
  { id: '#SH9032154', route: 'Denton, TX → Nashville, TN', time: 'Today • 10:30 AM', status: 'Loading' },
  { id: '#SH8715810', route: 'Sacramento, CA → Seattle, WA', time: 'Today • 1:00 PM', status: 'En route' },
  { id: '#SH8719654', route: 'Columbus, OH → Detroit, MI', time: 'Tomorrow • 9:00 AM', status: 'Scheduled' },
  { id: '#SH8739043', route: 'Miami, FL → Atlanta, GA', time: 'Tomorrow • 2:30 PM', status: 'Scheduled' }
];

export const CalendarPage = () => {
  return (
    <div className="settings-page">
      <div className="settings-header-block">
        <div className="settings-header-icon" style={{ background: '#EFF6FF', color: '#3B82F6' }}>
          <CalendarDays size={24} />
        </div>
        <div>
          <h1 className="settings-page-title">Shipment Calendar</h1>
          <p className="settings-page-desc">Visualize upcoming pickups, deliveries, and critical shipment dates.</p>
        </div>
      </div>

      <div className="settings-two-col">
        <section className="settings-card">
          <div className="page-header-row">
            <div>
              <h3 className="page-title">March 2035</h3>
              <p className="settings-page-desc">Key logistics milestones across the month.</p>
            </div>
            <button className="btn-primary-dark-sm">
              <Clock3 size={14} />
              <span>New event</span>
            </button>
          </div>

          <div className="calendar-grid">
            {calendarDays.map((day) => (
              <div key={day} className="calendar-day-header">
                {day}
              </div>
            ))}
            {Array.from({ length: 30 }, (_, index) => {
              const date = index + 1;
              const isBooked = bookedDays.includes(date);
              return (
                <div key={date} className={`calendar-day ${isBooked ? 'booked' : ''}`}>
                  <span>{date}</span>
                  {isBooked && <span className="calendar-badge">●</span>}
                </div>
              );
            })}
          </div>
        </section>

        <section className="settings-card">
          <div className="page-header-row">
            <div>
              <h3 className="page-title">Upcoming Shipments</h3>
              <p className="settings-page-desc">Stay ahead of critical route schedules.</p>
            </div>
            <button className="btn-primary-dark-sm">
              <Truck size={14} />
              <span>View fleet</span>
            </button>
          </div>

          <div className="shipment-list-card">
            {upcomingShipments.map((shipment) => (
              <div key={shipment.id} className="shipment-list-item">
                <div>
                  <span className="shipment-id">{shipment.id}</span>
                  <p className="shipment-route">{shipment.route}</p>
                </div>
                <div className="shipment-meta">
                  <span>{shipment.time}</span>
                  <span className="shipment-status">{shipment.status}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="tracking-quick-card">
            <MapPin size={18} />
            <div>
              <p className="tracking-quick-title">Most active region</p>
              <p className="tracking-quick-value">Southeast Corridor</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
