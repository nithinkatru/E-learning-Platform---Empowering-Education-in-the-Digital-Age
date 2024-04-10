// AdminEducatorCRUD.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminEducatorCRUD.css'; // Ensure you have this CSS file for styles

const AdminEducatorCRUD = () => {
    const [educators, setEducators] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        password: '',
    });
    const [viewMode, setViewMode] = useState('view');
    const [isEditMode, setIsEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchEducators();
    }, []);

    const fetchEducators = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/educators');
            setEducators(response.data);
        } catch (error) {
            console.error('Error fetching educators:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmitEducator = async (e) => {
        e.preventDefault();
        const apiURL = isEditMode
            ? `http://localhost:5000/api/users/${editId}`
            : 'http://localhost:5000/api/users';
        const method = isEditMode ? 'put' : 'post';

        try {
            await axios[method](apiURL, {
                ...formData,
                role: 'educator',
            });
            setFormData({ firstName: '', lastName: '', email: '', phoneNumber: '', password: '' });
            setIsEditMode(false);
            setEditId(null);
            fetchEducators();
            setViewMode('view'); // Switch back to view mode after operation
        } catch (error) {
            console.error('Error submitting educator:', error);
        }
    };

    const handleEditClick = (educator) => {
        setFormData({
            firstName: educator.firstName,
            lastName: educator.lastName,
            email: educator.email,
            phoneNumber: educator.phoneNumber,
            password: '', // Consider security implications
        });
        setIsEditMode(true);
        setEditId(educator._id);
        setViewMode('add'); // Switch to form view
    };

   // Other parts of your component remain unchanged

const handleDeleteEducator = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      // Refresh the educators list after deletion
      const updatedEducators = educators.filter(educator => educator._id !== id);
      setEducators(updatedEducators);
    } catch (error) {
      console.error('Error deleting educator:', error.response ? error.response.data : 'Server Error');
    }
  };
  
  

    return (
        <div>
            <button onClick={() => { setViewMode('add'); setIsEditMode(false); }}>Add Educator</button>
            <button onClick={() => setViewMode('view')}>View Educators</button>

            {viewMode === 'add' && (
                <div>
                    <h2>{isEditMode ? 'Edit' : 'Add'} Educator</h2>
                    <form onSubmit={handleSubmitEducator}>
                        {/* Form fields */}
                        <div>
                            <label>First Name:</label>
                            <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Last Name:</label>
                            <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Phone Number:</label>
                            <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} />
                        </div>
                        <button type="submit">{isEditMode ? 'Update' : 'Add'} Educator</button>
                    </form>
                </div>
            )}

            {viewMode === 'view' && (
                <div>
                    <h2>Educators List</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {educators.map((educator) => (
                                <tr key={educator._id}>
                                    <td>{educator.firstName}</td>
                                    <td>{educator.lastName}</td>
                                    <td>{educator.email}</td>
                                    <td>
                                        <button onClick={() => handleEditClick(educator)}>Edit</button>
                                        <button onClick={() => handleDeleteEducator(educator._id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminEducatorCRUD;
