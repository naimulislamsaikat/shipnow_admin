import React from 'react';
import { useShipments } from '../../context/ShipmentContext';
import { X, CheckCircle, Clock, MapPin, Truck, User } from 'lucide-react';

export const ShipmentDetailModal = () => {
  const { selectedShipment, setSelectedShipment } = useShipments();

  if (!selectedShipment) return null;

  return (
    <div className="modal-overlay" onClick={() => setSelectedShipment(null)}>
      <div className="modal-content detail-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setSelectedShipment(null)}>
          <X size={20} />
        </button>

        <div className="detail-modal-header">
          <div className="detail-title-group">
            <span className="detail-id">{selectedShipment.id}</span>
            <span className="badge-pill badge-transit">{selectedShipment.status}</span>
          </div>
          <p className="detail-company">{selectedShipment.company} • {selectedShipment.category}</p>
        </div>

        <div className="detail-progress-section">
          <div className="progress-info-row">
            <span>Overall Progress</span>
            <strong className="text-purple-600">{selectedShipment.progress}% Completed</strong>
          </div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${selectedShipment.progress}%` }} />
          </div>
        </div>

        <div className="detail-grid">
          <div className="detail-box">
            <div className="box-title"><MapPin size={16} /> Origin Location</div>
            <strong className="box-val">{selectedShipment.origin}</strong>
            <span className="box-sub">Dispatched: {selectedShipment.shipDate} ({selectedShipment.shipTime})</span>
          </div>

          <div className="detail-box">
            <div className="box-title"><MapPin size={16} /> Destination</div>
            <strong className="box-val">{selectedShipment.destination}</strong>
            <span className="box-sub">Estimated: {selectedShipment.estDeliveryDate} ({selectedShipment.estDeliveryTime})</span>
          </div>

          <div className="detail-box">
            <div className="box-title"><Truck size={16} /> Freight & Carrier</div>
            <strong className="box-val">{selectedShipment.carrier} ({selectedShipment.freightType})</strong>
            <span className="box-sub">Weight: {selectedShipment.weight}</span>
          </div>

          <div className="detail-box">
            <div className="box-title"><User size={16} /> Assigned Courier</div>
            <strong className="box-val">Daniel Cooper</strong>
            <span className="box-sub">SkyLogic Express (Driver ID: #DR-8821)</span>
          </div>
        </div>

        <div className="timeline-horizontal">
          <h4>Shipment Milestone History</h4>
          <div className="milestones-steps">
            <div className="step done">
              <div className="step-icon"><CheckCircle size={16} /></div>
              <span>Order Received</span>
            </div>
            <div className="step done">
              <div className="step-icon"><CheckCircle size={16} /></div>
              <span>Picked Up</span>
            </div>
            <div className={`step ${selectedShipment.progress >= 50 ? 'done' : 'current'}`}>
              <div className="step-icon"><Truck size={16} /></div>
              <span>In Transit</span>
            </div>
            <div className={`step ${selectedShipment.progress >= 90 ? 'done' : ''}`}>
              <div className="step-icon"><Clock size={16} /></div>
              <span>Out for Delivery</span>
            </div>
            <div className={`step ${selectedShipment.progress >= 100 ? 'done' : ''}`}>
              <div className="step-icon"><CheckCircle size={16} /></div>
              <span>Delivered</span>
            </div>
          </div>
        </div>

        <div className="detail-modal-footer">
          <button className="btn-secondary-outline" onClick={() => setSelectedShipment(null)}>
            Close Window
          </button>
        </div>
      </div>
    </div>
  );
};
