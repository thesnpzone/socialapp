import React from 'react'

import loader from './loader.gif'

function Loader() {
  return (
    <>
    
    <div class="container-fluid loadercenter">

      <div className="col-lg-12 text-center">

            <img src={loader} alt="" />
        
      </div>
      
    </div>
    
    </>
  )
}

export default Loader