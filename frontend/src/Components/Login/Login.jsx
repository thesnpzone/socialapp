import React, { useState } from 'react'
import Lnavbar from '../Lnavbar/Lnavbar'
import './Login.css'
import login from '../../Asset/img/login.gif'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../Actions/User'
const Login = () => {

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const loginHandler = (e) => {
        e.preventDefault();

        dispatch(loginUser(email, password));
        
        // console.log(email,password);
    }

    return (
        <>



            <div class="container">

                <Lnavbar />

                <div class="row frow">

                    <div className="col-lg-6 p-5">

                        <form onSubmit={loginHandler}>

                            <div class="form-group pt-5 mt-5">

                                <input
                                    type="email"
                                    class="form-control"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required />


                            </div>



                            <div class="form-group pt-5 mt-5">

                                <input 
                                type="password" 
                                class="form-control" 
                                placeholder="Password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required />

                            </div>

                            <br /><br />

                            <button type="submit" class="btn btn btn-lg btn-block">Login</button>

                        </form>


                    </div>
                    <div className="col-lg-6">

                        <img src={login} className='img-fluid' alt="" />

                    </div>

                </div>


            </div>

        </>
    )
}

export default Login