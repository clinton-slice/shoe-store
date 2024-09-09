import { useState } from "react";
import { BellIcon } from "@heroicons/react/24/outline";

interface NotificationDropdownProps {
  notifications: string[];
}

const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications,
}) => {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setShow(!show)}
        className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
      >
        <span className="sr-only">View notifications</span>
        <BellIcon aria-hidden="true" className="h-6 w-6" />

        {notifications.length > 0 && (
          <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-600 ring-2 ring-white" />
        )}
      </button>

      {show && (
        <div className="overflow-hidden rounded-md bg-white shadow-lg absolute right-0 w-96">
          <ul className="divide-y divide-gray-200">
            {notifications.map((notification, index) => (
              <li key={index} className="px-6 py-4">
                <div className="flex flex-col">
                  <p className="text-sm font-bold text-gray-900">
                    🚨 Inventory alert!
                  </p>
                  <p className="text-sm text-gray-900">{notification}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default NotificationDropdown;
