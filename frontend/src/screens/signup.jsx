import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './signuppage.css';

function SignUp() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false); // To prevent multiple submissions

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        gender: '',
        age: '',
        password: '',
        role: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        gender: '',
        age: '',
        password: '',
        role: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors = { name: '', email: '', gender: '', age: '', password: '', role: '' };
        let isValid = true;

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required.';
            isValid = false;
        }

        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required.';
            isValid = false;
        } else if (!emailPattern.test(formData.email)) {
            newErrors.email = 'Enter a valid email.';
            isValid = false;
        }

        if (!formData.password.trim()) {
            newErrors.password = 'Password is required.';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'At least 6 characters required.';
            isValid = false;
        }

        if (!formData.gender) {
            newErrors.gender = 'Please select your gender.';
            isValid = false;
        }

        const ageNum = parseInt(formData.age, 10);
        if (!formData.age.trim()) {
            newErrors.age = 'Please enter your age.';
            isValid = false;
        } else if (isNaN(ageNum) || ageNum <= 0 || ageNum > 120) {
            newErrors.age = 'Enter a valid age (1-120).';
            isValid = false;
        }

        if (!formData.role) {
            newErrors.role = 'Please select your role.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:3003/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        fullname: formData.name,
                        email: formData.email,
                        gender: formData.gender,
                        age: formData.age,
                        password: formData.password,
                        role: formData.role,
                    }),
                });

                const result = await response.json();
                if (result.error) {
                    toast.error(result.error);
                } else {
                    toast.success(result.success);
                    navigate('/login');
                }
            } catch (error) {
                toast.error('Something went wrong! Please try again.');
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="signup-container">
            <div className="form-container">
                <h2 className="title">Create an Account</h2>
                <form onSubmit={handleSubmit} className="signup-form">
                    <div className="input-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
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
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="gender">Gender</label>
                        <select name="gender" value={formData.gender} onChange={handleChange}>
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
                            placeholder="Enter your age"
                            min="1"
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
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>

                    <div className="input-group">
                        <label htmlFor="role">Role</label>
                        <select name="role" value={formData.role} onChange={handleChange}>
                            <option value="">--Select Role--</option>
                            <option value="Instructor">Instructor</option>
                            <option value="Client">Client</option>
                        </select>
                        {errors.role && <p className="error">{errors.role}</p>}
                    </div>

                    <button type="submit" className="submit-button" disabled={loading}>
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>

                <div className="login-link">
                    <p>
                        Already have an account? <a href="/login">Log in here</a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
