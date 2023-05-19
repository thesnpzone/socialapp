import { configureStore } from "@reduxjs/toolkit"
import { likeReducer, myPostsReducer, userPostsReducer } from "./Reducers/Post";
import { allUsersReducer, postOfFollowingReducer, userProfileReducer, userReducer } from "./Reducers/User";


// const intitialState = {}

const store = configureStore({

    reducer: {

        user: userReducer,

        postofFollowing: postOfFollowingReducer,

        allUsers: allUsersReducer,

        like: likeReducer,

        myPosts: myPostsReducer,

        userProfile: userProfileReducer,

        userPosts: userPostsReducer,

    }

});

export default store;