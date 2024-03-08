import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentProfile.css';

const StudentProfile = () => {
  const [User, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const email = localStorage.getItem('userEmail'); // Assuming you store the user email in local storage
      try {
        const response = await axios.get(`http://localhost:5000/api/user/profile?email=${email}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <section className="bg">
    <div className="std-container">
      <h2>User Profile</h2>
      <p><strong>First Name:</strong> {User.firstName}</p>
      <p><strong>Last Name:</strong> {User.lastName}</p>
      <p><strong>Email:</strong> {User.email}</p>
      <p><strong>Phone Number:</strong> {User.phoneNumber}</p>
      <p><strong>Role:</strong> {User.role}</p>
      {/* Display other user details as needed */}
    </div>
    </section>
  );
};

export default StudentProfile;
