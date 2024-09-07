import { useEffect, useState } from "react";
import useWebSocket from "../hooks/useWebsocket";
import Table from "../components/Table";
import Notification from "../components/Notification";

const Dashboard = () => {
  const [alerts, setAlerts] = useState<string[]>([]);
  const [inventoryUpdates, setInventoryUpdates] = useState([]);

  const data = useWebSocket("ws://localhost:8080");

  useEffect(() => {
    if (data) {
      //@ts-ignore
      setInventoryUpdates((prevUpdates) => {
        // Create a new array that contains the previous updates plus the new one
        const updatedQueue = [...prevUpdates, data];

        // If the length exceeds 10, remove the oldest item (FIFO)
        if (updatedQueue.length > 20) {
          updatedQueue.shift(); // Remove the first (oldest) item
        }

        return updatedQueue;
      });
    }
  }, [data]);

  useEffect(() => {
    if (data && data.inventory < 5) {
      setAlerts((prevAlerts) => {
        // Create a new array that contains the previous alerts plus the new one
        const updatedAlerts = [
          ...prevAlerts,
          `${data.model} at ${data.store} is low on stock`,
        ];

        // If the length exceeds 10, remove the oldest item (FIFO)
        if (updatedAlerts.length > 10) {
          updatedAlerts.shift(); // Remove the first (oldest) item
        }

        return updatedAlerts;
      });
    }
  }, [data]);

  console.log(data);

  return (
    <>
      <main className="lg:pl-72">
        <div className="xl:pr-96">
          <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
            <Table inventoryUpdates={inventoryUpdates} />
          </div>
        </div>
      </main>

      <aside className="fixed inset-y-0 right-0 hidden w-96 overflow-y-auto border-l border-gray-200 px-4 py-6 sm:px-6 lg:px-8 xl:block">
        <h1 className="text-base font-semibold leading-6 text-gray-900 mb-4">
          Notifications
        </h1>
        {alerts.length > 0 && (
          <div className="flex flex-col gap-y-3">
            {alerts.map((alert, index) => (
              <Notification alertMessage={alert} key={index} />
            ))}
          </div>
        )}
      </aside>
    </>
  );
};

export default Dashboard;

// const calculateInventoryValue = (stores: Store[]) => {
//   return stores.reduce((total, store) => {
//     // Assuming each store has an inventory with models having `quantity` and `price`
//     const storeValue = store.inventory.reduce((storeTotal, item) => {
//       return storeTotal + item.quantity * item.price;
//     }, 0);
//     return total + storeValue;
//   }, 0);
// };

// const calculateLowStockStores = (stores: Store[], threshold = 10) => {
//   return stores.filter((store) => {
//     return store.inventory.some((item) => item.quantity < threshold);
//   }).length;
// };

// const calculateOutOfStockItems = (stores: Store[]) => {
//   return stores.reduce((totalOutOfStock, store) => {
//     const outOfStock = store.inventory.filter(
//       (item) => item.quantity === 0
//     ).length;
//     return totalOutOfStock + outOfStock;
//   }, 0);
// };
