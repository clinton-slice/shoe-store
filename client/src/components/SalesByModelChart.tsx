import React, { useMemo } from "react";
import { Doughnut, Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { ChartProps } from "../types"; // Adjust path based on your file structure

ChartJS.register(ArcElement, Tooltip, Legend);

const SalesByModelChart: React.FC<ChartProps> = ({ sales }) => {
  const modelSales = useMemo(() => {
    const salesByModel = sales.reduce<Record<string, number>>((acc, sale) => {
      acc[sale.model] = (acc[sale.model] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(salesByModel),
      datasets: [
        {
          label: "Sales Distribution by Model",
          data: Object.values(salesByModel),
          borderRadius: 8,
          borderWidth: 1,
          borderColor: "#fff",
          backgroundColor: [
            "#FF5733",
            "#33FF57",
            "#3357FF",
            "#FF33A8",
            "#33FFF5",
            "#FF8C33",
            "#33FFB8",
            "#FF33F5",
            "#57FF33",
            "#5733FF",
            "#F5FF33",
            "#FF3357",
            "#33A8FF",
            "#FFB833",
            "#A833FF",
            "#33FF8C",
            "#FF5733",
            "#8C33FF",
            "#FF33B8",
            "#33F5FF",
          ],
        },
      ],
    };
  }, [sales]);

  return (
    <div className="rounded-lg bg-white px-4 py-5 shadow-lg sm:p-6 text-indigo-600">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Sales by Model
      </h3>
      <div className="w-full flex items-center justify-center h-[480px]">
        <Doughnut
          className="mb-2"
          data={modelSales}
          options={{
            responsive: true,
            plugins: { legend: { position: "bottom" } },
          }}
        />
      </div>
    </div>
  );
};

export default SalesByModelChart;
