import React from 'react'
import '../styless/CarGallery.css'
const CarGallery = () => {
  return (
    <div className='gallery'>
      <div className='mainPhotoContainer'>
        <img className='mainPhoto' src="https://images.coches.com/_vo_/fotos/usados/2023/10/23/c/24405926360767122-767122_1.JPG?p=cc_vo_high" alt="" />
      </div>
      <div>
        <ul className='photosContainer'>
          <il className='photos'><img className='photo' src="https://images.coches.com/_vo_/fotos/usados/2023/10/23/0/2405926360767122-767122_3.JPG?p=cc_vo_high" alt="" /></il>
          <il className='photos'><img className='photo' src="https://images.coches.com/_vo_/fotos/usados/2023/10/23/8/3405926360767122-767122_4.JPG?p=cc_vo_high" alt="" /></il>
          <il className='photos'><img className='photo' src="https://images.coches.com/_vo_/fotos/usados/2023/10/23/a/6405926360767122-767122_7.JPG?p=cc_vo_high" alt="" /></il>
          <il className='photos'><img className='photo' src="https://images.coches.com/_vo_/fotos/usados/2023/10/23/9/17405926360767122-767122_18.JPG?p=cc_vo_high" alt="" /></il>
        </ul>
      </div>
    </div>
  )
}

export default CarGallery
