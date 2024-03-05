import React, { useState, useEffect } from 'react';

const StudentProfile = () => {
    const [studentDetails, setStudentDetails] = useState({
        email: '', // Not editable
        name: '',  // Not editable
        phoneNumber: '',
        address: '',
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchStudentDetails();
    }, []);

    const fetchStudentDetails = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/student/details', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Include authentication token if needed
                },
            });
            if (!response.ok) {
                throw new Error('Failed to fetch details');
            }
            const data = await response.json();
            setStudentDetails(data);
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStudentDetails(prevDetails => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch('/api/student/details', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    // Include authentication token if needed
                },
                body: JSON.stringify({
                    phoneNumber: studentDetails.phoneNumber,
                    address: studentDetails.address,
                }),
            });
            if (!response.ok) {
                throw new Error('Failed to update profile');
            }
            setMessage('Profile updated successfully!');
        } catch (error) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading ? <p>Loading...</p> : (
                <form onSubmit={handleSubmit}>
                    <label>Email (cannot be changed):</label>
                    <input type="email" value={studentDetails.email} disabled />
                    <label>Name (cannot be changed):</label>
                    <input type="text" value={studentDetails.name} disabled />
                    <label>Phone Number:</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        value={studentDetails.phoneNumber}
                        onChange={handleInputChange}
                    />
                    <label>Address:</label>
                    <input
                        type="text"
                        name="address"
                        value={studentDetails.address}
                        onChange={handleInputChange}
                    />
                    <button type="submit" disabled={loading}>Update Profile</button>
                </form>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default StudentProfile;
