import React, { useEffect, useState } from 'react';
import './Books.css'; // Ensure you have the correct CSS file

const Stats = () => {
    const [stationery, setStationery] = useState([]); // State for stationery items
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItem, setCartItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [payableAmount, setPayableAmount] = useState(0);
    const [errorMessage, setErrorMessage] = useState(''); // State for error message

    useEffect(() => {
        const fetchStationery = async () => {
            try {
                const response = await fetch('http://localhost:3009/stata');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setStationery(data); // Set stationery items
            } catch (error) {
                console.error('Error fetching stationery:', error);
            }
        };

        fetchStationery(); // Fetch stationery items
    }, []);

    const handleAddToCart = (item) => {
        setCartItem(item);
        setPayableAmount(item.price); // Set payable amount using item's price
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
            setPayableAmount(cartItem.price * newQuantity); // Update payable amount
        }
    };

    const handleConfirmOrder = async () => {
        if (!cartItem) return;

        const orderData = {
            type: cartItem.name, // Name of the item
            quantity: quantity, // Quantity from the input
            oprice: cartItem.price, // Original price
            pprice: payableAmount, // Payable amount
        };

        try {
            const response = await fetch('http://localhost:3009/stat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData), // Send order data as JSON
            });

            if (!response.ok) {
                throw new Error('Failed to confirm order');
            }

            const result = await response.json();
            console.log('Order confirmed:', result); // Log success message
            handleCloseCart(); // Close the cart after successful order
        } catch (error) {
            console.error('Error confirming order:', error);
            setErrorMessage('Failed to confirm order. Please try again.'); // Set error message
        }
    };

    return (
        <>
        <div className='bg-danger'> this is the header of the page
         <marquee behavior="" direction=""> form the top of the list</marquee>
        </div>
        <div className="container mt-5">
            <h2 className='mt-5'><strong>Stationery Items</strong></h2>
            
            <div className="row stationery">
                {stationery.map((item, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card shadow-sm custom-card">
                            <img 
                                style={{ width: '200px', height: '300px',marginLeft:'100px' }} 
                                src={item.image} 
                                alt={item.name} 
                                className="card-img-top custom-card-img" 
                            />
                            <div className="card-body">
                                <h5 className="card-title">{item.name}</h5>
                                <i className='bi bi-star' />
                                <i className='bi bi-star' />
                                <i className='bi bi-star' />
                                <p className="card-text">Price: ${item.price.toFixed(2)}</p>
                                <button 
                                    className="btn btn-primary" 
                                    onClick={() => handleAddToCart(item)}
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
                    <button className='close-btn w-100 text-white' onClick={handleCloseCart}>Close</button>
                    <div className='cart-item d-flex justify-content-between align-items-start'>
                        <div style={{ marginRight: '20px', marginTop: '50px' }}>
                            <img              
                                src={cartItem.image} 
                                alt={cartItem.name} 
                                className='cart-image' 
                                style={{ height: '350px', borderRadius: '10px' }} 
                            />
                            <h3 className="text-center mt-2"><strong>{cartItem.name}</strong></h3>
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
                                <p>Price: ${cartItem.price.toFixed(2)}</p>
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
                                    <button className='btn btn-success' onClick={handleConfirmOrder}>Confirm Order</button>
                                    {errorMessage && <div className="text-danger mt-2">{errorMessage}</div>} {/* Display error message */}
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

export default Stats;
