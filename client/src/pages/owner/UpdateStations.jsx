import React, { useEffect, useState } from 'react'
import Nav from '../../components/Nav'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';


export default function UpdateStations() {
    const {id} = useParams()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        Owner_id: localStorage.getItem('login_id'),
        StationName: '',
        City: '',
        ChargingPortsNo: '',
        TypeofConnectors: '',
        ChargingPower: '',
        OperatingHours: '',
        ChargingRate: '',
        StationStatus: '',
        Address: ''
    });

    console.log(formData);


    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const clear = (e) => {
        setErrors({
            ...errors, [e.target.name]: ''
        })
    }

    const validate = () => {
        const newErrors = {};

        if (!formData.StationName) newErrors.StationName = 'Station Name is required';
        if (!formData.City) newErrors.City = 'City Name is required';
        if (!formData.ChargingPortsNo) {
            newErrors.ChargingPortsNo = 'Charging Ports No is required';
        } else if (isNaN(formData.ChargingPortsNo)) {
            newErrors.ChargingPortsNo = 'Charging Ports No must be a number';
        }
        if (!formData.TypeofConnectors) newErrors.TypeofConnectors = 'Type of Connectors is required';
        if (!formData.ChargingPower) newErrors.ChargingPower = 'Charging Power is required';
        if (!formData.OperatingHours) newErrors.OperatingHours = 'Operating Hours is required';
        if (!formData.ChargingRate) {
            newErrors.ChargingRate = 'Charging Rate is required';
        } else if (isNaN(formData.ChargingRate)) {
            newErrors.ChargingRate = 'Charging Rate must be a number';
        }
        if (!formData.StationStatus) newErrors.StationStatus = 'Station Status is required';
        if (!formData.Address) newErrors.Address = 'Address is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validate()) {
            console.log('test',formData);
            
            axios.post(`http://localhost:4000/auth/updatestation/${id}`, formData)
                .then(res => {
                    toast.success(res.data.message)
                    setTimeout(() => {
                        navigate('/view-stations')
                    }, 2000);

                })
        }
    };

    useEffect(() => {

        axios.get(`http://localhost:4000/station/getchargingstation/${id}`)
            .then(res => {
                setFormData(res.data.data)
            })
    },[id])

    return (
        <>
            <Toaster />
            {/* Topbar Start */}
            <div className="container-fluid bg-dark px-5 d-none d-lg-block">
                {/* Your Topbar Code */}
            </div>
            {/* Navbar & Hero Start */}
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
                                    Update Stations
                                </h1>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb justify-content-center">
                                        <li className="breadcrumb-item">
                                            <a href="/">Home</a>
                                        </li>
                                        <li className="breadcrumb-item active">Update Station</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                        <h6 className="section-title bg-white text-center text-primary px-3 mb-5">
                            Update your station
                        </h6>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-12 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
                            <form onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    <div key="StationName" className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                onClick={clear}
                                                type="text"
                                                className="form-control"
                                                id="StationName"
                                                name="StationName"
                                                value={formData.StationName}
                                                onChange={handleChange}
                                                placeholder="StationName"
                                            />
                                            <label htmlFor="StationName">Station Name</label>
                                            {errors.StationName && <small className="text-danger">{errors.StationName}</small>}
                                        </div>
                                    </div>
                                    <div key="City" className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                type="text"
                                                onClick={clear}
                                                className="form-control"
                                                id="City"
                                                name="City"
                                                value={formData.City}
                                                onChange={handleChange}
                                                placeholder="City"
                                            />
                                            <label htmlFor="StationName">City Name</label>
                                            {errors.City && <small className="text-danger">{errors.City}</small>}
                                        </div>
                                    </div>
                                    {[
                                        { label: 'Charging Ports No', id: 'ChargingPortsNo', type: 'text' },
                                        { label: 'Type of Connectors', id: 'TypeofConnectors', type: 'text' },
                                        { label: 'Charging Power', id: 'ChargingPower', type: 'text' },
                                        { label: 'Operating Hours', id: 'OperatingHours', type: 'text' },
                                        { label: 'Charging Rate', id: 'ChargingRate', type: 'text' }
                                    ].map(({ label, id, type }) => (
                                        <div key={id} className="col-md-4">
                                            <div className="form-floating">
                                                <input
                                                    type={type}
                                                    onClick={clear}
                                                    className="form-control"
                                                    id={id}
                                                    name={id}
                                                    value={formData[id]}
                                                    onChange={handleChange}
                                                    placeholder={label}
                                                />
                                                <label htmlFor={id}>{label}</label>
                                                {errors[id] && <small className="text-danger">{errors[id]}</small>}
                                            </div>
                                        </div>
                                    ))}
                                    <div className="col-md-4">
                                        <div className="form-floating">
                                            <select
                                                className="form-control"
                                                name="StationStatus"
                                                onClick={clear}
                                                value={formData.StationStatus}
                                                onChange={handleChange}
                                            >
                                                <option value="">Choose an option</option>
                                                <option value="Active">Active</option>
                                                <option value="Inactive">Inactive</option>
                                            </select>
                                            <label htmlFor="StationStatus">Station Status</label>
                                            {errors.StationStatus && (
                                                <small className="text-danger">{errors.StationStatus}</small>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea
                                                onClick={clear}
                                                className="form-control"
                                                placeholder="Address"
                                                id="Address"
                                                name="Address"
                                              value={formData.Address}
                                                onChange={handleChange}
                                                style={{ height: 100 }} 
                                            >{formData.Address}</textarea>
                                            <label htmlFor="Address">Address</label>
                                            {errors.Address && (
                                                <small className="text-danger">{errors.Address}</small>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button className="btn btn-primary w-100 py-3" type="submit">
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer and other components */}
        </>
    )
}
