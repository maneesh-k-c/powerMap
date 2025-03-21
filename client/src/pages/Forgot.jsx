import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function Forgot() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({ email: '',password:'',cpassword:'' });
    const [submit, setSubmit] = useState(false);
    const [change, setChange] = useState(false);
    const [otp, setOtp] = useState('');
    console.log(formData);

    // State to track form errors
    const [formErrors, setFormErrors] = useState({});

    // Validation function
    const validateForm = () => {
        const errors = {};
        if (!formData.email) errors.email = 'email is required';
        if (!formData.email) errors.email = 'Email is required';
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email))
            errors.email = 'Invalid email address';
        return errors;
    };
    const validateFormC = () => {
        const errors = {};
        if (!formData.password) errors.password = 'password is required';
        if (!formData.cpassword) errors.cpassword = 'confirm password is required';
        if (formData.cpassword!=formData.password) errors.cpassword = 'passwords do not match';
      
        return errors;
    };
    const handleSubmitChange = (e) => {
        e.preventDefault();
        const errors = validateFormC();
        console.log(errors);

        if (Object.keys(errors).length === 0) {
            axios.post('http://localhost:4000/auth/changePassword', formData).then((response) => {
                toast.success(`Password Changed`)
                setTimeout(() => {
                    navigate('/login')
                }, 2000);


            }).catch((error) => {
                console.log(error.response)
                //   toast.error(error.response.data.message)
            })

        } else {
            setFormErrors(errors);
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        const errors = validateForm();
        
        if (Object.keys(errors).length === 0) {
            axios.post('http://localhost:4000/auth/send-otp', formData).then((response) => {
                console.log(response);
                localStorage.setItem('otp', response.data.otp)


                toast.success(`OTP sent to ${formData.email}`)
                setTimeout(() => {
                    setSubmit(true)
                }, 2000);


            }).catch((error) => {
                console.log(error.response)
                //   toast.error(error.response.data.message)
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
    const handleChangePassword = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmitOtp = (e)=>{
        e.preventDefault();
        if(otp === localStorage.getItem('otp')){
            toast.success('OTP verified successfully')
            setTimeout(() => {
                setChange(true)
            }, 2000);           
    }else{
        toast.error('OTP not verified')
    }
}
    return (
        <>
            <Toaster />
            <div className="container-fluid position-relative p-0">
                <div
                    className="container-fluid bg-primary py-5 hero-header"
                    style={{ backgroundImage: `linear-gradient(rgba(20, 20, 31, 0.7), rgba(20, 20, 31, 0.7)), url('/img/login-bg.jpeg')` }}
                >
                    {submit && change ?
                        <><div className="container" style={{ height: '100Vh' }}>
                            <div className="row justify-content-center py-5">
                                <div className="col-lg-10 pt-lg-5 text-center">
                                    <h1 className="display-3 mt-0 text-white animated slideInDown">
                                        New Password
                                    </h1>
                                </div>
                                <div className="col-lg-4 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
                                    <form onSubmit={handleSubmitChange}>
                                        <div className="row g-3">
                                            <div className="col-md-12">
                                                <div className="form-floating">
                                                    <input
                                                        type="text"
                                                        className={`form-control ${formErrors.password ? 'is-invalid' : ''}`}
                                                        id="password"
                                                        name="password"
                                                        required
                                                        placeholder="New Password"
                                                        value={formData.password}
                                                        onChange={handleChangePassword}
                                                    />
                                                    <label htmlFor="name">New Password</label>
                                                    {formErrors.password && <div className="invalid-feedback">{formErrors.password}</div>}
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="form-floating">
                                                    <input
                                                        type="text"
                                                        className={`form-control ${formErrors.cpassword ? 'is-invalid' : ''}`}
                                                        id="email"
                                                        name="cpassword"
                                                        required
                                                        placeholder="Confirm Password"
                                                        value={formData.cpassword}
                                                        onChange={handleChangePassword}
                                                    />
                                                    <label htmlFor="name">Confirm Password</label>
                                                    {formErrors.cpassword && <div className="invalid-feedback">{formErrors.cpassword}</div>}
                                                </div>
                                            </div>


                                            <div className="col-12">
                                                <button className="btn btn-primary w-100 py-3" type="submit">
                                                    Change Password
                                                </button>
                                            </div>
                                           
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div></> : submit ?
                            <>
                                <div className="container" style={{ height: '100Vh' }}>
                                    <div className="row justify-content-center py-5">
                                        <div className="col-lg-10 pt-lg-5 text-center">
                                            <h1 className="display-3 mt-0 text-white animated slideInDown">
                                                OTP Conformation
                                            </h1>
                                        </div>
                                        <div className="col-lg-4 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
                                            <form onSubmit={handleSubmitOtp}>
                                                <div className="row g-3">
                                                    <div className="col-md-12">
                                                        <div className="form-floating">
                                                            <input
                                                                type="text"
                                                                className={`form-control`}
                                                                id="otp"
                                                                name="otp"
                                                                required
                                                                value={otp}
                                                                placeholder="Enter OTP"
                                                                onChange={(e)=>{setOtp(e.target.value)}}
                                                            />
                                                            <label htmlFor="name">Otp</label>
                                                          
                                                        </div>
                                                    </div>


                                                    <div className="col-12">
                                                        <button className="btn btn-primary w-100 py-3" type="submit">
                                                            Submit
                                                        </button>
                                                    </div>
                                                  
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </> :
                            <><div className="container" style={{ height: '100Vh' }}>
                                <div className="row justify-content-center py-5">
                                    <div className="col-lg-10 pt-lg-5 text-center">
                                        <h1 className="display-3 mt-0 text-white animated slideInDown">
                                            Forgot Password
                                        </h1>
                                    </div>
                                    <div className="col-lg-4 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
                                        <form onSubmit={handleSubmit}>
                                            <div className="row g-3">
                                                <div className="col-md-12">
                                                    <div className="form-floating">
                                                        <input
                                                            type="email"
                                                            className={`form-control ${formErrors.email ? 'is-invalid' : ''}`}
                                                            id="email"
                                                            name="email"
                                                            required
                                                            placeholder="Email ID"
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                        />
                                                        <label htmlFor="name">Email</label>
                                                        {formErrors.email && <div className="invalid-feedback">{formErrors.email}</div>}
                                                    </div>
                                                </div>


                                                <div className="col-12">
                                                    <button className="btn btn-primary w-100 py-3" type="submit">
                                                        Send Reset OTP
                                                    </button>
                                                </div>
                                                <div className="text-center mt-3">
                                                    <a href="/login" className="text-white">
                                                        Back to login?
                                                    </a>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div></>
                    }
                </div>
            </div>
        </>
    )
}
