import React, { useState } from 'react';
import {
  HelpCircle, Search, ChevronDown, ChevronUp, MessageSquare,
  BookOpen, ArrowLeft, Send, Package, FileText, Truck,
  AlertCircle, Star, ExternalLink, Mail, Phone as PhoneIcon
} from 'lucide-react';
import { useShipments } from '../../context/ShipmentContext';

const FAQ = [
  {
    q: 'How do I create a new shipment?',
    a: 'Click the "Add New Shipping" button in the top header or navigate to the Create Shipment page from the Sidebar. Fill in sender/receiver details, choose your freight type, and submit the form.'
  },
  {
    q: 'How can I track a live shipment?',
    a: 'Go to the Dashboard and use the Live Tracking widget. You can also click any shipment row to open the detail modal, which shows a step-by-step milestone timeline.'
  },
  {
    q: 'What does "In Transit" status mean?',
    a: '"In Transit" means your package is currently moving between locations on the route. It has been picked up but has not yet reached its final destination.'
  },
  {
    q: 'How do I issue a new invoice?',
    a: 'Go to Invoices & Billing from the sidebar, then click the "New Invoice" button in the top-right. Fill in the client details, add line items, and confirm to issue the invoice.'
  },
  {
    q: 'Can I export shipment or invoice data?',
    a: 'Export functionality is available under the Pro plan. Upgrade via the "Go Pro Today" button in the sidebar to unlock CSV/PDF exports.'
  },
  {
    q: 'How do I change my account password?',
    a: 'Go to Profile Settings (via the user dropdown or Settings menu). Find the "Change Password" section, enter your current password and new password, then click "Update Password".'
  },
  {
    q: 'What freight types does ShipNow support?',
    a: 'ShipNow supports Air Freight, Sea Freight, Road Freight, and Rail Freight. You can select the type when creating a new shipment or filtering the Warehouse view.'
  },
  {
    q: 'How do I set up two-factor authentication?',
    a: 'Navigate to Settings → Privacy & Security. Toggle on "Two-Factor Authentication". You will be guided to link your phone number or authenticator app.'
  },
];

const QUICK_LINKS = [
  { icon: BookOpen,  label: 'Documentation',   desc: 'Read the full user guide',         href: '#' },
  { icon: Package,   label: 'Shipment Guide',   desc: 'Creating & managing shipments',   href: '#' },
  { icon: FileText,  label: 'Billing Help',     desc: 'Invoices, payments, and plans',   href: '#' },
  { icon: Truck,     label: 'Carrier Info',     desc: 'Supported carriers and coverage', href: '#' },
];

const STAR_RATINGS = [1, 2, 3, 4, 5];

export const HelpSupport = () => {
  const { setCurrentView, showToast } = useShipments();

  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq]         = useState(null);
  const [contactForm, setContactForm] = useState({ subject: '', message: '', category: 'General' });
  const [rating, setRating]           = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted]     = useState(false);

  const filteredFaq = FAQ.filter(
    f =>
      f.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      f.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!contactForm.message.trim()) return;
    setSubmitted(true);
    showToast('Support ticket submitted! We\'ll reply within 24 hours.');
    setTimeout(() => {
      setSubmitted(false);
      setContactForm({ subject: '', message: '', category: 'General' });
      setRating(0);
    }, 3000);
  };

  return (
    <div className="settings-page">
      {/* Top bar */}
      <div className="settings-topbar">
        <button className="profile-back-btn" onClick={() => setCurrentView('dashboard')}>
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
      </div>

      <div className="settings-header-block">
        <div className="settings-header-icon" style={{ background: '#F0FDF4' }}>
          <HelpCircle size={22} style={{ color: '#16A34A' }} />
        </div>
        <div>
          <h1 className="settings-page-title">Help &amp; Support</h1>
          <p className="settings-page-desc">Find answers, browse documentation, or contact our support team.</p>
        </div>
      </div>

      <div className="settings-body">

        {/* Search FAQ */}
        <section className="settings-card help-search-card">
          <div className="help-search-inner">
            <Search size={18} className="help-search-icon" />
            <input
              type="text"
              placeholder="Search help articles, FAQs..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="help-search-input"
            />
          </div>
        </section>

        <div className="settings-two-col">
          <div className="settings-col">

            {/* FAQ Accordion */}
            <section className="settings-card">
              <div className="profile-card-header">
                <AlertCircle size={16} className="pch-icon" />
                <h3>Frequently Asked Questions</h3>
              </div>
              {filteredFaq.length === 0 ? (
                <p style={{ fontSize: 13, color: 'var(--text-muted)', padding: '12px 0' }}>
                  No results for "{searchQuery}". Try a different search.
                </p>
              ) : (
                <div className="faq-list">
                  {filteredFaq.map((faq, i) => {
                    const isOpen = openFaq === i;
                    return (
                      <div key={i} className={`faq-item ${isOpen ? 'open' : ''}`}>
                        <button className="faq-question" onClick={() => setOpenFaq(isOpen ? null : i)}>
                          <span>{faq.q}</span>
                          {isOpen ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                        </button>
                        {isOpen && (
                          <div className="faq-answer">{faq.a}</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Quick Links */}
            <section className="settings-card">
              <div className="profile-card-header">
                <BookOpen size={16} className="pch-icon" />
                <h3>Quick Links</h3>
              </div>
              <div className="quick-links-grid">
                {QUICK_LINKS.map(l => {
                  const Icon = l.icon;
                  return (
                    <a key={l.label} href={l.href} className="quick-link-card" onClick={e => e.preventDefault()}>
                      <div className="ql-icon-wrap"><Icon size={18} /></div>
                      <div>
                        <p className="ql-label">{l.label}</p>
                        <p className="ql-desc">{l.desc}</p>
                      </div>
                      <ExternalLink size={12} className="ql-arrow" />
                    </a>
                  );
                })}
              </div>
            </section>

          </div>

          <div className="settings-col">

            {/* Contact Form */}
            <section className="settings-card">
              <div className="profile-card-header">
                <MessageSquare size={16} className="pch-icon" />
                <h3>Contact Support</h3>
              </div>

              {submitted ? (
                <div className="contact-submitted">
                  <div className="contact-submitted-icon">✓</div>
                  <h4>Message Sent!</h4>
                  <p>Our team will get back to you within 24 hours.</p>
                </div>
              ) : (
                <form className="profile-form" onSubmit={handleSubmit}>
                  <div className="profile-field">
                    <label>Category</label>
                    <select
                      value={contactForm.category}
                      onChange={e => setContactForm(f => ({ ...f, category: e.target.value }))}
                      className="profile-input"
                    >
                      <option>General</option>
                      <option>Billing &amp; Payments</option>
                      <option>Shipment Issue</option>
                      <option>Technical Problem</option>
                      <option>Feature Request</option>
                      <option>Account Access</option>
                    </select>
                  </div>
                  <div className="profile-field">
                    <label>Subject</label>
                    <input
                      type="text"
                      value={contactForm.subject}
                      onChange={e => setContactForm(f => ({ ...f, subject: e.target.value }))}
                      className="profile-input"
                      placeholder="Brief description of your issue"
                    />
                  </div>
                  <div className="profile-field">
                    <label>Message</label>
                    <textarea
                      rows={5}
                      value={contactForm.message}
                      onChange={e => setContactForm(f => ({ ...f, message: e.target.value }))}
                      className="profile-input profile-textarea"
                      placeholder="Describe your issue in detail..."
                      required
                    />
                  </div>
                  <button type="submit" className="profile-save-btn">
                    <Send size={14} /> Send Message
                  </button>
                </form>
              )}
            </section>

            {/* Rate us + Contact info */}
            <section className="settings-card">
              <div className="profile-card-header">
                <Star size={16} className="pch-icon" />
                <h3>Rate Your Experience</h3>
              </div>
              <div className="star-rating-row">
                {STAR_RATINGS.map(s => (
                  <button
                    key={s}
                    className={`star-btn ${s <= (hoverRating || rating) ? 'active' : ''}`}
                    onMouseEnter={() => setHoverRating(s)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => { setRating(s); showToast(`Thanks for rating us ${s} star${s > 1 ? 's' : ''}! ⭐`); }}
                  >
                    <Star size={26} />
                  </button>
                ))}
              </div>
              {rating > 0 && (
                <p className="star-rating-label">
                  {rating >= 4 ? 'We\'re glad you\'re enjoying ShipNow!' :
                   rating === 3 ? 'Thanks! We\'ll keep improving.' :
                   'Sorry to hear that. Your feedback helps us get better.'}
                </p>
              )}

              <div className="contact-info-block">
                <div className="contact-info-row">
                  <div className="ci-icon"><Mail size={14} /></div>
                  <div>
                    <p className="ci-label">Email Support</p>
                    <p className="ci-value">support@shipnow.io</p>
                  </div>
                </div>
                <div className="contact-info-row">
                  <div className="ci-icon"><PhoneIcon size={14} /></div>
                  <div>
                    <p className="ci-label">Phone (Mon–Fri, 9AM–6PM)</p>
                    <p className="ci-value">+1 (800) 747-4669</p>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};
