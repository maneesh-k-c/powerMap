import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../profile.css';
import Nav from '../../components/Nav';
import Footer from '../../components/Footer';
export default function ViewTransactions() {
    const [profile, setProfile] = useState([]);
    const login_id = localStorage.getItem('login_id');
    const role = localStorage.getItem('role');
    const [walletData, setWallet] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({ amount: '', upiUrl: '' });
    const [errors, setErrors] = useState({});
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
        if (!formData.upiUrl || !formData.upiUrl.startsWith('upi://pay')) {
            newErrors.upiUrl = 'Please enter a valid UPI URL.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            await axios.post('http://localhost:4000/wallet/wallet/credit', {
                userLoginId: login_id,
                amount: formData.amount,
                upiUrl: formData.upiUrl,
            });
           await axios.get(`http://localhost:4000/wallet/wallet/${login_id}`)
            .then((res) => {
                setWallet(res.data.wallet);
            });
            alert('Payment request sent successfully!');
            window.location.href = formData.upiUrl; // Redirect to UPI URL for payment
            setShowModal(false);
            setFormData({ amount: '', upiUrl: '' });
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
                                 <h1 className="display-3 text-white animated slideInDown">Transactions</h1>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
             {/* Navbar & Hero End */}
             {/* Profile Section */}
             <div className="container d-flex align-items-center justify-content-center">
              
                 {role == 'user' ?
                     <div className="wallet">
                         <div className="wallet-card-info">
                             <h2>Wallet</h2>
                             <p><strong>Balance:</strong> ₹{walletData != undefined ? walletData.amount : 0}</p>
 
                         </div>
                         {walletData != undefined ?
                             <div className="wallet-transactions">
                                 <h3>Transaction History</h3>
                                 <ul>    
                                     {walletData?.transactions?.map((transaction, index) => (
                                         <li key={index}>
                                             {new Date(transaction.date).toLocaleDateString('en-GB', {
                                                 day: '2-digit',
                                                 month: '2-digit',
                                                 year: 'numeric'
                                             })}  - ₹{transaction.amount} ({transaction.type})
                                         </li>
                                     ))}
                                 </ul>
                             </div> : ""}
 
 
 
                             {/* <button className="wallet-button" onClick={() => setShowModal(true)}>Add Money</button> */}
                     </div> : ""}
             </div>
                                     
             {/* Footer */}
             <Footer/>
         </>
  )
}
