import React, { useState } from 'react';
import './styles/LoginPage.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Send login request to the backend
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        email,
        password,
      });

      // Alert the success message
      alert(response.data.message);

      // Check if the response is successful and role is present
      if (response.status === 200) {
        const userRole = response.data.role;

        // Redirect based on the role
        if (userRole === "Student") {
          navigate('/Student-Dashboard');
        } else if (userRole === "Admin") {
          navigate('/Admin-Dashboard');
        }
      }
    } catch (error) {
      alert('Invalid credentials');
      console.error('Login error:', error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h2 className="login-title">Welcome Back!</h2>
        <p className="login-subtitle">Log in to access your scholarship portal.</p>

        <div className="input-group">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        
        <div className="input-group">
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={handleLogin} className="login-btn">Login</button>

        <p className="signup-link">
          Don't have an account? <Link to="/register">Sign up here</Link>.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
