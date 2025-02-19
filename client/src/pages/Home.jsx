import React, { useState, useEffect } from 'react'
import Nav from '../components/Nav'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Stations from '../components/Stations'
import axios from 'axios'

export default function Home() {
    const [role, setRole] = useState(localStorage.getItem('role'))
    console.log(role);
    const [stations, setStations] = useState([])
    console.log(stations);


    useEffect(() => {
        axios.get(`http://localhost:4000/station/all-stations`)
            .then(res => {
                setStations(res.data.data)
            })
    }, [])

    return (
        <>

            {/* Navbar & Hero Start */}
            {/* <Header /> */}
            {role === 'admin' ?
                <>
                    <div className="container-fluid position-relative p-0">
                        <Nav />
                        <div className="container-fluid bg-primary py-5 mb-5 hero-header">

                        </div>
                    </div>
                    <div className="container-xxl py-5 mb-5 mt-5" id='services'>
                        <div className="container mt-5 mb-5">

                            <div className="row gy-5 gx-4 justify-content-center">
                                <div
                                    className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp"
                                    data-wow-delay="0.1s"
                                    onClick={() => window.location.href = '/all-owners'}
                                >
                                    <div className="position-relative border border-primary pt-5 pb-4 px-4">
                                        <div
                                            className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                                            style={{ width: 100, height: 100 }}
                                        >
                                            <i className="fa fa-building fa-3x text-white" />
                                        </div>
                                        <h5 className="mt-4">Station Owners</h5>
                                        <hr className="w-25 mx-auto bg-primary mb-1" />
                                        <p className="mb-0 mt-4">
                                            Here you can find all the stations in the city
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp"
                                    data-wow-delay="0.3s"
                                    onClick={() => window.location.href = "/all-users"}
                                >
                                    <div className="position-relative border border-primary pt-5 pb-4 px-4">
                                        <div
                                            className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                                            style={{ width: 100, height: 100 }}
                                        >
                                            <i className="fa fa-users fa-3x text-white" />
                                        </div>
                                        <h5 className="mt-4">All users</h5>
                                        <hr className="w-25 mx-auto bg-primary mb-1" />
                                        <p className="mb-0 mt-4">
                                            Here you can see all registered users.
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp"
                                    data-wow-delay="0.5s"
                                    onClick={() => window.location.href = '/feedbacks'}
                                >
                                    <div className="position-relative border border-primary pt-5 pb-4 px-4">
                                        <div
                                            className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                                            style={{ width: 100, height: 100 }}
                                        >
                                            <i className="fa fa-pen fa-3x text-white" />
                                        </div>
                                        <h5 className="mt-4">Feedbacks</h5>
                                        <hr className="w-25 mx-auto bg-primary mb-1" />
                                        <p className="mb-0 mt-4">
                                            All feedbacks added by users
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> </> : role=='company'?
                    <>
                    <div className="container-fluid position-relative p-0">
                        <Nav />
                        <div className="container-fluid bg-primary py-5 mb-5  hero-header">
                            <div className="container py-5 mb-5">
                                <div className="row justify-content-center py-5 mb-5">
                                    <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center " >
                                        <h1 className="display-3 text-white mb-3 animated slideInDown">
                                            Earn With Every<br /> Charge
                                        </h1>
                                        <p className="fs-4 text-white mb-4 animated slideInDown">
                                            Find - Book - Charge
                                        </p>
                                        {/* <div className="position-relative w-75 mx-auto animated slideInDown">
                                    <input
                                        className="form-control border-0 rounded-pill w-100 py-3 ps-4 pe-5"
                                        type="text"
                                        placeholder="Eg: Thailand"
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-primary rounded-pill py-2 px-4 position-absolute top-0 end-0 me-2"
                                        style={{ marginTop: 7 }}
                                    >
                                        Search
                                    </button>
                                </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="container-xxl py-5" id='about'>
                        <div className="container">
                            <div className="row g-5">
                                <div
                                    className="col-lg-6 wow fadeInUp"
                                    data-wow-delay="0.1s"
                                    style={{ minHeight: 400 }}
                                >
                                    <div className="position-relative h-100">
                                        <img
                                            className="img-fluid position-absolute w-100 h-100"
                                            src="img/about.jpg"
                                            alt=""
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
                                    <h6 className="section-title bg-white text-start text-primary pe-3">
                                        About Us
                                    </h6>
                                    <h1 className="mb-4">
                                        Welcome to <span className="text-primary">PowerMap</span>
                                    </h1>
                                    <p className="mb-4">
                                        PowerMap is your go-to platform for seamless EV charging slot booking. We connect EV owners with verified charging stations, making it easy to find, book, and manage slots in real-time.
                                    </p>
                                    <p className="mb-4">
                                        With a user-friendly interface, secure transactions, and live availability updates, we ensure a hassle-free charging experience. Our mission is to drive the shift toward sustainable mobility by making EV charging smarter and more efficient.
                                    </p>
                                    <div className=" gy-2 gx-4 mb-4">
                                        <div className="col-sm-6">
                                            <p className="mb-0">
                                                <i className="fa fa-arrow-right text-primary me-2" />
                                                Fast Charging
                                            </p>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="mb-0">
                                                <i className="fa fa-arrow-right text-primary me-2" />
                                                Easy to use
                                            </p>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="mb-0">
                                                <i className="fa fa-arrow-right text-primary me-2" />5 Star
                                                Accessible to everyone
                                            </p>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="mb-0">
                                                <i className="fa fa-arrow-right text-primary me-2" />
                                                Latest  Model Chargers
                                            </p>
                                        </div>

                                        <div className="col-sm-6">
                                            <p className="mb-0">
                                                <i className="fa fa-arrow-right text-primary me-2" />
                                                24/7 Service
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <Stations /> */}


                    {/* Process Start */}
                    <div className="container-xxl py-5" id='services'>
                        <div className="container">
                            <div className="text-center pb-4 wow fadeInUp" data-wow-delay="0.1s">
                                <h6 className="section-title bg-white text-center text-primary px-3">
                                    Process
                                </h6>
                                <h1 className="mb-5">3 Easy Steps</h1>
                            </div>
                            <div className="row gy-5 gx-4 justify-content-center">
                                <div
                                    className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp"
                                    data-wow-delay="0.1s"
                                >
                                    <div className="position-relative border border-primary pt-5 pb-4 px-4">
                                        <div
                                            className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                                            style={{ width: 100, height: 100 }}
                                        >
                                            <i className="fa fa-search fa-3x text-white" />
                                        </div>
                                        <h5 className="mt-4">Find</h5>
                                        <hr className="w-25 mx-auto bg-primary mb-1" />
                                        <hr className="w-50 mx-auto bg-primary mt-0" />
                                        <p className="mb-0">
                                            Find the nearest charging station with ease using our intuitive map, ensuring you're never far from a reliable power source.
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp"
                                    data-wow-delay="0.3s"
                                >
                                    <div className="position-relative border border-primary pt-5 pb-4 px-4">
                                        <div
                                            className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                                            style={{ width: 100, height: 100 }}
                                        >
                                            <i className="fa fa-address-book fa-3x text-white" />
                                        </div>
                                        <h5 className="mt-4">Book Online </h5>
                                        <hr className="w-25 mx-auto bg-primary mb-1" />
                                        <hr className="w-50 mx-auto bg-primary mt-0" />
                                        <p className="mb-0">
                                            Book your charging spot in advance to avoid unnecessary wait times and ensure a smooth experience when you arrive.
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp"
                                    data-wow-delay="0.5s"
                                >
                                    <div className="position-relative border border-primary pt-5 pb-4 px-4">
                                        <div
                                            className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                                            style={{ width: 100, height: 100 }}
                                        >
                                            <i className="fa fa-plug fa-3x text-white" />
                                        </div>
                                        <h5 className="mt-4">Charge</h5>
                                        <hr className="w-25 mx-auto bg-primary mb-1" />
                                        <hr className="w-50 mx-auto bg-primary mt-0" />
                                        <p className="mb-0">
                                            Charge your vehicle or device efficiently, knowing that Powermap connects you to a trusted and expanding network of charging stations.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Process Start */}

                   

                </>
                :
                <>
                    <div className="container-fluid position-relative p-0">
                        <Nav />
                        <div className="container-fluid bg-primary py-5 mb-5  hero-header">
                            <div className="container py-5 mb-5">
                                <div className="row justify-content-center py-5 mb-5">
                                    <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center " >
                                        <h1 className="display-3 text-white mb-3 animated slideInDown">
                                            Seamless Charging,<br /> Wherever You Go.
                                        </h1>
                                        <p className="fs-4 text-white mb-4 animated slideInDown">
                                            Find - Book - Charge
                                        </p>
                                        {/* <div className="position-relative w-75 mx-auto animated slideInDown">
                                    <input
                                        className="form-control border-0 rounded-pill w-100 py-3 ps-4 pe-5"
                                        type="text"
                                        placeholder="Eg: Thailand"
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-primary rounded-pill py-2 px-4 position-absolute top-0 end-0 me-2"
                                        style={{ marginTop: 7 }}
                                    >
                                        Search
                                    </button>
                                </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="container-xxl py-5" >
                        <div className="container">
                            <div className="row g-5">
                                <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
                                    <h6 className="section-title bg-white text-start text-primary pe-3">
                                        Station Location
                                    </h6>
                                    <h1 className="mb-4">
                                        Welcome to <span className="text-primary">Power map</span>
                                    </h1>
                                    <p className="mb-4">
                                        These are the top rgistered charging stations
                                    </p>

                                    <div className="row gy-2 gx-4 mb-4">
                                        {stations.map((station) => (

                                            <div className="col-sm-6">
                                                <a href={`/single-station/${station?._id}`}>
                                                    <p className="mb-0">
                                                        <i className="fa fa-arrow-right text-primary me-2" />
                                                        {station?.StationName}
                                                    </p>
                                                </a>
                                            </div>

                                        ))}
                                    </div>
                                    <a className="btn btn-primary py-3 px-5 mt-2" href="/stations">
                                        View all
                                    </a>
                                </div>
                                <div
                                    className="col-lg-6 wow fadeInUp"
                                    data-wow-delay="0.1s"
                                    style={{ minHeight: 400 }}
                                >
                                    <div className="position-relative h-100">
                                        <iframe
                                            className="position-relative rounded w-100 h-100"
                                            src='https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3913.173785923978!2d75.7813330740618!3d11.248622988930308!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDE0JzU1LjAiTiA3NcKwNDcnMDIuMSJF!5e0!3m2!1sen!2sbd!4v1734691048005!5m2!1sen!2sbd'
                                            frameBorder={0}

                                            style={{ minHeight: 300, border: 0 }}
                                            allowFullScreen=""
                                            aria-hidden="false"
                                            tabIndex={0}
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>

                    <Stations />


                    {/* Process Start */}
                    <div className="container-xxl py-5" id='services'>
                        <div className="container">
                            <div className="text-center pb-4 wow fadeInUp" data-wow-delay="0.1s">
                                <h6 className="section-title bg-white text-center text-primary px-3">
                                    Process
                                </h6>
                                <h1 className="mb-5">3 Easy Steps</h1>
                            </div>
                            <div className="row gy-5 gx-4 justify-content-center">
                                <div
                                    className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp"
                                    data-wow-delay="0.1s"
                                >
                                    <div className="position-relative border border-primary pt-5 pb-4 px-4">
                                        <div
                                            className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                                            style={{ width: 100, height: 100 }}
                                        >
                                            <i className="fa fa-search fa-3x text-white" />
                                        </div>
                                        <h5 className="mt-4">Find</h5>
                                        <hr className="w-25 mx-auto bg-primary mb-1" />
                                        <hr className="w-50 mx-auto bg-primary mt-0" />
                                        <p className="mb-0">
                                            Find the nearest charging station with ease using our intuitive map, ensuring you're never far from a reliable power source.
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp"
                                    data-wow-delay="0.3s"
                                >
                                    <div className="position-relative border border-primary pt-5 pb-4 px-4">
                                        <div
                                            className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                                            style={{ width: 100, height: 100 }}
                                        >
                                            <i className="fa fa-address-book fa-3x text-white" />
                                        </div>
                                        <h5 className="mt-4">Book Online </h5>
                                        <hr className="w-25 mx-auto bg-primary mb-1" />
                                        <hr className="w-50 mx-auto bg-primary mt-0" />
                                        <p className="mb-0">
                                            Book your charging spot in advance to avoid unnecessary wait times and ensure a smooth experience when you arrive.
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="col-lg-4 col-sm-6 text-center pt-4 wow fadeInUp"
                                    data-wow-delay="0.5s"
                                >
                                    <div className="position-relative border border-primary pt-5 pb-4 px-4">
                                        <div
                                            className="d-inline-flex align-items-center justify-content-center bg-primary rounded-circle position-absolute top-0 start-50 translate-middle shadow"
                                            style={{ width: 100, height: 100 }}
                                        >
                                            <i className="fa fa-plug fa-3x text-white" />
                                        </div>
                                        <h5 className="mt-4">Charge</h5>
                                        <hr className="w-25 mx-auto bg-primary mb-1" />
                                        <hr className="w-50 mx-auto bg-primary mt-0" />
                                        <p className="mb-0">
                                            Charge your vehicle or device efficiently, knowing that Powermap connects you to a trusted and expanding network of charging stations.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Process Start */}

                    <div className="container-xxl py-5" id='about'>
                        <div className="container">
                            <div className="row g-5">
                                <div
                                    className="col-lg-6 wow fadeInUp"
                                    data-wow-delay="0.1s"
                                    style={{ minHeight: 400 }}
                                >
                                    <div className="position-relative h-100">
                                        <img
                                            className="img-fluid position-absolute w-100 h-100"
                                            src="img/about.jpg"
                                            alt=""
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.3s">
                                    <h6 className="section-title bg-white text-start text-primary pe-3">
                                        About Us
                                    </h6>
                                    <h1 className="mb-4">
                                        Welcome to <span className="text-primary">PowerMap</span>
                                    </h1>
                                    <p className="mb-4">
                                        PowerMap is your go-to platform for seamless EV charging slot booking. We connect EV owners with verified charging stations, making it easy to find, book, and manage slots in real-time.
                                    </p>
                                    <p className="mb-4">
                                        With a user-friendly interface, secure transactions, and live availability updates, we ensure a hassle-free charging experience. Our mission is to drive the shift toward sustainable mobility by making EV charging smarter and more efficient.
                                    </p>
                                    <div className=" gy-2 gx-4 mb-4">
                                        <div className="col-sm-6">
                                            <p className="mb-0">
                                                <i className="fa fa-arrow-right text-primary me-2" />
                                                Fast Charging
                                            </p>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="mb-0">
                                                <i className="fa fa-arrow-right text-primary me-2" />
                                                Easy to use
                                            </p>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="mb-0">
                                                <i className="fa fa-arrow-right text-primary me-2" />5 Star
                                                Accessible to everyone
                                            </p>
                                        </div>
                                        <div className="col-sm-6">
                                            <p className="mb-0">
                                                <i className="fa fa-arrow-right text-primary me-2" />
                                                Latest  Model Chargers
                                            </p>
                                        </div>

                                        <div className="col-sm-6">
                                            <p className="mb-0">
                                                <i className="fa fa-arrow-right text-primary me-2" />
                                                24/7 Service
                                            </p>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </>
                

            }
            {/* Footer Start */}
            <Footer />
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
