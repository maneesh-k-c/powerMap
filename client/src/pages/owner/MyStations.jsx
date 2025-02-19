import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
export default function MyStations() {
    const navigate = useNavigate()
    const [stations, setStations] = useState([])
    console.log(stations);

    useEffect(() => {
        const login_id = localStorage.getItem('login_id')
        axios.get(`http://localhost:4000/station/my-stations/${login_id}`)
            .then(res => {
                setStations(res.data.data)
            })
    }, [])
    const handleEditStation = (id) => {
        navigate(`/update-station/${id}`)
    }
    const handleDeleteStation = (id) => {
        axios.get(`http://localhost:4000/auth/deletestation/${id}`)
            .then(res => {
               
                const deletestation =  stations.filter((station) => {
                    return station._id != id
                })
                setStations(deletestation)
                toast.success(res.data.message)
            })
                
    
    }
    return (
        <>
    <Toaster/>
            {/* Topbar Start */}
            {/* <div className="container-fluid bg-dark px-5 d-none d-lg-block">
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
            </div> */}
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
                                    My Stations
                                </h1>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb justify-content-center">
                                        <li className="breadcrumb-item">
                                            <a href="/">Home</a>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <a >My Stations</a>
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
                        {stations.map((station) => (
                            <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                                <div class="service-item rounded pt-3">
                                    <div class="p-4 station-div" >
                                        <i class="fa fa-3x fa-hotel text-primary mb-4"></i>
                                        <p class="station-status" style={{ color: station.StationStatus === 'Active' ? '#2dd62d' : 'red' }}>{station.StationStatus}</p>
                                        <h5>{station.StationName},&nbsp;{station.City}</h5>
                                        <p>Connectors:&nbsp;{station.TypeofConnectors}</p>
                                        <p>Power:&nbsp;{station.ChargingPower}</p>
                                        <p>Working hours:&nbsp;{station.OperatingHours}</p>
                                        <p>No of Ports:&nbsp;{station.ChargingPortsNo}</p>
                                        <div className='manage-station-btns'>
                                            <button className='btn btn-info' onClick={() => handleEditStation(station._id)}>Edit</button>
                                            <button className='btn btn-danger' onClick={() => handleDeleteStation(station._id)}>Delete</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                        }


                    </div>
                </div>
            </div>

            {/* Service End */}
            {/* Testimonial Start */}

            {/* Testimonial End */}
            {/* Footer Start */}
            <div
                className="container-fluid bg-dark text-light footer pt-5 mt-5 wow fadeIn"
                data-wow-delay="0.1s"
            >
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-lg-3 col-md-6">
                            <h4 className="text-white mb-3">Company</h4>
                            <a className="btn btn-link" href="">
                                About Us
                            </a>
                            <a className="btn btn-link" href="">
                                Contact Us
                            </a>
                            <a className="btn btn-link" href="">
                                Privacy Policy
                            </a>
                            <a className="btn btn-link" href="">
                                Terms &amp; Condition
                            </a>
                            <a className="btn btn-link" href="">
                                FAQs &amp; Help
                            </a>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h4 className="text-white mb-3">Contact</h4>
                            <p className="mb-2">
                                <i className="fa fa-map-marker-alt me-3" />
                                123 Street, New York, USA
                            </p>
                            <p className="mb-2">
                                <i className="fa fa-phone-alt me-3" />
                                +012 345 67890
                            </p>
                            <p className="mb-2">
                                <i className="fa fa-envelope me-3" />
                                info@example.com
                            </p>
                            <div className="d-flex pt-2">
                                <a className="btn btn-outline-light btn-social" href="">
                                    <i className="fab fa-twitter" />
                                </a>
                                <a className="btn btn-outline-light btn-social" href="">
                                    <i className="fab fa-facebook-f" />
                                </a>
                                <a className="btn btn-outline-light btn-social" href="">
                                    <i className="fab fa-youtube" />
                                </a>
                                <a className="btn btn-outline-light btn-social" href="">
                                    <i className="fab fa-linkedin-in" />
                                </a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h4 className="text-white mb-3">Gallery</h4>
                            <div className="row g-2 pt-2">
                                <div className="col-4">
                                    <img
                                        className="img-fluid bg-light p-1"
                                        src="img/package-1.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="col-4">
                                    <img
                                        className="img-fluid bg-light p-1"
                                        src="img/package-2.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="col-4">
                                    <img
                                        className="img-fluid bg-light p-1"
                                        src="img/package-3.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="col-4">
                                    <img
                                        className="img-fluid bg-light p-1"
                                        src="img/package-2.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="col-4">
                                    <img
                                        className="img-fluid bg-light p-1"
                                        src="img/package-3.jpg"
                                        alt=""
                                    />
                                </div>
                                <div className="col-4">
                                    <img
                                        className="img-fluid bg-light p-1"
                                        src="img/package-1.jpg"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h4 className="text-white mb-3">Newsletter</h4>
                            <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
                            <div className="position-relative mx-auto" style={{ maxWidth: 400 }}>
                                <input
                                    className="form-control border-primary w-100 py-3 ps-4 pe-5"
                                    type="text"
                                    placeholder="Your email"
                                />
                                <button
                                    type="button"
                                    className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2"
                                >
                                    SignUp
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="copyright">
                        <div className="row">
                            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                                ©{" "}
                                <a className="border-bottom" href="#">
                                    Your Site Name
                                </a>
                                , All Right Reserved.
                                {/*/*** This template is free as long as you keep the footer author’s credit link/attribution link/backlink. If you'd like to use the template without the footer author’s credit link/attribution link/backlink, you can purchase the Credit Removal License from "https://htmlcodex.com/credit-removal". Thank you for your support. *** /*/}
                                Designed By{" "}
                                <a className="border-bottom" href="https://htmlcodex.com">
                                    HTML Codex
                                </a>
                            </div>
                            <div className="col-md-6 text-center text-md-end">
                                <div className="footer-menu">
                                    <a href="">Home</a>
                                    <a href="">Cookies</a>
                                    <a href="">Help</a>
                                    <a href="">FQAs</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
