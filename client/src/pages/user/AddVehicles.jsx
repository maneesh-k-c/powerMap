import React, { useEffect, useState } from 'react';
import Nav from '../../components/Nav';
import toast, { Toaster } from 'react-hot-toast';
import Footer from '../../components/Footer';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export default function AddVehicles() {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        userLoginId: localStorage.getItem('login_id'),
        vehicleType: '',
        carID: '',
        bikeID: '',
        autoID: '',
        vehicleNumber: '',
    });
    console.log(formData);
    

    const [vehicles, SetVehicles] = useState([])
    const [filter, SetFilter] = useState('ALL')


    const [errors, setErrors] = useState({});
    const validateVehicleNumber = (value) => /^[A-Z0-9]*$/.test(value);
    const validateRequiredField = (value) => value.trim() !== '';

    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedValue = value;

        if (name === 'vehicleNumber') {
            updatedValue = value.replace(/[^A-Z0-9]/gi, '').toUpperCase();
        }

        setFormData({ ...formData, [name]: updatedValue });


        if (name === 'vehicleNumber' && validateVehicleNumber(updatedValue)) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        } else if (validateRequiredField(updatedValue)) {
            setErrors((prev) => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = async(e) => {
      try {
        e.preventDefault();

        const newErrors = {};


        if (!validateRequiredField(formData.vehicleNumber)) {
            newErrors.vehicleNumber = 'Vehicle Number is required.';
        } else if (!validateVehicleNumber(formData.vehicleNumber)) {
            newErrors.vehicleNumber = 'Vehicle number must be uppercase alphanumeric without spaces or special characters.';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
         


           const res = await axios.post('http://localhost:4000/vehicleModels/useraddvehicle', formData)
               
           console.log(res);
           
           if(res){
                navigate('/my-vehicle')
                toast.success('Vehicle details submitted successfully!');
               }else{
                toast.error('Error submitting vehicle details')
               }
           
        } else {
            toast.error('Please fix the errors in the form.');
        }
      } catch (error) {
        
      }
    };
    useEffect(() => {
        axios.get(`http://localhost:4000/vehicleModels/${formData.vehicleType}`)
            .then(res => {
                SetVehicles(res.data.data)
            })
    }, [formData.vehicleType])

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
                                    Add Vehicles
                                </h1>
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb justify-content-center">
                                        <li className="breadcrumb-item">
                                            <a href="/">Home</a>
                                        </li>
                                        <li className="breadcrumb-item active">Add Vehicles</li>
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
                            Add your vehicle
                        </h6>
                    </div>
                    {
                        formData.vehicleType == '' ?

                            <>
                                <div class="row g-4 justify-content-center">
                                    <div class="col-lg-3 col-sm-6 wow fadeInUp " data-wow-delay="0.1s">
                                        <div class="service-item rounded pt-3">
                                            <div class="p-4 d-flex flex-column justify-content-center align-items-center text-center"
                                                onClick={() => { setFormData({ ...formData, vehicleType: 'car' }); }}>
                                                <i class="fa fa-3x fa-car text-primary mb-4"></i>
                                                <h5>Cars</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                                        <div class="service-item rounded pt-3">
                                            <div class="p-4 d-flex flex-column justify-content-center align-items-center text-center"
                                                onClick={() => { setFormData({ ...formData, vehicleType: 'bike' }); }}>
                                                <i class="fa fa-3x fa-motorcycle text-primary mb-4"></i>
                                                <h5>Bikes</h5>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                                        <div class="service-item rounded pt-3">
                                            <div class="p-4 d-flex flex-column justify-content-center align-items-center text-center"
                                                onClick={() => { setFormData({ ...formData, vehicleType: 'auto' }); }}>
                                                <i class="fa fa-3x fa-motorcycle text-primary mb-4"></i>
                                                <h5>Auto</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                              
                            </>

                            :
                            formData.carID === '' && formData.bikeID ==='' && formData.autoID=='' ?
                                <>
                                    <div className="row mb-5">
                                        <div className="d-flex justify-content-center mb-2">
                                            <div className="btn btn-sm btn-primary px-3 me-2"
                                                onClick={() => { SetFilter('ALL') }}
                                                style={{ width: "120px" }}>
                                                ALL
                                            </div>
                                            <div className="btn btn-sm btn-primary px-3 me-2"
                                                onClick={() => { SetFilter('TATA') }}
                                                style={{ width: "120px" }}>
                                                TATA
                                            </div>
                                            <div className="btn btn-sm btn-primary px-3 me-2"
                                                onClick={() => { SetFilter('HYUNDAI') }}
                                                style={{ width: "120px" }}>
                                                HYUNDAI
                                            </div>
                                            <div className="btn btn-sm btn-primary px-3 me-2"
                                                onClick={() => { SetFilter('MG') }}
                                                style={{ width: "120px" }}>
                                                MG
                                            </div>
                                            <div className="btn btn-sm btn-primary px-3 me-2"
                                                onClick={() => { SetFilter('MAHINDRA') }}
                                                style={{ width: "120px" }}>
                                                MAHINDRA
                                            </div>
                                            <div className="btn btn-sm btn-primary px-3 me-2"
                                                onClick={() => { SetFilter('KIA') }}
                                                style={{ width: "120px" }}>
                                                KIA
                                            </div>
                                            <div className="btn btn-sm btn-primary px-3 me-2"
                                                onClick={() => { SetFilter('BAJAJ') }}
                                                style={{ width: "120px" }}>
                                                BAJAJ
                                            </div>
                                            <div className="btn btn-sm btn-primary px-3 me-2"
                                                onClick={() => { SetFilter('TVS') }}
                                                style={{ width: "120px" }}>
                                                TVS
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row g-4 justify-content-center">
                                        {
                                            filter == 'ALL' ?
                                                vehicles.map((vehicle) => (
                                                    <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                                        <div className="package-item">
                                                            <div className="d-flex border-bottom">
                                                                <small className="flex-fill text-center border-end py-2">
                                                                    <i className="fa fa-map-marker-alt text-primary me-2" />
                                                                    {vehicle.brand.toUpperCase()}
                                                                </small>
                                                                <small className="flex-fill text-center py-2">
                                                                    <i className="fa fa-user text-primary me-2" />{vehicle.variantname.toUpperCase()}
                                                                </small>
                                                            </div>
                                                            <div className="text-center p-4">
                                                                <img height={150} width={250} src={vehicle.image_url} alt="" />
                                                                <p>
                                                                    <b>Range :</b>{vehicle.range} <br />
                                                                    <b>Battery Capacity :</b>{vehicle.batteryCapacity}
                                                                </p>
                                                                <div className="d-flex justify-content-center mb-2">
                                                                    {
                                                                        formData.vehicleType =='car' ?   
                                                                       <a onClick={() => {
                                                                        setFormData({ ...formData, carID: vehicle._id }) }}
                                                                        className="btn btn-sm btn-primary px-3"
                                                                        style={{ borderRadius: "30px 30px" }}>
                                                                        Choose
                                                                    </a> :  formData.vehicleType =='bike' ?
                                                                     <a onClick={() => {
                                                                        setFormData({ ...formData, bikeID: vehicle._id }) }}
                                                                        className="btn btn-sm btn-primary px-3"
                                                                        style={{ borderRadius: "30px 30px" }}>
                                                                        Choose
                                                                    </a> :
                                                                     <a onClick={() => {
                                                                        setFormData({ ...formData, autoID: vehicle._id }) }}
                                                                        className="btn btn-sm btn-primary px-3"
                                                                        style={{ borderRadius: "30px 30px" }}>
                                                                        Choose
                                                                    </a>

                                                                    }
                                                                   
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )) :
                                                vehicles.filter((data) => data.brand.toUpperCase().includes(filter.toUpperCase())).map((vehicle) => (
                                                    <div
                                                        key={vehicle.id} // Add a unique key
                                                        className="col-lg-4 col-md-6 wow fadeInUp"
                                                        data-wow-delay="0.1s">
                                                        <div className="package-item">
                                                            <div className="d-flex border-bottom">
                                                                <small className="flex-fill text-center border-end py-2">
                                                                    <i className="fa fa-map-marker-alt text-primary me-2" />
                                                                    {vehicle.brand.toUpperCase()}
                                                                </small>
                                                                <small className="flex-fill text-center py-2">
                                                                    <i className="fa fa-user text-primary me-2" />
                                                                    {vehicle.variantname.toUpperCase()}
                                                                </small>
                                                            </div>
                                                            <div className="text-center p-4">
                                                                <img height={150}
                                                                    width={250}
                                                                    src={vehicle.image_url}
                                                                    alt="" />
                                                                <p>
                                                                    <b>Range :</b>
                                                                    {vehicle.range} <br />
                                                                    <b>Battery Capacity :</b>
                                                                    {vehicle.batteryCapacity}
                                                                </p>
                                                                <div className="d-flex justify-content-center mb-2">
                                                                    {
                                                                       formData.vehicleType =='car' ?   
                                                                       <a onClick={() => {
                                                                        setFormData({ ...formData, carID: vehicle._id }) }}
                                                                        className="btn btn-sm btn-primary px-3"
                                                                        style={{ borderRadius: "30px 30px" }}>
                                                                        Choose
                                                                    </a> :  formData.vehicleType =='bike' ?
                                                                     <a onClick={() => {
                                                                        setFormData({ ...formData, bikeID: vehicle._id }) }}
                                                                        className="btn btn-sm btn-primary px-3"
                                                                        style={{ borderRadius: "30px 30px" }}>
                                                                        Choose
                                                                    </a> :
                                                                     <a onClick={() => {
                                                                        setFormData({ ...formData, autoID: vehicle._id }) }}
                                                                        className="btn btn-sm btn-primary px-3"
                                                                        style={{ borderRadius: "30px 30px" }}>
                                                                        Choose
                                                                    </a>

                                                                    }
                                                                   
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                    </div>
                                </>
                                :
                                <div className="row g-4">
                                    <div className="col-lg-12 col-md-12 wow fadeInUp" data-wow-delay="0.5s">
                                        <form onSubmit={handleSubmit}>
                                            <div className="row g-3">
                                                <div className="col-md-6">
                                                    <div className="form-floating">
                                                        <input type="text"
                                                            className="form-control"
                                                            id="vehicleNumber"
                                                            name="vehicleNumber"
                                                            placeholder="Vehicle Number"
                                                            value={formData.vehicleNumber}
                                                            onChange={handleChange} />
                                                        <label htmlFor="vehicleNumber">Vehicle Number</label>
                                                    </div>
                                                    {errors.vehicleNumber && (
                                                        <small className="text-danger">{errors.vehicleNumber}</small>
                                                    )}
                                                </div>
                                                <div className="col-6">
                                                    <button className="btn btn-primary w-100 py-3" type="submit">
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                    }
                </div>
            </div >
            < Footer />
        </>
    );
}
