import { Avatar, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser, updateProfile } from '../../Actions/User';
import Loader from '../Loader/Loader';

import './UpdateProfile.css'

const UpdateProfile = () => {
    const { loading, error, user } = useSelector((state) => state.user);
    const {
        loading: updateLoading,
        error: updateError,
        message,
    } = useSelector((state) => state.like);

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [avatar, setAvatar] = useState("");
    const [avatarPrev, setAvatarPrev] = useState(user.avatar.url);

    const dispatch = useDispatch();
    const alert = useAlert();

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        const Reader = new FileReader();
        Reader.readAsDataURL(file);

        Reader.onload = () => {
            if (Reader.readyState === 2) {
                setAvatarPrev(Reader.result);

                setAvatar(Reader.result);
            }
        };
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        await dispatch(updateProfile(name, email, avatar));
        dispatch(loadUser());
    };

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: "clearErrors" });
        }

        if (updateError) {
            alert.error(updateError);
            dispatch({ type: "clearErrors" });
        }

        if (message) {
            alert.success(message);
            dispatch({ type: "clearMessage" });
        }
    }, [dispatch, error, alert, updateError, message]);

    return loading ? (
        <Loader />
    ) : (

        <>

            <div className="container">

                <div class="row frow">

                    <div className="col-lg-12 px-5  pb-5 text-center">

                        <div className="col-lg-12">

                            <Typography variant="h3" style={{ padding: "2vmax" }}>
                                Update Profile
                            </Typography>

                        </div>

                        <form className='registerForm' onSubmit={submitHandler} >


                            <div class="row">


                                <div className="col-lg-6 registerForm">

                                    <Avatar
                                        src={avatarPrev}
                                        alt="User"
                                        sx={{ height: "20vmax", width: "20vmax" }}
                                        className=' mx-auto img-fluid'
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





                                    <button disabled={updateLoading} class="btn btn btn-lg  mt-5" type="submit">
                                        Update
                                    </button>

                                </div>

                            </div>








                        </form>


                    </div>

                </div>




            </div>

        </>




    );
}

export default UpdateProfile