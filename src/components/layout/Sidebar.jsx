import React, { useState, useRef, useEffect } from 'react';
import { useShipments } from '../../context/ShipmentContext';
import {
  LayoutDashboard,
  BarChart3,
  Calendar,
  Package,
  Navigation,
  Building2,
  Truck,
  Users,
  FileText,
  MessageSquare,
  Bell,
  Settings,
  Sparkles,
  Zap,
  MoreHorizontal,
  LogOut,
  UserCircle2,
  ChevronRight,
  Shield,
  Palette,
  HelpCircle,
  X
} from 'lucide-react';

export const Sidebar = ({ isOpen, onClose, onNavItemClick }) => {
  const { currentView, setCurrentView, setIsProModalOpen, user, logout } = useShipments();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [settingsDropdownOpen, setSettingsDropdownOpen] = useState(false);
  const userDropdownRef = useRef(null);
  const settingsDropdownRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (userDropdownRef.current && !userDropdownRef.current.contains(e.target)) {
        setUserDropdownOpen(false);
      }
      if (settingsDropdownRef.current && !settingsDropdownRef.current.contains(e.target)) {
        setSettingsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems = [
    { id: 'dashboard',       label: 'Dashboard',        icon: LayoutDashboard },
    { id: 'analytics',       label: 'Analytics',         icon: BarChart3 },
    { id: 'calendar',        label: 'Calendar',          icon: Calendar },
    { id: 'shipments-grid',  label: 'Shipments (Grid)',  icon: Package },
    { id: 'shipments-list',  label: 'Shipments (List)',  icon: Package },
    { id: 'tracking',        label: 'Tracking',          icon: Navigation },
    { id: 'warehouse',       label: 'Warehouse',         icon: Building2 },
    { id: 'fleets',          label: 'Fleets',            icon: Truck },
    { id: 'drivers',         label: 'Drivers',           icon: Users },
    { id: 'invoices',        label: 'Invoices & Billing',icon: FileText },
    { id: 'messages',        label: 'Message',           icon: MessageSquare, badge: 19 },
    { id: 'notifications',   label: 'Notification',      icon: Bell, badge: 5 },
  ];

  const settingsMenuItems = [
    { icon: UserCircle2, label: 'Profile Settings',  action: () => { setSettingsDropdownOpen(false); setCurrentView('profile'); } },
    { icon: Shield,      label: 'Privacy & Security',action: () => { setSettingsDropdownOpen(false); setCurrentView('privacy-security'); } },
    { icon: Palette,     label: 'Appearance',         action: () => { setSettingsDropdownOpen(false); setCurrentView('appearance'); } },
    { icon: HelpCircle,  label: 'Help & Support',     action: () => { setSettingsDropdownOpen(false); setCurrentView('help-support'); } },
    {
      icon: LogOut,
      label: 'Logout',
      action: () => { setSettingsDropdownOpen(false); logout(); },
      danger: true
    },
  ];

  const handleLogout = () => {
    setUserDropdownOpen(false);
    logout();
  };

  const handleNavSelect = (id) => {
    setCurrentView(id);
    if (onNavItemClick) {
      onNavItemClick();
    }
  };

  const handleCloseSideBar = () => {
    if (onClose) {
      onClose();
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Brand Header */}
      <div className="sidebar-brand">
        <div className="sidebar-brand-left" onClick={() => handleNavSelect('dashboard')}>
          <div className="brand-logo-icon">
            <Zap size={20} className="fill-current" />
          </div>
          <span className="brand-name">SHIPNOW</span>
        </div>
        <button className="sidebar-close-btn" onClick={handleCloseSideBar} aria-label="Close sidebar">
          <X size={18} />
        </button>
      </div>

      {/* User Profile Card with dropdown */}
      <div className="sidebar-user-card" ref={userDropdownRef}>
        <img
          src={user.avatar}
          alt={`${user.name} avatar`}
          className="user-avatar"
        />
        <div className="user-info">
          <h4 className="user-name">{user.name}</h4>
          <span className="user-role">{user.role}</span>
        </div>
        <button
          className="user-menu-btn"
          title="User Options"
          onClick={() => setUserDropdownOpen((o) => !o)}
        >
          <MoreHorizontal size={16} />
        </button>

        {/* User Card Dropdown */}
        {userDropdownOpen && (
          <div className="sidebar-dropdown user-dropdown">
            <div className="sidebar-dropdown-header">
              <span className="dropdown-user-name">{user.name}</span>
              <span className="dropdown-user-email">{user.email}</span>
            </div>
            <div className="sidebar-dropdown-divider" />
            <button
              className="sidebar-dropdown-item"
              onClick={() => { setUserDropdownOpen(false); setCurrentView('profile'); }}
            >
              <UserCircle2 size={15} />
              <span>View Profile</span>
            </button>
            <button
              className="sidebar-dropdown-item danger"
              onClick={handleLogout}
            >
              <LogOut size={15} />
              <span>Logout</span>
            </button>
          </div>
        )}
      </div>

      {/* Navigation List */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            currentView === item.id ||
            (item.id.startsWith('shipments') && currentView.startsWith('shipments'));

          return (
            <button
              key={item.id}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => handleNavSelect(item.id)}
            >
              <Icon size={18} className="nav-icon" />
              <span className="nav-label">{item.label}</span>
              {item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          );
        })}

        {/* Settings nav item with dropdown */}
        <div className="settings-nav-wrapper" ref={settingsDropdownRef}>
          <button
            className={`nav-item ${currentView === 'settings' ? 'active' : ''}`}
            onClick={() => setSettingsDropdownOpen((o) => !o)}
          >
            <Settings size={18} className="nav-icon" />
            <span className="nav-label">Settings</span>
            <ChevronRight
              size={14}
              className="nav-chevron"
              style={{ transform: settingsDropdownOpen ? 'rotate(90deg)' : 'rotate(0deg)' }}
            />
          </button>

          {settingsDropdownOpen && (
            <div className="sidebar-dropdown settings-dropdown">
              <div className="sidebar-dropdown-header">
                <span className="dropdown-user-name">Settings</span>
              </div>
              <div className="sidebar-dropdown-divider" />
              {settingsMenuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.label}
                    className={`sidebar-dropdown-item${item.danger ? ' danger' : ''}`}
                    onClick={item.action}
                  >
                    <Icon size={15} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </nav>

      {/* Pro Upgrade Banner */}
      <div className="pro-upgrade-card">
        <div className="pro-badge">
          <Sparkles size={14} /> PRO
        </div>
        <h4 className="pro-title">Loving ShipNow Free?</h4>
        <p className="pro-description">
          Go Pro to access priority support, real-time tracking, and full analytics.
        </p>
        <button
          className="pro-btn"
          onClick={() => setIsProModalOpen(true)}
        >
          Go Pro Today
        </button>
      </div>
    </aside>
  );
};
