import React, { useState } from 'react';
import { useShipments } from '../../context/ShipmentContext';
import { Zap, Eye, EyeOff, Check } from 'lucide-react';

export const AuthScreen = () => {
  const { login } = useShipments();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [email, setEmail] = useState('naimulislam.dev@shipnow.logistics');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email);
  };

  return (
    <div className="auth-container">
      {/* Left Purple Hero Panel */}
      <div className="auth-hero-panel">
        <div className="auth-brand">
          <div className="auth-brand-logo">
            <Zap size={22} className="fill-current" />
          </div>
          <span className="auth-brand-title">SHIPNOW</span>
        </div>

        <div className="auth-hero-image-wrapper">
          <div className="main-image-box">
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
              alt="Logistics Truck Loading"
              className="hero-main-img"
            />
          </div>
          <div className="overlay-image-box">
            <img
              src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=400"
              alt="Scanning package"
              className="hero-overlay-img"
            />
          </div>
        </div>

        <div className="auth-hero-text">
          <h2>Welcome to ShipNow</h2>
          <p>Manage your shipments, fleet, and warehouse in one smart dashboard.</p>
        </div>
      </div>

      {/* Right Form Panel */}
      <div className="auth-form-panel">
        <div className="auth-form-content">
          <div className="auth-logo-center">
            <Zap size={32} className="text-purple-600" />
          </div>

          <div className="auth-header">
            <h2>{isRegisterMode ? 'Create Account' : 'Welcome Back'}</h2>
            <p>
              {isRegisterMode
                ? 'Sign up to get started managing logistics with ShipNow'
                : 'Log in to continue managing your logistics with ShipNow'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {isRegisterMode && (
              <div className="form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  
                  className="auth-input"
                  required
                />
              </div>
            )}

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter a valid email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="auth-input"
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="auth-input password-input"
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {!isRegisterMode && (
              <div className="auth-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="custom-checkbox">
                    {rememberMe && <Check size={12} />}
                  </span>
                  <span>Remember Me</span>
                </label>

                <a href="#forgot" onClick={(e) => e.preventDefault()} className="forgot-link">
                  Forgot Password?
                </a>
              </div>
            )}

            <button type="submit" className="auth-submit-btn">
              {isRegisterMode ? 'Register' : 'Login'}
            </button>

            <div className="auth-footer-toggle">
              {isRegisterMode ? (
                <p>
                  Already have an account?{' '}
                  <button type="button" onClick={() => setIsRegisterMode(false)}>
                    Login
                  </button>
                </p>
              ) : (
                <p>
                  Don't have an account?{' '}
                  <button type="button" onClick={() => setIsRegisterMode(true)}>
                    Register
                  </button>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
