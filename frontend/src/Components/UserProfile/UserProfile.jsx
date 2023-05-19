import { Avatar, Button, Dialog, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { followAndUnfollowUser, getUserPosts, getUserProfile } from '../../Actions/User';
import Loader from '../Loader/Loader';
import Post from '../Post/Post';
import { User } from '../User/User';

const UserProfile = () => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const {
        user,
        loading: userLoading,
        error: userError,
    } = useSelector((state) => state.userProfile);

    const { user: me } = useSelector((state) => state.user);
    const { loading, error, posts } = useSelector((state) => state.userPosts);
    const {
        error: followError,
        message,
        loading: followLoading,
    } = useSelector((state) => state.like);

    const params = useParams();
    const [followersToggle, setFollowersToggle] = useState(false);
    const [followingToggle, setFollowingToggle] = useState(false);
    const [following, setFollowing] = useState(false);
    const [myProfile, setMyProfile] = useState(false);

    const followHandler = async () => {
        setFollowing(!following);
        await dispatch(followAndUnfollowUser(user._id));
        dispatch(getUserProfile(params.id));
    };

    useEffect(() => {
        dispatch(getUserPosts(params.id));
        dispatch(getUserProfile(params.id));
    }, [dispatch, params.id]);

    useEffect(() => {
        if (me._id === params.id) {
            setMyProfile(true);
        }
        if (user) {
            user.followers.forEach((item) => {
                if (item._id === me._id) {
                    setFollowing(true);
                } else {
                    setFollowing(false);
                }
            });
        }
    }, [user, me._id, params.id]);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch({ type: "clearErrors" });
        }

        if (followError) {
            alert.error(followError);
            dispatch({ type: "clearErrors" });
        }

        if (userError) {
            alert.error(userError);
            dispatch({ type: "clearErrors" });
        }
        if (message) {
            alert.success(message);
            dispatch({ type: "clearMessage" });
        }
    }, [alert, error, message, followError, userError, dispatch]);

    return loading === true || userLoading === true ? (
        <Loader />
    ) : (

        <>

            <div class="container-fluid">

                {user && (
                    <div class="row">

                        <div className="col-lg-3">

                            <Avatar
                                src={user.avatar.url}
                                sx={{ height: "18vmax", width: "18vmax" }}
                            />


                        </div>

                        <div className="col-lg-9 pt-5">

                            <Typography variant='h2'>{user.name}</Typography>

                            <div class="row p-4">

                                <div className="col-4">

                                    <button className='folloandfollowingbtn'
                                        onClick={() => setFollowersToggle(!followersToggle)}>
                                        <Typography variant='h4'>Followers</Typography>
                                    </button>
                                    <Typography variant='h5' className='pt-3'>{user.followers.length}</Typography>

                                </div>

                                <div className="col-4">

                                    <button className='folloandfollowingbtn' onClick={() => setFollowingToggle(!followingToggle)}>
                                        <Typography variant='h4'>Following</Typography>
                                    </button>
                                    <Typography variant='h5' className='pt-3'>{user.following.length}</Typography>

                                </div>


                                <div className="col-4">



                                    <Typography variant='h4'>Post</Typography>

                                    <Typography variant='h5' className='pt-3'>{user.posts.length}</Typography>



                                </div>

                            </div>


                            <div class="row p-4">


                                <div className="col-4">

                                    {myProfile ? null : (
                                        <Button
                                            variant="contained"
                                            style={{ background: following ? "red" : "" }}
                                            onClick={followHandler}
                                            disabled={followLoading}
                                        >
                                            {following ? "Unfollow" : "Follow"}
                                        </Button>
                                    )}

                                </div>


                            </div>

                        </div>

                    </div>
                )}

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

                <hr />

                <div class="row mt-5">

                    <div className="col-lg-4"></div>

                    <div className="col-lg-4">

                        {posts && posts.length > 0 ? (
                            posts.map((post) => (
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
                            ))
                        ) : (
                            <Typography variant="h6">User has not made any post</Typography>
                        )}


                    </div>

                    <div className="col-lg-4"></div>


                </div>


            </div>

        </>





    );
}

export default UserProfile