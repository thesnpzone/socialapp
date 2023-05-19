import React from 'react'
import Clender from './Clender'
import Clock from './Clock'
import "./TimeandCalenderHome.css"
const TimeandCalenderHome = () => {
    return (
        <div className='homethirdcol px-5 pb-5 pt-3'>
            

            <div className="col-12">


                <Clock />

            </div>

            <div className="col-12 mt-5">


                <Clender />


            </div>




        </div>
    )
}

export default TimeandCalenderHome