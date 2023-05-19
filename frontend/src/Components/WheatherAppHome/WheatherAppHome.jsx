import React, { useEffect, useState } from 'react'
import { getData } from './api';

import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';


const WheatherAppHome = () => {

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



  useEffect(() => {



    getData().then(response => {

      getwheatherdata(response.data)

      // console.log(response.data);


    })

  }, [])


  return (
    <>


      <div class="container-fluid">

        <div class="row">

          <div className="col-12">

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

            {
              data != null ? (<h2 className=''>{data.name}</h2>) : null
            }

          </div>

          <div className="col-12">

            {
              data != null ? (<h1 className='wheathertemp'>{data.main.temp}<sup>°</sup></h1>) : null
            }

          </div>

          <div className="col-12 wheatherdetials">

            <div class="container-fluid">

              {
                data != null ? (

                  <div class="row text-center">

                    <div className="col-4">

                      <h1>{data.main.humidity}%</h1>
                      <span>Humidity</span>

                    </div>

                    <div className="col-4">

                      <h1>{data.weather[0].main}</h1>
                      <span>Contition</span>

                    </div>

                    <div className="col-4">

                      <h1>{data.clouds.all}%</h1>
                      <span>Clouds</span>

                    </div>

                    <div className="col-2 mt-3"></div>
                    <div className="col-8 mt-3 wheatherhometomainwheathert"><Link to="/wheatherapp" t>Know More</Link></div> {/* All Link from Router To Wheather App */}
                    <div className="col-2 mt-3"></div>

                  </div>

                ) : null
              }


            </div>

          </div>

        </div>

      </div>



    </>
  )
}

export default WheatherAppHome