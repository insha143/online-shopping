import React from 'react';
import { FaBook, FaPenFancy, FaStickyNote, FaUserShield, FaCogs } from 'react-icons/fa';
import './Admindis.css'; // You can style the dashboard separately
import { Link } from 'react-router-dom';

const Admindis = () => {
  return (
    <div className="admin-dashboard container mt-5">
      <h2 className="text-center mb-4">Admin Dashboard</h2>
      
      <div className="row">
        {/* Update Books */}
        
        <div className="col-md-4">
          <div className="card shadow-sm admin-card">
            <div className="card-body text-center">
              <FaBook size={50} className="mb-3 text-primary" />
              <h4 className="card-title">Update Books</h4>
              <p className="card-text">Manage and update book records.</p>
              <Link to="/bookrec" className="btn btn-primary">Go to Books</Link>
            </div>
          </div>
        </div>
        

        {/* Update Stationery */}
        <div className="col-md-4">
          <div className="card shadow-sm admin-card">
            <div className="card-body text-center">
              <FaPenFancy size={50} className="mb-3 text-success" />
              <h4 className="card-title">Update Stationery</h4>
              <p className="card-text">Manage and update stationery items.</p>
              <Link to="/Statrec" className="btn btn-success">Go to Stationery</Link>
            </div>
          </div>
        </div>

        {/* Update Notebooks */}
        <div className="col-md-4">
          <div className="card shadow-sm admin-card">
            <div className="card-body text-center">
              <FaStickyNote size={50} className="mb-3 text-warning" />
              <h4 className="card-title">Update Notebooks</h4>
              <p className="card-text">Manage and update notebook records.</p>
              <button className="btn btn-warning">Go to Notebooks</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        
        <div className="col-md-4">
          <div className="card shadow-sm admin-card">
            <div className="card-body text-center">
              <FaUserShield size={50} className="mb-3 text-danger" />
              <h4 className="card-title">Manage Permissions</h4>
              <p className="card-text">Control user access and permissions.</p>
              <button className="btn btn-danger">Manage Permissions</button>
            </div>
          </div>
        </div>

        {/* Settings */}
        <div className="col-md-4">
          <div className="card shadow-sm admin-card">
            <div className="card-body text-center">
              <FaCogs size={50} className="mb-3 text-secondary" />
              <h4 className="card-title">Settings</h4>
              <p className="card-text">Configure admin settings and preferences.</p>
              <button className="btn btn-secondary">Go to Settings</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admindis;
