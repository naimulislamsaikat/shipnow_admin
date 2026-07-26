import React, { useState, useRef } from 'react';
import { useShipments } from '../../context/ShipmentContext';
import {
  User,
  Mail,
  Phone,
  Building2,
  MapPin,
  Lock,
  Camera,
  Save,
  Eye,
  EyeOff,
  Shield,
  Bell,
  Globe,
  CheckCircle2,
  Edit3,
  ArrowLeft,
  Zap,
  Package,
  TrendingUp,
  Clock
} from 'lucide-react';

export const ProfileView = () => {
  const { user, updateProfile, setCurrentView, logout, shipments } = useShipments();

  /* ── local form state, seeded from context ── */
  const [form, setForm] = useState({
    name:     user.name,
    email:    user.email,
    phone:    user.phone,
    company:  user.company,
    location: user.location,
    bio:      user.bio,
  });

  /* ── password section ── */
  const [pwForm, setPwForm] = useState({ current: '', next: '', confirm: '' });
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNext,    setShowNext]    = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [pwError, setPwError] = useState('');

  /* ── avatar preview ── */
  const [avatarPreview, setAvatarPreview] = useState(user.avatar);
  const fileInputRef = useRef(null);

  /* ── notification prefs ── */
  const [notifPrefs, setNotifPrefs] = useState({
    email:  true,
    sms:    false,
    push:   true,
    weekly: true,
  });

  /* ── save profile ── */
  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateProfile({ ...form, avatar: avatarPreview });
  };

  /* ── avatar upload (local preview only) ── */
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  };

  /* ── password save ── */
  const handleSavePassword = (e) => {
    e.preventDefault();
    setPwError('');
    if (pwForm.next.length < 8) {
      setPwError('New password must be at least 8 characters.');
      return;
    }
    if (pwForm.next !== pwForm.confirm) {
      setPwError('Passwords do not match.');
      return;
    }
    updateProfile({});          // triggers toast without changing anything real
    setPwForm({ current: '', next: '', confirm: '' });
  };

  /* ── quick stats ── */
  const totalShipments = shipments.length;
  const delivered      = shipments.filter(s => s.status === 'Delivered').length;
  const inTransit      = shipments.filter(s => s.status === 'In Transit').length;

  return (
    <div className="profile-page">

      {/* ── Page Header ── */}
      <div className="profile-topbar">
        <button className="profile-back-btn" onClick={() => setCurrentView('dashboard')}>
          <ArrowLeft size={16} /> Back to Dashboard
        </button>
        <div className="profile-topbar-right">
          <span className="profile-joined-label">
            <Clock size={13} /> Member since {user.joinedDate}
          </span>
        </div>
      </div>

      {/* ── Hero Banner ── */}
      <div className="profile-hero">
        <div className="profile-hero-bg" />
        <div className="profile-hero-content">
          {/* Avatar */}
          <div className="profile-avatar-wrapper">
            <img src={avatarPreview} alt="User avatar" className="profile-avatar-img" />
            <button
              className="profile-avatar-edit-btn"
              onClick={() => fileInputRef.current.click()}
              title="Change photo"
            >
              <Camera size={15} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleAvatarChange}
            />
          </div>

          {/* Name & Badge */}
          <div className="profile-hero-info">
            <h2 className="profile-hero-name">{user.name}</h2>
            <div className="profile-hero-meta">
              <span className="profile-role-badge">
                <Shield size={12} /> {user.role}
              </span>
              <span className="profile-company-tag">
                <Building2 size={12} /> {user.company}
              </span>
              <span className="profile-location-tag">
                <MapPin size={12} /> {user.location}
              </span>
            </div>
          </div>

          {/* Quick stats */}
          <div className="profile-quick-stats">
            <div className="profile-stat-chip">
              <Package size={14} className="psc-icon" />
              <div>
                <span className="psc-val">{totalShipments}</span>
                <span className="psc-lbl">Shipments</span>
              </div>
            </div>
            <div className="profile-stat-chip">
              <TrendingUp size={14} className="psc-icon green" />
              <div>
                <span className="psc-val">{delivered}</span>
                <span className="psc-lbl">Delivered</span>
              </div>
            </div>
            <div className="profile-stat-chip">
              <Zap size={14} className="psc-icon purple" />
              <div>
                <span className="psc-val">{inTransit}</span>
                <span className="psc-lbl">In Transit</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Two‑column body ── */}
      <div className="profile-body">

        {/* ━━━ LEFT COLUMN ━━━ */}
        <div className="profile-col profile-col-left">

          {/* Personal Information */}
          <section className="profile-card">
            <div className="profile-card-header">
              <Edit3 size={16} className="pch-icon" />
              <h3>Personal Information</h3>
            </div>
            <form onSubmit={handleSaveProfile} className="profile-form">

              {/* Profile Picture upload area */}
              <div className="profile-field profile-avatar-field">
                <label>Profile Picture</label>
                <div className="avatar-upload-row">
                  <img src={avatarPreview} alt="preview" className="avatar-upload-thumb" />
                  <div className="avatar-upload-actions">
                    <button
                      type="button"
                      className="btn-upload-photo"
                      onClick={() => fileInputRef.current.click()}
                    >
                      <Camera size={14} /> Upload New Photo
                    </button>
                    <p className="avatar-hint">JPG, PNG or GIF · Max 5 MB</p>
                  </div>
                </div>
              </div>

              {/* Full Name */}
              <div className="profile-field">
                <label htmlFor="pf-name">
                  <User size={13} /> Full Name
                </label>
                <input
                  id="pf-name"
                  type="text"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="profile-input"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Email */}
              <div className="profile-field">
                <label htmlFor="pf-email">
                  <Mail size={13} /> Email Address
                </label>
                <input
                  id="pf-email"
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="profile-input"
                  placeholder="you@example.com"
                />
              </div>

              {/* Phone */}
              <div className="profile-field">
                <label htmlFor="pf-phone">
                  <Phone size={13} /> Phone Number
                </label>
                <input
                  id="pf-phone"
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                  className="profile-input"
                  placeholder="+1 (555) 000-0000"
                />
              </div>

              {/* Two‑col row: Company + Location */}
              <div className="profile-field-row">
                <div className="profile-field">
                  <label htmlFor="pf-company">
                    <Building2 size={13} /> Company
                  </label>
                  <input
                    id="pf-company"
                    type="text"
                    value={form.company}
                    onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    className="profile-input"
                    placeholder="Company name"
                  />
                </div>
                <div className="profile-field">
                  <label htmlFor="pf-location">
                    <MapPin size={13} /> Location
                  </label>
                  <input
                    id="pf-location"
                    type="text"
                    value={form.location}
                    onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
                    className="profile-input"
                    placeholder="City, Country"
                  />
                </div>
              </div>

              {/* Bio */}
              <div className="profile-field">
                <label htmlFor="pf-bio">
                  <Globe size={13} /> Bio
                </label>
                <textarea
                  id="pf-bio"
                  rows={3}
                  value={form.bio}
                  onChange={e => setForm(f => ({ ...f, bio: e.target.value }))}
                  className="profile-input profile-textarea"
                  placeholder="Write a short bio..."
                />
              </div>

              <button type="submit" className="profile-save-btn">
                <Save size={15} /> Save Changes
              </button>
            </form>
          </section>

        </div>

        {/* ━━━ RIGHT COLUMN ━━━ */}
        <div className="profile-col profile-col-right">

          {/* Change Password */}
          <section className="profile-card">
            <div className="profile-card-header">
              <Lock size={16} className="pch-icon" />
              <h3>Change Password</h3>
            </div>
            <form onSubmit={handleSavePassword} className="profile-form">
              {/* Current */}
              <div className="profile-field">
                <label htmlFor="pw-current"><Lock size={13} /> Current Password</label>
                <div className="pw-input-wrap">
                  <input
                    id="pw-current"
                    type={showCurrent ? 'text' : 'password'}
                    value={pwForm.current}
                    onChange={e => setPwForm(f => ({ ...f, current: e.target.value }))}
                    className="profile-input"
                    placeholder="Enter current password"
                    required
                  />
                  <button type="button" className="pw-eye" onClick={() => setShowCurrent(p => !p)}>
                    {showCurrent ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>
              {/* New */}
              <div className="profile-field">
                <label htmlFor="pw-new"><Lock size={13} /> New Password</label>
                <div className="pw-input-wrap">
                  <input
                    id="pw-new"
                    type={showNext ? 'text' : 'password'}
                    value={pwForm.next}
                    onChange={e => setPwForm(f => ({ ...f, next: e.target.value }))}
                    className="profile-input"
                    placeholder="Min. 8 characters"
                    required
                  />
                  <button type="button" className="pw-eye" onClick={() => setShowNext(p => !p)}>
                    {showNext ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {/* Strength meter */}
                <div className="pw-strength-row">
                  {[1,2,3,4].map(i => (
                    <div
                      key={i}
                      className={`pw-strength-bar ${pwForm.next.length >= i * 3 ? (pwForm.next.length >= 10 ? 'strong' : 'medium') : ''}`}
                    />
                  ))}
                  <span className="pw-strength-label">
                    {pwForm.next.length === 0 ? '' : pwForm.next.length < 6 ? 'Weak' : pwForm.next.length < 10 ? 'Fair' : 'Strong'}
                  </span>
                </div>
              </div>
              {/* Confirm */}
              <div className="profile-field">
                <label htmlFor="pw-confirm"><Lock size={13} /> Confirm New Password</label>
                <div className="pw-input-wrap">
                  <input
                    id="pw-confirm"
                    type={showConfirm ? 'text' : 'password'}
                    value={pwForm.confirm}
                    onChange={e => setPwForm(f => ({ ...f, confirm: e.target.value }))}
                    className="profile-input"
                    placeholder="Repeat new password"
                    required
                  />
                  <button type="button" className="pw-eye" onClick={() => setShowConfirm(p => !p)}>
                    {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {pwForm.confirm && pwForm.next === pwForm.confirm && (
                  <span className="pw-match-ok"><CheckCircle2 size={13} /> Passwords match</span>
                )}
              </div>
              {pwError && <p className="pw-error">{pwError}</p>}
              <button type="submit" className="profile-save-btn">
                <Lock size={15} /> Update Password
              </button>
            </form>
          </section>

          {/* Notification Preferences */}
          <section className="profile-card">
            <div className="profile-card-header">
              <Bell size={16} className="pch-icon" />
              <h3>Notification Preferences</h3>
            </div>
            <div className="profile-form">
              {[
                { key: 'email',  label: 'Email Notifications',        desc: 'Shipment updates & alerts via email' },
                { key: 'sms',    label: 'SMS / Text Notifications',   desc: 'Receive critical alerts via SMS' },
                { key: 'push',   label: 'Push Notifications',         desc: 'In-app & browser push alerts' },
                { key: 'weekly', label: 'Weekly Summary Report',       desc: 'A digest of activity every Monday' },
              ].map(({ key, label, desc }) => (
                <div key={key} className="notif-row">
                  <div className="notif-row-info">
                    <span className="notif-label">{label}</span>
                    <span className="notif-desc">{desc}</span>
                  </div>
                  <button
                    className={`toggle-switch ${notifPrefs[key] ? 'on' : ''}`}
                    onClick={() => setNotifPrefs(p => ({ ...p, [key]: !p[key] }))}
                    aria-label={`Toggle ${label}`}
                  >
                    <span className="toggle-thumb" />
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Danger Zone */}
          <section className="profile-card danger-card">
            <div className="profile-card-header">
              <Shield size={16} className="pch-icon danger" />
              <h3 className="danger-title">Account Actions</h3>
            </div>
            <div className="danger-body">
              <div className="danger-row">
                <div>
                  <p className="danger-row-label">Sign out of all devices</p>
                  <p className="danger-row-desc">Revoke active sessions across all platforms.</p>
                </div>
                <button className="btn-danger-outline" onClick={logout}>Logout</button>
              </div>
              <div className="danger-row">
                <div>
                  <p className="danger-row-label">Delete Account</p>
                  <p className="danger-row-desc">Permanently remove your data. This cannot be undone.</p>
                </div>
                <button className="btn-danger-solid">Delete</button>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};
