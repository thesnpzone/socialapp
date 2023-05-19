import { Avatar, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../Actions/User';
import Lnavbar from '../Lnavbar/Lnavbar';

import "./Register.css"

const Register = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error } = useSelector((state) => state.user);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(name, email, password, avatar));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, error, alert]);



  return (
    <>

      <div class="container">

        <Lnavbar />

        <div class="row frow">

          <div className="col-lg-12 p-5 text-center">

            <form className='registerForm' onSubmit={submitHandler} >

      
              <div class="row">

                <div className="col-lg-6 registerForm">

                  <Avatar
                    src={avatar}
                    alt="User"
                    className=' mx-auto img-fluid'
                    sx={{ height: "20vmax", width: "20vmax" }}
                  />

                  <input type="file" className='mt-5' accept="image/*" onChange={handleImageChange} />

                </div>


                <div className="col-lg-6">


                  <div class="form-group pt-5 mt-5">

                    <input
                      type="text"
                      value={name}
                      placeholder="Name"
                      class="form-control control "
                      required
                      onChange={(e) => setName(e.target.value)}
                    />

                  </div>

                  <div class="form-group pt-5 mt-5">

                    <input
                      type="email"
                      placeholder="Email"
                      class="form-control control "
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />

                  </div>


                  <div class="form-group pt-5 mt-5">

                    <input
                      type="password"
                      class="form-control control "
                      placeholder="Password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                  </div>


                  <button disabled={loading} class="btn btn btn-lg  mt-5" type="submit">
                    Sign Up
                  </button>

                </div>

              </div>








            </form>


          </div>

        </div>

      </div>







    </>
  )
}

export default Register