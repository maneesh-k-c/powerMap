import React, { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import axios from 'axios';
import './profile.css';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
    const [profile, setProfile] = useState([]);
    const login_id = localStorage.getItem('login_id');
    const role = localStorage.getItem('role');
    const [walletData, setWallet] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ amount: '', upiUrl: '' });
    const [errors, setErrors] = useState({});
    const navigate =useNavigate()
    console.log(walletData);

    useEffect(() => {
        axios.get(`http://localhost:4000/auth/getProfile/${login_id}/${role}`)
            .then((res) => {
                setProfile(res.data.data);
            });

        axios.get(`http://localhost:4000/wallet/wallet/${login_id}`)
            .then((res) => {
                setWallet(res.data.wallet);
            });
    }, [login_id]);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.amount || isNaN(formData.amount) || formData.amount <= 0) {
            newErrors.amount = 'Please enter a valid amount.';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            localStorage.setItem('amount', formData.amount);
            navigate('/payment');
            // await axios.post('http://localhost:4000/wallet/wallet/credit', {
            //     userLoginId: login_id,
            //     amount: formData.amount
            // });
        //    await axios.get(`http://localhost:4000/wallet/wallet/${login_id}`)
        //     .then((res) => {
        //         setWallet(res.data.wallet);
        //     });
        //     alert('Payment request sent successfully!');
        //     window.location.href = formData.upiUrl; // Redirect to UPI URL for payment
        //     setShowModal(false);
        //     setFormData({ amount: '', upiUrl: '' });
        } catch (error) {
            console.error('Error processing payment:', error);
            alert('Failed to process payment. Please try again.');
        }
    };

    return (
        <>
            {/* Topbar Start */}
            <div className="container-fluid bg-dark px-5 d-none d-lg-block">
                {/* Content */}
            </div>
            {/* Topbar End */}
            {/* Navbar & Hero Start */}
            <div className="container-fluid position-relative p-0">
                <Nav />
                <div className="container-fluid bg-primary py-2 mb-5 hero-header" style={{ height: '200px' }}>
                    <div className="container" style={{ paddingTop: '-25px' }}>
                        <div className="row justify-content-center py-2">
                            <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
                                <h1 className="display-3 text-white animated slideInDown">Profile</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Navbar & Hero End */}
            {/* Profile Section */}
            <div className="container d-flex align-items-center justify-content-center">
                <div className="profile-card">
                    <div className="profile-image">
                        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" width={82} height={83} alt="" />
                    </div>
                    <div className="profile-card-info">
                        {role === 'user' ? (
                            <>
                                <span>{profile.name}</span>
                                <p>State: {profile.state}</p>
                                <p>District: {profile.district}</p>
                                <p>Email: {profile.email}</p>
                                <p>Contact: {profile.phoneNumber}</p>
                            </>
                        ) : role === 'company' ? (
                            <>
                                <span>{profile.companyName}</span>
                                <p>Email: {profile.email}</p>
                                <p>Contact: {profile.phoneNumber}</p>
                            </>
                        ) : null}
                    </div>
                    <a href="#" className="profile-button">Update</a>
                </div>
                {role == 'user' ?
                    <div className="wallet">
                        <div className="wallet-card-info">
                            <h2>Wallet</h2>
                            <p><strong>Balance:</strong> ₹{walletData != undefined ? walletData.amount : 0}</p>

                        </div>
                        {walletData != undefined ?
                            <div className="wallet-transactions">
                                <a href='/view-transaction'> View Transaction History</a>
                               
                            </div> : ""}



                            <button className="wallet-button" onClick={() => setShowModal(true)}>Add Money</button>
                    </div> : ""}
            </div>
            {/* Modal for Adding Money */}
            {showModal && (
                <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Add Money</h5>
                                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                            </div>
                            <form onSubmit={handleFormSubmit}>
                                <div className="modal-body">
                                    <div className="mb-3">
                                        <label className="form-label">Amount</label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.amount ? 'is-invalid' : ''}`}
                                            value={formData.amount}
                                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                        />
                                        {errors.amount && <div className="invalid-feedback">{errors.amount}</div>}
                                    </div>
                                   
                                </div>
                                <div className="modal-footer">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
            {/* Footer */}
          <Footer/>
        </>
    );
}



