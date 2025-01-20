import React from 'react'
import Nav from '../components/Nav'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Stations from '../components/Stations'

export default function Home() {
    return (
        <>

            {/* Navbar & Hero Start */}
            <Header/>
                       
            <div className="container-fluid position-relative p-0">
                <Nav/>
                <div className="container-fluid bg-primary py-5 mb-5  hero-header">
                    <div className="container py-5 mb-5">
                        <div className="row justify-content-center py-5 mb-5">
                            <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center " >
                                <h1 className="display-3 text-white mb-3 animated slideInDown">
                                    Enjoy Your Vacation With Us
                                </h1>
                                <p className="fs-4 text-white mb-4 animated slideInDown">
                                    Tempor erat elitr rebum at clita diam amet diam et eos erat ipsum
                                    lorem sit
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
            {/* Navbar & Hero End */}
            {/* About Start */}
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
                                Welcome to <span className="text-primary">Tourist</span>
                            </h1>
                            <p className="mb-4">
                                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
                                diam amet diam et eos. Clita erat ipsum et lorem et sit.
                            </p>
                            <p className="mb-4">
                                Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu
                                diam amet diam et eos. Clita erat ipsum et lorem et sit, sed stet
                                lorem sit clita duo justo magna dolore erat amet
                            </p>
                            <div className="row gy-2 gx-4 mb-4">
                                <div className="col-sm-6">
                                    <p className="mb-0">
                                        <i className="fa fa-arrow-right text-primary me-2" />
                                        First Class Flights
                                    </p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0">
                                        <i className="fa fa-arrow-right text-primary me-2" />
                                        Handpicked Hotels
                                    </p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0">
                                        <i className="fa fa-arrow-right text-primary me-2" />5 Star
                                        Accommodations
                                    </p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0">
                                        <i className="fa fa-arrow-right text-primary me-2" />
                                        Latest Model Vehicles
                                    </p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0">
                                        <i className="fa fa-arrow-right text-primary me-2" />
                                        150 Premium City Tours
                                    </p>
                                </div>
                                <div className="col-sm-6">
                                    <p className="mb-0">
                                        <i className="fa fa-arrow-right text-primary me-2" />
                                        24/7 Service
                                    </p>
                                </div>
                            </div>
                            <a className="btn btn-primary py-3 px-5 mt-2" href="">
                                Read More
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* About End */}
            {/* Stations Start */}
            <Stations/>
            {/* Stations End */}
            {/* Destination Start */}
            <div className="container-xxl py-5 destination">
                <div className="container">
                    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h6 className="section-title bg-white text-center text-primary px-3">
                            Destination
                        </h6>
                        <h1 className="mb-5">Popular Destination</h1>
                    </div>
                    <div className="row g-3">
                        <div className="col-lg-7 col-md-6">
                            <div className="row g-3">
                                <div
                                    className="col-lg-12 col-md-12 wow zoomIn"
                                    data-wow-delay="0.1s"
                                >
                                    <a className="position-relative d-block overflow-hidden" href="">
                                        <img className="img-fluid" src="img/destination-1.jpg" alt="" />
                                        <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">
                                            30% OFF
                                        </div>
                                        <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">
                                            Thailand
                                        </div>
                                    </a>
                                </div>
                                <div
                                    className="col-lg-6 col-md-12 wow zoomIn"
                                    data-wow-delay="0.3s"
                                >
                                    <a className="position-relative d-block overflow-hidden" href="">
                                        <img className="img-fluid" src="img/destination-2.jpg" alt="" />
                                        <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">
                                            25% OFF
                                        </div>
                                        <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">
                                            Malaysia
                                        </div>
                                    </a>
                                </div>
                                <div
                                    className="col-lg-6 col-md-12 wow zoomIn"
                                    data-wow-delay="0.5s"
                                >
                                    <a className="position-relative d-block overflow-hidden" href="">
                                        <img className="img-fluid" src="img/destination-3.jpg" alt="" />
                                        <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">
                                            35% OFF
                                        </div>
                                        <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">
                                            Australia
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div
                            className="col-lg-5 col-md-6 wow zoomIn"
                            data-wow-delay="0.7s"
                            style={{ minHeight: 350 }}
                        >
                            <a
                                className="position-relative d-block h-100 overflow-hidden"
                                href=""
                            >
                                <img
                                    className="img-fluid position-absolute w-100 h-100"
                                    src="img/destination-4.jpg"
                                    alt=""
                                    style={{ objectFit: "cover" }}
                                />
                                <div className="bg-white text-danger fw-bold position-absolute top-0 start-0 m-3 py-1 px-2">
                                    20% OFF
                                </div>
                                <div className="bg-white text-primary fw-bold position-absolute bottom-0 end-0 m-3 py-1 px-2">
                                    Indonesia
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            {/* Destination Start */}
          
          
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
                                    <i className="fa fa-globe fa-3x text-white" />
                                </div>
                                <h5 className="mt-4">Choose A Destination</h5>
                                <hr className="w-25 mx-auto bg-primary mb-1" />
                                <hr className="w-50 mx-auto bg-primary mt-0" />
                                <p className="mb-0">
                                    Tempor erat elitr rebum clita dolor diam ipsum sit diam amet diam
                                    eos erat ipsum et lorem et sit sed stet lorem sit
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
                                    <i className="fa fa-dollar-sign fa-3x text-white" />
                                </div>
                                <h5 className="mt-4">Pay Online</h5>
                                <hr className="w-25 mx-auto bg-primary mb-1" />
                                <hr className="w-50 mx-auto bg-primary mt-0" />
                                <p className="mb-0">
                                    Tempor erat elitr rebum clita dolor diam ipsum sit diam amet diam
                                    eos erat ipsum et lorem et sit sed stet lorem sit
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
                                    <i className="fa fa-plane fa-3x text-white" />
                                </div>
                                <h5 className="mt-4">Fly Today</h5>
                                <hr className="w-25 mx-auto bg-primary mb-1" />
                                <hr className="w-50 mx-auto bg-primary mt-0" />
                                <p className="mb-0">
                                    Tempor erat elitr rebum clita dolor diam ipsum sit diam amet diam
                                    eos erat ipsum et lorem et sit sed stet lorem sit
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Process Start */}
          
         
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
