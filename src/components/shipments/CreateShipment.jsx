import React, { useState } from 'react';
import { useShipments } from '../../context/ShipmentContext';
import { ArrowLeft, Trash2, Send } from 'lucide-react';

export const CreateShipment = () => {
  const { addShipment, setCurrentView, showToast } = useShipments();

  // Generated auto ID
  const [autoId] = useState(`#SH${Math.floor(1000000 + Math.random() * 9000000)}`);

  const [formData, setFormData] = useState({
    senderCompany: 'GreenHaven',
    senderPhone: '+1 408-555-7210',
    senderEmail: 'logistics@greenhaven.com',
    pickupAddress: '1120 Birch Street, Portland, OR 97205, USA',

    recipientCompany: 'FreshNest',
    recipientPhone: '+1 786-555-4432',
    recipientEmail: 'warehouse@freshnest.com',
    deliveryAddress: '',

    itemDescription: 'Premium Garden Tool Set',
    quantity: 40,
    value: '$3,200',
    weight: 125,
    units: 'Kg',
    length: 80,
    width: 60,
    height: 20,

    freightType: 'Road Freight',
    carrier: 'FedEx',
    shippingMethod: 'Express Ground',
    shipmentId: autoId,
    shipDate: '2035-03-21',
    notes: '',

    insurance: true,
    tempControl: true,
    signature: true,
    fragile: false,
    notifyRecipient: true
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.deliveryAddress.trim()) {
      setErrors({ deliveryAddress: 'Address is required.' });
      return;
    }

    addShipment(formData);
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to clear this form?')) {
      setFormData({
        senderCompany: '',
        senderPhone: '',
        senderEmail: '',
        pickupAddress: '',
        recipientCompany: '',
        recipientPhone: '',
        recipientEmail: '',
        deliveryAddress: '',
        itemDescription: '',
        quantity: 1,
        value: '',
        weight: 1,
        units: 'Kg',
        length: 10,
        width: 10,
        height: 10,
        freightType: 'Road Freight',
        carrier: 'FedEx',
        shippingMethod: 'Express Ground',
        shipmentId: autoId,
        shipDate: '2035-03-21',
        notes: '',
        insurance: false,
        tempControl: false,
        signature: false,
        fragile: false,
        notifyRecipient: false
      });
      showToast('Form cleared.');
    }
  };

  return (
    <div className="create-shipment-page">
      {/* Top Header */}
      <div className="page-header-row">
        <div>
          <div className="breadcrumb">
            <span onClick={() => setCurrentView('dashboard')}>Dashboard</span> /{' '}
            <span onClick={() => setCurrentView('shipments-list')}>Shipments</span> /{' '}
            <span>Create New Shipment</span>
          </div>
          <button className="back-link-btn" onClick={() => setCurrentView('shipments-list')}>
            <ArrowLeft size={18} />
            <h2>Create New Shipment</h2>
          </button>
        </div>
      </div>

      {/* Main Form Container */}
      <div className="form-card-wrapper">
        <div className="form-card-header">
          <h3>Shipment Form</h3>
        </div>

        <form onSubmit={handleSubmit} className="shipment-main-form">
          {/* Top Two Panels: Sender Info & Recipient Info */}
          <div className="form-two-col-grid">
            {/* Sender Info Panel */}
            <div className="form-panel">
              <h4 className="panel-subtitle">Sender Info</h4>

              <div className="form-group-item">
                <label>Company</label>
                <input
                  type="text"
                  value={formData.senderCompany}
                  onChange={(e) => handleChange('senderCompany', e.target.value)}
                  placeholder="Company Name"
                  required
                />
              </div>

              <div className="form-two-inputs">
                <div className="form-group-item">
                  <label>Email</label>
                  <input
                    type="email"
                    value={formData.senderEmail}
                    onChange={(e) => handleChange('senderEmail', e.target.value)}
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="form-group-item">
                  <label>Phone Number</label>
                  <div className="phone-input-group">
                    <span className="flag-icon">🇺🇸</span>
                    <input
                      type="text"
                      value={formData.senderPhone}
                      onChange={(e) => handleChange('senderPhone', e.target.value)}
                      placeholder="Phone"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group-item">
                <label>Pickup Address</label>
                <input
                  type="text"
                  value={formData.pickupAddress}
                  onChange={(e) => handleChange('pickupAddress', e.target.value)}
                  placeholder="Street address, city, state/province, ZIP code"
                  required
                />
              </div>
            </div>

            {/* Recipient Info Panel */}
            <div className="form-panel">
              <h4 className="panel-subtitle">Recipient Info</h4>

              <div className="form-group-item">
                <label>Company</label>
                <input
                  type="text"
                  value={formData.recipientCompany}
                  onChange={(e) => handleChange('recipientCompany', e.target.value)}
                  placeholder="Company Name"
                  required
                />
              </div>

              <div className="form-two-inputs">
                <div className="form-group-item">
                  <label>Email</label>
                  <input
                    type="email"
                    value={formData.recipientEmail}
                    onChange={(e) => handleChange('recipientEmail', e.target.value)}
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div className="form-group-item">
                  <label>Phone Number</label>
                  <div className="phone-input-group">
                    <span className="flag-icon">🇺🇸</span>
                    <input
                      type="text"
                      value={formData.recipientPhone}
                      onChange={(e) => handleChange('recipientPhone', e.target.value)}
                      placeholder="Phone"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="form-group-item">
                <label>Delivery Address</label>
                <input
                  type="text"
                  value={formData.deliveryAddress}
                  onChange={(e) => handleChange('deliveryAddress', e.target.value)}
                  placeholder="Street address, city, state/province, ZIP code"
                  className={errors.deliveryAddress ? 'input-error' : ''}
                />
                {errors.deliveryAddress && (
                  <span className="error-text">{errors.deliveryAddress}</span>
                )}
              </div>
            </div>
          </div>

          {/* Bottom Two Panels: Package Details & Shipping Details */}
          <div className="form-two-col-grid">
            {/* Package Details Panel */}
            <div className="form-panel">
              <h4 className="panel-subtitle">Package Details</h4>

              <div className="form-group-item">
                <label>Item Description</label>
                <input
                  type="text"
                  value={formData.itemDescription}
                  onChange={(e) => handleChange('itemDescription', e.target.value)}
                  placeholder="Description of items..."
                  required
                />
              </div>

              <div className="form-two-inputs">
                <div className="form-group-item">
                  <label>Quantity</label>
                  <input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => handleChange('quantity', parseInt(e.target.value) || 1)}
                    min="1"
                    required
                  />
                </div>
                <div className="form-group-item">
                  <label>Value</label>
                  <input
                    type="text"
                    value={formData.value}
                    onChange={(e) => handleChange('value', e.target.value)}
                    placeholder="$0.00"
                    required
                  />
                </div>
              </div>

              <div className="form-two-inputs">
                <div className="form-group-item">
                  <label>Weight</label>
                  <input
                    type="number"
                    value={formData.weight}
                    onChange={(e) => handleChange('weight', parseInt(e.target.value) || 0)}
                    required
                  />
                </div>
                <div className="form-group-item">
                  <label>Units</label>
                  <select
                    value={formData.units}
                    onChange={(e) => handleChange('units', e.target.value)}
                  >
                    <option value="Kg">Kg</option>
                    <option value="Lb">Lb</option>
                  </select>
                </div>
              </div>

              <div className="dimensions-row">
                <label>Dimensions</label>
                <div className="dim-inputs-grid">
                  <div className="dim-input-box">
                    <input
                      type="number"
                      value={formData.length}
                      onChange={(e) => handleChange('length', parseInt(e.target.value) || 0)}
                    />
                    <span>cm (L)</span>
                  </div>
                  <div className="dim-input-box">
                    <input
                      type="number"
                      value={formData.width}
                      onChange={(e) => handleChange('width', parseInt(e.target.value) || 0)}
                    />
                    <span>cm (W)</span>
                  </div>
                  <div className="dim-input-box">
                    <input
                      type="number"
                      value={formData.height}
                      onChange={(e) => handleChange('height', parseInt(e.target.value) || 0)}
                    />
                    <span>cm (H)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Details Panel */}
            <div className="form-panel">
              <h4 className="panel-subtitle">Shipping Details</h4>

              <div className="freight-type-radios">
                <label className="radio-label">Freight Type</label>
                <div className="radios-group">
                  {['Road Freight', 'Rail Freight', 'Ocean Freight', 'Air Freight'].map((type) => (
                    <label key={type} className="radio-item">
                      <input
                        type="radio"
                        name="freightType"
                        value={type}
                        checked={formData.freightType === type}
                        onChange={(e) => handleChange('freightType', e.target.value)}
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="form-three-inputs">
                <div className="form-group-item">
                  <label>Carrier</label>
                  <select
                    value={formData.carrier}
                    onChange={(e) => handleChange('carrier', e.target.value)}
                  >
                    <option value="FedEx">FedEx</option>
                    <option value="DHL">DHL</option>
                    <option value="UPS">UPS</option>
                    <option value="USPS">USPS</option>
                    <option value="Aramex">Aramex</option>
                  </select>
                </div>
                <div className="form-group-item">
                  <label>Shipping Method</label>
                  <select
                    value={formData.shippingMethod}
                    onChange={(e) => handleChange('shippingMethod', e.target.value)}
                  >
                    <option value="Express Ground">Express Ground</option>
                    <option value="Next Day Priority">Next Day Priority</option>
                    <option value="Standard Freight">Standard Freight</option>
                  </select>
                </div>
                <div className="form-group-item">
                  <label>Shipment ID</label>
                  <input type="text" value={formData.shipmentId} readOnly className="readonly-input" />
                  <span className="sub-helper">Auto-generated</span>
                </div>
              </div>

              <div className="form-group-item">
                <label>Shipment Date</label>
                <input
                  type="date"
                  value={formData.shipDate}
                  onChange={(e) => handleChange('shipDate', e.target.value)}
                />
              </div>

              <div className="form-group-item">
                <label>Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleChange('notes', e.target.value)}
                  placeholder="Add special delivery notes (optional)..."
                  rows={2}
                />
              </div>

              <div className="additional-services-grid">
                <label className="full-width-label">Additional Services</label>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={formData.insurance}
                    onChange={(e) => handleChange('insurance', e.target.checked)}
                  />
                  <span>Insurance Coverage</span>
                </label>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={formData.tempControl}
                    onChange={(e) => handleChange('tempControl', e.target.checked)}
                  />
                  <span>Temperature Control</span>
                </label>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={formData.signature}
                    onChange={(e) => handleChange('signature', e.target.checked)}
                  />
                  <span>Signature on Delivery</span>
                </label>
                <label className="checkbox-item">
                  <input
                    type="checkbox"
                    checked={formData.fragile}
                    onChange={(e) => handleChange('fragile', e.target.checked)}
                  />
                  <span>Fragile Item Handling</span>
                </label>
              </div>

              <div className="toggle-switch-row">
                <div className="toggle-label-group">
                  <span>Tracking & Status Updates</span>
                  <small>Notify Recipient via Email/SMS</small>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={formData.notifyRecipient}
                    onChange={(e) => handleChange('notifyRecipient', e.target.checked)}
                  />
                  <span className="toggle-slider" />
                </label>
              </div>
            </div>
          </div>

          {/* Form Action Buttons */}
          <div className="form-actions-bar">
            <button type="button" className="btn-secondary-outline" onClick={handleReset}>
              <Trash2 size={16} /> Delete Form
            </button>
            <button type="submit" className="btn-primary-dark-submit">
              Submit Shipment <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
