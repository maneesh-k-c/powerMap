import React, { useEffect, useState } from 'react';
import Nav from '../../components/Nav';
import toast, { Toaster } from 'react-hot-toast';
import Footer from '../../components/Footer';
import axios from 'axios'

export default function ViewVehicles() {
    const [vehicles, setVehicles] = useState([])
    console.log(vehicles);

    useEffect(() => {
        const login_id = localStorage.getItem('login_id')
        axios.get(`http://localhost:4000/vehicleModels/viewuservehicle/${login_id}`)
            .then(res => {
                setVehicles(res.data.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const removeVehicle = (id) => {
        axios.delete(`http://localhost:4000/vehicleModels/deleteuservehicle/${id}`)
            .then(res => {
                console.log(res);
                const filterData = vehicles.filter((data) => {
                    return data._id !== id
                })
                setVehicles(filterData)
                toast.success(res.data.message)
            })
            .catch(err => {
                toast.error(err.response.data.message)
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
                                    My Vehicles
                                </h1>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb justify-content-center">
                                        <li className="breadcrumb-item">
                                            <a href="/">Home</a>
                                        </li>
                                        <li className="breadcrumb-item active">My Vehicles</li>
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
                            owned vehicles
                        </h6>
                    </div>


                    <div className="row g-4 justify-content-center">
                        {vehicles[0] ? vehicles.map((vehicle) => (
                            <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                <div className="package-item">
                                    <div className="d-flex border-bottom">
                                        <small className="flex-fill text-center border-end py-2">
                                            <i className="fa fa-map-marker-alt text-primary me-2" />
                                            {vehicle?.carID ? vehicle?.carID.brand.toUpperCase() : vehicle?.bikeID ? vehicle?.bikeID.brand.toUpperCase() : vehicle?.autoID.brand.toUpperCase()}
                                        </small>
                                        <small className="flex-fill text-center py-2">
                                            <i className="fa fa-user text-primary me-2" />{vehicle?.carID ? vehicle?.carID.variantname.toUpperCase() : vehicle?.bikeID ? vehicle?.bikeID.variantname.toUpperCase() : vehicle?.autoID.variantname.toUpperCase()}
                                        </small>
                                    </div>
                                    <div className="text-center p-4">
                                        <img height={150} width={250} src={vehicle?.carID ? vehicle?.carID.image_url : vehicle?.bikeID ? vehicle?.bikeID.image_url : vehicle?.autoID.image_url} alt="" />
                                        <p>
                                            <b>Range :</b>{vehicle?.carID ? vehicle?.carID.range : vehicle?.bikeID ? vehicle?.range : vehicle?.autoID.range}<br />
                                            <b>Battery Capacity :</b>{vehicle?.carID ? vehicle?.carID.batteryCapacity : vehicle?.bikeID ? vehicle?.bikeID.batteryCapacity : vehicle?.autoID.batteryCapacity}
                                        </p>
                                        <div className="d-flex justify-content-center mb-2">
                                            <a onClick={() => {
                                                removeVehicle(vehicle._id)
                                            }}
                                                className="btn btn-sm btn-danger px-3"
                                                style={{ borderRadius: "30px 30px" }}>
                                                Delete
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )) :
                            <div className="d-flex justify-content-center align-items-center" style={{ height: "20vh" }} >
                                <h1>No Vehicles Found</h1>
                            </div>
                        }



                </div>


            </div>
        </div >
            < Footer />
        </>
    )
}
