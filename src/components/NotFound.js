import React from 'react'
import '../assets/styles/components/NotFound.css'
import notFound from '../assets/static/404.png'

export default function NotFound () {
  return (
    <div id='notFound'>

      <div className='msj'>
        <p>404</p>
        <p>NOT FOUND</p>
      </div>
      <img src={notFound} alt="Not Found" />
      
    </div>
  )
}
  
      