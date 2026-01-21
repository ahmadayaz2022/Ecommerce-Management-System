import { useState, useEffect } from "react";
import axios from "../../api/axios";
import StoreForm from "./StoreForm";

const Stores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

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

  const openModal = (store = null) => {
    setSelectedStore(store);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedStore(null);
  };

  if (loading) return <p>Loading stores...</p>;

  return (
    <div>
      <h2>All Stores</h2>
      <button onClick={() => openModal()}>Add Store</button>
      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Employees</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {stores.map(store => (
            <tr key={store._id}>
              <td>{store.storeName}</td>
              <td>{store.storeLocation}</td>
              <td>{store.storeEmail}</td>
              
              <td>{store.employees?.length || 0}</td>
              <td>
                <button onClick={() => openModal(store)}>Edit</button>
                <button onClick={async () => {
                  if (!window.confirm("Delete this store?")) return;
                  await axios.delete(`/stores/${store._id}`);
                  setStores(stores.filter(s => s._id !== store._id));
                }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && <StoreForm store={selectedStore} onClose={closeModal} onSaved={fetchStores} />}
    </div>
  );
};

export default Stores;
