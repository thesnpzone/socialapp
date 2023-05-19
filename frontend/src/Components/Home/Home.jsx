import { Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAllUsers, getFollowingPosts } from '../../Actions/User'
import Loader from '../Loader/Loader'
import Post from '../Post/Post'
import TimeandCalenderHome from '../TimeandCalenderHome/TimeandCalenderHome'
import { User } from '../User/User'

import WheatherAppHome from '../WheatherAppHome/WheatherAppHome';


import "./Home.css"


const Home = () => {


    const dispatch = useDispatch();

    const { loading, posts, error } = useSelector(state => state.postofFollowing)

    const alert = useAlert();

    const { error: likeError, message } = useSelector((state) => state.like)


    const { users, loading: usersLoading } = useSelector(
        (state) => state.allUsers
    );


    useEffect(() => {

        dispatch(getFollowingPosts())

        dispatch(getAllUsers())

    }, [dispatch])


    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch({ type: "clearErrors" })
        }

        if (likeError) {
            alert.error(likeError)
            dispatch({ type: "clearErrors" })
        }
        if (message) {
            alert.success(message)
            dispatch({ type: "clearMessage" })
        }


    }, [alert, error, message, likeError, dispatch])

    return (

        loading === true || usersLoading === true ? <Loader /> :

            <>

                <section className="home">

                    <div class="container-fluid">

                        <div class="row">

                            <section className="sectionLeft  col-lg-4 bgimg p-3">

                                <WheatherAppHome />

                            </section>


                            <section className="sectionCenter col-lg-4">

                                {
                                    posts && posts.length > 0 ? posts.map((post) => (

                                        <Post

                                            key={post._id}
                                            postId={post._id}
                                            caption={post.caption}
                                            postImage={post.image.url}
                                            likes={post.likes}
                                            comments={post.comments}
                                            ownerImage={post.owner.avatar.url}
                                            ownerName={post.owner.name}
                                            ownerId={post.owner._id}


                                        />

                                    )) : <Typography variant='h6'>No post yet</Typography>
                                }

                            </section>


                            <section className="  col-lg-4">

                                <TimeandCalenderHome />

                            </section>



                        </div>

                    </div>

                </section>

            </>

    )
}

export default Home