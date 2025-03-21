import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export default function Register() {
  const navigate = useNavigate()
  const [isUserRegistration, setIsUserRegistration] = useState(true);

  // Form state
  const [userForm, setUserForm] = useState({
    Name: '',
    Email: '',
    PhoneNumber: '',
    State: '',
    District: '',
    Username: '',
    Password: ''
  });
  
  const [stationForm, setStationForm] = useState({
    Name: '',
    Email: '',
    PhoneNumber: '',
    Username: '',
    Password: ''
  });
  console.log(stationForm);

  // Validation error state
  const [userErrors, setUserErrors] = useState({});
  const [stationErrors, setStationErrors] = useState({});

  // Function to toggle between the forms
  const toggleForm = () => {
    setIsUserRegistration(!isUserRegistration);
  };

  // Basic validation functions
  const validateUserForm = () => {
    const errors = {};
    if (!userForm.Name) errors.Name = 'Name is required';
    if (!userForm.Email) errors.Email = 'Email is required';
    if (!userForm.PhoneNumber) errors.PhoneNumber = 'PhoneNumber is required';
    if (!userForm.State) errors.State = 'State is required';
    if (!userForm.District) errors.District = 'District is required';
    if (!userForm.Username) errors.Username = 'Username is required';
    if (!userForm.Password) errors.Password = 'Password is required';
    // else if (userForm.Password.length < 6) errors.Password = 'Password must be at least 6 characters';
    return errors;
  };

  const validateStationForm = () => {
    const errors = {};
    if (!stationForm.Name) errors.Name = 'Name is required';
    if (!stationForm.Email) errors.Email = 'Email is required';
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(stationForm.Email))
      errors.Email = 'Invalid email address';
    if (!stationForm.PhoneNumber) errors.PhoneNumber = 'Mobile number is required';
    if (!stationForm.Username) errors.Username = 'Username is required';
    if (!stationForm.Password) errors.Password = 'Password is required';
    else if (stationForm.Password.length < 6) errors.Password = 'Password must be at least 6 characters';
    return errors;
  };

  // Handle form submissions
  const handleUserSubmit = (e) => {
    e.preventDefault();
    const errors = validateUserForm();
    if (Object.keys(errors).length === 0) {
      if (isUserRegistration == true) {
        axios.post('http://localhost:4000/auth/userregistration', userForm).then((response) => {
          console.log(response);
          toast.success(response.data.message)
          setTimeout(() => {
            navigate("/login")
        }, 2000);

        }).catch((error) => {
          toast.error(error.response.data.message)
        })
      }
    } else {
      setUserErrors(errors);
    }
  };

  const handleStationSubmit = (e) => {
    e.preventDefault();
    const errors = validateStationForm();
    console.log(errors);
    
    if (Object.keys(errors).length === 0) {
    
          axios.post('http://localhost:4000/auth/ownerregistration', stationForm).then((response) => {
            console.log(response);
            toast.success(response.data.message)
            setTimeout(() => {
              navigate("/login")
          }, 2000);

          }).catch((error) => {
            toast.error(error.response.data.message)
          })
        
    } else {
      setStationErrors(errors);
    }
  };

  // Handle form field changes
  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const handleStationChange = (e) => {
    const { name, value } = e.target;
    setStationForm({ ...stationForm, [name]: value });
  };

  return (
    <>
    <Toaster />
      <div className="container-fluid position-relative p-0">
        <div
          className="container-fluid bg-primary py-5 hero-header"
          style={{
            backgroundImage: `linear-gradient(rgba(20, 20, 31, 0.7), rgba(20, 20, 31, 0.7)), url('/img/login-bg.jpeg')`
          }}
        >
          <div className="container" style={{ height: '100Vh' }}>
            <div className="row justify-content-center ">
              <div className="col-lg-10 pt-lg-5 text-center">
                <h1 className="display-3 mt-0 text-white animated slideInDown">
                  {isUserRegistration ? 'User Registration' : 'Station Owner Registration'}
                </h1>
                <a href="#" onClick={toggleForm} className="text-white">
                  {isUserRegistration ? 'Not a User ? Switch to Station Owner Registration.' : 'Are You a User Switch to User Registration?'}
                </a>
              </div>
              <div className="col-lg-4 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
                {/* Conditional rendering of forms based on the state */}
                {isUserRegistration ? (
                  <form onSubmit={handleUserSubmit} className='mt-5'>
                    <div className="row g-3">

                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="text"
                            className={`form-control ${userErrors.Name ? 'is-invalid' : ''}`}
                            id="userName"
                            name="Name"
                            placeholder="Name"
                            value={userForm.Name}
                            onChange={handleUserChange}
                          />
                          <label htmlFor="Name">Name</label>
                          {userErrors.Name && <div className="invalid-feedback">{userErrors.Name}</div>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="text"
                            className={`form-control ${userErrors.PhoneNumber ? 'is-invalid' : ''}`}
                            id="userName"
                            name="PhoneNumber"
                            maxLength={10} // Restrict input to 10 characters
                            pattern="\d{10}" // Ensure only 10 digits
                            placeholder="PhoneNumber"
                            value={userForm.PhoneNumber}
                            onChange={handleUserChange}
                          />
                          <label htmlFor="PhoneNumber">Mobile</label>
                          {userErrors.PhoneNumber && <div className="invalid-feedback">{userErrors.PhoneNumber}</div>}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-floating">
                          <input
                            type="text"
                            className={`form-control ${userErrors.Email ? 'is-invalid' : ''}`}
                            id="userName"
                            name="Email"
                            placeholder="Email"
                            value={userForm.Email}
                            onChange={handleUserChange}
                          />
                          <label htmlFor="Email">Email</label>
                          {userErrors.Email && <div className="invalid-feedback">{userErrors.Email}</div>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating">
                          <select name="State"
                            className={`form-control ${userErrors.State ? 'is-invalid' : ''}`}
                            onChange={handleUserChange}>
                            <option value="">Select State</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Karnadaka">Karnadaka</option>
                          </select>

                          <label htmlFor="State">State</label>
                          {userErrors.State && <div className="invalid-feedback">{userErrors.State}</div>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating">
                          <select name="District"
                            className={`form-control ${userErrors.District ? 'is-invalid' : ''}`}
                            onChange={handleUserChange}>
                            <option value="">Select District</option>
                            <option value="Calicut">Calicut</option>
                            <option value="Kannur">Kannur</option>
                          </select>

                          <label htmlFor="District">District</label>
                          {userErrors.District && <div className="invalid-feedback">{userErrors.District}</div>}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-floating">
                          <input
                            type="text"
                            className={`form-control ${userErrors.Username ? 'is-invalid' : ''}`}
                            id="userName"
                            name="Username"
                            placeholder="Username"
                            value={userForm.Username}
                            onChange={handleUserChange}
                          />
                          <label htmlFor="userName">Username</label>
                          {userErrors.Username && <div className="invalid-feedback">{userErrors.Username}</div>}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-floating">
                          <input
                            type="password"
                            className={`form-control ${userErrors.Password ? 'is-invalid' : ''}`}
                            name="Password"
                            id="userPassword"
                            placeholder="Your password"
                            value={userForm.Password}
                            onChange={handleUserChange}
                          />
                          <label htmlFor="userPassword">Password</label>
                          {userErrors.Password && <div className="invalid-feedback">{userErrors.Password}</div>}
                        </div>
                      </div>

                      <div className="col-12">
                        <button className="btn btn-primary w-100 py-3" type="submit">
                          Register
                        </button>
                      </div>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={handleStationSubmit} className='mt-2'>
                    <div className="row g-3">
                      <div className="col-md-12">
                        <div className="form-floating">
                          <input
                            type="text"
                            className={`form-control ${stationErrors.Name ? 'is-invalid' : ''}`}
                            id="stationName"
                            name="Name"
                            placeholder="Name"
                            value={stationForm.Name}
                            onChange={handleStationChange}
                          />
                          <label htmlFor="stationName">Company Name</label>
                          {stationErrors.Name && <div className="invalid-feedback">{stationErrors.Name}</div>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="text"
                            className={`form-control ${stationErrors.Email ? 'is-invalid' : ''}`}
                            id="stationEmail"
                            name="Email"
                            placeholder="Email"
                            value={stationForm.Email}
                            onChange={handleStationChange}
                          />
                          <label htmlFor="stationEmail">Email</label>
                          {stationErrors.Email && <div className="invalid-feedback">{stationErrors.Email}</div>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-floating">
                          <input
                            type="text"
                            className={`form-control ${stationErrors.PhoneNumber ? 'is-invalid' : ''}`}
                            id="stationMobile"
                            name="PhoneNumber"
                            maxLength={10} // Restrict input to 10 characters
                            pattern="\d{10}" // Ensure only 10 digits
                            placeholder="PhoneNumber"
                            value={stationForm.PhoneNumber}
                            onChange={handleStationChange}
                          />
                          <label htmlFor="stationMobile">Mobile</label>
                          {stationErrors.PhoneNumber && <div className="invalid-feedback">{stationErrors.PhoneNumber}</div>}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-floating">
                          <input
                            type="text"
                            className={`form-control ${stationErrors.Username ? 'is-invalid' : ''}`}
                            id="stationUsername"
                            name="Username"
                            placeholder="Username"
                            value={stationForm.Username}
                            onChange={handleStationChange}
                          />
                          <label htmlFor="stationUsername">Username</label>
                          {stationErrors.Username && <div className="invalid-feedback">{stationErrors.Username}</div>}
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-floating">
                          <input
                            type="password"
                            className={`form-control ${stationErrors.Password ? 'is-invalid' : ''}`}
                            name="Password"
                            id="stationPassword"
                            placeholder="Your Password"
                            value={stationForm.Password}
                            onChange={handleStationChange}
                          />
                          <label htmlFor="stationPassword">Password</label>
                          {stationErrors.Password && <div className="invalid-feedback">{stationErrors.Password}</div>}
                        </div>
                      </div>

                      <div className="col-12">
                        <button className="btn btn-primary w-100 py-3" type="submit">
                          Register
                        </button>
                      </div>
                    </div>
                  </form>
                )}
                {/* Link to toggle forms */}
                <div className="text-center mt-3">
                  <a href="/login">already have an account?</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
