import React from 'react';
import { useShipments } from '../../context/ShipmentContext';
import { DownloadCloud } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import { analyticsData } from '../../data/mockData';

export const AnalyticsDashboard = () => {
  const { showToast } = useShipments();
  const COLORS = ['#7C4DFF', '#34D399', '#FBBF24', '#EF4444'];

  return (
    <div className="settings-page">
      <div className="settings-header-block">
        <div className="settings-header-icon" style={{ background: '#F0F9FF' }}>
          <DownloadCloud size={24} />
        </div>
        <div>
          <h1 className="settings-page-title">Analytics Dashboard</h1>
          <p className="settings-page-desc">Track shipments, revenue, and freight trends.</p>
        </div>
        <button className="btn-primary-dark-sm" onClick={() => showToast('Report export started')}>
          <DownloadCloud size={14} />
          <span>Export report</span>
        </button>
      </div>

      <div className="settings-two-col">
        <div className="settings-col">
          {/* Shipments Over Time Line Chart */}
          <section className="settings-card">
            <h3>Shipments Over Time</h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={analyticsData.shipments}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#7C4DFF" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </section>

          {/* Revenue by Region Bar Chart */}
          <section className="settings-card">
            <h3>Revenue by Region</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={analyticsData.revenue}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="region" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#34D399" />
              </BarChart>
            </ResponsiveContainer>
          </section>
        </div>

        <div className="settings-col">
          {/* Freight Type Distribution Pie Chart */}
          <section className="settings-card">
            <h3>Freight Type Distribution</h3>
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie data={analyticsData.freightTypes} dataKey="value" nameKey="name" outerRadius={80} label>
                  {analyticsData.freightTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </section>
        </div>
      </div>
    </div>
  );
};
