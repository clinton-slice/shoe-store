import { useState, createContext, useContext, ReactNode } from "react";

interface DefaultContext {
  alerts: string[];
  setAlerts: React.Dispatch<React.SetStateAction<string[]>>;
}

const AlertsContext = createContext<DefaultContext>({
  alerts: [],
  setAlerts: () => {},
});

const useAlertsContext = () => useContext(AlertsContext);

const AlertsContextProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<string[]>([]);

  return (
    <AlertsContext.Provider
      value={{
        alerts,
        setAlerts,
      }}
    >
      {children}
    </AlertsContext.Provider>
  );
};

export { useAlertsContext, AlertsContextProvider };
