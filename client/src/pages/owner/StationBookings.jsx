import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav';
import toast, { Toaster } from 'react-hot-toast';
import Footer from '../../components/Footer';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export default function StationBookings() {
    const [bookings, setBookings] = useState([])
    const [stations, setStations] = useState([])
    console.log(stations);

    const [stationID, setStationID] = useState('')

    console.log(bookings);
    const convertTo12HourFormat = (time) => {
        if (!time) return "";
        const [hours, minutes] = time.split(":").map(Number);
        const period = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12;
        return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
    };
    const [filter, setFilter] = useState("ALL");

    const getTodayDate = () => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    };
    const filteredBookings = bookings.filter((booking) => {
        if (filter === "TODAY") {
            return booking.date === getTodayDate();
        }
        return true;
    });



    useEffect(() => {
        const login_id = localStorage.getItem('login_id')
        axios.get(`http://localhost:4000/station/my-stations/${login_id}`)
            .then(res => {
                setStations(res.data.data)
            })
    }, [])
    useEffect(() => {
        axios.get(`http://localhost:4000/booking/station-view-booking/${stationID}`)
            .then(res => {
                setBookings(res.data.data)
            })
    }, [stationID])

    const start = (id) => {
        axios.put(`http://localhost:4000/booking/ongoing-booking/${id}`)
            .then(res => {
                toast.success(res.data.message)
                const filterData = bookings.filter((booking) => {
                    if (booking._id == id) {
                        booking.status = 'ongoing'
                    }
                    return booking
                });
                setBookings(filterData)

            }).catch((err) => {
                toast.error(err.response.data.message);

            })
    }
    const end = (id) => {
        axios.put(`http://localhost:4000/booking/complete-booking/${id}`)
            .then(res => {
                toast.success(res.data.message)
                const filterData = bookings.filter((booking) => {
                    if (booking._id == id) {
                        booking.status = 'completed'
                    }
                    return booking
                });
                setBookings(filterData)

            }).catch((err) => {
                toast.error(err.response.data.message);

            })
    }
    return (
        <>
            <Toaster />
            <div className="container-fluid bg-dark px-5 d-none d-lg-block">
            </div>
            <div className="container-fluid position-relative p-0">
                <Nav />
                <div
                    className="container-fluid bg-primary py-2 mb-5 hero-header"
                    style={{ height: '300px' }}
                >
                    <div className="container">
                        <div className="row justify-content-center py-5">
                            <div className="col-lg-10 pt-lg-5 mt-lg-5 text-center">
                                <h1 className="display-3 text-white animated slideInDown">
                                    Station Bookings
                                </h1>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb justify-content-center">
                                        <li className="breadcrumb-item">
                                            <a href="/">Home</a>
                                        </li>
                                        <li className="breadcrumb-item active">Station Bookings </li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-xxl py-5">
                <div className="container">

                    {stationID == '' ?
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
                                                <button className='btn btn-info' onClick={() => setStationID(station._id)}>Bookings</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                            }


                        </div>
                        :

                        <>
                            {/* Filter Buttons */}
                            <div className="row mb-5">
                                <div className="d-flex justify-content-center mb-2">
                                    <div
                                        className={`btn btn-sm btn-primary px-3 me-2 ${filter === "ALL" ? "active" : ""}`}
                                        onClick={() => setFilter("ALL")}
                                        style={{ width: "120px" }}
                                    >
                                        ALL
                                    </div>
                                    <div
                                        className={`btn btn-sm btn-primary px-3 me-2 ${filter === "TODAY" ? "active" : ""}`}
                                        onClick={() => setFilter("TODAY")}
                                        style={{ width: "120px" }}
                                    >
                                        TODAY
                                    </div>
                                </div>
                            </div>

                            {/* Filtered Bookings */}
                            <div className="row g-4 justify-content-center">
                                {filteredBookings.map((booking, index) => (
                                    <div key={index} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                        <div className="package-item">
                                            <div className="d-flex border-bottom">
                                                <small className="flex-fill text-center border-end py-2">
                                                    <i className="fa fa-map-marker-alt text-primary me-2" />
                                                    {booking?.user?.district}
                                                </small>
                                                <small className="flex-fill text-center py-2">
                                                    <i className="fa fa-user text-primary me-2" />
                                                    {booking?.user?.name}
                                                </small>
                                            </div>
                                            <div className="text-center p-4">
                                                <p style={{ backgroundColor: '#e7f4ff', color: 'black', padding: '10px', borderRadius: '1rem', fontFamily: 'Nunito' }}>
                                                    Contact: {booking?.user?.phoneNumber} <br />
                                                    <span>Date: {booking?.date}</span><br />
                                                    <span style={{ padding: '4px', backgroundColor: 'palegreen', borderRadius: '10px', width: '100%' }}>Amount paid: ₹{booking?.amount} /-</span>
                                                </p>

                                                <p>
                                                    <b>Start Time: {convertTo12HourFormat(booking?.startTime)}</b>
                                                    <br />
                                                    <b>End Time: {convertTo12HourFormat(booking?.endTime)}</b>
                                                    <br />
                                                    <b>Status: </b>
                                                    {booking?.status}
                                                </p>
                                                <div className="d-flex justify-content-center mb-2">
                                                    <a
                                                        onClick={() => {
                                                            start(booking._id)
                                                        }}
                                                        className="btn btn-sm btn-primary px-3"
                                                        style={{ borderRadius: "30px 30px" }}
                                                    >
                                                        Start
                                                    </a>
                                                    &nbsp;
                                                    <a
                                                        onClick={() => {
                                                            end(booking._id)
                                                        }}
                                                        className="btn btn-sm btn-primary px-3"
                                                        style={{ borderRadius: "30px 30px" }}
                                                    >
                                                        Finish
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>

                    }






                </div>
            </div >
            < Footer />
        </>
    )
}
