import React from 'react'
import { Link } from 'react-router-dom'

const Detail = () => {
  return (
    <>
    <header className='detail_header'>
      <h2>Titulo del producto</h2>
      <Link to={'/'}>
        <p>Volver al inicio</p>
      </Link>
    </header>
    <body>texto descriptivo del producto e imagenes</body>
    </>
  )
}

export default Detail