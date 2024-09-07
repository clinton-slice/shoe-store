import { useState, useEffect } from "react";
import { Inventory } from "../types";

const useWebSocket = (url: string) => {
  const [data, setData] = useState<Inventory | null>(null);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.onmessage = (event) => {
      const newData = JSON.parse(event.data);
      setData(newData);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error: ", error);
    };

    ws.onclose = (event) => {
      console.log("WebSocket connection closed: ", event);
    };

    return () => ws.close();
  }, [url]);

  return data;
};

export default useWebSocket;
