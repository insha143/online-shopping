import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const UpdateBok = () => {
    const { id } = useParams(); // Get book ID from the URL
    const navigate = useNavigate(); // Hook for navigation
    const [book, setBook] = useState({
        btype: '',
        quantity: '',
        oprice: '',
        pprice: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://localhost:3009/books/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch the book data');
                }
                const data = await response.json();
                setBook(data); 
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

  
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBook({ ...book, [name]: value });
    };

   
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3009/books/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(book), 
            });
            if (!response.ok) {
                throw new Error('Failed to update the book');
            }
           
            
            navigate('/');
        } catch (error) {
            console.error('Error updating the book:', error);
            setError('Failed to update the book');
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
            <h2 className="text-center">Update Book</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="form-group">
                    <label htmlFor="btype">Book Type</label>
                    <input
                        type="text"
                        className="form-control"
                        id="btype"
                        name="btype"
                        value={book.btype}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="number"
                        className="form-control"
                        id="quantity"
                        name="quantity"
                        value={book.quantity}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="oprice">Original Price</label>
                    <input
                        type="number"
                        className="form-control"
                        id="oprice"
                        name="oprice"
                        step="0.01"
                        value={book.oprice}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="pprice">Payable Amount</label>
                    <input
                        type="number"
                        className="form-control"
                        id="pprice"
                        name="pprice"
                        step="0.01"
                        value={book.pprice}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Update Book</button>
            </form>
        </div>
    );
};

export default UpdateBok;
