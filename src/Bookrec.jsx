import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Link } from 'react-router-dom';

const Bookrec = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('http://localhost:3009/books');
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this book?")) {
            try {
                const response = await fetch(`http://localhost:3009/books/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Failed to delete the book');
                }
                // Update the book list after successful deletion
                setBooks(books.filter((book) => book.id !== id));
            } catch (error) {
                console.error('Error deleting the book:', error);
                setError('Failed to delete the book');
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
            <h2 className="text-center">Books List</h2>
            <input className='w-100'  type='text' placeholder='search here....' />
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Original Price</th>
                        <th>Payable Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.btype}</td>
                            <td>{book.quantity}</td>
                           
                            <td>${Number(book.oprice).toFixed(2)}</td>
                            <td>${Number(book.pprice).toFixed(2)}</td> 
                            <td>
                                {/* Navigate to update page with the book ID */}
                                <Link to={`/updatebok/${book.id}`} className="btn btn-success me-2 bi bi-pencil">
                                    Update
                                </Link>
                                <button 
                                    className='btn btn-danger bi bi-trash' 
                                    onClick={() => handleDelete(book.id)}>
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

export default Bookrec;
