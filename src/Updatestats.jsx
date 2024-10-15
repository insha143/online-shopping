import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Updatestats = () => {
    const { id } = useParams(); // Get the record ID from the URL
    const navigate = useNavigate(); // Hook for navigation
    const [record, setRecord] = useState({
        title: '',
        description: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch record by ID when the component is mounted
    useEffect(() => {
        const fetchRecord = async () => {
            try {
                const response = await fetch(`http://localhost:3009/stat/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch the record data');
                }
                const data = await response.json();
                setRecord(data); // Set the fetched record data
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecord();
    }, [id]);

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setRecord({ ...record, [name]: value });
    };

    // Handle form submission to update the record
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3009/stat/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(record), // Send updated record data
            });
            if (!response.ok) {
                throw new Error('Failed to update the record');
            }

            // Redirect back to the records page after successful update
            navigate('/');
        } catch (error) {
            console.error('Error updating the record:', error);
            setError('Failed to update the record');
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
            <h2 className="text-center">Update Record</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={record.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        className="form-control"
                        id="description"
                        name="description"
                        value={record.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary mt-3">Update Record</button>
            </form>
        </div>
    );
};

export default Updatestats;
