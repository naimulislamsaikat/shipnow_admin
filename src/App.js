import React, { useState } from 'react';
import { ShipmentProvider, useShipments } from './context/ShipmentContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { ProUpgradeModal } from './components/layout/ProUpgradeModal';
import { AuthScreen } from './components/auth/AuthScreen';
import { Dashboard } from './components/dashboard/Dashboard';
import { ShipmentsGrid } from './components/shipments/ShipmentsGrid';
import { ShipmentsList } from './components/shipments/ShipmentsList';
import { CreateShipment } from './components/shipments/CreateShipment';
import { ShipmentDetailModal } from './components/shipments/ShipmentDetailModal';
import { Warehouse } from './components/warehouse/Warehouse';
import { InvoicesBilling } from './components/invoices/InvoicesBilling';
import { NewInvoiceModal } from './components/invoices/NewInvoiceModal';
import { ProfileView } from './components/profile/ProfileView';
import { PrivacySecurity } from './components/settings/PrivacySecurity';
import { Appearance } from './components/settings/Appearance';
import { HelpSupport } from './components/settings/HelpSupport';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard';
import { CalendarPage } from './components/calendar/CalendarPage';
import { TrackingPage } from './components/tracking/TrackingPage';
import { FleetsPage } from './components/fleets/FleetsPage';
import { DriversPage } from './components/drivers/DriversPage';
import { MessagesPage } from './components/messages/MessagesPage';
import { NotificationsPage } from './components/notifications/NotificationsPage';

const AppContent = () => {
  const { isAuthenticated, currentView, toastMessage } = useShipments();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  if (!isAuthenticated || currentView === 'login') {
    return <AuthScreen />;
  }

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'shipments-grid':
        return <ShipmentsGrid />;
      case 'shipments-list':
        return <ShipmentsList />;
      case 'create-shipment':
        return <CreateShipment />;
      case 'warehouse':
        return <Warehouse />;
      case 'invoices':
        return <InvoicesBilling />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'calendar':
        return <CalendarPage />;
      case 'tracking':
        return <TrackingPage />;
      case 'fleets':
        return <FleetsPage />;
      case 'drivers':
        return <DriversPage />;
      case 'messages':
        return <MessagesPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'profile':
        return <ProfileView />;
      case 'privacy-security':
        return <PrivacySecurity />;
      case 'appearance':
        return <Appearance />;
      case 'help-support':
        return <HelpSupport />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onNavItemClick={() => {
          if (window.innerWidth <= 992) {
            setIsSidebarOpen(false);
          }
        }}
      />
      <div
        className={`mobile-sidebar-backdrop ${isSidebarOpen ? 'visible' : ''}`}
        onClick={() => setIsSidebarOpen(false)}
      />
      <div className="app-main-content">
        <Header toggleSidebar={() => setIsSidebarOpen((open) => !open)} />
        <main>{renderView()}</main>
      </div>

      {/* Global Modals & Notifications */}
      <ProUpgradeModal />
      <ShipmentDetailModal />
      <NewInvoiceModal />

      {toastMessage && (
        <div className="toast-banner">
          <span className="toast-dot" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

function App() {
  return (
    <ShipmentProvider>
      <AppContent />
    </ShipmentProvider>
  );
}

export default App;
