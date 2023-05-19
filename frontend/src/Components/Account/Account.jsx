import { Avatar, Button, Dialog, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { getMyPosts, logoutUser } from '../../Actions/User';
import Loader from '../Loader/Loader';
import Post from '../Post/Post';
import { User } from '../User/User';

import "./Account.css"
const Account = () => {

    const dispatch = useDispatch();

    const alert = useAlert()

    const { user, loading: userLoading } = useSelector((state) => state.user);

    const { loading, error, posts } = useSelector((state) => state.myPosts);

    const { error: likeError, message } = useSelector((state) => state.like)

    const [followersToggle, setFollowersToggle] = useState(false);

    const [followingToggle, setFollowingToggle] = useState(false);

    const logoutHandler = () => {
        dispatch(logoutUser());
        alert.success("Logged out successfully");
      };

    useEffect(() => {
        dispatch(getMyPosts())
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
        loading === true || userLoading === true ? <Loader /> : (
            <>

                <div class="container-fluid">

                    <div class="row">

                        <div className="col-lg-3 ">

                            {/* <p>Profile Ditails</p> */}

                            <Avatar
                                className=''
                                src={user.avatar.url}
                                sx={{ height: "18vmax", width: "18vmax" }}
                            />



                        </div>

                        <div className="col-lg-9 pt-5">
                            <Typography variant='h2'>{user.name}</Typography>

                            {/* following follweers post section  */}

                            <div class="row p-4">

                                <div className="col-4">

                                    <div className="">

                                        <button  className='folloandfollowingbtn' onClick={() => setFollowersToggle(!followersToggle)}>
                                            <Typography variant='h4'>Followers</Typography>
                                        </button>
                                        <Typography variant='h5' className='pt-3'>{user.followers.length}</Typography>

                                    </div>



                                </div>

                                <div className="col-4">

                                    <div className="">

                                        <button className='folloandfollowingbtn' onClick={() => setFollowingToggle(!followingToggle)}>
                                            <Typography variant='h4'>Following</Typography>
                                        </button>
                                        <Typography variant='h5' className='pt-3'>{user.following.length}</Typography>

                                    </div>

                                </div>

                                <div className="col-4">

                                    <div className="">


                                        <Typography variant='h4'>Post</Typography>

                                        <Typography variant='h5' className='pt-3'>{user.posts.length}</Typography>

                                    </div>

                                </div>

                            </div>

                            {/* edit profile logout section  */}

                            <div class="row p-4">

                                <div className="col-4">

                                    <Link to="/update/profile">Edit Profile</Link>

                                </div>

                                <div className="col-4">

                                    <Button variant='contained' color='error' onClick={logoutHandler}>Logout</Button>

                                </div>

                                <Dialog
                                    open={followersToggle}
                                    onClose={() => setFollowersToggle(!followersToggle)}
                                >
                                    <div className="DialogBox">
                                        <Typography variant="h4">Followers</Typography>

                                        {user && user.followers.length > 0 ? (
                                            user.followers.map((follower) => (
                                                <User
                                                    key={follower._id}
                                                    userId={follower._id}
                                                    name={follower.name}
                                                    avatar={follower.avatar.url}
                                                />

                                                
                                            ))
                                        ) : (
                                            <Typography style={{ margin: "2vmax" }}>
                                                You have no followers
                                            </Typography>
                                        )}
                                    </div>
                                </Dialog>

                                <Dialog
                                    open={followingToggle}
                                    onClose={() => setFollowingToggle(!followingToggle)}
                                >
                                    <div className="DialogBox">
                                        <Typography variant="h4">Following</Typography>

                                        {user && user.following.length > 0 ? (
                                            user.following.map((follow) => (
                                                <User
                                                    key={follow._id}
                                                    userId={follow._id}
                                                    name={follow.name}
                                                    avatar={follow.avatar.url}
                                                />
                                            ))
                                        ) : (
                                            <Typography style={{ margin: "2vmax" }}>
                                                You're not following anyone
                                            </Typography>
                                        )}
                                    </div>
                                </Dialog>

                                <div className="col-4"></div>

                            </div>

                            
                        </div>

                    </div>

                    <hr />

                    <div class="row mt-5">

                        <div className="col-lg-4"></div>
            

                        <div className="col-lg-4">

                            {
                                posts && posts.length > 0 ? posts.map(post => (
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
                                        isAccount={true}
                                        isDelete={true}
                                    />
                                )) : <Typography variant='h4'>You Not Made Any Post</Typography>
                            }

                        </div>

                        <div className="col-lg-4"></div>

                    </div>

                </div>

            </>
        )
    )
}

export default Account