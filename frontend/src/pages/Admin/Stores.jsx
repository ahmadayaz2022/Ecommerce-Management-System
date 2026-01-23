// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// import axios from "../../api/axios";
// import StoreForm from "./StoreForm";

// const Stores = () => {
//   const [stores, setStores] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedStore, setSelectedStore] = useState(null);

//   const fetchStores = async () => {
//     try {
//       const res = await axios.get("/stores");
//       setStores(res.data);
//     } catch (err) {
//       console.log(err.response?.data?.message || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStores();
//   }, []);

//   const openModal = (store = null) => {
//     setSelectedStore(store);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedStore(null);
//   };

//   if (loading)
//     return (
//       <p style={{ textAlign: "center", marginTop: "50px" }}>
//         Loading stores...
//       </p>
//     );

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2 style={{ marginBottom: "20px", color: "#1f2937" }}>All Stores</h2>

//       <button
//         onClick={() => openModal()}
//         style={{
//           padding: "10px 20px",
//           marginBottom: "20px",
//           backgroundColor: "#4f46e5",
//           color: "#fff",
//           border: "none",
//           borderRadius: "8px",
//           cursor: "pointer",
//           boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//         }}
//         onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4338ca")}
//         onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
//       >
//         Add Store
//       </button>

//       <div style={{ overflowX: "auto" }}>
//         <table
//           style={{
//             width: "100%",
//             borderCollapse: "collapse",
//             backgroundColor: "#fff",
//             boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
//             borderRadius: "10px",
//           }}
//         >
//           <thead style={{ backgroundColor: "#f3f4f6", color: "#374151" }}>
//             <tr>
//               <th style={{ padding: "12px", textAlign: "left" }}>Name</th>
//               <th style={{ padding: "12px", textAlign: "left" }}>Location</th>
//               <th style={{ padding: "12px", textAlign: "left" }}>Email</th>
//               <th style={{ padding: "12px", textAlign: "left" }}>Employees</th>
//               <th style={{ padding: "12px", textAlign: "left" }}>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {stores.map((store) => (
//               <tr
//                 key={store._id}
//                 style={{
//                   borderBottom: "1px solid #e5e7eb",
//                   transition: "background-color 0.2s",
//                 }}
//                 onMouseOver={(e) =>
//                   (e.currentTarget.style.backgroundColor = "#f9fafb")
//                 }
//                 onMouseOut={(e) =>
//                   (e.currentTarget.style.backgroundColor = "#fff")
//                 }
//               >
//                 <td style={{ padding: "12px" }}>
//                   <Link
//                     to={`/admin/stores/${store._id}`}
//                     style={{
//                       color: "#4f46e5",
//                       fontWeight: "600",
//                       textDecoration: "none",
//                     }}
//                   >
//                     {store.storeName}
//                   </Link>
//                 </td>
//                 <td style={{ padding: "12px" }}>{store.storeLocation}</td>
//                 <td style={{ padding: "12px" }}>{store.storeEmail}</td>
//                 <td style={{ padding: "12px" }}>
//                   {store.employees?.length || 0}
//                 </td>
//                 <td style={{ padding: "12px", display: "flex", gap: "10px" }}>

//                   <button
//                     onClick={() => openModal(store)}
//                     style={{
//                       padding: "6px 12px",
//                       backgroundColor: "#f59e0b",
//                       color: "#fff",
//                       border: "none",
//                       borderRadius: "6px",
//                       cursor: "pointer",
//                     }}
//                     onMouseOver={(e) =>
//                       (e.currentTarget.style.backgroundColor = "#d97706")
//                     }
//                     onMouseOut={(e) =>
//                       (e.currentTarget.style.backgroundColor = "#f59e0b")
//                     }
//                   >
//                     Edit
//                   </button>
//                   <button
//                     onClick={async () => {
//                       if (!window.confirm("Delete this store?")) return;
//                       await axios.delete(`/stores/${store._id}`);
//                       setStores(stores.filter((s) => s._id !== store._id));
//                     }}
//                     style={{
//                       padding: "6px 12px",
//                       backgroundColor: "#ef4444",
//                       color: "#fff",
//                       border: "none",
//                       borderRadius: "6px",
//                       cursor: "pointer",
//                     }}
//                     onMouseOver={(e) =>
//                       (e.currentTarget.style.backgroundColor = "#b91c1c")
//                     }
//                     onMouseOut={(e) =>
//                       (e.currentTarget.style.backgroundColor = "#ef4444")
//                     }
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {showModal && (
//         <StoreForm
//           store={selectedStore}
//           onClose={closeModal}
//           onSaved={fetchStores}
//         />
//       )}
//     </div>
//   );
// };

// export default Stores;

// //<td style={{ padding: "12px" }}>{store.storeName}</td>


//
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "../../api/axios";
import StoreForm from "./StoreForm";

const Stores = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);

  // Fetch stores and employee counts
  const fetchStores = async () => {
    try {
      // 1️⃣ Fetch all stores
      const res = await axios.get("/stores");
      const storesData = res.data;

      // 2️⃣ Fetch all employees
      const empRes = await axios.get("/employees");
      const allEmployees = empRes.data;

      // 3️⃣ Attach employees array for each store
      const storesWithEmployees = storesData.map((store) => ({
        ...store,
        employees: allEmployees.filter((emp) => emp.store === store._id),
      }));

      setStores(storesWithEmployees);
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

  if (loading)
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Loading stores...
      </p>
    );

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px", color: "#1f2937" }}>All Stores</h2>

      <button
        onClick={() => openModal()}
        style={{
          padding: "10px 20px",
          marginBottom: "20px",
          backgroundColor: "#4f46e5",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#4338ca")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
      >
        Add Store
      </button>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            backgroundColor: "#fff",
            boxShadow: "0 4px 6px rgba(0,0,0,0.05)",
            borderRadius: "10px",
          }}
        >
          <thead style={{ backgroundColor: "#f3f4f6", color: "#374151" }}>
            <tr>
              <th style={{ padding: "12px", textAlign: "left" }}>Name</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Location</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Email</th>
              <th style={{ padding: "12px", textAlign: "left" }}>No of Employees Working</th>
              <th style={{ padding: "12px", textAlign: "left" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {stores.map((store) => (
              <tr
                key={store._id}
                style={{
                  borderBottom: "1px solid #e5e7eb",
                  transition: "background-color 0.2s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f9fafb")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "#fff")
                }
              >
                <td style={{ padding: "12px" }}>
                  <Link
                    to={`/admin/stores/${store._id}`}
                    style={{
                      color: "#4f46e5",
                      fontWeight: "600",
                      textDecoration: "none",
                    }}
                  >
                    {store.storeName}
                  </Link>
                </td>
                <td style={{ padding: "12px" }}>{store.storeLocation}</td>
                <td style={{ padding: "12px" }}>{store.storeEmail}</td>
                <td style={{ padding: "12px"}}>
                  {store.employees?.length || 0}
                </td>
                <td style={{ padding: "12px", display: "flex", gap: "10px" }}>

                  <button
                    onClick={() => openModal(store)}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#f59e0b",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                     
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#d97706")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#f59e0b")
                    }
                  >
                    Edit
                  </button>
                  <button
                    onClick={async () => {
                      if (!window.confirm("Delete this store?")) return;
                      await axios.delete(`/stores/${store._id}`);
                      setStores(stores.filter((s) => s._id !== store._id));
                    }}
                    style={{
                      padding: "6px 12px",
                      backgroundColor: "#ef4444",
                      color: "#fff",
                      border: "none",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                    onMouseOver={(e) =>
                      (e.currentTarget.style.backgroundColor = "#b91c1c")
                    }
                    onMouseOut={(e) =>
                      (e.currentTarget.style.backgroundColor = "#ef4444")
                    }
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <StoreForm
          store={selectedStore}
          onClose={closeModal}
          onSaved={fetchStores}
        />
      )}
    </div>
  );
};

export default Stores;
