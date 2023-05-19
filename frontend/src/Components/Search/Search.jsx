import { Button, Typography } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../Actions/User';
import { User } from '../User/User';
import UserSearch from '../UserSearch/UserSearch';

import "./Search.css"

const Search = () => {

  const [name, setName] = React.useState("");

  const { users, loading } = useSelector((state) => state.allUsers);

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(getAllUsers(name));
  };

  return (
    <>

      <div className="container">

        <div class="row">

          <div className="col-lg-12">

            <form className="searchFormtwo form-group" onSubmit={submitHandler}>

              <div className="searchForm">

              <Typography variant="h3" style={{ padding: "2vmax" }}>
                Search User
              </Typography>

              <input
                type="text"
                value={name}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
                class=""
                required
              />

              <button className='btn btn-lg  btnstyle' disabled={loading} type="submit">
                Search
              </button>

              </div>
              
  

              <div class="row text-left">

                {users &&
                  users.map((user) => (
                    <div className="col-lg-3">



                      <UserSearch
                        key={user._id}
                        userId={user._id}
                        name={user.name}
                        avatar={user.avatar.url}
                      />



                    </div>
                  ))}

              </div>

            </form>


          </div>

        </div>

      </div>

    </>
  )
}

export default Search