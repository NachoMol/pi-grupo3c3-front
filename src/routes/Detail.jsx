import React from 'react'
import { Link } from 'react-router-dom'

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
    <Link to={'/CarGallery'}>
    <button>More photos</button>
    </Link>
    </div>
    <div className='detail-information'>
      <h3>Car details</h3>
      <p>Year: 2016</p>
      <p>Version: 1.4 Ltz 153cv</p>
      <p>Transmission: Manual</p>
      <h4>Price: $10.0000 per day</h4>
      <button>Rent now</button>
    </div>
    </div>
    </body>
    </>
  )
}

export default Detail