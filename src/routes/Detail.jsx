import React from 'react'
import { Link } from 'react-router-dom'
import CarGallery from '../components/CarGallery'

const Detail = () => {
  return (
    <>
    <header className='detail_header'>
      <h2 className='detail_title'>Chevrolet Cruze II 1.4 LTZ 153CV Hatchback 2016</h2>
      <Link to={'/'}>
      <img className='back-logo' src="../../public/images/back-logo.png" alt="volver al inicio" />
      </Link>
    </header>
    <body>
    <div className='detail-div'>
    <div>
      <CarGallery/>
    {/* <Link to={'/CarGallery'}>
    <button>More photos</button>
    </Link> */}
    </div>
    <div className='detail-information'>
      <h3>Car details</h3>
      <p><strong>Brand: </strong>Chevrolet</p>
      <p><strong>Model: </strong>Hatchback 2016</p>
      <p><strong>Car Type: </strong>Basic</p>
      <p><strong>Seats: </strong>4</p>
      <h4><strong>Price: </strong>$10.0000 per day</h4>
      <button className='rent-button'>Rent now</button>
    </div>
    </div>
    </body>
    </>
  )
}

export default Detail