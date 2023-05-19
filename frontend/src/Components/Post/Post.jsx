

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import "./Post.css"

import {
    MoreVert,
    Favorite,
    FavoriteBorder,
    ChatBubbleOutline,
    DeleteOutline,
} from "@mui/icons-material";
import { Avatar, Button, Dialog, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addCommentOnPost, deletePost, likePost, updatePost } from '../../Actions/Post';

import { getFollowingPosts, getMyPosts, loadUser } from '../../Actions/User';
import { User } from '../User/User';
import CommentCard from '../CommentCard/CommentCard';

const Post = ({
    postId,
    caption,
    postImage,
    likes = [],
    comments = [],
    ownerImage,
    ownerName,
    ownerId,
    isDelete = false,
    isAccount = false,
}) => {


    const [liked, setLiked] = useState(false);

    const [likesUser, setLikesUser] = useState(false);

    const [commentValue, setCommentValue] = useState("");

    const [commentToggle, setCommentToggle] = useState(false);

    const [captionValue, setCaptionValue] = useState(caption);

    const [captionToggle, setCaptionToggle] = useState(false);

    const dispatch = useDispatch()

    const { user } = useSelector(state => state.user)

    const handleLike = async () => {
        setLiked(!liked)

        await dispatch(likePost(postId))

        dispatch(getMyPosts());

        dispatch(getFollowingPosts());


    }

    const addCommentHandler = async (e) => {
        e.preventDefault()

        await dispatch(addCommentOnPost(postId, commentValue));

        dispatch(getMyPosts());

        dispatch(getFollowingPosts());

    };

    const updateCaptionHandler = (e) => {

        e.preventDefault();

        dispatch(updatePost(captionValue, postId));

        dispatch(getMyPosts());
    };


    const deletePostHandler = async () => {

        await dispatch(deletePost(postId));

        dispatch(getMyPosts());

        dispatch(loadUser());
    };


    useEffect(() => {
        likes.forEach(item => {
            if (item._id === user._id) {
                setLiked(true)
            }
        })
    }, [likes, user._id])


    return (
        <>

            <section className="post">

                <div className="postHeader">

                    {isAccount ? <Button onClick={() => setCaptionToggle(!captionToggle)}>

                        <MoreVert />

                    </Button> : null}

                </div>

                <img className='rounded mx-auto d-block img-fluid' src={postImage} alt="Post" />


                <div className="postDetails">

                    {/* <img src={ownerImage} alt="User" className='imguserimg' /> */}

                    <Avatar
                        src={ownerImage}
                        alt="User"
                        sx={{
                            height: "4vmax",
                            width: "4vmax",
                        }}
                    />

                    <Link to={`/user/${ownerId}`}>

                        <span>{ownerName}</span>

                    </Link>




                </div>

                {
                    !caption ? null : (
                     <>
                        <span>{caption}</span>
                        <br />
                     </>
                    )
                }


     

                <button style={{
                    border: "none",
                    backgroundColor: "#FBF2FF",
                    cursor: "pointer",
                    margin: "1vmax 2vmax"
                }}

                    onClick={() => setLikesUser(!likesUser)}
                    disabled={likes.length === 0 ? true : false}
                >{likes.length} Like</button>



                <div className="postFooter">

                    <Button onClick={handleLike}>

                        {liked ? <Favorite style={{ color: "red" }} /> : <FavoriteBorder />}

                    </Button>

                    <Button onClick={() => setCommentToggle(!commentToggle)}>

                        <ChatBubbleOutline />

                    </Button>

                    {

                        isDelete ?
                            <Button onClick={deletePostHandler}>

                                <DeleteOutline />

                            </Button> : null

                    }

                </div>

                {/* like box  */}
                <Dialog
                    open={likesUser}
                    onClose={() => setLikesUser(!likesUser)}>

                    <div className="DialogBox">

                        <Typography variant='h4'>Liked by</Typography>

                        {likes.map((like) => (
                            <User
                                key={like._id}
                                userId={like._id}
                                name={like.name}
                                avatar={like.avatar.url}
                            />
                        ))}

                    </div>

                </Dialog>

                {/* comment box  */}
                <Dialog
                    open={commentToggle}
                    onClose={() => setCommentToggle(!commentToggle)}
                >
                    <div className="DialogBox">
                        <Typography variant="h4">Comments</Typography>

                        <form className="commentForm" onSubmit={addCommentHandler}>
                            <input
                                type="text"
                                value={commentValue}
                                onChange={(e) => setCommentValue(e.target.value)}
                                placeholder="Comment Here..."
                                required
                            />

                            <Button type="submit" className='btn' >
                                Add
                            </Button>
                        </form>

                        {comments.length > 0 ? (
                            comments.map((item) => (
                                <CommentCard
                                    userId={item.user._id}
                                    name={item.user.name}
                                    avatar={item.user.avatar.url}
                                    comment={item.comment}
                                    commentId={item._id}
                                    key={item._id}
                                    postId={postId}
                                    isAccount={isAccount}
                                />
                            ))
                        ) : (
                            <Typography>No comments Yet</Typography>
                        )}
                    </div>
                </Dialog>

                {/* Update box  */}

                <Dialog
                    open={captionToggle}
                    onClose={() => setCaptionToggle(!captionToggle)}
                >
                    <div className="DialogBox">
                        <Typography variant="h4">Update Caption</Typography>

                        <form className="commentForm" onSubmit={updateCaptionHandler}>
                            <input
                                type="text"
                                value={captionValue}
                                onChange={(e) => setCaptionValue(e.target.value)}
                                placeholder="Caption Here..."
                                required
                            />

                            <Button type="submit" variant="contained">
                                Update
                            </Button>
                        </form>
                    </div>
                </Dialog>

            </section>

        </>
    )
}

export default Post