import React, { useState } from 'react';
import {
  Shield, Lock, Smartphone, Monitor, Globe, Eye, EyeOff,
  AlertTriangle, CheckCircle2, ArrowLeft, Clock, MapPin,
  RefreshCw, Key, Fingerprint, LogOut, ChevronRight, X
} from 'lucide-react';
import { useShipments } from '../../context/ShipmentContext';

const SESSIONS = [
  { id: 1, device: 'Chrome on Windows', location: 'San Francisco, CA', lastActive: 'Now (Current)', icon: Monitor, current: true },
  { id: 2, device: 'Safari on iPhone 15', location: 'San Jose, CA', lastActive: '2 hours ago', icon: Smartphone, current: false },
  { id: 3, device: 'Firefox on macOS', location: 'New York, NY', lastActive: 'Yesterday at 9:15 AM', icon: Globe, current: false },
];

const ACTIVITY_LOG = [
  { event: 'Login successful', detail: 'Chrome on Windows · San Francisco, CA', time: 'Just now', type: 'success' },
  { event: 'Password changed', detail: 'Via Profile Settings', time: '3 days ago', type: 'warning' },
  { event: 'Login successful', detail: 'Safari on iPhone · San Jose, CA', time: '5 days ago', type: 'success' },
  { event: 'Failed login attempt', detail: 'Unknown device · Tokyo, Japan', time: '1 week ago', type: 'danger' },
  { event: 'Two-factor auth enabled', detail: 'SMS authentication set up', time: '2 weeks ago', type: 'success' },
];

export const PrivacySecurity = () => {
  const { setCurrentView, showToast } = useShipments();

  const [twoFA, setTwoFA]           = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [deviceHistory, setDeviceHistory] = useState(true);
  const [dataSharing, setDataSharing]     = useState(false);
  const [sessions, setSessions]           = useState(SESSIONS);
  const [showRecovery, setShowRecovery]   = useState(false);

  const revokeSession = (id) => {
    setSessions(prev => prev.filter(s => s.id !== id));
    showToast('Session revoked successfully.');
  };

  const score = [twoFA, loginAlerts, !dataSharing].filter(Boolean).length;
  const scoreLabel = score === 3 ? 'Excellent' : score === 2 ? 'Good' : 'Fair';
  const scoreColor = score === 3 ? '#10B981' : score === 2 ? '#F59E0B' : '#EF4444';
  const scoreWidth = `${(score / 3) * 100}%`;

  return (
    <div className="settings-page">
      {/* Top bar */}
      <div className="settings-topbar">
        <button className="profile-back-btn" onClick={() => setCurrentView('dashboard')}>
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
      </div>

      <div className="settings-header-block">
        <div className="settings-header-icon" style={{ background: '#EFF6FF' }}>
          <Shield size={22} style={{ color: '#2563EB' }} />
        </div>
        <div>
          <h1 className="settings-page-title">Privacy &amp; Security</h1>
          <p className="settings-page-desc">Manage your account security, active sessions, and privacy preferences.</p>
        </div>
      </div>

      <div className="settings-body">

        {/* Security Score */}
        <section className="settings-card">
          <div className="profile-card-header">
            <CheckCircle2 size={16} style={{ color: scoreColor }} />
            <h3>Security Score</h3>
          </div>
          <div className="security-score-wrap">
            <div className="security-score-bar-bg">
              <div className="security-score-bar-fill" style={{ width: scoreWidth, background: scoreColor }} />
            </div>
            <div className="security-score-meta">
              <span className="security-score-label" style={{ color: scoreColor }}>{scoreLabel}</span>
              <span className="security-score-tip">{score}/3 security checks passed</span>
            </div>
          </div>
          <div className="security-checks">
            {[
              { label: 'Two-factor authentication', ok: twoFA },
              { label: 'Login alerts enabled', ok: loginAlerts },
              { label: 'Third-party data sharing off', ok: !dataSharing },
            ].map(c => (
              <div key={c.label} className="security-check-row">
                {c.ok
                  ? <CheckCircle2 size={15} style={{ color: '#10B981', flexShrink: 0 }} />
                  : <AlertTriangle size={15} style={{ color: '#F59E0B', flexShrink: 0 }} />}
                <span className={`security-check-text ${c.ok ? '' : 'warn'}`}>{c.label}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="settings-two-col">

          {/* Left */}
          <div className="settings-col">

            {/* Security settings toggles */}
            <section className="settings-card">
              <div className="profile-card-header">
                <Lock size={16} className="pch-icon" />
                <h3>Security Settings</h3>
              </div>

              {[
                { icon: Fingerprint, label: 'Two-Factor Authentication', desc: 'Require a verification code on login', val: twoFA, set: setTwoFA },
                { icon: AlertTriangle, label: 'Login Alerts', desc: 'Get notified of new sign-ins to your account', val: loginAlerts, set: setLoginAlerts },
                { icon: Clock, label: 'Device Login History', desc: 'Keep track of devices that access your account', val: deviceHistory, set: setDeviceHistory },
                { icon: Globe, label: 'Third-Party Data Sharing', desc: 'Allow analytics partners to receive usage data', val: dataSharing, set: setDataSharing },
              ].map(({ icon: Icon, label, desc, val, set }) => (
                <div key={label} className="notif-row">
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <Icon size={15} style={{ color: 'var(--text-muted)', marginTop: 2, flexShrink: 0 }} />
                    <div className="notif-row-info">
                      <span className="notif-label">{label}</span>
                      <span className="notif-desc">{desc}</span>
                    </div>
                  </div>
                  <button
                    className={`toggle-switch ${val ? 'on' : ''}`}
                    onClick={() => { set(v => !v); showToast(`${label} ${!val ? 'enabled' : 'disabled'}.`); }}
                  >
                    <span className="toggle-thumb" />
                  </button>
                </div>
              ))}
            </section>

            {/* Recovery */}
            <section className="settings-card">
              <div className="profile-card-header">
                <Key size={16} className="pch-icon" />
                <h3>Recovery &amp; Backup</h3>
              </div>
              <div className="recovery-row">
                <div>
                  <p className="notif-label">Recovery Codes</p>
                  <p className="notif-desc">Use these if you lose access to your authenticator app.</p>
                </div>
                <button className="sec-outline-btn" onClick={() => setShowRecovery(true)}>
                  <Eye size={13} /> View Codes
                </button>
              </div>
              <div className="recovery-row" style={{ marginTop: 12 }}>
                <div>
                  <p className="notif-label">Regenerate Codes</p>
                  <p className="notif-desc">Invalidates old codes and creates 10 new ones.</p>
                </div>
                <button className="sec-outline-btn" onClick={() => showToast('New recovery codes generated.')}>
                  <RefreshCw size={13} /> Regenerate
                </button>
              </div>

              {showRecovery && (
                <div className="recovery-codes-box">
                  <div className="recovery-codes-header">
                    <span>Recovery Codes</span>
                    <button onClick={() => setShowRecovery(false)}><X size={14} /></button>
                  </div>
                  <div className="recovery-codes-grid">
                    {['A1B2-C3D4', 'E5F6-G7H8', 'I9J0-K1L2', 'M3N4-O5P6',
                      'Q7R8-S9T0', 'U1V2-W3X4', 'Y5Z6-A7B8', 'C9D0-E1F2',
                      'G3H4-I5J6', 'K7L8-M9N0'].map(c => (
                      <code key={c} className="recovery-code">{c}</code>
                    ))}
                  </div>
                  <p className="recovery-codes-hint">Store these somewhere safe. Each code can only be used once.</p>
                </div>
              )}
            </section>
          </div>

          {/* Right */}
          <div className="settings-col">

            {/* Active Sessions */}
            <section className="settings-card">
              <div className="profile-card-header">
                <Monitor size={16} className="pch-icon" />
                <h3>Active Sessions</h3>
              </div>
              <div className="sessions-list">
                {sessions.map(s => {
                  const Icon = s.icon;
                  return (
                    <div key={s.id} className={`session-row ${s.current ? 'session-current' : ''}`}>
                      <div className="session-icon-wrap">
                        <Icon size={18} />
                      </div>
                      <div className="session-info">
                        <div className="session-device">
                          {s.device}
                          {s.current && <span className="session-current-badge">Current</span>}
                        </div>
                        <div className="session-meta">
                          <MapPin size={11} /> {s.location} &nbsp;·&nbsp;
                          <Clock size={11} /> {s.lastActive}
                        </div>
                      </div>
                      {!s.current && (
                        <button className="session-revoke-btn" onClick={() => revokeSession(s.id)}>
                          <LogOut size={13} /> Revoke
                        </button>
                      )}
                    </div>
                  );
                })}
                {sessions.length === 0 && (
                  <p className="empty-sessions">No other active sessions.</p>
                )}
              </div>
            </section>

            {/* Activity Log */}
            <section className="settings-card">
              <div className="profile-card-header">
                <Clock size={16} className="pch-icon" />
                <h3>Recent Activity</h3>
              </div>
              <div className="activity-log-list">
                {ACTIVITY_LOG.map((a, i) => (
                  <div key={i} className="activity-log-row">
                    <div className={`activity-log-dot dot-${a.type}`} />
                    <div className="activity-log-info">
                      <span className="activity-log-event">{a.event}</span>
                      <span className="activity-log-detail">{a.detail}</span>
                    </div>
                    <span className="activity-log-time">{a.time}</span>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </div>
  );
};
