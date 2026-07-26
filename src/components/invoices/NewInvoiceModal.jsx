import React, { useState } from 'react';
import { useShipments } from '../../context/ShipmentContext';
import { X, Send } from 'lucide-react';

export const NewInvoiceModal = () => {
  const { isNewInvoiceModalOpen, setIsNewInvoiceModalOpen, addInvoice } = useShipments();

  const [company, setCompany] = useState('ModaWear');
  const [shippingId, setShippingId] = useState('#SH8893247');
  const [amount, setAmount] = useState('910.00');

  if (!isNewInvoiceModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newId = `INV-${Math.floor(1000 + Math.random() * 9000)}`;
    const newInv = {
      id: newId,
      company: company,
      shippingId: shippingId,
      issueDate: 'Mar 26, 2035',
      dueDate: 'Apr 02, 2035',
      amount: `$${parseFloat(amount).toFixed(2)}`,
      status: 'Unpaid',
      billFrom: {
        name: company,
        email: `billing@${company.toLowerCase().replace(/\s+/g, '')}.com`,
        address: '59 Franklin St, Boston, MA 02110, USA',
        phone: '+1 617-555-2290'
      },
      billTo: {
        name: 'ShipNow Logistics',
        email: 'accounts@shipnow.com',
        address: '901 Distribution Ave, Charlotte, NC 28217, USA',
        phone: '+1 704-555-9911'
      },
      items: [
        {
          desc: 'Freight Transit & Logistics Services',
          freight: 'Road Freight Express',
          price: `$${parseFloat(amount).toFixed(2)}`,
          qty: 1,
          amount: `$${parseFloat(amount).toFixed(2)}`
        }
      ],
      subtotal: `$${parseFloat(amount).toFixed(2)}`,
      tax: `$${(parseFloat(amount) * 0.08).toFixed(2)}`,
      fee: '$10.00',
      total: `$${(parseFloat(amount) * 1.08 + 10).toFixed(2)}`
    };

    addInvoice(newInv);
    setIsNewInvoiceModalOpen(false);
  };

  return (
    <div className="modal-overlay" onClick={() => setIsNewInvoiceModalOpen(false)}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setIsNewInvoiceModalOpen(false)}>
          <X size={20} />
        </button>

        <div className="pro-modal-header">
          <h2>Create New Invoice</h2>
          <p>Issue an invoice to a client for shipping and logistics services.</p>
        </div>

        <form onSubmit={handleSubmit} className="shipment-main-form" style={{ padding: 0 }}>
          <div className="form-group-item">
            <label>Client Company Name</label>
            <input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />
          </div>

          <div className="form-two-inputs">
            <div className="form-group-item">
              <label>Shipping ID</label>
              <input
                type="text"
                value={shippingId}
                onChange={(e) => setShippingId(e.target.value)}
                required
              />
            </div>
            <div className="form-group-item">
              <label>Amount ($ USD)</label>
              <input
                type="number"
                step="0.01"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-actions-bar">
            <button
              type="button"
              className="btn-secondary-outline"
              onClick={() => setIsNewInvoiceModalOpen(false)}
            >
              Cancel
            </button>
            <button type="submit" className="btn-primary-dark-submit">
              Issue Invoice <Send size={16} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
