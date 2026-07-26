import React, { useState } from 'react';
import { Search, Navigation, Plus, Minus } from 'lucide-react';

export const LiveTrackingWidget = () => {
  const [searchId, setSearchId] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);

  return (
    <div className="dashboard-card live-tracking-card">
      {/* Map Header Overlay */}
      <div className="map-header-bar">
        <div className="map-search-input-box">
          <input
            type="text"
            placeholder="Search by Shipping ID..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <Search size={16} className="map-search-icon" />
        </div>

        <div className="map-controls">
          <button onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.6))}>
            <Plus size={16} />
          </button>
          <button onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}>
            <Minus size={16} />
          </button>
        </div>
      </div>

      {/* Simulated Interactive Map Display */}
      <div className="simulated-map-wrapper" style={{ transform: `scale(${zoomLevel})` }}>
        <div className="map-grid-bg" />

        {/* Route SVG vector with pulse animation */}
        <svg className="map-route-svg" viewBox="0 0 500 200">
          <path
            d="M 50 140 Q 250 40 450 60"
            fill="none"
            stroke="#93C5FD"
            strokeWidth="4"
            strokeDasharray="6 6"
          />
          <path
            d="M 50 140 Q 250 40 450 60"
            fill="none"
            stroke="#7C4DFF"
            strokeWidth="4"
            className="animated-route-line"
          />
          {/* Start & End node dots */}
          <circle cx="50" cy="140" r="7" fill="#7C4DFF" />
          <circle cx="450" cy="60" r="7" fill="#10B981" />
        </svg>

        {/* Live Vehicle Marker */}
        <div className="live-vehicle-marker" style={{ left: '52%', top: '35%' }}>
          <div className="pulse-ring" />
          <div className="marker-icon">
            <Navigation size={14} className="transform rotate-45 text-white" />
          </div>
        </div>

        {/* Floating Tracking Card */}
        <div className="map-floating-card">
          <div className="floating-card-top">
            <div className="id-badge-group">
              <span className="shipment-id">#SH8743921</span>
              <span className="badge-status transit">In Transit</span>
              <span className="badge-status schedule">On Schedule</span>
            </div>
            <div className="courier-info">
              <span className="courier-role">Courier</span>
              <span className="courier-name">Daniel Cooper</span>
              <span className="courier-org">SkyLogic Express</span>
            </div>
          </div>

          <div className="route-timeline-compact">
            <div className="timeline-point origin">
              <span className="point-dot" />
              <div className="point-info">
                <strong>San Francisco, CA, USA</strong>
                <span>Mar 19, 2035 - 10:30 AM</span>
              </div>
            </div>
            <div className="timeline-connector">
              <Navigation size={12} className="connector-icon" />
            </div>
            <div className="timeline-point dest">
              <span className="point-dot green" />
              <div className="point-info">
                <strong>New York, NY, USA</strong>
                <span>Mar 23, 2035 - 03:00 PM (estimated)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
