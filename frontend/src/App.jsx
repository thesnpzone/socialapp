import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "../node_modules/bootstrap/dist/css/bootstrap.css"
import "./Asset/css/main.css"
import "../node_modules/bootstrap/dist/js/bootstrap"
import Header from './Components/Header/Header';
import Login from './Components/Login/Login';
import { loadUser } from './Actions/User';
import { useDispatch, useSelector } from 'react-redux';
import Home from './Components/Home/Home';
import Account from './Components/Account/Account';
import NewPost from './Components/NewPost/NewPost';

import UpdateProfile from './Components/UpdateProfile/UpdateProfile';
import UserProfile from './Components/UserProfile/UserProfile';
import Search from './Components/Search/Search';
import NotFound from './Components/NotFound/NotFound';
import WheatherApp from './Components/WheatherApp/WheatherApp';
import Translatere from './Components/Translatere/Translatere';
import DictionaryApp from './Components/DictionaryApp/DictionaryApp';
import NewsApp from './Components/NewsApp/NewsApp';
const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <Router>



      {

        isAuthenticated && <Header />

      }



      <Routes>

        <Route path='/' element={isAuthenticated ? <Home /> : <Login />} />

        <Route path='/account' element={isAuthenticated ? <Account /> : <Login />} />

        <Route path='/newpost' element={isAuthenticated ? <NewPost /> : <Login />} />

        <Route path="/update/profile" element={isAuthenticated ? <UpdateProfile /> : <Login />} />

        <Route path="/User/:id" element={isAuthenticated ? <UserProfile /> : <Login />} />

        <Route path="/wheatherapp" element={isAuthenticated ? <WheatherApp /> : <Login />} />

        <Route path="/translatere" element={isAuthenticated ? <Translatere /> : <Login />} />

        <Route path="/dictionaryapp" element={isAuthenticated ? <DictionaryApp /> : <Login />} />

        <Route path="/newsApp" element={isAuthenticated ? <NewsApp /> : <Login />} />

        <Route path="search" element={isAuthenticated ? <Search /> : <Login />} />

        <Route path='*' element={<NotFound />} />

        {/* <Route path='/register' element={isAuthenticated ? <Account /> : <Register />} /> */}

      </Routes>

    </Router>
  )
}

export default App