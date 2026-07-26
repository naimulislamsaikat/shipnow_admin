import React from 'react';
import { productCategoriesData } from '../../data/mockData';
import { MoreHorizontal } from 'lucide-react';

export const ProductCategories = () => {
  const { total, categories } = productCategoriesData;

  return (
    <div className="dashboard-card product-categories-card">
      <div className="card-header">
        <div>
          <span className="card-title">Product Categories</span>
        </div>
        <button className="icon-menu-btn" title="Options">
          <MoreHorizontal size={18} />
        </button>
      </div>

      <div className="category-summary-row">
        <span className="category-sublabel">Total Products</span>
        <span className="category-total-val">{total.toLocaleString()}</span>
      </div>

      {/* Multi-segment Segmented Bar */}
      <div className="segmented-progress-bar">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="segment"
            style={{
              width: `${cat.percentage}%`,
              backgroundColor: cat.color
            }}
            title={`${cat.name}: ${cat.percentage}%`}
          />
        ))}
      </div>

      {/* Category breakdown rows */}
      <div className="categories-list">
        {categories.map((cat) => (
          <div key={cat.name} className="category-item-row">
            <div className="category-name-group">
              <span className="cat-color-dot" style={{ backgroundColor: cat.color }} />
              <span className="cat-name">{cat.name}</span>
            </div>
            <div className="category-stats-group">
              <span className="cat-products-pill">{cat.count} products</span>
              <span className="cat-percentage-badge">{cat.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
