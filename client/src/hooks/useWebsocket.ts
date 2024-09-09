import { useState, useEffect, useRef } from "react";
import { Inventory } from "../types";

const useWebSocket = (url: string) => {
  const [data, setData] = useState<Inventory | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    wsRef.current = new WebSocket(url);

    // Listen for messages
    wsRef.current.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      // The data received from the WebSocket server is stored in the state variable data.
      setData(receivedData);
    };

    // The WebSocket connection is cleaned up when the component using it is unmounted to prevent memory leaks.
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [url]);

  return data;
};

export default useWebSocket;
