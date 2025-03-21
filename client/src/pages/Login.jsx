import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({ username: '', password: '' });
  console.log(formData);
  
  // State to track form errors
  const [formErrors, setFormErrors] = useState({});

  // Validation function
  const validateForm = () => {
    const errors = {};
    if (!formData.username) errors.username = 'Username is required';
    if (!formData.password) errors.password = 'Password is required';   
    return errors;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      axios.post('http://localhost:4000/auth/checklogin', formData).then((response) => {
        console.log(response);
        localStorage.setItem('role', response.data.data.role)
        localStorage.setItem('username', response.data.data.username)
        localStorage.setItem('login_id', response.data.data._id)
        
          navigate("/")
    

      }).catch((error) => {
        toast.error(error.response.data.message)
      })
    
    } else {
      setFormErrors(errors);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
    <Toaster />
      <div className="container-fluid position-relative p-0">
        <div
          className="container-fluid bg-primary py-5 hero-header"
          style={{ backgroundImage: `linear-gradient(rgba(20, 20, 31, 0.7), rgba(20, 20, 31, 0.7)), url('/img/login-bg.jpeg')` }}
        >
          <div className="container" style={{ height: '100Vh' }}>
            <div className="row justify-content-center py-5">
              <div className="col-lg-10 pt-lg-5 text-center">
                <h1 className="display-3 mt-0 text-white animated slideInDown">
                  Sign In
                </h1>
              </div>
              <div className="col-lg-4 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
                <form onSubmit={handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className={`form-control ${formErrors.username ? 'is-invalid' : ''}`}
                          id="name"
                          name="username"
                          placeholder="Username"
                          value={formData.username}
                          onChange={handleChange}
                        />
                        <label htmlFor="name">Username</label>
                        {formErrors.username && <div className="invalid-feedback">{formErrors.username}</div>}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-floating">
                        <input
                          type="password"
                          className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                          name="password"
                          id="password"
                          placeholder="Your password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                        <label htmlFor="password">Password</label>
                        {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
                      </div>
                    </div>

                    <div className="col-12">
                      <button className="btn btn-primary w-100 py-3" type="submit">
                        Login
                      </button>
                    </div>
                    <div className="text-center mt-3">
                      <a href="/register" className="text-white">
                        Don't have an account?
                      </a> <br />
                      <a href="/forgot-password" className="text-white">
                        Forgot Password?
                      </a>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
