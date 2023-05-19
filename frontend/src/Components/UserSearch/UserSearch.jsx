import React from 'react'
import { Link } from 'react-router-dom'

const UserSearch = ({ userId, name, avatar }) => {
    return (
        <>

            <div className="text-left mt-3">

                <Link to={`/user/${userId}`}>

                    <div class="container-fluid">

                        <div class="row">

                            <div className="col-4">

                                <img className='imguserimg' src={avatar} alt={name} />

                            </div>
                            <div className="col-8 text-center">

                                &nbsp;&nbsp;<span>{name}</span>

                            </div>

                        </div>

                    </div>







                </Link>


            </div>



        </>
    )
}

export default UserSearch