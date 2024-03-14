import React, { useState, useEffect } from 'react';
import axios from 'axios';

import './StudentProfile.css';


const StudentProfile = () => {
  const [User, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      const email = localStorage.getItem('email'); // Ensure this matches what you set during login
      console.log("Email from localStorage:", email);
      if (!email) {
        console.error('No email found in localStorage');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:5000/api/user/profile`, { params: { email } });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
  
    fetchUserData();
  }, []);
  

  return (
    <>
      <section className='student-hero'>
    <div className="std-container">
      <h2>User Profile</h2>
      {/* <p><strong>First Name:</strong> {User.firstName}</p>
      <p><strong>Last Name:</strong> {User.lastName}</p>
      <p><strong>Email:</strong> {User.email}</p>
      <p><strong>Phone Number:</strong> {User.phoneNumber}</p> */}
      <p><strong>First Name:</strong> Akshay</p>
      <p><strong>Last Name:</strong> Saharajan</p>
      <p><strong>Email:</strong> akshay.std@gmail.com</p>
      <p><strong>Phone Number:</strong> 7894561230</p>
    </div>
    </section>
      <div className='margin'></div>
    </>
  );
};

export default StudentProfile;
