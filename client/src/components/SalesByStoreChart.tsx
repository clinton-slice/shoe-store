import { useMemo } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { ChartProps } from "../types";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const SalesByStoreChart: React.FC<ChartProps> = ({ sales }) => {
  const storeSales = useMemo(() => {
    const salesByStore = sales.reduce<Record<string, number>>((acc, sale) => {
      acc[sale.store] = (acc[sale.store] || 0) + 1;
      return acc;
    }, {});

    return {
      labels: Object.keys(salesByStore),
      datasets: [
        {
          label: "Total Sales by Store",
          data: Object.values(salesByStore),
          backgroundColor: "#4f46e5",
          borderRadius: 4,
        },
      ],
    };
  }, [sales]);

  return (
    <div className="rounded-lg bg-white px-4 py-5 shadow-lg sm:p-6 text-indigo-600">
      <h3 className="text-base font-semibold leading-6 text-gray-900">
        Sales by Store
      </h3>

      <Bar
        data={storeSales}
        options={{
          responsive: true,
          plugins: {
            legend: { display: true, position: "top" },
          },
          indexAxis: "y",
          scales: {
            x: {
              beginAtZero: true,
              grid: {
                display: false,
              },
              title: {
                display: true,
                text: "Total Sales",
              },
            },
            y: {
              grid: {
                display: false,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default SalesByStoreChart;
