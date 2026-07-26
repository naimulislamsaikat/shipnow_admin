import React from 'react';
import { recentActivityFeed } from '../../data/mockData';
import { MoreHorizontal, Package, Tag, RotateCcw, CheckCircle2 } from 'lucide-react';

const iconMap = {
  Package: Package,
  Tag: Tag,
  RotateCcw: RotateCcw,
  CheckCircle: CheckCircle2
};

export const RecentActivityFeed = () => {
  return (
    <div className="dashboard-card recent-activity-card">
      <div className="card-header border-b">
        <h3 className="card-title">Recent Activity</h3>
        <button className="icon-menu-btn" title="Options">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="activity-timeline-list">
        {recentActivityFeed.map((item) => {
          const IconComponent = iconMap[item.icon] || Package;

          return (
            <div key={item.id} className="activity-item">
              <div className="activity-icon-avatar">
                <IconComponent size={16} />
              </div>
              <div className="activity-content">
                <p className="activity-text">
                  User <strong className="user-mention">{item.user}</strong> {item.action}
                </p>
                <span className="activity-timestamp">{item.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
