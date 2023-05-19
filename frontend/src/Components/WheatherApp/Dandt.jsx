import React, { useState } from 'react'

// import css 

import './DandT.css'


const Dandt = () => {

    // Date And Day Funcation Section Start //

    const d = new Date()

    // console.log(d);


    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',]

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']


    const day = weekdays[d.getDay()]

    const month = months[d.getMonth()]

    const date = d.getDate()

    const year = d.getFullYear()

    // Date And Day Funcation Section end //

    // ------------------***************----------------- //

    // Time Funcation Section Start //

    let time = new Date().toLocaleTimeString();

    const [ctime, setCtime] = useState(time)


    const UpdatTime = () => {

        let time = new Date().toLocaleTimeString();

        setCtime(time)

    }

    setInterval(UpdatTime, 1000);

    // Time Funcation Section End //

    return (
        <>



            <div className="time">

                <h1>{day}</h1>

                <h1>{month} {date} {year}, {ctime}</h1>




            </div>
        </>
    )

};

export default Dandt;
