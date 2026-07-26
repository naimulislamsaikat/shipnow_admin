import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { profitSummaryData } from '../../data/mockData';
import { TrendingUp, ChevronDown } from 'lucide-react';

export const ProfitSummaryChart = () => {
  const [timeRange, setTimeRange] = useState('Last 8 Months');

  return (
    <div className="dashboard-card profit-summary-card">
      <div className="card-header">
        <div>
          <span className="card-subtitle">Profit Summary</span>
          <div className="card-value-row">
            <h2 className="card-value">$624,550</h2>
            <span className="badge-growth positive">
              <TrendingUp size={12} /> +5.62%
            </span>
          </div>
        </div>

        <div className="dropdown-wrapper">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="card-dropdown"
          >
            <option value="Last 8 Months">Last 8 Months</option>
            <option value="This Year">This Year</option>
          </select>
          <ChevronDown size={14} className="dropdown-arrow" />
        </div>
      </div>

      <div className="chart-legend-top">
        <div className="legend-item">
          <span className="legend-dot bg-purple" />
          <span className="legend-text">Revenue: <strong>$87,824</strong></span>
        </div>
        <div className="legend-item">
          <span className="legend-dot bg-gray" />
          <span className="legend-text">Cost: <strong>$45,689</strong></span>
        </div>
      </div>

      <div className="chart-container" style={{ width: '100%', height: 180 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={profitSummaryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#6B7280', fontSize: 11 }}
              tickFormatter={(v) => `$${(v / 1000).toFixed(0)}K`}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="custom-tooltip">
                      <p className="tooltip-label">{label} 2035</p>
                      <p className="tooltip-item text-purple">
                        Revenue: ${payload[0]?.value?.toLocaleString()}
                      </p>
                      <p className="tooltip-item text-gray">
                        Cost: ${payload[1]?.value?.toLocaleString()}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="Revenue" fill="#7C4DFF" radius={[3, 3, 0, 0]} barSize={12} />
            <Bar dataKey="Cost" fill="#E2E8F0" radius={[3, 3, 0, 0]} barSize={12} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
