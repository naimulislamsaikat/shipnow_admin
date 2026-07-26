import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { shipmentTypeData } from '../../data/mockData';
import { MoreHorizontal } from 'lucide-react';

export const ShipmentTypeChart = () => {
  const { total, types } = shipmentTypeData;

  return (
    <div className="dashboard-card shipment-type-card">
      <div className="card-header">
        <div>
          <span className="card-title">Shipment Type</span>
        </div>
        <button className="icon-menu-btn" title="Options">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="donut-chart-wrapper" style={{ width: '100%', height: 180, position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={types}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={78}
              paddingAngle={3}
              dataKey="count"
            >
              {types.map((entry) => (
                <Cell key={entry.name} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="custom-tooltip">
                      <p className="tooltip-label">{data.name}</p>
                      <p className="tooltip-value">{data.count.toLocaleString()} shipments ({data.percentage}%)</p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Donut Label */}
        <div className="donut-center-label">
          <span className="donut-sub">Total Shipment</span>
          <span className="donut-val">{total.toLocaleString()}</span>
        </div>
      </div>

      {/* Legend Grid Below */}
      <div className="shipment-types-grid">
        {types.map((type) => (
          <div key={type.name} className="type-legend-card">
            <div className="type-badge-box" style={{ backgroundColor: type.color }}>
              {type.percentage}%
            </div>
            <div className="type-info">
              <span className="type-name">{type.name}</span>
              <span className="type-count">{type.count.toLocaleString()} shipments</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
