import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Nav() {
    const navigate = useNavigate()
    const [role, setRole] = useState(localStorage.getItem('role'))
    console.log(role);

    const logout = () => {
        localStorage.clear()
        navigate('/login')
    }
    return (
        <>
            {role == "admin" ?
                <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
                    <a href="/" className="navbar-brand p-0">
                        <h1 className="text-primary m-0">
                            <i className="fa fa-map-marker-alt me-3" />
                            PowerMap    
                        </h1>
                        {/* <img src="img/logo.png" alt="Logo"> */}
                    </a>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                    >
                        <span className="fa fa-bars" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <div className="navbar-nav ms-auto py-0">
                            <a href="/" className="nav-item nav-link ">
                                Home
                            </a>
                            {/* <a href="/all-owners" className="nav-item nav-link">
                                Stations
                            </a> */}
                            {/* <a href="" className="nav-item nav-link">
                                Users
                            </a> */}
                            {/* <a href="/feedbacks" className="nav-item nav-link">
                            Feedbacks
                            </a> */}

                           
                        </div>
                        <a onClick={logout} className="btn btn-danger rounded-pill py-2 px-4">
                            Logout
                        </a>&nbsp;

                    </div>
                </nav>

                : role == 'user' ?

                    <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
                        <a href="/" className="navbar-brand p-0">
                            <h1 className="text-primary m-0">
                                <i className="fa fa-map-marker-alt me-3" />
                                PowerMap
                            </h1>
                            {/* <img src="img/logo.png" alt="Logo"> */}
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarCollapse"
                        >
                            <span className="fa fa-bars" />
                        </button>
                        <div className="collapse navbar-collapse" id="navbarCollapse">
                            <div className="navbar-nav ms-auto py-0">
                                <a href="/" className="nav-item nav-link ">
                                    Home
                                </a>
                                <a href="/stations" className="nav-item nav-link">
                                    Stations
                                </a>
                                <div className="nav-item dropdown">
                                    <a
                                        href="#"
                                        className="nav-link dropdown-toggle"
                                        data-bs-toggle="dropdown"
                                    >
                                        Vehicles
                                    </a>
                                    <div className="dropdown-menu m-0">
                                        <a href="/add-vehicle" className="dropdown-item">
                                            Add Vehicle
                                        </a>
                                        <a href="/my-vehicle" className="dropdown-item">
                                            View Vehicles
                                        </a>
                                       
                                    </div>
                                </div>
                               
                                <a href="/my-booking" className="nav-item nav-link">
                                    My bookings
                                </a>
                                {/* <a href="package.html" className="nav-item nav-link">
                                    Packages
                                </a> */}
                               
                              
                                <a href="/profile" className="nav-item nav-link">
                                    Profile
                                </a>
                            </div>
                            <a onClick={logout} className="btn btn-danger rounded-pill py-2 px-4">
                                Logout
                            </a>&nbsp;
                        </div>
                    </nav>

                    : role == 'company' ?

                        <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
                            <a href="/" className="navbar-brand p-0">
                                <h1 className="text-primary m-0">
                                    <i className="fa fa-map-marker-alt me-3" />
                                    PowerMap
                                </h1>
                                {/* <img src="img/logo.png" alt="Logo"> */}
                            </a>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarCollapse"
                            >
                                <span className="fa fa-bars" />
                            </button>
                            <div className="collapse navbar-collapse" id="navbarCollapse">
                                <div className="navbar-nav ms-auto py-0">
                                    <a href="/" className="nav-item nav-link ">
                                        Home
                                    </a>
                                    <div className="nav-item dropdown">
                                        <a
                                            href="#"
                                            className="nav-link dropdown-toggle"
                                            data-bs-toggle="dropdown"
                                        >
                                            Stations
                                        </a>
                                        <div className="dropdown-menu m-0">
                                            <a href="/add-stations" className="dropdown-item">
                                                Add station
                                            </a>
                                            <a href="/view-stations" className="dropdown-item">
                                                View stations
                                            </a>
                                        </div>
                                    </div>

                                    <a href="/view-station-booking" className="nav-item nav-link">
                                        Bookings
                                    </a>                            
                                    {/* <a href="package.html" className="nav-item nav-link">
                                        Payments
                                    </a> */}

                                    <a href="/feedbacks" className="nav-item nav-link">
                                        Feedbacks
                                    </a>
                                    <a href="/profile" className="nav-item nav-link">
                                        Profile
                                    </a>
                                </div>
                                <a onClick={logout} className="btn btn-danger rounded-pill py-2 px-4">
                                    Logout
                                </a>&nbsp;
                            </div>
                        </nav>
                        :
                        <nav className="navbar navbar-expand-lg navbar-light px-4 px-lg-5 py-3 py-lg-0">
                            <a href="" className="navbar-brand p-0">
                                <h1 className="text-primary m-0">
                                    <i className="fa fa-map-marker-alt me-3" />
                                    Tourist
                                </h1>
                                {/* <img src="img/logo.png" alt="Logo"> */}
                            </a>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#navbarCollapse"
                            >
                                <span className="fa fa-bars" />
                            </button>
                            <div className="collapse navbar-collapse" id="navbarCollapse">
                                <div className="navbar-nav ms-auto py-0">
                                    <a href="/" className="nav-item nav-link ">
                                        Home
                                    </a>
                                    <a href="#about" className="nav-item nav-link">
                                        About
                                    </a>
                                    <a href="#services" className="nav-item nav-link">
                                        Services
                                    </a>

                                </div>
                                <a href="/login" className="btn btn-primary rounded-pill py-2 px-4">
                                    Sign In
                                </a>&nbsp;
                                <a href="/register" className="btn btn-primary rounded-pill py-2 px-4">
                                    Sign Up
                                </a>
                            </div>
                        </nav>


            }

        </>

    )
}
