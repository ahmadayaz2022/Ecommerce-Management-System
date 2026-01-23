import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import EmployeeForm from "./EmployeeForm";

const StoreEmployees = () => {
  const { id } = useParams(); // store ID
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("/employees"); // gets all employees of super admin
      // Filter employees of this store
      setEmployees(res.data.filter(emp => emp.store === id));
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, [id]);

  const openModal = (employee = null) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

  if (loading) return <p>Loading employees...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employees of this Store</h2>
      <button onClick={() => openModal()}>Add Employee</button>

      <table border="1" cellPadding="10" style={{ marginTop: "20px", width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>store</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(emp => (
            <tr key={emp._id}>
              <td>{emp.name}</td>
              <td>{emp.email}</td>
              <td>{emp.storeName}</td>
              <td>
                <button onClick={() => openModal(emp)}>Edit</button>
                <button
                  onClick={async () => {
                    if (!window.confirm("Delete this employee?")) return;
                    await axios.delete(`/employees/${emp._id}`);
                    setEmployees(employees.filter(e => e._id !== emp._id));
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <EmployeeForm
          employee={selectedEmployee}
          stores={[{ _id: id }]}
          onClose={closeModal}
          onSaved={fetchEmployees}
        />
      )}
    </div>
  );
};

export default StoreEmployees;
