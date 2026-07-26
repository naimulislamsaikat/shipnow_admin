import React, { useState } from 'react';
import { useShipments } from '../../context/ShipmentContext';
import { invoicesKPIs } from '../../data/mockData';
import {
  Search,
  Filter,
  Plus,
  CheckCircle2,
  Wallet,
  Receipt,
  Clock,
  Edit,
  PauseCircle,
  Send,
  ArrowUpDown
} from 'lucide-react';

const kpiIcons = {
  CheckCircle2: CheckCircle2,
  Wallet: Wallet,
  Receipt: Receipt,
  Clock: Clock
};

export const InvoicesBilling = () => {
  const {
    invoices,
    selectedInvoice,
    setSelectedInvoice,
    setIsNewInvoiceModalOpen,
    updateInvoiceStatus,
    showToast,
    setCurrentView
  } = useShipments();

  const [searchFilter, setSearchFilter] = useState('');

  const filteredInvoices = invoices.filter(
    (inv) =>
      inv.id.toLowerCase().includes(searchFilter.toLowerCase()) ||
      inv.company.toLowerCase().includes(searchFilter.toLowerCase()) ||
      inv.shippingId.toLowerCase().includes(searchFilter.toLowerCase()) ||
      inv.status.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Paid':
        return 'inv-badge paid';
      case 'Unpaid':
        return 'inv-badge unpaid';
      case 'Overdue':
        return 'inv-badge overdue';
      default:
        return 'inv-badge pending';
    }
  };

  const handleSendInvoice = () => {
    if (!selectedInvoice) return;
    showToast(`Invoice ${selectedInvoice.id} sent to ${selectedInvoice.billFrom.email}.`);
  };

  const handleToggleHold = () => {
    if (!selectedInvoice) return;
    showToast(`Invoice ${selectedInvoice.id} put on temporary hold.`);
  };

  return (
    <div className="invoices-page">
      {/* Top Header Row */}
      <div className="page-header-row">
        <div>
          <div className="breadcrumb">
            <span onClick={() => setCurrentView('dashboard')}>Dashboard</span> / <span>Invoices & Billing</span>
          </div>
          <h1 className="page-title">Invoices & Billing</h1>
        </div>

        <div className="header-search-container">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search anything..."
            className="header-search-input"
          />
        </div>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="invoices-kpi-grid">
        {invoicesKPIs.map((kpi) => {
          const IconComp = kpiIcons[kpi.icon] || CheckCircle2;
          return (
            <div key={kpi.id} className="inv-kpi-card">
              <div className="inv-kpi-icon-box">
                <IconComp size={20} />
              </div>
              <div className="inv-kpi-content">
                <span className="inv-kpi-title">{kpi.title}</span>
                <h2 className="inv-kpi-amount">{kpi.amount}</h2>
                <span className="inv-kpi-subtext">{kpi.subtext}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Two Column View: Left Invoices Table & Right Invoice Details Receipt */}
      <div className="invoices-main-grid">
        {/* Left Table Panel */}
        <div className="dashboard-card invoices-table-card">
          <div className="card-header border-b">
            <h3 className="card-title">Invoices</h3>
            <div className="table-header-controls">
              <div className="table-search-box">
                <Search size={15} />
                <input
                  type="text"
                  placeholder="Search invoices..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                />
              </div>

              <button className="btn-tool-outline">
                <Filter size={14} /> Filter
              </button>

              <button
                className="btn-primary-dark-sm"
                onClick={() => setIsNewInvoiceModalOpen(true)}
              >
                <Plus size={14} /> New Invoice
              </button>
            </div>
          </div>

          <div className="table-wrapper">
            <table className="recent-table invoices-table">
              <thead>
                <tr>
                  <th><input type="checkbox" /></th>
                  <th>Invoice ID <ArrowUpDown size={12} className="inline ml-1" /></th>
                  <th>Company</th>
                  <th>Shipping ID</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredInvoices.map((inv) => {
                  const isSelected = selectedInvoice && selectedInvoice.id === inv.id;
                  return (
                    <tr
                      key={inv.id}
                      className={`inv-row ${isSelected ? 'selected-inv-row' : ''}`}
                      onClick={() => setSelectedInvoice(inv)}
                    >
                      <td><input type="checkbox" checked={isSelected} readOnly /></td>
                      <td>
                        <span className="inv-id-txt">{inv.id}</span>
                      </td>
                      <td>
                        <strong className="comp-name">{inv.company}</strong>
                      </td>
                      <td>
                        <span className="shipping-id-tag">{inv.shippingId}</span>
                      </td>
                      <td>
                        <div className="inv-date-cell">
                          <span>{inv.issueDate} <small>(issued)</small></span>
                          <span className="text-muted">{inv.dueDate} <small>(due)</small></span>
                        </div>
                      </td>
                      <td><strong>{inv.amount}</strong></td>
                      <td>
                        <span className={getStatusBadge(inv.status)}>
                          {inv.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Invoice Detail Receipt Panel */}
        {selectedInvoice && (
          <div className="dashboard-card invoice-details-card">
            <div className="inv-details-top-bar">
              <h3 className="card-title">Invoice Details</h3>
              <div className="inv-action-btns">
                <button
                  className="btn-tool-outline"
                  onClick={() => updateInvoiceStatus(selectedInvoice.id, 'Paid')}
                >
                  <Edit size={14} /> Edit
                </button>
                <button className="btn-tool-outline" onClick={handleToggleHold}>
                  <PauseCircle size={14} /> Hold
                </button>
                <button className="btn-primary-dark-sm" onClick={handleSendInvoice}>
                  <Send size={14} /> Send Invoice
                </button>
              </div>
            </div>

            <div className="inv-receipt-body">
              {/* Receipt Top Metadata */}
              <div className="receipt-meta-header">
                <div>
                  <h2 className="receipt-inv-id">Invoice {selectedInvoice.id}</h2>
                  <span className={getStatusBadge(selectedInvoice.status)}>
                    {selectedInvoice.status}
                  </span>
                </div>

                <div className="receipt-dates">
                  <div>Issue Date: <strong>{selectedInvoice.issueDate}</strong></div>
                  <div>Due Date: <strong>{selectedInvoice.dueDate}</strong></div>
                </div>
              </div>

              {/* Bill From / Bill To Row */}
              <div className="bill-addresses-row">
                <div className="address-box">
                  <span className="addr-label">Bill From</span>
                  <strong className="party-name">{selectedInvoice.billFrom.name}</strong>
                  <span className="party-email">{selectedInvoice.billFrom.email}</span>
                  <span className="party-address">{selectedInvoice.billFrom.address}</span>
                  <span className="party-phone">{selectedInvoice.billFrom.phone}</span>
                </div>

                <div className="address-box right-align">
                  <span className="addr-label">Bill To</span>
                  <strong className="party-name">{selectedInvoice.billTo.name}</strong>
                  <span className="party-email">{selectedInvoice.billTo.email}</span>
                  <span className="party-address">{selectedInvoice.billTo.address}</span>
                  <span className="party-phone">{selectedInvoice.billTo.phone}</span>
                </div>
              </div>

              {/* Package Summary Table */}
              <div className="receipt-items-section">
                <h4>Package Summary</h4>
                <table className="receipt-table">
                  <thead>
                    <tr>
                      <th>Description</th>
                      <th>Shipment Type</th>
                      <th>Price</th>
                      <th>Qty</th>
                      <th className="text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedInvoice.items.map((item, i) => (
                      <tr key={i}>
                        <td><strong>{item.desc}</strong></td>
                        <td><span className="freight-type-tag">{item.freight}</span></td>
                        <td>{item.price}</td>
                        <td>{item.qty}</td>
                        <td className="text-right"><strong>{item.amount}</strong></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals Summary */}
              <div className="receipt-totals-box">
                <div className="total-row">
                  <span>Sub Total</span>
                  <strong>{selectedInvoice.subtotal}</strong>
                </div>
                <div className="total-row">
                  <span>Tax (8%)</span>
                  <span>{selectedInvoice.tax}</span>
                </div>
                <div className="total-row">
                  <span>Fee</span>
                  <span>{selectedInvoice.fee}</span>
                </div>
                <div className="total-row grand-total">
                  <span>Total</span>
                  <strong className="grand-val">{selectedInvoice.total}</strong>
                </div>
              </div>

              {/* Note Footer */}
              <div className="receipt-note-footer">
                <strong>Note:</strong>
                <p>Please process payment by the due date to avoid delivery disruption. Late fees may apply after 5 business days past due.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
