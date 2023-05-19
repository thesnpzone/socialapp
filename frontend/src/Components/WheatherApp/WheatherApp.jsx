import React, { useEffect, useState } from 'react'
import { getData } from './api';
import Dandt from './Dandt';
import './Wheather.css'

import SearchIcon from '@mui/icons-material/Search';

import img1 from '../../Asset/img/Location.png'
import img2 from '../../Asset/img/Humidity.png'
import img3 from '../../Asset/img/Sunrise.png'
import img4 from '../../Asset/img/Sunset.png'
import img5 from '../../Asset/img/Condition.png'
import img6 from '../../Asset/img/Cloud.png'


const WheatherApp = () => {

  const [data, getwheatherdata] = useState(null);
  const [click, handleClick] = useState(false);
  const [city, setCity] = useState('nagpur');
  const [country, setCountry] = useState('india');



  useEffect(() => {

    const wheatherInfo = async () => {
      city && await getData(city, country).then(response => {

        getwheatherdata(response.data)

        // console.log(response.data);
      })
    }

    wheatherInfo();
    // console.log(city, country);

    handleClick();
  }, [click]);

  const handlecitychange = (city) => {

    setCity(city);

  }

  const handlecountrychange = (country) => {

    setCountry(country);

  }

  useEffect(() => {



    getData().then(response => {

      getwheatherdata(response.data)

      // console.log(response.data);


    })

  }, [])



  return (
    <>

      <section className="wheathersection1">

        <div className="container" style={{ marginTop: "10rem" }}>

          <div className="row">

            <div className="col-lg-12 p-5">

              <div className="wheathercard  " >

                <div className="card-body">

                  <div className="row">


                    {/* API, Time, Date, Search Location Section */}

                    <div className="col-lg-7 card2">

                      <form className='mb-5'>


                        <div className="row">

                          <div className="col">

                            {/* <input type="text" className="form-control " placeholder="City" onChange={(e) => handlecitychange(e.target.value)} /> */}


                            <div class="input-group">

                              <input type="text" class="form-control" placeholder="Search City" onChange={(e) => handlecitychange(e.target.value)} />

                              <div class="input-group-append">

                                <button type="button" className="btn btn-primary" onClick={() => handleClick(true)}>

                                  <SearchIcon />

                                </button>

                              </div>

                            </div>

                          </div>

                        </div>

                      </form>

                      <Dandt />


                      {data != null ? (<h1 style={{ fontSize: "10rem" }}> <span className='size'>{data.main.temp}</span>°C</h1>) : null}


                    </div>


                    <div className="col-lg-5 ">

                      {data != null ? (


                        <>

                          <h3> <img src={img1} className='img-fluid' alt="" /> Location: {data.name}</h3><br />

                          <h3> <img src={img2} className='img-fluid' alt="" />Humidity: {data.main.humidity}% </h3><br />

                          <h3> <img src={img3} className='img-fluid' alt="" />Sun Rise: {new Date(data.sys.sunrise * 1000).toLocaleTimeString()} </h3><br />

                          <h3> <img src={img4} className='img-fluid' alt="" />Sun Set: {new Date(data.sys.sunset * 1000).toLocaleTimeString()} </h3><br />

                          <h3> <img src={img5} className='img-fluid' alt="" />Contition: {data.weather[0].main}</h3><br />

                          <h3> <img src={img6} className='img-fluid' alt="" />Clouds: {data.clouds.all}%</h3>

                        </>

                      ) : null}

                    </div>

                  </div>


                </div>

              </div>

            </div>

          </div>

        </div>

      </section>





    </>
  )
}

export default WheatherApp