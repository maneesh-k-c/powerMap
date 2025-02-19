import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function UpdateProfile() {
    const navigate = useNavigate();
    const [userForm, setUserForm] = useState({
        Name: '',
        Email: '',
        PhoneNumber: '',
        State: '',
        District: '',
        Username: '',
        Password: ''
    });
    const [profile, setProfile] = useState([]);
    console.log(userForm);

    const login_id = localStorage.getItem('login_id');
    const role = localStorage.getItem('role');

    useEffect(() => {
        axios.get(`http://localhost:4000/auth/getProfile/${login_id}/${role}`)
            .then((res) => {
                const data = {
                    id: res.data.data._id,
                    Name: res.data.data.name,
                    Email: res.data.data.email,
                    PhoneNumber: res.data.data.phoneNumber,
                    State: res.data.data.state,
                    District: res.data.data.district,
                    Username: res.data.data.login_id?.username,
                    Password: res.data.data.login_id?.password
                }
                setUserForm(data);
            });


    }, [login_id]);

    const handleUserChange = (e) => {
        const { name, value } = e.target;
        setUserForm({ ...userForm, [name]: value });
    };

    const [userErrors, setUserErrors] = useState({});
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
    const handleUserSubmit = (e) => {
        e.preventDefault();
        const errors = validateUserForm();
        if (Object.keys(errors).length === 0) {
            
            axios.put(`http://localhost:4000/auth/update_profile/${userForm.id}`, userForm)
            .then((response) => {
                console.log(response);
                toast.success(response.data.Message);
                setTimeout(() => {
                    navigate("/profile");
                }, 2000);
            }).catch((error) => {
                toast.error(error.response?.data?.Message || "Something went wrong");
            });
        
            }
         else {
            setUserErrors(errors);
        }
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
                                    Update Profile
                                </h1>

                            </div>
                            <div className="col-lg-4 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
                                {/* Conditional rendering of forms based on the state */}

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
                                                Update
                                            </button>
                                        </div>
                                    </div>
                                </form>

                                {/* Link to toggle forms */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
