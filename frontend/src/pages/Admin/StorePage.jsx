import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";

const StorePage = () => {
  const { storeId } = useParams();
  const [store, setStore] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch store info
  const fetchStore = async () => {
    try {
      const res = await axios.get(`/stores/${storeId}`);
      setStore(res.data);
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStore();
  }, [storeId]);

  if (loading) return <p>Loading store...</p>;
  if (!store) return <p>Store not found.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: "#4f46e5" }}>{store.storeName}</h1>
      <p style={{ color: "#6b7280" }}>{store.storeLocation}</p>
      <p style={{ color: "#6b7280" }}>{store.storeEmail}</p>
      <h2 style={{ marginTop: "20px", fontStyle: "italic", color: "red" }}>
        This is {store.storeName} .  will develop store features here later.
      </h2>
    </div>
  );
};

export default StorePage;
