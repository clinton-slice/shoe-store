import { useEffect, useState } from "react";
import { Store } from "../types";
import ClipLoader from "react-spinners/ClipLoader";
import StoreList from "../components/StoreList";

const API_URL = "http://localhost:8000/stores";

const Stores = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => {
        setStores(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching stores:", error));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <ClipLoader color="#2563EB" loading={loading} size={150} />
      </div>
    );
  }

  return (
    <div className="px-4 py-10 sm:px-6 lg:px-8 lg:py-6">
      <h1 className="text-base font-semibold leading-6 text-gray-900 mb-4">
        Stores
      </h1>
      <StoreList stores={stores} />
    </div>
  );
};

export default Stores;
