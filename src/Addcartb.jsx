import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './book.css';  
import 'bootstrap-icons/font/bootstrap-icons.css';

const Tshirt = () => {
  const [products, setProducts] = useState([]);
  const [cartItem, setCartItem] = useState(null);  
  const [quantity, setQuantity] = useState(1);  
  const [payableAmount, setPayableAmount] = useState(0); 

  useEffect(() => {
    axios.get('http://localhost:3009/book') // Updated endpoint
      .then(response => {
        setProducts(response.data); 
      })
      .catch(error => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  const handleAddToCart = (product) => {
    setCartItem(product);  
    setQuantity(1);  
    setPayableAmount(product.price); 
  };

  const handleCloseCart = () => {
    setCartItem(null);  
  };

  const handleQuantityChange = (e) => {
    let value = parseInt(e.target.value, 10);
    if (isNaN(value) || value < 1) {
      value = 1; 
    }
    setQuantity(value);  
    setPayableAmount(value * cartItem.price);  
  };

  const handleConfirmOrder = async () => {
    if (!cartItem) return;

    try {
      const orderData = {
        name: cartItem.name,
        price: cartItem.price,
        quantity: quantity,
        payableAmount: payableAmount,
      };

      const response = await axios.post('http://localhost:3002/payment', orderData);
      
      if (response.status === 200) {
        alert('Order confirmed successfully!');       
        setCartItem(null);
      }
    } catch (error) {
      console.error('Error while confirming order:', error);
      alert('Failed to confirm order.');
    }
  };

  return (
    <div className='product-container'>
      <div className='d-flex justify-content-center flex-wrap g-0 product-list'>
        {products.map(product => (
          <div key={product.id} className='product-card'>
            <img src={product.image} alt={product.name} /> 
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <Link to="#" className='btn btn-success' onClick={() => handleAddToCart(product)}>
              Add to Cart
            </Link>
          </div>
        ))}
      </div>

      {cartItem && (
        <div className='cart-overlay'>
          <button className='close-btn w-100 bg-danger text-white' onClick={handleCloseCart}>Close</button> 
          <div className='cart-item d-flex justify-content-between align-items-start'>
            <div style={{ marginRight: '20px', marginTop: '50px' }}>
              <img 
                src={cartItem.image} 
                alt={cartItem.name} 
                className='cart-image' 
                style={{ height: '350px' }} 
              /> 
              <h3><strong>{cartItem.name}</strong></h3>
              <h3 className='text-primary'>
                <i className='bi bi-truck'></i>
                <strong>Free delivery</strong>
              </h3> 
            </div>
            <h2 style={{ marginTop: '50px', width: '500px', wordBreak: 'break-word', whiteSpace: 'normal' }}>
              <h1>About this</h1>
              {cartItem.description}
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                <img 
                  src={cartItem.image2} 
                  alt="Additional Image 1" 
                  style={{ width: '100px', height: '100px', marginRight: '10px' }} 
                />
                <div className='image-container' style={{ position: 'relative', width: '100px', height: '100px' }}>
                  <img 
                    src={cartItem.image3} 
                    alt="Additional Image 2" 
                    style={{ width: '100px', height: '100px', position: 'absolute', top: 0, left: 0, zIndex: 1 }} 
                    className='hover-image'
                  />
                  <img 
                    src={cartItem.image4}
                    alt="Additional Image 3" 
                    style={{ width: '100px', height: '100px', position: 'absolute', top: 0, left: 0, zIndex: 2 }} 
                    className='hover-image-hover'
                  />
                </div>
              </div>
              <i className='bi bi-star-fill'></i>
              <i className='bi bi-star-fill'></i>
              <i className='bi bi-star-fill'></i>
              <i className='bi bi-star'></i>
            </h2>

            <hr />
  
            <div className='conformation w-25 rounded' style={{ border: '1px solid black', marginTop:'50px'}}>
              <button className='btn btn-warning w-100'><strong>ORDER NOW</strong></button>
              <p>{cartItem.description}</p>
              <p>Price: ${cartItem.price}</p>
              <div>
                <h3>Enter Quantity to order</h3>
                <input 
                  type='number' 
                  value={quantity} 
                  onChange={handleQuantityChange} 
                  min="1"
                />
                <h2>Payable Amount: ${payableAmount.toFixed(2)}</h2>
              </div>
              <button onClick={handleConfirmOrder} className='btn btn-success me-4 mt-75'>
                Confirm Order
              </button>
              <Link to='' className='btn btn-primary'>Next</Link>
              <button className='mt-5 btn btn-secondary w-100'>Payment Method</button>
              <input type='checkbox' />
              <label className='me-5 fs-5'>Cash on Delivery</label> <br />
              <input type='checkbox' />
              <label className='fs-5'>Advance Payment </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tshirt;
