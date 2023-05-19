import React from 'react'
import { Link } from 'react-router-dom'


export const User = ({ userId, name, avatar }) => {
    return (
        <>

            <div className="text-left mt-3">

                <Link to={`/user/${userId}`}>

                    <div class="container-fluid">



                        <img className='imguserimg' src={avatar} alt={name} />




                        &nbsp;&nbsp;<span>{name}</span>



                    </div>







                </Link>


            </div>



        </>
    )
}
