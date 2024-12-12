import React, { useState } from 'react';
import './App.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    dob: '',
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = (e) => {
    e.preventDefault();
    const { username, email, phone, dob } = formData;

    // Validate phone number
    if (!/^\d{10}$/.test(phone)) {
      alert('**Invalid phone number. Please enter a 10-digit phone number.**');
      return;
    }

    // Validate date of birth
    const today = new Date();
    const selectedDate = new Date(dob);
    if (selectedDate > today) {
      alert('**Invalid date of birth. Date of birth cannot be in the future.**');
      return;
    }

    // Validate username and email
    if (!username.trim()) {
      alert('Username cannot be empty.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert('**Invalid email. Please check your email address.**');
      return;
    }

    alert('Form submitted successfully!');
    closeModal();
  };

  return (
    <div className="App">
      <h1>User Details Modal</h1>
      <button className="open-btn" onClick={openModal}>Open Form</button>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Fill Details</h2>
            <form className="form" onSubmit={validateForm}>
              <div className="form-group">
                <label htmlFor="username">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter a valid email"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone Number:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="dob">Date of Birth:</label>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-actions">
                <button type="button" onClick={closeModal} className="close-btn">
                  Close
                </button>
                <button type="submit" className="submit-btn">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;