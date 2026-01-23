import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";

const DashboardStores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchStores = async () => {
    try {
      const res = await axios.get("/stores");
      setStores(res.data);
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  if (loading) return <p>Loading stores...</p>;
  if (!stores.length) return <p>No stores found.</p>;

  return (
    <div style={gridStyle}>
      {stores.map((store) => (
        <div
          key={store._id}
          style={cardStyle}
          onClick={() => navigate(`/admin/store/${store._id}`)} // navigate to store page
        >
          <h2 style={{ color: "#4f46e5" }}>{store.storeName}</h2>
          <p style={{ color: "#6b7280" }}>{store.storeLocation}</p>
          <p style={{ color: "#6b7280" }}>{store.storeEmail}</p>
        </div>
      ))}
    </div>
  );
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
  gap: "20px",
  marginTop: "20px",
};

const cardStyle = {
  padding: "20px",
  borderRadius: "10px",
  backgroundColor: "#f9fafb",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  cursor: "pointer",
  transition: "transform 0.2s, box-shadow 0.2s",
};

export default DashboardStores;
