import React, { useState } from 'react';
import './payment.css';
import axios from 'axios';
import Swal from 'sweetalert2'
export default function Payment() {
    const [amount, setAmount] = useState(localStorage.getItem('amount') || 0);
    const [formData, setFormData] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: '',
        name: ''
    });

    const [errors, setErrors] = useState({});

    const validateForm = () => {
        let newErrors = {};
        const cardRegex = /^[0-9]{16}$/;
        const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
        const cvvRegex = /^[0-9]{3,4}$/;
        const nameRegex = /^[A-Za-z\s]+$/;

        if (!cardRegex.test(formData.cardNumber.replace(/\s/g, ''))) {
            newErrors.cardNumber = "Enter a valid 16-digit card number";
        }
        if (!expiryRegex.test(formData.expiryDate)) {
            newErrors.expiryDate = "Enter a valid expiry date (MM/YY)";
        }
        if (!cvvRegex.test(formData.cvv)) {
            newErrors.cvv = "Enter a valid 3 or 4-digit CVV";
        }
        if (!nameRegex.test(formData.name.trim())) {
            newErrors.name = "Enter a valid name";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: "" });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
              axios.post('http://localhost:4000/wallet/wallet/credit', {
                userLoginId: localStorage.getItem('login_id'),
                amount:amount
            }).then(response => {
                console.log(response.data);
                Swal.fire({
                    title: "Payment Successful!",
                    text: "Amount will be credited to your wallet!",
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Close"
                  }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.href = "/profile";
                    }
                  });
              
               
            })
            .catch(error => {
                console.log(error);
            })
        }
    };

    return (
        <>
            <div className="payment-body-payment">
                <div className="container-payment-payment bg-light d-md-flex align-items-center">
                    <div className="card-payment-payment box1-payment shadow-sm p-md-5 p-md-5 p-4">
                        <div className="fw-bolder mb-4">
                            <span className="ps-1">&#8377;{amount}</span>
                        </div>
                        <div className="d-flex flex-column">
                            <div className="d-flex align-items-center justify-content-between text-payment mb-4">
                                <span>Total</span>
                                <span className="ps-1">&#8377;{amount}</span>
                            </div>
                            <div className="border-bottom mb-4" />
                            <div className="d-flex flex-column mb-5" style={{ width: '150%' }}>
                                <span className="far fa-calendar-alt text-payment">
                                    <span className="ps-2">Date:</span>
                                </span>
                                <span style={{ paddingTop: '10px' }} className="ps-3">
                                    {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                                </span>
                            </div>
                            <div className="d-flex align-items-center justify-content-between text-payment mt-5">
                                <div className="d-flex flex-column text-payment">
                                    <span>Customer Support:</span>
                                    <span>Online support 24/7</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card-payment-payment box2-payment shadow-sm">
                        <div className="d-flex align-items-center justify-content-between p-md-5 p-4">
                            <span className="h5 fw-bold m-0">Payment Methods</span>
                            <div className="btn btn-primary bar-payment">
                                <span className="fas fa-bars" />
                            </div>
                        </div>
                        <ul className="nav nav-tabs-payment mb-3 px-md-4 px-2">
                            <li className="nav-item">
                                <a className="nav-link px-2 active" aria-current="page" href="#">Credit Card / Debit Card</a>
                            </li>
                        </ul>

                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-12">
                                    <div className="d-flex flex-column px-md-5 px-4 mb-4">
                                        <span>Credit Card</span>
                                        <div className="inputWithIcon">
                                            <input
                                                className="form-control-payment"
                                                type="text"
                                                name="cardNumber"
                                                value={formData.cardNumber}
                                                onChange={handleInputChange}
                                                placeholder="Enter card number"
                                            />
                                        </div>
                                        {errors.cardNumber && <small className="text-danger">{errors.cardNumber}</small>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-column ps-md-5 px-md-0 px-4 mb-4">
                                        <span>Expiration Date</span>
                                        <div className="inputWithIcon">
                                            <input
                                                type="text"
                                                className="form-control-payment"
                                                name="expiryDate"
                                                value={formData.expiryDate}
                                                onChange={handleInputChange}
                                                placeholder="MM/YY"
                                            />
                                            <span className="fas fa-calendar-alt" />
                                        </div>
                                        {errors.expiryDate && <small className="text-danger">{errors.expiryDate}</small>}
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="d-flex flex-column pe-md-5 px-md-0 px-4 mb-4">
                                        <span>Code CVV</span>
                                        <div className="inputWithIcon">
                                            <input
                                                type="password"
                                                className="form-control-payment"
                                                name="cvv"
                                                value={formData.cvv}
                                                onChange={handleInputChange}
                                                placeholder="CVV"
                                            />
                                            <span className="fas fa-lock" />
                                        </div>
                                        {errors.cvv && <small className="text-danger">{errors.cvv}</small>}
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="d-flex flex-column px-md-5 px-4 mb-4">
                                        <span>Name</span>
                                        <div className="inputWithIcon">
                                            <input
                                                className="form-control-payment text-uppercase"
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                placeholder="Full name"
                                            />
                                            <span className="far fa-user" />
                                        </div>
                                        {errors.name && <small className="text-danger">{errors.name}</small>}
                                    </div>
                                </div>
                                <div className="col-12 px-md-5 px-4 mt-3">
                                    <button type="submit" className="btn btn-primary w-100">Pay &#8377;{amount}</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
