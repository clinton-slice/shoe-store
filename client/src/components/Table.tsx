import { Inventory } from "../types";

interface InventoryUpdateTableProps {
  inventoryUpdates: Inventory[];
}

const InventoryTable: React.FC<InventoryUpdateTableProps> = ({
  inventoryUpdates,
}) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 rounded-lg bg-white shadow-lg">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Inventor Updates
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Live updates of inventory changes across all stores.
          </p>
        </div>
      </div>
      <div className="mt-8 flow-root h-[600px] overflow-auto">
        <div className="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full border-separate border-spacing-0">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                  >
                    Store
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                  >
                    Model
                  </th>
                  <th
                    scope="col"
                    className="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                  >
                    Inventory
                  </th>
                </tr>
              </thead>
              <tbody>
                {inventoryUpdates.map((update, index) => (
                  <tr key={index}>
                    <td className="border-b border-gray-200 whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8">
                      {update.store}
                    </td>
                    <td className="border-b border-gray-200 hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:table-cell">
                      {update.model}
                    </td>
                    <td className="border-b border-gray-200 hidden whitespace-nowrap px-3 py-4 text-sm text-gray-500 lg:table-cell">
                      {update.inventory}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryTable;
