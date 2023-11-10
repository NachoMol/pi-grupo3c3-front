import React, { useState } from 'react';
import '../styless/CarGallery.css';

const CarGallery = () => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const handleZoomPreviousClick = () => {
    const newIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(newIndex);
  };

  const handleZoomNextClick = () => {
    const newIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(newIndex);
  };

  const images = [
    "https://images.coches.com/_vo_/fotos/usados/2023/10/23/c/24405926360767122-767122_1.JPG?p=cc_vo_high",
    "https://images.coches.com/_vo_/fotos/usados/2023/10/23/0/2405926360767122-767122_3.JPG?p=cc_vo_high",
    "https://images.coches.com/_vo_/fotos/usados/2023/10/23/8/3405926360767122-767122_4.JPG?p=cc_vo_high",
    "https://images.coches.com/_vo_/fotos/usados/2023/11/09/5/7407777706721784-774622_7.JPG?p=cc_vo_high",
  ];

  return (
    <div className={`gallery ${isZoomed ? 'zoomed' : ''}`}>
      <div className='mainPhotoArrowContainer'>
        <div className="arrow left-arrow" onClick={handleZoomPreviousClick}>
          <img className={`arrowIcons ${isZoomed ? 'visible' : ''}`} src="https://www.iconpacks.net/icons/2/free-icon-arrow-left-3099.png" alt="" />
        </div>
        <img
          className={`mainPhoto ${isZoomed ? 'zoomed-photo' : ''}`}
          src={images[currentImageIndex]}
          alt=''
          onClick={!isZoomed ? toggleZoom : null} // Modificación aquí
        />
        <div className="arrow right-arrow" onClick={handleZoomNextClick}>
          <img className={`arrowIcons ${isZoomed ? 'visible' : ''}`} src="https://www.iconpacks.net/icons/2/free-icon-arrow-right-3098.png" alt="" />
        </div>
        {isZoomed && (
          <div className="close-zoom" onClick={toggleZoom}>
            <img className='zoomCross' src="https://icon-library.com/images/white-cross-icon/white-cross-icon-3.jpg" alt="" />
          </div>
        )}
      </div>
      <ul className={`photosContainer ${isZoomed ? 'zoomed-photos-container' : ''}`}>
        {images.map((image, index) => (
          <li key={index} className={`photos ${isZoomed ? 'zoomed-photos' : ''}`}>
            <img
              className={`photo ${isZoomed ? 'zoomed-secondary-photos' : ''}`}
              src={image}
              alt=''
              onClick={() => {
                if (!isZoomed) {
                  setCurrentImageIndex(index);
                }
              }}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CarGallery;