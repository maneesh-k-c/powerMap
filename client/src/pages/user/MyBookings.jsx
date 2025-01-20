import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import Footer from '../../components/Footer'
export default function MyBookings() {
    const [userLoginId, setUserLoginId] = useState(localStorage.getItem('login_id'))
    const [bookings, setBookings] = useState([])
    console.log(userLoginId);
    console.log(bookings);
    useEffect(() => {
        axios.get(`http://localhost:4000/booking/view-booking/${userLoginId}`).then((res) => {
            console.log(res);
            setBookings(res.data.data)

        })
    }, [userLoginId])
    const convertTo12HourFormat = (time) => {
        if (!time) return "";
        const [hours, minutes] = time.split(":").map(Number);
        const period = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
        return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
    };

    const cancelBooking = (bookingId) => {
        axios.put(`http://localhost:4000/booking/cancel-booking/${bookingId}`).then((res) => {
            console.log(res);
            toast.success((t) => (
                <span>
                 {res.data.message} and<b>{res.data.deduction}₹ has been deducted from your wallet</b>
                  
                </span>
              ),   
              {
                autoClose: 20000, 
            }
            );
           
        }).catch((err) =>{
            console.log(err);
        })
    }
    return (
        <>
<Toaster/>
            {/* Topbar Start */}
            <div className="container-fluid bg-dark px-5 d-none d-lg-block">
                <div className="row gx-0">
                    <div className="col-lg-8 text-center text-lg-start mb-2 mb-lg-0">
                        <div
                            className="d-inline-flex align-items-center"
                            style={{ height: 45 }}
                        >
                            <small className="me-3 text-light">
                                <i className="fa fa-map-marker-alt me-2" />
                                123 Street, New York, USA
                            </small>
                            <small className="me-3 text-light">
                                <i className="fa fa-phone-alt me-2" />
                                +012 345 6789
                            </small>
                            <small className="text-light">
                                <i className="fa fa-envelope-open me-2" />
                                info@example.com
                            </small>
                        </div>
                    </div>
                    <div className="col-lg-4 text-center text-lg-end">
                        <div
                            className="d-inline-flex align-items-center"
                            style={{ height: 45 }}
                        >
                            <a
                                className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2"
                                href=""
                            >
                                <i className="fab fa-twitter fw-normal" />
                            </a>
                            <a
                                className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2"
                                href=""
                            >
                                <i className="fab fa-facebook-f fw-normal" />
                            </a>
                            <a
                                className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2"
                                href=""
                            >
                                <i className="fab fa-linkedin-in fw-normal" />
                            </a>
                            <a
                                className="btn btn-sm btn-outline-light btn-sm-square rounded-circle me-2"
                                href=""
                            >
                                <i className="fab fa-instagram fw-normal" />
                            </a>
                            <a
                                className="btn btn-sm btn-outline-light btn-sm-square rounded-circle"
                                href=""
                            >
                                <i className="fab fa-youtube fw-normal" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Topbar End */}
            {/* Navbar & Hero Start */}
            <div className="container-fluid position-relative p-0">
                <Nav />
                <div className="container-fluid bg-primary py-2 mb-5 hero-header" style={{
                    height: '300px'
                }}>
                    <div className="container" style={{
                        paddingTop: '-15px'
                    }}>
                        <div className="row justify-content-center py-5">
                            <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
                                <h1 className="display-3 text-white animated slideInDown">
                                    My bookings
                                </h1>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb justify-content-center">
                                        <li className="breadcrumb-item">
                                            <a href="/">Home</a>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <a >My bookings</a>
                                        </li>

                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Navbar & Hero End */}
            {/* Service Start */}
            <div className="container-xxl py-5">
                <div className="container">

                    <div className="row g-4">
                        {bookings.map((booking) => (

                            <div class="col-lg-5  col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                                <div class="service-item rounded pt-3" >
                                    <div class="p-4 station-div" onClick={() => navigate(`/single-station/${station._id}`)}>
                                        <i class="fa fa-3x fa-hotel text-primary mb-4"></i>
                                        <p class="station-status" >{booking.status}</p>
                                        <h5>{booking?.stationId?.StationName},&nbsp;{booking?.stationId?.City}</h5>
                                        <p>Address:&nbsp;{booking?.stationId?.Address}</p>
                                        <p>Booking Date:&nbsp;{booking?.date}</p>
                                        <p>Start Time: {booking?.startTime ? convertTo12HourFormat(booking.startTime) : ""}</p>
                                        <p>End Time: {booking?.endTime ? convertTo12HourFormat(booking.endTime) : ""}</p>


                                    </div>

                                    <div className="manage-station-btns mb-5">
                                        <button className='btn btn-danger' disabled={booking.status === 'cancelled'}
                                         style={{ width: '250px', marginBottom: '-45px' }} 
                                         onClick={() => cancelBooking(booking._id)}
                                         >Cancel Booking</button>
                                        {/* <button className="btn btn-info" style={{ width: '250px', marginBottom: '20px' }} onClick={() => openModal(station._id)}>Book Now</button> */}
                                    </div>

                                </div>
                            </div>
                        ))}



                    </div>
                </div>
            </div>




            {/* Service End */}
            {/* Testimonial Start */}

            {/* Testimonial End */}
            {/* Footer Start */}
          <Footer/>

            {/* Footer End */}
            {/* Back to Top */}
            <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
                <i className="bi bi-arrow-up" />
            </a>
            {/* JavaScript Libraries */}
            {/* Template Javascript */}
        </>
    )
}
