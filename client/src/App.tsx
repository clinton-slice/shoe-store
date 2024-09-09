import { BuildingStorefrontIcon, HomeIcon } from "@heroicons/react/24/outline";
import AppRoutes from "./Routes";
import { useLocation } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import NotificationDropdown from "./components/Notification";
import { useAlertsContext } from "./context/AlertsContext";

function classNames(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

function App() {
  const { pathname } = useLocation();

  const { alerts } = useAlertsContext();

  const navigation = [
    { name: "Dashboard", href: "/", icon: HomeIcon, current: pathname === "/" },
    {
      name: "Stores",
      href: "/stores",
      icon: BuildingStorefrontIcon,
      current: pathname === "/stores",
    },
  ];

  return (
    <div className="min-h-full">
      <div className="bg-gray-800 pb-32">
        <nav className="bg-gray-800">
          <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="border-b border-gray-700">
              <div className="flex h-16 items-center justify-between px-4 sm:px-0">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <img
                      alt="Your Company"
                      src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                      className="h-8 w-8"
                    />
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-10 flex items-baseline space-x-4">
                      {navigation.map((item) => (
                        <a
                          key={item.name}
                          href={item.href}
                          aria-current={item.current ? "page" : undefined}
                          className={classNames(
                            item.current
                              ? "bg-gray-900 text-white"
                              : "text-gray-300 hover:bg-gray-700 hover:text-white",
                            "rounded-md px-3 py-2 text-sm font-medium"
                          )}
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="hidden md:block">
                  <div className="ml-4 flex items-center md:ml-6">
                    <NotificationDropdown notifications={alerts} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <header className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Dashboard
            </h1>
          </div>
        </header>
      </div>

      <main className="-mt-32">
        <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="rounded-lg bg-white px-5 py-6 shadow-lg sm:px-6">
            <AppRoutes />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
