import React from 'react'
import { Link } from 'react-router-dom'
import CarGallery from '../components/CarGallery'
import '../styless/Detail.css'

const Detail = () => {
  return (
    <>
    <header className='detail_header'>
      <Link to={'/'} className='back-logo-container'>
      <img className='back-logo' src="https://www.iconpacks.net/icons/3/free-icon-left-arrow-7252.png" alt="" />
      </Link>
      <h2 className='detail_title'>Chevrolet Cruze II 1.4 LTZ 153CV Hatchback 2016</h2>
    </header>
    
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
    
    </>
  )
}

export default Detail