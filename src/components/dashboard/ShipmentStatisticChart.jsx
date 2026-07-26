import React, { useState } from 'react';
import {
  ResponsiveContainer,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
  ComposedChart
} from 'recharts';
import { shipmentStatisticsData } from '../../data/mockData';
import { TrendingUp, ChevronDown } from 'lucide-react';

export const ShipmentStatisticChart = () => {
  const [timeRange, setTimeRange] = useState('Last Year');

  return (
    <div className="dashboard-card shipment-statistic-card">
      <div className="card-header">
        <div>
          <span className="card-subtitle">Shipment Statistic</span>
          <div className="card-value-row">
            <h2 className="card-value">4,352</h2>
            <span className="badge-growth positive">
              <TrendingUp size={12} /> +8.7%
            </span>
          </div>
        </div>

        <div className="dropdown-wrapper">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="card-dropdown"
          >
            <option value="Last Year">Last Year</option>
            <option value="Last 6 Months">Last 6 Months</option>
          </select>
          <ChevronDown size={14} className="dropdown-arrow" />
        </div>
      </div>

      <div className="chart-container" style={{ width: '100%', height: 210 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={shipmentStatisticsData} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="shipmentGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#6B7280', fontSize: 11 }}
              tickFormatter={(v) => `${(v / 1000).toFixed(1)}K`}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="custom-tooltip">
                      <p className="tooltip-label">{label} 2035</p>
                      <p className="tooltip-value text-purple-600 font-bold">
                        {payload[0].value.toLocaleString()} shipments
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="shipments" fill="#DDD6FE" radius={[4, 4, 0, 0]} barSize={20} />
            <Area type="monotone" dataKey="shipments" stroke="#7C4DFF" strokeWidth={3} fill="url(#shipmentGrad)" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
