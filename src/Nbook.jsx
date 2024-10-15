import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Books.css'; // Create a separate CSS file for styling

const Nbook = () => {
    const [notebooks, setNotebooks] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItem, setCartItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [payableAmount, setPayableAmount] = useState(0);

    useEffect(() => {
        const fetchNotebooks = async () => {
            try {
                const response = await fetch('http://localhost:3009/notebook');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setNotebooks(data);
            } catch (error) {
                console.error('Error fetching notebooks:', error);
            }
        };

        fetchNotebooks();
    }, []);

    const handleAddToCart = (notebook) => {
        setCartItem(notebook);
        setPayableAmount(notebook.oprice); 
        setIsCartOpen(true);
    };

    const handleCloseCart = () => {
        setIsCartOpen(false);
        setCartItem(null);
    };

    const handleQuantityChange = (e) => {
        const newQuantity = Math.max(1, parseInt(e.target.value, 10));
        setQuantity(newQuantity);
        if (cartItem) {
            setPayableAmount(cartItem.oprice * newQuantity);
        }
    };

    const handleOrderConfirmation = async () => {
        const orderData = {
            ntype: cartItem.ntype, // Adjust this according to your data structure
            quantity: quantity,
            oprice: cartItem.oprice,
            pprice: payableAmount,
            author: cartItem.author,
        };

        try {
            const response = await axios.post('http://localhost:3009/nbook', orderData);
            console.log('Order confirmed:', response.data);
            handleCloseCart(); 
        } catch (error) {
            console.error('Error confirming order:', error);
        }
    };

    return (
        <>
        
        <marquee behavior="" direction="right">this will goes to right
            <img  className='me-4' style={{width:'60px',height:'50px'}} src='./logo512.png' alt='' />
            <img className='me-4' style={{width:'60px',height:'50px'}} src='./logo192.png' alt='' />

        </marquee>
        <div className="container mt-5">
            <div className="row notebook">
                {notebooks.map((notebook, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card shadow-sm custom-card">
                            <img style={{ width: '200px', height: '300px',marginLeft:'100px' }} src={notebook.image} alt={notebook.btype} className="card-img-top custom-card-img" />
                            <div className="card-body">
                                <h5 className="card-title">{notebook.btype}</h5>
                                <i className='bi bi-star me-2' />
                                <i className='bi bi-star me-2' />
                                <i className='bi bi-star' />
                                <p className="card-text">Price: ${notebook.oprice.toFixed(2)}</p>
                              
                                <button 
                                    className="btn btn-primary" 
                                    onClick={() => handleAddToCart(notebook)}
                                >
                                   
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isCartOpen && (
                <div className='cart-overlay'>
                    <button className='close-btn w-100 bg-danger text-white' onClick={handleCloseCart}>Close</button>
                    <div className='cart-item d-flex justify-content-between align-items-start'>
                        <div style={{ marginRight: '20px', marginTop: '50px' }}>
                            <img              
                                src={cartItem.image} 
                                alt={cartItem.ntype} 
                                className='cart-image' 
                                style={{ height: '350px', borderRadius: '10px' }} 
                            />
                            <h3 className="text-center mt-2"><strong>{cartItem.ntype}</strong></h3>
                            <h4 className="text-center text-primary">
                                <i className='bi bi-truck'></i>
                                <strong> Free delivery</strong>
                            </h4>
                        </div>
                        <div className='cart-details' style={{ marginTop: '50px', width: '500px' }}>
                            <h2>About this</h2>
                            <p>{cartItem.description}</p>
                            <div className='confirmation w-100 rounded p-3 mt-4' style={{ border: '1px solid #007BFF' }}>
                                <h3 className="text-center">Cart Details</h3>
                                <p>Price: ${cartItem.oprice.toFixed(2)}</p>
                                <div>
                                    <h5>Enter Quantity:</h5>
                                    <input 
                                        type='number' 
                                        value={quantity} 
                                        onChange={handleQuantityChange} 
                                        min="1"
                                        className='form-control w-50'
                                    />
                                    <h4 className='mt-2'>Payable Amount: ${payableAmount.toFixed(2)}</h4>
                                    <button className='btn btn-success' onClick={handleOrderConfirmation}>Confirm Order</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </>
    );
};

export default Nbook;
