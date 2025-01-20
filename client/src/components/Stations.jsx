import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
export default function Stations() {
    const navigate = useNavigate()
    const [stations, setStations] = useState([])
    console.log(stations);


    useEffect(() => {
        axios.get(`http://localhost:4000/station/all-stations`)
            .then(res => {
                setStations(res.data.data)
            })
    }, [])
    return (
        <div className="container-xxl py-5">
            <div className="container">
                <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
                    <h6 className="section-title bg-white text-center text-primary px-3">
                        Stations
                    </h6>
                    <h1 className="mb-5">All Stations</h1>
                </div>
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
                                 <div className='manage-station-btns mb-5' >
                                         {/* <button className='btn btn-success' onClick={() => handleEditStation(station._id)}>View</button> */}
                                         <button className='btn btn-info' style={{width:'250px', marginBottom:'20px'}}>Book Now</button>
                                     </div>
                             </div>
                         </div>
                        ))}

                </div>
            </div>
        </div>
    )
}
