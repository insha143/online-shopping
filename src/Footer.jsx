import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="admin-footer text-white py-5">
      <div className="container">
        <div className="row">
        
          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="footer-title">About Us</h5>
            <p>
              We are dedicated to providing the best tools for managing your inventory and stationery needs.
            </p>
          </div>

          <div className="col-lg-4 col-md-6 mb-4">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="list-unstyled footer-links">
              <li><a href="#" className="text-white">Home</a></li>
              <li><a href="#" className="text-white">Dashboard</a></li>
              <li><a href="#" className="text-white">Settings</a></li>
              <li><a href="#" className="text-white">Contact</a></li>
            </ul>
          </div>

          <div className="col-lg-4 col-md-12 mb-4">
            <h5 className="footer-title">Follow Us</h5>
            <ul className="list-inline social-icons">
              <li className="list-inline-item">
                <a href="#" className="text-white">
                  <FaFacebook size={30} />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-white">
                  <FaTwitter size={30} />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-white">
                  <FaLinkedin size={30} />
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-white">
                  <FaInstagram size={30} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="row">
          <div className="col text-center">
            <p className="mb-0">&copy; 2024 Admin Dashboard. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
