import React, { useState, useEffect } from 'react';
import {
  Palette, Sun, Moon, Monitor, Type, LayoutGrid,
  ArrowLeft, Check, Sidebar, PanelLeft, Zap
} from 'lucide-react';
import { useShipments } from '../../context/ShipmentContext';

const ACCENT_COLORS = [
  { name: 'Purple',     value: '#7C4DFF', hover: '#6C38FF' },
  { name: 'Blue',       value: '#2563EB', hover: '#1D4ED8' },
  { name: 'Emerald',    value: '#059669', hover: '#047857' },
  { name: 'Rose',       value: '#E11D48', hover: '#BE123C' },
  { name: 'Amber',      value: '#D97706', hover: '#B45309' },
  { name: 'Cyan',       value: '#0891B2', hover: '#0E7490' },
];

const THEMES = [
  { id: 'light',  label: 'Light',  icon: Sun   },
  { id: 'dark',   label: 'Dark',   icon: Moon  },
  { id: 'system', label: 'System', icon: Monitor },
];

const FONT_SIZES = [
  { id: 'compact', label: 'Compact', px: '13px' },
  { id: 'normal',  label: 'Normal',  px: '14px' },
  { id: 'large',   label: 'Large',   px: '15px' },
];

const DENSITIES = [
  { id: 'cozy',    label: 'Cozy' },
  { id: 'normal',  label: 'Normal' },
  { id: 'compact', label: 'Compact' },
];

export const Appearance = () => {
  const { setCurrentView, showToast } = useShipments();

  const [theme,      setTheme]      = useState('light');
  const [accent,     setAccent]     = useState(ACCENT_COLORS[0]);
  const [fontSize,   setFontSize]   = useState('normal');
  const [density,    setDensity]    = useState('normal');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [animations, setAnimations] = useState(true);
  const [roundedCards, setRoundedCards] = useState(true);

  /* ── Apply accent color live ── */
  useEffect(() => {
    document.documentElement.style.setProperty('--primary-purple', accent.value);
    document.documentElement.style.setProperty('--primary-purple-hover', accent.hover);
  }, [accent]);

  /* ── Apply font size live ── */
  useEffect(() => {
    const size = FONT_SIZES.find(f => f.id === fontSize)?.px || '14px';
    document.documentElement.style.setProperty('--base-font-size', size);
    document.body.style.fontSize = size;
  }, [fontSize]);

  /* ── Apply dark mode skeleton live ── */
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.style.setProperty('--bg-main', '#111116');
      document.documentElement.style.setProperty('--bg-card', '#1A1A22');
      document.documentElement.style.setProperty('--text-main', '#F1F5F9');
      document.documentElement.style.setProperty('--text-muted', '#94A3B8');
      document.documentElement.style.setProperty('--border-color', '#2D2D3D');
      document.documentElement.style.setProperty('--border-subtle', '#232332');
    } else {
      document.documentElement.style.setProperty('--bg-main', '#F4F5F9');
      document.documentElement.style.setProperty('--bg-card', '#FFFFFF');
      document.documentElement.style.setProperty('--text-main', '#18181B');
      document.documentElement.style.setProperty('--text-muted', '#6B7280');
      document.documentElement.style.setProperty('--border-color', '#E2E8F0');
      document.documentElement.style.setProperty('--border-subtle', '#EEF2F6');
    }
  }, [theme]);

  const handleSave = () => {
    showToast('Appearance preferences saved!');
  };

  const handleReset = () => {
    setTheme('light');
    setAccent(ACCENT_COLORS[0]);
    setFontSize('normal');
    setDensity('normal');
    setAnimations(true);
    setRoundedCards(true);
    setSidebarCollapsed(false);
    showToast('Appearance reset to defaults.');
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
        <div className="settings-header-icon" style={{ background: '#F5F3FF' }}>
          <Palette size={22} style={{ color: 'var(--primary-purple)' }} />
        </div>
        <div>
          <h1 className="settings-page-title">Appearance</h1>
          <p className="settings-page-desc">Customize the look and feel of your ShipNow dashboard.</p>
        </div>
      </div>

      <div className="settings-body">
        <div className="settings-two-col">
          <div className="settings-col">

            {/* Theme */}
            <section className="settings-card">
              <div className="profile-card-header">
                <Sun size={16} className="pch-icon" />
                <h3>Color Theme</h3>
              </div>
              <div className="theme-selector">
                {THEMES.map(t => {
                  const Icon = t.icon;
                  const active = theme === t.id;
                  return (
                    <button
                      key={t.id}
                      className={`theme-btn ${active ? 'active' : ''}`}
                      onClick={() => { setTheme(t.id); showToast(`${t.label} theme applied.`); }}
                    >
                      <div className={`theme-preview theme-preview-${t.id}`}>
                        <div className="theme-preview-sidebar" />
                        <div className="theme-preview-body">
                          <div className="theme-preview-card" />
                          <div className="theme-preview-card" />
                        </div>
                      </div>
                      <div className="theme-btn-footer">
                        <Icon size={13} />
                        <span>{t.label}</span>
                        {active && <Check size={12} className="theme-check" />}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Accent color */}
            <section className="settings-card">
              <div className="profile-card-header">
                <Zap size={16} className="pch-icon" />
                <h3>Accent Color</h3>
              </div>
              <p className="settings-section-desc">Applied to buttons, active nav items, and highlights.</p>
              <div className="accent-color-grid">
                {ACCENT_COLORS.map(c => (
                  <button
                    key={c.name}
                    className={`accent-swatch ${accent.value === c.value ? 'active' : ''}`}
                    style={{ background: c.value }}
                    title={c.name}
                    onClick={() => { setAccent(c); showToast(`Accent color changed to ${c.name}.`); }}
                  >
                    {accent.value === c.value && <Check size={14} style={{ color: '#fff' }} />}
                  </button>
                ))}
              </div>
              <div className="accent-current-label">
                <div className="accent-dot" style={{ background: accent.value }} />
                Current: <strong>{accent.name}</strong>
              </div>
            </section>

          </div>

          <div className="settings-col">

            {/* Font Size */}
            <section className="settings-card">
              <div className="profile-card-header">
                <Type size={16} className="pch-icon" />
                <h3>Font Size</h3>
              </div>
              <p className="settings-section-desc">Adjust text size for readability.</p>
              <div className="segment-control">
                {FONT_SIZES.map(f => (
                  <button
                    key={f.id}
                    className={`segment-btn ${fontSize === f.id ? 'active' : ''}`}
                    onClick={() => { setFontSize(f.id); showToast(`Font size set to ${f.label}.`); }}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
              <div className="font-preview" style={{ fontSize: FONT_SIZES.find(f => f.id === fontSize)?.px }}>
                The quick brown fox jumps over the lazy dog.
              </div>
            </section>

            {/* Layout Density */}
            <section className="settings-card">
              <div className="profile-card-header">
                <LayoutGrid size={16} className="pch-icon" />
                <h3>Layout Density</h3>
              </div>
              <p className="settings-section-desc">Control how compact the UI feels.</p>
              <div className="segment-control">
                {DENSITIES.map(d => (
                  <button
                    key={d.id}
                    className={`segment-btn ${density === d.id ? 'active' : ''}`}
                    onClick={() => { setDensity(d.id); showToast(`Density set to ${d.label}.`); }}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </section>

            {/* Misc toggles */}
            <section className="settings-card">
              <div className="profile-card-header">
                <PanelLeft size={16} className="pch-icon" />
                <h3>Interface Options</h3>
              </div>

              {[
                { label: 'Smooth Animations',  desc: 'Enable transitions and micro-animations', val: animations,       set: setAnimations },
                { label: 'Rounded Cards',       desc: 'Use pill-style rounded corners on cards',  val: roundedCards,     set: setRoundedCards },
                { label: 'Compact Sidebar',     desc: 'Show only icons, hide nav labels',          val: sidebarCollapsed, set: setSidebarCollapsed },
              ].map(({ label, desc, val, set }) => (
                <div key={label} className="notif-row">
                  <div className="notif-row-info">
                    <span className="notif-label">{label}</span>
                    <span className="notif-desc">{desc}</span>
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

            {/* Actions */}
            <div className="appearance-actions">
              <button className="sec-outline-btn" onClick={handleReset}>
                Reset to Defaults
              </button>
              <button className="profile-save-btn" style={{ flex: 1 }} onClick={handleSave}>
                <Check size={15} /> Save Preferences
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
