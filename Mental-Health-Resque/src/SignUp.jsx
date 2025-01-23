/*import React, { useState } from 'react';
import './SignUp.css'; // Importing the CSS file

function SignUp() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = { username: '', email: '', password: '' };
    let isValid = true;

    if (formData.username.trim() === '') {
      newErrors.username = 'Username is required.';
      isValid = false;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (formData.email.trim() === '') {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Please enter a valid email.';
      isValid = false;
    }

    if (formData.password.trim() === '') {
      newErrors.password = 'Password is required.';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      alert('Form submitted successfully!');
      // You can replace this with actual form submission logic (e.g., sending data to a server).
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="input"
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input"
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <input type="submit" value="Sign Up" className="submit-button" />
        </form>

        <div className="footer-text">
          <p>Already have an account? <a href="#">Login here</a></p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;*/
import React, { useState } from 'react';
import './SignUp.css'; // Importing the CSS file

function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    age: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    gender: '',
    age: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = { name: '', email: '', gender: '', age: '', password: '' };
    let isValid = true;

    if (formData.name.trim() === '') {
      newErrors.name = 'Name is required.';
      isValid = false;
    }

    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (formData.email.trim() === '') {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Please enter a valid email.';
      isValid = false;
    }

    if (formData.password.trim() === '') {
      newErrors.password = 'Password is required.';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
      isValid = false;
    }

    if (formData.gender === '') {
      newErrors.gender = 'Please select your gender.';
      isValid = false;
    }

    if (formData.age === '') {
      newErrors.age = 'Please enter your age.';
      isValid = false;
    } else if (isNaN(formData.age) || formData.age <= 0) {
      newErrors.age = 'Please enter a valid age.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      alert('Form submitted successfully!');
      // You can replace this with actual form submission logic (e.g., sending data to a server).
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h2>Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input"
              placeholder="Enter your full name"
            />
            {errors.name && <p className="error">{errors.name}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input"
              placeholder="Enter your email"
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="gender">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="input"
            >
              <option value="">--Select Gender--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <p className="error">{errors.gender}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="age">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="input"
              min="1"
              placeholder="Enter your age"
            />
            {errors.age && <p className="error">{errors.age}</p>}
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input"
              placeholder="Enter your password"
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <button type="submit" className="submit-button">Sign Up</button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
