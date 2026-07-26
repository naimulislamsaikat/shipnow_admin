import React from 'react';
import { kpiMetrics } from '../../data/mockData';
import { Truck, Activity, DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

const iconMap = {
  Truck: Truck,
  Gauge: Activity,
  DollarSign: DollarSign
};

export const MetricCards = () => {
  return (
    <div className="metrics-grid">
      {kpiMetrics.map((stat) => {
        const IconComponent = iconMap[stat.icon] || Truck;
        const isPositive = stat.changeType === 'positive';

        return (
          <div key={stat.id} className="metric-card">
            <div className="metric-header">
              <div className="metric-info">
                <span className="metric-title">{stat.title}</span>
                <div className="metric-value-row">
                  <span className="metric-value">{stat.value}</span>
                  {stat.unit && <span className="metric-unit">{stat.unit}</span>}
                </div>
              </div>
              <div className="metric-icon-box">
                <IconComponent size={22} className="text-purple-600" />
              </div>
            </div>

            <div className="metric-footer">
              <span className={`metric-change ${isPositive ? 'positive' : 'negative'}`}>
                {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {stat.change}
              </span>
              <span className="metric-period">{stat.period}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
