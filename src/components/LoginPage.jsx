import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      setError('All fields are required');
      return;
    }
    setError('');
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="background-shapes">
        <div className="circle-1">
          <div className="inner-circle"></div>
          <div className="stripe"></div>
        </div>
        <div className="circle-2">
          <div className="inner-circle"></div>
          <div className="stripe"></div>
        </div>
      </div>

      <div className="login-container">
        <h1>Welcome back</h1>
        <span className="or">OR</span>
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Sign in
          </button>
        </form>
        <a href="#" className="forgot-password">Forgot password?</a>
        <div className="create-account">
          <span>Don't have an account? <a href="#">Create account</a></span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
