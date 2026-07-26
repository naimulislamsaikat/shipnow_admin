import React, { createContext, useContext, useState } from 'react';
import { initialShipments, initialInvoices } from '../data/mockData';

const ShipmentContext = createContext();

export const ShipmentProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard');
  const [user, setUser] = useState({
    name: 'Naimul Islam',
    email: 'naimulislam.dev@shipnow.com',
    role: 'Admin',
    phone: '+880 1308-320991',
    company: 'ShipNow Logistics Inc.',
    location: 'San Francisco, CA, USA',
    bio: 'Logistics administrator overseeing global freight operations and supply chain optimizations.',
    joinedDate: 'January 2026',
    avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  });

  const [shipments, setShipments] = useState(initialShipments);
  const [invoices, setInvoices] = useState(initialInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState(initialInvoices[7]); // INV-1008 ModaWear by default
  const [isNewInvoiceModalOpen, setIsNewInvoiceModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [isProModalOpen, setIsProModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const login = (email) => {
    setIsAuthenticated(true);
    setUser((prev) => ({ ...prev, email: email || 'naimulislam.dev@shipnow.com' }));
    setCurrentView('dashboard');
    showToast('Welcome back, Naimul! Logged in successfully.');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentView('login');
  };

  const updateProfile = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
    showToast('Profile updated successfully!');
  };

  const addShipment = (newShipmentData) => {
    const newId = `#SH${Math.floor(1000000 + Math.random() * 9000000)}`;
    const newShipment = {
      id: newId,
      company: newShipmentData.senderCompany || 'GreenHaven',
      category: newShipmentData.category || 'General Cargo',
      carrier: newShipmentData.carrier || 'FedEx',
      freightType: newShipmentData.freightType || 'Road Freight',
      weight: `${newShipmentData.weight || 125} ${newShipmentData.units || 'kg'}`,
      origin: newShipmentData.pickupAddress || 'Portland, OR, USA',
      destination: newShipmentData.deliveryAddress || 'Salt Lake City, UT, USA',
      originCode: 'POR',
      destCode: 'SLC',
      shipDate: newShipmentData.shipDate || 'Mar 21, 2035',
      shipTime: '09:00 AM',
      estDeliveryDate: 'Mar 25, 2035',
      estDeliveryTime: '04:00 PM',
      progress: 25,
      status: 'Processing',
      statusBadge: 'Pending'
    };

    setShipments((prev) => [newShipment, ...prev]);
    showToast(`Shipment ${newId} created successfully!`);
    setCurrentView('shipments-list');
  };

  const deleteShipment = (id) => {
    setShipments((prev) => prev.filter((item) => item.id !== id));
    showToast(`Shipment ${id} removed.`);
  };

  const addInvoice = (newInv) => {
    setInvoices((prev) => [newInv, ...prev]);
    setSelectedInvoice(newInv);
    showToast(`Invoice ${newInv.id} issued successfully.`);
  };

  const updateInvoiceStatus = (id, newStatus) => {
    setInvoices((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: newStatus } : inv))
    );
    setSelectedInvoice((prev) => (prev && prev.id === id ? { ...prev, status: newStatus } : prev));
    showToast(`Invoice ${id} marked as ${newStatus}.`);
  };

  return (
    <ShipmentContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        currentView,
        setCurrentView,
        user,
        setUser,
        shipments,
        setShipments,
        invoices,
        setInvoices,
        selectedInvoice,
        setSelectedInvoice,
        isNewInvoiceModalOpen,
        setIsNewInvoiceModalOpen,
        addInvoice,
        updateInvoiceStatus,
        activeTab,
        setActiveTab,
        searchQuery,
        setSearchQuery,
        selectedShipment,
        setSelectedShipment,
        isProModalOpen,
        setIsProModalOpen,
        toastMessage,
        showToast,
        login,
        logout,
        updateProfile,
        addShipment,
        deleteShipment
      }}
    >
      {children}
    </ShipmentContext.Provider>
  );
};

export const useShipments = () => {
  const context = useContext(ShipmentContext);
  if (!context) {
    throw new Error('useShipments must be used within a ShipmentProvider');
  }
  return context;
};
