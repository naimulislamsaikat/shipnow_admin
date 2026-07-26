import React from 'react';
import { MessageCircle, Clock3, CheckCircle2 } from 'lucide-react';

const conversations = [
  { id: 1, name: 'FedEx Ops', last: 'Confirming delivery window for order #4456.', time: 'Now', badge: 2 },
  { id: 2, name: 'Warehouse Team', last: 'Inventory check completed for dock A5.', time: '9:24 AM', badge: 0 },
  { id: 3, name: 'Dispatch', last: 'Route update: driver T-214 detouring via I-5.', time: '8:12 AM', badge: 1 }
];

export const MessagesPage = () => {
  return (
    <div className="settings-page">
      <div className="settings-header-block">
        <div className="settings-header-icon" style={{ background: '#F8FAFC', color: '#0F172A' }}>
          <MessageCircle size={24} />
        </div>
        <div>
          <h1 className="settings-page-title">Messages</h1>
          <p className="settings-page-desc">Centralized team communication for priority shipping operations.</p>
        </div>
      </div>

      <div className="settings-two-col">
        <section className="settings-card conversation-list-card">
          <h3 className="page-title">Recent conversations</h3>
          {conversations.map((conversation) => (
            <div key={conversation.id} className="conversation-item">
              <div>
                <strong>{conversation.name}</strong>
                <p>{conversation.last}</p>
              </div>
              <div className="conversation-meta">
                <span>{conversation.time}</span>
                {conversation.badge > 0 && <span className="badge-pill">{conversation.badge}</span>}
              </div>
            </div>
          ))}
        </section>

        <section className="settings-card message-status-card">
          <div className="page-header-row">
            <div>
              <h3 className="page-title">Quick actions</h3>
              <p className="settings-page-desc">Speed up replies and escalate urgent updates.</p>
            </div>
            <button className="btn-primary-dark-sm">
              <Clock3 size={14} />
              <span>New message</span>
            </button>
          </div>
          <div className="message-status-grid">
            <div className="message-status-item">
              <CheckCircle2 size={18} />
              <div>
                <strong>20 resolved</strong>
                <p>Closed messages this week.</p>
              </div>
            </div>
            <div className="message-status-item">
              <CheckCircle2 size={18} />
              <div>
                <strong>4 pending</strong>
                <p>Awaiting responses.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
