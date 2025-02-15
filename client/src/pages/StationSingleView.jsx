import React, { useEffect, useState } from 'react'
import Nav from '../components/Nav'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import Footer from '../components/Footer';

export default function StationSingleView() {

    const [stations, setStations] = useState([]);
    const [feedback, setFeedback] = useState("");
    const [feedbackError, setFeedbackError] = useState("");

    const [allFeedbacks, setAllFeedbacks] = useState([]);
    console.log(allFeedbacks);

    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:4000/station/getchargingstation/${id}`)
            .then(res => {
                setStations(res.data.data);
            });
    }, [id]);

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
        if (e.target.value.trim() === "") {
            setFeedbackError("Feedback cannot be empty.");
        } else {
            setFeedbackError("");
        }
    };

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        if (feedback.trim() === "") {
            setFeedbackError("Feedback cannot be empty.");
        } else {
            setFeedbackError("");
            const login_id = localStorage.getItem("login_id");
            axios.post(`http://localhost:4000/feedback/submitfeedback`, { feedbackText: feedback, userLoginId: login_id, stationId: id }).then(res => {
                toast.success(res.data.message);
                setFeedback("");
            }).catch((err) => {
                toast.error('Error submitting feedback')
            })
            // Reset feedback field
        }
    };

    useEffect(() => {
        axios.get(`http://localhost:4000/feedback/view-single-feedback/${id}`)
            .then(res => {
                setAllFeedbacks(res.data.data);
            });
    }, [feedback])

    return (
        <>
            {/* Topbar Start */}
            <Toaster />
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
                                className="btn btn-sm btn-outline-light btn-sm-square"
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
                                    Station
                                </h1>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb justify-content-center">
                                        <li className="breadcrumb-item">
                                            <a href="/">Home</a>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <a >Station</a>
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
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                            <h2>{stations.StationName}</h2>
                            <p className="mb-4">

                            </p>
                            <div className="d-flex align-items-center mb-4">
                                <div
                                    className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary"
                                    style={{ width: 50, height: 50 }}
                                >
                                    <i className="fa fa-map-marker-alt text-white" />
                                </div>
                                <div className="ms-3">
                                    <h5 className="text-primary">Address</h5>
                                    <p className="mb-0">{stations.Address}</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-center mb-4">
                                <div
                                    className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary"
                                    style={{ width: 50, height: 50 }}
                                >
                                    <i className="fa fa-phone-alt text-white" />
                                </div>
                                <div className="ms-3">
                                    <h5 className="text-primary">Mobile</h5>
                                    <p className="mb-0">{stations?.owner?.phoneNumber}</p>
                                </div>
                            </div>
                            <div className="d-flex align-items-center">
                                <div
                                    className="d-flex align-items-center justify-content-center flex-shrink-0 bg-primary"
                                    style={{ width: 50, height: 50 }}
                                >
                                    <i className="fa fa-envelope-open text-white" />
                                </div>
                                <div className="ms-3">
                                    <h5 className="text-primary">Email</h5>
                                    <p className="mb-0">{stations?.owner?.email}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                            <iframe
                                className="position-relative rounded w-100 h-100"
                                src={stations?.location_url}
                                frameBorder={0}

                                style={{ minHeight: 300, border: 0 }}
                                allowFullScreen=""
                                aria-hidden="false"
                                tabIndex={0}
                            />
                        </div>
                        <div className="col-lg-4 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="d-flex justify-content-center">
                                <div className="col-8 mb-5">
                                    <button onClick={()=>{window.location.href = `/stations`}} className="btn btn-primary w-100 py-3" type="submit">
                                        Book Now
                                    </button>
                                </div>
                            </div>
                            <form onSubmit={handleFeedbackSubmit}>
                                <div className="row g-3 mt-2">
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea
                                                className="form-control"
                                                placeholder="Leave a message here"
                                                id="message"
                                                name='feedback'
                                                style={{ height: 100 }}
                                                value={feedback}
                                                onChange={handleFeedbackChange}
                                            />
                                            <label htmlFor="message">Send feedback</label>
                                            {feedbackError && <small className="text-danger">{feedbackError}</small>}
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn btn-primary w-100 py-3" type="submit">
                                            Send feedback
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* Service End */}
            {/* Testimonial Start */}

            <div className="container-xxl py-5">
                <div className="container">
                    <h1 className="animated slideInDown mb-5">
                       {allFeedbacks.length} Feedbacks from users
                    </h1>

                    <div className="row g-4">
                        {allFeedbacks.map((feedback) => (
                           <div className="col-lg-4 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                           <div className="service-item rounded pt-3 position-relative">
                               <div className="p-4">
                                   {/* Display the date in the top-right corner */}
                                   <small 
                                       className="position-absolute top-0 end-0 text-muted pe-3 pt-2"
                                       style={{ fontSize: '15px' }}
                                   >
                                       {new Date(feedback.submittedAt).toLocaleString('en-US', {
                                           year: 'numeric',
                                           month: 'short',
                                           day: 'numeric',
                                           hour: '2-digit',
                                           minute: '2-digit',
                                           hour12: true
                                       })}
                                   </small>
                       
                                   <h5>{feedback?.user?.name}</h5><hr />
                                   <p>{feedback.feedbackText}</p>
                               </div>
                           </div>
                       </div>
                       
                        ))}



                    </div>
                </div>
            </div>


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
