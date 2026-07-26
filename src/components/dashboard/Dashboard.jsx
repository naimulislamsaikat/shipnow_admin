import React from 'react';
import { MetricCards } from './MetricCards';
import { ShipmentStatisticChart } from './ShipmentStatisticChart';
import { ProfitSummaryChart } from './ProfitSummaryChart';
import { ProductCategories } from './ProductCategories';
import { LiveTrackingWidget } from './LiveTrackingWidget';
import { ShipmentTypeChart } from './ShipmentTypeChart';
import { ShipmentAlerts } from './ShipmentAlerts';
import { RecentShipmentsTable } from './RecentShipmentsTable';
import { RecentActivityFeed } from './RecentActivityFeed';

export const Dashboard = () => {
  return (
    <div className="dashboard-page">
      {/* KPI Top Stat Row */}
      <MetricCards />

      {/* Main Grid Row 1 (Charts & Map) */}
      <div className="dashboard-grid-row-1">
        {/* Left Column (Statistics & Profit) */}
        <div className="dash-col col-left">
          <ShipmentStatisticChart />
          <ProfitSummaryChart />
        </div>

        {/* Middle Column (Categories & Map Widget) */}
        <div className="dash-col col-middle">
          <ProductCategories />
          <LiveTrackingWidget />
        </div>

        {/* Right Column (Shipment Types & Alerts) */}
        <div className="dash-col col-right">
          <ShipmentTypeChart />
          <ShipmentAlerts />
        </div>
      </div>

      {/* Bottom Grid Row 2 (Recent Shipments Table & Activity Feed) */}
      <div className="dashboard-grid-row-2">
        <div className="dash-col-wide">
          <RecentShipmentsTable />
        </div>
        <div className="dash-col-narrow">
          <RecentActivityFeed />
        </div>
      </div>
    </div>
  );
};
