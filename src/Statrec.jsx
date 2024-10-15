import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Statrec = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch records from the backend
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const response = await fetch('http://localhost:3009/stat');
        if (!response.ok) {
          throw new Error('Failed to fetch records');
        }
        const data = await response.json();
        setRecords(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, []);

  // Function to delete a record
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        const response = await fetch(`http://localhost:3009/stat/${id}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete the record');
        }
        // Update the records after deletion
        setRecords(records.filter((record) => record.id !== id));
      } catch (error) {
        console.error('Error deleting the record:', error);
        setError('Failed to delete the record');
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-danger text-center mt-5">Error: {error}</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Records List</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Order Quantity</th>
            <th>Original price</th>
            <th>Paid </th>
            <th>Actions </th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.type}</td>
              <td>{record.quantity}</td>
              <td>{record.oprice}</td>
              <td>{record.pprice}</td>
              <td>
                {/* Update button */}
                <Link to={`/updatestats/${record.id}`}>
                  <button className="btn btn-success me-2">Update</button>
                </Link>

                {/* Delete button */}
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(record.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Statrec;
