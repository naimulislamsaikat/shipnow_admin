import React from 'react';
import { useShipments } from '../../context/ShipmentContext';
import { X, CheckCircle, Zap } from 'lucide-react';

export const ProUpgradeModal = () => {
  const { isProModalOpen, setIsProModalOpen, showToast } = useShipments();

  if (!isProModalOpen) return null;

  const handleUpgrade = (tier) => {
    setIsProModalOpen(false);
    showToast(`🎉 Congratulations! Upgraded to ShipNow Pro (${tier}).`);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsProModalOpen(false)}>
      <div className="modal-content pro-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setIsProModalOpen(false)}>
          <X size={20} />
        </button>

        <div className="pro-modal-header">
          <div className="pro-icon-wrapper">
            <Zap size={28} />
          </div>
          <h2>Upgrade to ShipNow Pro</h2>
          <p>Unlock high-speed GPS tracking, AI dispatching, and unlimited team seats.</p>
        </div>

        <div className="pro-features-grid">
          <div className="feature-item">
            <CheckCircle size={18} className="feature-check" />
            <span>Priority Live Support 24/7</span>
          </div>
          <div className="feature-item">
            <CheckCircle size={18} className="feature-check" />
            <span>Sub-second Vehicle GPS Tracking</span>
          </div>
          <div className="feature-item">
            <CheckCircle size={18} className="feature-check" />
            <span>Predictive AI Route Optimization</span>
          </div>
          <div className="feature-item">
            <CheckCircle size={18} className="feature-check" />
            <span>Unlimited Automated Reports & PDF Export</span>
          </div>
        </div>

        <div className="pro-pricing-plans">
          <div className="pricing-card standard">
            <h3>Pro Monthly</h3>
            <div className="price">$29 <span>/ month</span></div>
            <p>Billed monthly. Cancel anytime.</p>
            <button className="btn-plan-select" onClick={() => handleUpgrade('Monthly')}>
              Upgrade Monthly
            </button>
          </div>

          <div className="pricing-card featured">
            <div className="plan-badge">Popular</div>
            <h3>Pro Annual</h3>
            <div className="price">$24 <span>/ month</span></div>
            <p>Billed annually ($288/yr). Save 20%.</p>
            <button className="btn-plan-select featured" onClick={() => handleUpgrade('Annual')}>
              Upgrade Annual
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
