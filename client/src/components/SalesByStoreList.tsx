import React, { useMemo } from "react";
import { Inventory } from "../types"; // Adjust path based on your file structure

interface SalesByStoreListProps {
  sales: Inventory[];
}

const SalesByStoreList: React.FC<SalesByStoreListProps> = ({ sales }) => {
  // Calculate total sales by store
  const salesByStore = useMemo(() => {
    return sales.reduce<Record<string, number>>((acc, sale) => {
      acc[sale.store] = (acc[sale.store] || 0) + 1;
      return acc;
    }, {});
  }, [sales]);

  // Create a sorted list of stores by sales count
  const sortedSales = useMemo(() => {
    return Object.entries(salesByStore).sort(([, a], [, b]) => b - a);
  }, [salesByStore]);

  return (
    <div className="sales-by-store-list p-4 bg-white rounded-lg shadow-lg">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Sales by Store
      </h3>

      <ul className="space-y-2">
        {sortedSales.map(([store, count]) => (
          <li
            key={store}
            className="flex justify-between p-2 border-b border-gray-200 last:border-none"
          >
            <span className="text-gray-700">{store}</span>
            <span className="font-medium text-gray-900">
              {count.toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalesByStoreList;
