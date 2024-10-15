import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Books.css';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [cartItem, setCartItem] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [payableAmount, setPayableAmount] = useState(0);
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:3009/book');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };

        fetchBooks();
    }, []);

    const handleAddToCart = (book) => {
        setCartItem(book);
        setPayableAmount(book.oprice); 
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
            btype: cartItem.btype,
            oprice: cartItem.oprice,
            quantity: quantity,
            pprice: payableAmount, 
            author: cartItem.author, 
        };

        try {
            const response = await axios.post('http://localhost:3009/books', orderData);
            console.log('Order confirmed:', response.data);
            
        } catch (error) {
            console.error('Error confirming order:', error);
            
        }
    };

    return (
        <>
        <h1>Find the Desire Book you want</h1>
       <marquee behavior="" direction="right">
       <img className='me-4' style={{width:'60px',height:'50px', borderRadius:'50%'}} src='https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?cs=srgb&dl=pexels-pixabay-159866.jpg&fm=jpg' alt='' />
       <img className='me-4' style={{width:'60px',height:'50px', borderRadius:'50%'}} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM8g-_cIfGV5eVeaXt943o7SPg3mssWXd_FUN_iEocLGF5tMMF8h21And2FNxTfPk6mlM&usqp=CAU' alt='' />
       <img className='me-4' style={{width:'60px',height:'50px', borderRadius:'50%'}} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTv88mBQnIxNKY_ozzD4kqP8302CkHmX2XM6iyd4YSaidW5goPELzo5Z8rzU1VDrg0Yf0&usqp=CAU' alt='' />
       <img  className='me-4'style={{width:'60px',height:'50px', borderRadius:'50%'}} src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOqhG9PnsPNdX9VVdXBWzNBVfeExDDxifQG3LpyixxoSfc19U_kGqsFn28NugMwH6jnYc&usqp=CAU' alt='' />
    
      
       </marquee>
        <div className="container mt-5" >
            <div className="row">
                {books.map((book, index) => (
                    <div className="col-md-4 mb-4" key={index}>
                        <div className="card shadow-sm custom-card " >
                            <img src={book.image} alt={book.btype} style={{ width: '200px', height: '300px',marginLeft:'100px' }} className="card-img-top custom-card-img" />
                            <div className="card-body">
                                <h5 className="card-title">{book.btype}</h5>
                                <i  className='bi bi-star me-2'/>
                                <i  className='bi bi-star me-2'/>
                                <i  className='bi bi-star me-2'/>
                                <p className="card-text">Price: ${book.oprice.toFixed(2)}</p>
                                <button 
                                    className="btn btn-primary" 
                                    onClick={() => handleAddToCart(book)}
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
                                alt={cartItem.btype} 
                                className='cart-image' 
                                style={{ height: '350px', borderRadius: '10px' }} 
                            />
                            <h3 className="text-center mt-2"><strong>{cartItem.btype}</strong></h3>
                            <h4 className="text-center text-primary">
                                <i className='bi bi-truck'></i>
                                <strong> Free delivery</strong>
                            </h4>
                        </div>
                        <div className='cart-details' style={{ marginTop: '50px', width: '500px' }}>
                            <h2>About this</h2>
                            <p>{cartItem.description}</p>
                            <div className='confirmation w-100 rounded p-3 mt-4' style={{ border: '1px solid #007BFF' }}>
                                <h3 className="text-center">Order Details</h3>
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
                                </div>
                                <div className="text-center mt-4">
                                    <button onClick={handleOrderConfirmation} className='btn btn-primary'>Confirm Order</button>
                                </div>
                                <div className='mt-4'>
                                    <h5>Payment Method:</h5>
                                    <input type='checkbox' />
                                    <label className='me-2'>Cash on Delivery</label>
                                    <br />
                                    <input type='checkbox' />
                                    <label>Advance Payment</label>
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

export default Books;
