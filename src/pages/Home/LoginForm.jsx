import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginForm.css';
import { FaTimes } from 'react-icons/fa';

const LoginForm = ({ loginType, onClose }) => {
  if (!loginType) return null;

  return (
    <div className="fixed-top vw-100 vh-100 bg-overlay d-flex justify-content-center align-items-center">
      <div className="login-form-container p-4 rounded-lg shadow-lg position-relative">
        <button
          onClick={onClose}
          className="btn-close position-absolute top-0 end-0 m-1"
          aria-label="Close"
        >
          <FaTimes />
        </button>
        <h2 className="text-center mb-4">Login as {loginType}</h2>
        <form>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label className="form-label" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form-control"
            />
          </div>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <button
              className="btn btn-primary w-100"
              type="button"
            >
              Log in
            </button>
          </div>
          <div className="text-center">
            <a
              className="text-decoration-none text-info"
              href="#"
            >
              Forgot your password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
