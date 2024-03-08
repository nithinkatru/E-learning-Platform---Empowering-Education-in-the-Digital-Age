import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentProfile = () => {
  const [userData, setUserData] = useState({});

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
    <div className="container">
      <h2>User Profile</h2>
      <p><strong>First Name:</strong> {userData.firstName}</p>
      <p><strong>Last Name:</strong> {userData.lastName}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Phone Number:</strong> {userData.phoneNumber}</p>
      <p><strong>Role:</strong> {userData.role}</p>
      {/* Display other user details as needed */}
    </div>
  );
};

export default StudentProfile;
