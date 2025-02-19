import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import './ticket.css'
import Footer from '../../components/Footer';
export default function UserViewStations() {
    const navigate = useNavigate()
    const [stations, setStations] = useState([])
    const ratePerHour = 220;

    useEffect(() => {
        axios.get(`http://localhost:4000/station/all-stations`)
            .then(res => {
                setStations(res.data.data)
            })
    }, [])
    const openModal = (stationId) => {
        setFormData({ ...formData, stationId });
        setModalVisible(true);
    };
    const openCheckModal = (stationId) => {
        setFormData({ ...formData, stationId });
        setCheckModalVisible(true);
    };
    const [modalVisible, setModalVisible] = useState(false);
    const [checkModalVisible, setCheckModalVisible] = useState(false);
    const [checkAvailable, setCheckAvailable] = useState('');
    const [today, setToday] = useState([]);
    const [trigger, setTrigger] = useState();
    console.log(today);

    const [formData, setFormData] = useState({
        stationId: '',
        date: '',
        amount: '',
        startTime: '',
        endTime: '',
        userLoginId: localStorage.getItem('login_id'),
    });
    console.log(formData);


    const [errors, setErrors] = useState({});
    const closeModal = () => {
        setModalVisible(false);
        setFormData({
            date: '',
            startTime: '',
            endTime: '',
        });
        setErrors({});
    };
    const convertTo12HourFormat = (time) => {
        if (!time) return "";
        const [hours, minutes] = time.split(":").map(Number);
        const period = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format
        return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
    };

    // Handle time change and format conversion
    const handleTimeChange = (time, field) => {
        setFormData((prev) => ({
            ...prev,
            [field]: time, // Store 24-hour format in the database
        }));
    };
    const closeCheckModal = () => {
        setCheckModalVisible(false);
        setFormData({
            date: '',
            startTime: '',
            endTime: '',
        });
        setErrors({});
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            console.log('Form data submitted:', formData);
            axios.post(`http://localhost:4000/booking/book-slot`, formData).then((res) => {
                console.log(res);
                toast.success(res.data.message);
            }).catch((err) => {
                console.log(err);
                toast.error(err.response.data.message);

            })
            closeModal();
        }
    };
    const handleCheckSubmit = async (e) => {
        try {
            e.preventDefault();
            if (validateForm()) {
                await axios.post(`http://localhost:4000/booking/check-availability`, formData).then((res) => {
                    console.log(res.data.message);
                    setCheckAvailable(res.data.message);
                }).catch((err) => {
                    console.log(err);

                })

                // closeModal();
            }
        } catch (error) {

        }
    };
    const validateForm = () => {
        const tempErrors = {};
        if (!formData.date) tempErrors.date = 'Date is required.';
        if (!formData.startTime) tempErrors.startTime = 'Start time is required.';
        if (!formData.endTime) tempErrors.endTime = 'End time is required.';
        if (formData.startTime >= formData.endTime) {
            tempErrors.endTime = "End time must be after start time.";
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(() => {
        if (formData.startTime && formData.endTime) {
            const start = new Date(`1970-01-01T${formData.startTime}:00`);
            const end = new Date(`1970-01-01T${formData.endTime}:00`);

            if (end > start) {
                const duration = (end - start) / (1000 * 60 * 60);
                console.log(duration);

                setTotalAmount(duration * ratePerHour);
                setFormData({ ...formData, amount: (duration * ratePerHour).toFixed(2) });
            } else {
                setTotalAmount(0);
            }
        }
    }, [formData?.startTime, formData?.endTime])


    useEffect(() => {
        const data = {
            date: trigger,
            stationId: formData.stationId
        }
        axios.post(`http://localhost:4000/booking/todays-booking`, data).then((res) => {
            console.log(res.data.data);
            setToday(res.data.data);
        }).catch((err) => {
            console.log(err);

        })
    }, [trigger])

    return (
        <>
            <Toaster />
            {/* Topbar Start */}
           
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
                                    Stations
                                </h1>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb justify-content-center">
                                        <li className="breadcrumb-item">
                                            <a href="/">Home</a>
                                        </li>
                                        <li className="breadcrumb-item">
                                            <a >All stations user</a>
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
                                <div class="service-item rounded pt-3" >
                                    <div class="p-4 station-div" onClick={() => navigate(`/single-station/${station._id}`)}>
                                        <i class="fa fa-3x fa-hotel text-primary mb-4"></i>
                                        <p class="station-status" style={{ color: station.StationStatus === 'Active' ? '#2dd62d' : 'red' }}>{station.StationStatus}</p>
                                        <h5>{station.StationName},&nbsp;{station.City}</h5>
                                        <p>Connectors:&nbsp;{station.TypeofConnectors}</p>
                                        <p>Power:&nbsp;{station.ChargingPower}</p>
                                        <p>Working hours:&nbsp;{station.OperatingHours}</p>
                                        <p>No of Ports:&nbsp;{station.ChargingPortsNo}</p>

                                    </div>

                                    <div className="manage-station-btns mb-5">
                                        <button className='btn btn-success' style={{ width: '250px', marginBottom: '-45px' }} onClick={() => openCheckModal(station._id)}>Check Availability</button>
                                        {/* <button className="btn btn-info" style={{ width: '250px', marginBottom: '20px' }} onClick={() => openModal(station._id)}>Book Now</button> */}
                                    </div>
                                    <div className="manage-station-btns mb-5">
                                        {/* <button className='btn btn-success' onClick={() => handleEditStation(station._id)}>View</button> */}
                                        <button className="btn btn-info" style={{ width: '250px', marginBottom: '20px' }} onClick={() => openModal(station._id)}>Book Now</button>
                                    </div>
                                </div>
                            </div>
                        ))}


                    </div>
                </div>
            </div>
            {modalVisible && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Book Station</h5>
                                <button type="button" className="btn-close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="date" className="form-label">Date</label>
                                        <input
                                            type="date"
                                            className="form-control"
                                            id="date"
                                            value={formData.date}
                                            onChange={(e) =>
                                                setFormData({ ...formData, date: e.target.value })
                                            }
                                        />
                                        {errors.date && <div className="text-danger">{errors.date}</div>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="startTime" className="form-label">Start Time</label>
                                        <input
                                            type="time"
                                            className="form-control"
                                            id="startTime"
                                            value={formData.startTime}
                                            onChange={(e) =>
                                                handleTimeChange(e.target.value, "startTime")
                                            }
                                        />
                                        <div className="text-muted">
                                            Selected Start Time: {convertTo12HourFormat(formData.startTime)}
                                        </div>
                                        {errors.startTime && (
                                            <div className="text-danger">{errors.startTime}</div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="endTime" className="form-label">End Time</label>
                                        <input
                                            type="time"
                                            className="form-control"
                                            id="endTime"
                                            value={formData.endTime}
                                            onChange={(e) =>
                                                handleTimeChange(e.target.value, "endTime")
                                            }
                                        />
                                        <div className="text-muted">
                                            Selected End Time: {convertTo12HourFormat(formData.endTime)}
                                        </div>
                                        {errors.endTime && (
                                            <div className="text-danger">{errors.endTime}</div>
                                        )}
                                    </div>
                                    <div className="mb-3">
                                        <strong>Approximate Total Amount:</strong> ₹{totalAmount.toFixed(2)}
                                    </div>

                                    <button type="submit" className="btn btn-primary">Book Now</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>


            )}

            {checkModalVisible && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Check Availability</h5>
                                <button type="button" className="btn-close" onClick={closeCheckModal}></button>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={handleCheckSubmit}>

                                    <div className="row">
                                        <div className="mb-3 col-4">
                                            <label htmlFor="date" className="form-label">Date</label>
                                            <input type="date" className="form-control" id="date" value={formData.date} onChange={(e) => { setFormData({ ...formData, date: e.target.value }); setTrigger(e.target.value) }} />
                                            {errors.date && <div className="text-danger">{errors.date}</div>}
                                        </div>
                                        <div className="mb-3 col-4">
                                            <label htmlFor="startTime" className="form-label">Start Time</label>
                                            <input type="time" className="form-control" id="startTime" value={formData.startTime} onChange={(e) => setFormData({ ...formData, startTime: e.target.value })} />
                                            {errors.startTime && <div className="text-danger">{errors.startTime}</div>}
                                        </div>
                                        <div className="mb-3 col-4">
                                            <label htmlFor="endTime" className="form-label">End Time</label>
                                            <input type="time" className="form-control" id="endTime" value={formData.endTime} onChange={(e) => setFormData({ ...formData, endTime: e.target.value })} />
                                            {errors.endTime && <div className="text-danger">{errors.endTime}</div>}
                                        </div>


                                        <button type="submit" className="btn btn-primary">Check Now</button>

                                    </div>
                                </form>
                                <h6 style={{ textAlign: "center", marginTop: "10px" }}>{checkAvailable ? checkAvailable : ""}</h6>
                                <div className="row">
                                    {today.map((item, index) => (
                                        <>
                                            

                                            <div className="coupon">
                                                <div className="left">
                                                    <div>Booking</div>
                                                </div>
                                                <div className="center">
                                                    <div>
                                                        <h2>{item.status}</h2>
                                                        
                                                        <small>start time : {item.startTime}</small><br />
                                                        <small>End time : {item.endTime}</small>
                                                    </div>
                                                </div>
                                                <div className="right">
                                                    <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>
                                                </div>
                                            </div>

                                        </>
                                    ))}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            )}

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
