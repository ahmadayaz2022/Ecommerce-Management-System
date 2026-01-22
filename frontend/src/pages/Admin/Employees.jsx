import { useState, useEffect } from "react";
import axios from "../../api/axios";
import EmployeeForm from "./EmployeeForm";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [stores, setStores] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      const res = await axios.get("/employees");
      setEmployees(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Fetch stores
  const fetchStores = async () => {
    try {
      const res = await axios.get("/stores"); // Backend must return all stores
      setStores(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEmployees();
    fetchStores(); // important!
  }, []);

  const openModal = (employee = null) => {
    setSelectedEmployee(employee);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedEmployee(null);
  };

  return (
    <div>
      <h2>All Employees</h2>
      <button onClick={() => openModal()}>Add Employee</button>
      <table border="1" cellPadding="10" style={{ marginTop: "20px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Store</th>
            <th>Actions</th>
          </tr>
        </thead>
{
        <tbody>
  {employees.map(emp => (
    <tr key={emp._id}> 
      <td>{emp.name}</td>
      <td>{emp.email}</td>
      <td>
        {stores.find(stores => stores._id === emp.store)?.storeName }
      </td>
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
        }

      </table>

      {showModal && (
        <EmployeeForm
          employee={selectedEmployee}
          stores={stores} // ✅ pass stores here
          onClose={closeModal}
          onSaved={fetchEmployees}
        />
      )}
    </div>
  );
};

export default Employees;