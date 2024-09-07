import { ChevronRightIcon, MapPinIcon } from "@heroicons/react/20/solid";
import { Store } from "../types";

interface StoreListProps {
  stores: Store[];
}

const StoreList: React.FC<StoreListProps> = ({ stores }) => {
  return (
    <ul className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
      {stores.map((store) => (
        <li
          key={store.name}
          className="relative flex justify-between items-center gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6"
        >
          <div className="text-start">
            <p className="text-sm font-semibold leading-6 text-gray-900">
              {store.name}
            </p>
            <p className="mt-1 flex items-center text-xs leading-5 text-gray-500 gap-x-1">
              <MapPinIcon className="w-4 h-4" /> {store.address}
            </p>
          </div>

          <ChevronRightIcon
            aria-hidden="true"
            className="h-5 w-5 flex-none text-gray-400"
          />
        </li>
      ))}
    </ul>
  );
};

export default StoreList;
