import React from 'react'

import "./NotFound.css"

import error from './404.png'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>

      <div className='errordiv'>
        <aside className='erroraside'><img className='errorimg' src={error} alt="404 Image" />
        </aside>
        <main className='errormain'>
          <h1 className='errorh1'>Sorry!</h1>
          <p className='errorp'>
            Either you aren't cool enough to visit this page or it doesn't exist <em>. . . like your Girlfriend.</em>
          </p>
          <Link to="/"> <button className='errorbutton'>You can go now!</button></Link>
        </main>
      </div>


    </>
  )
}

export default NotFound