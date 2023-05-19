import React from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'
import menu from '../../Asset/img/menubar.png'
import logo from '../../Asset/img/Llogo.png'
import { Navbar } from '../Navbar/Navbar'


const Header = () => {
  return (
    <>

      <div class="container-fluid p-4 d-flex justify-content-between  navcolor">

        <Link to="/"><img src={logo} alt="" className='logo' /></Link>

     

          <Navbar />


      </div>



    </>
  )
}

export default Header