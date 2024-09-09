import { useCallback, useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { Inventory } from "../types";

import useWebSocket from "../hooks/useWebsocket";

import Table from "../components/Table";
import Stats from "../components/Stats";
import SalesByStoreChart from "../components/SalesByStoreChart";
import SalesByModelChart from "../components/SalesByModelChart";
import SalesByStoreList from "../components/SalesByStoreList";
import { useAlertsContext } from "../context/AlertsContext";

const MAX_ALERTS = 5;
const MAX_SALES = 20;
const LOW_INVENTORY_THRESHOLD = 10;

const Dashboard = () => {
  const { setAlerts } = useAlertsContext();
  const [totalSold, setTotalSold] = useState<number>(0);
  const [soldByModel, setSoldByModel] = useState<Record<string, number>>({});
  const [sales, setSales] = useState<Inventory[]>([]);

  const data = useWebSocket("ws://localhost:8080");

  const handleSales = useCallback(
    (data: Inventory) => {
      const { model } = data;

      // Update total shoes sold
      setTotalSold((prevTotal) => prevTotal + 1);

      // Update sold by model
      setSoldByModel((prevSoldByModel) => ({
        ...prevSoldByModel,
        [model]: (prevSoldByModel[model] || 0) + 1,
      }));

      // Track all sales
      setSales((prevSales) => [...prevSales, data]);
    },
    [setTotalSold, setSoldByModel, setSales]
  );

  const handleLowInventory = useCallback(
    (data: Inventory) => {
      const { model, inventory, store } = data;
      const newAlert = `Only ${inventory} pairs of ${model} left at ${store}`;

      // Use FIFO queue to maintain only MAX_ALERTS alerts
      setAlerts((prevAlerts) => {
        const updatedAlerts = [...prevAlerts, newAlert];
        return updatedAlerts.length > MAX_ALERTS
          ? updatedAlerts.slice(-MAX_ALERTS)
          : updatedAlerts;
      });

      toast.warning(newAlert, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
    [setAlerts]
  );

  useEffect(() => {
    if (data) {
      handleSales(data);
      if (data.inventory < LOW_INVENTORY_THRESHOLD) {
        handleLowInventory(data);
      }
    }
  }, [data, handleSales, handleLowInventory]);

  const bestSellingModel = useMemo(() => {
    return Object.entries(soldByModel).reduce(
      (best, [model, count]) =>
        count > best.highestSales
          ? { bestModel: model, highestSales: count }
          : best,
      { bestModel: "", highestSales: 0 }
    );
  }, [soldByModel]);

  const leastSellingModel = useMemo(() => {
    if (Object.keys(soldByModel).length === 0) {
      return { leastModel: "N/A", lowestSales: 0 };
    }

    return Object.entries(soldByModel).reduce(
      (least, [model, count]) =>
        count < least.lowestSales
          ? { leastModel: model, lowestSales: count }
          : least,
      { leastModel: "", lowestSales: Infinity }
    );
  }, [soldByModel]);

  const limitedSales = useMemo(
    () => (sales.length > MAX_SALES ? sales.slice(-MAX_SALES) : sales),
    [sales]
  );

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6 flex flex-col gap-4">
      <Stats
        stats={[
          { name: "Total Shoes Sold", stat: totalSold.toLocaleString() },
          {
            name: "Best Selling Model",
            stat: `${
              bestSellingModel.bestModel
            } (${bestSellingModel.highestSales.toLocaleString()})`,
          },
          {
            name: "Least Selling Model",
            stat: `${
              leastSellingModel.leastModel
            } (${leastSellingModel.lowestSales.toLocaleString()})`,
          },
        ]}
      />
      <SalesByStoreChart sales={sales} />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <SalesByModelChart sales={sales} />
        <SalesByStoreList sales={sales} />
      </div>
      <Table inventoryUpdates={limitedSales} />
      <ToastContainer stacked />
    </div>
  );
};

export default Dashboard;
