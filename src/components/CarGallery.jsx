import React, { useState } from 'react';
import '../styless/CarGallery.css';
import PropTypes from 'prop-types';

const CarGallery = ({productImages = []}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const handleZoomPreviousClick = () => {
    const newIndex = (currentImageIndex - 1 + productImages.length) % productImages.length;
    setCurrentImageIndex(newIndex);
  };

  const handleZoomNextClick = () => {
    const newIndex = (currentImageIndex + 1) % productImages.length;
    setCurrentImageIndex(newIndex);
  };

  // Verificación condicional para manejar el caso cuando productImages es undefined o vacío
  if (!productImages || productImages.length === 0) {
    return <div>No images available</div>;
  }


  return (
    <div className={`gallery ${isZoomed ? 'zoomed' : ''}`}>
      <div className='mainPhotoArrowContainer'>
        <div className="arrow left-arrow" onClick={handleZoomPreviousClick}>
          <img className={`arrowIcons ${isZoomed ? 'visible' : ''}`} src="https://www.iconpacks.net/icons/2/free-icon-arrow-left-3099.png" alt="" />
        </div>
        <img
          className={`mainPhoto ${isZoomed ? 'zoomed-photo' : ''}`}
          src={`http://localhost:8080/images/${productImages[currentImageIndex].filename}`}
          alt=''
          onClick={!isZoomed ? toggleZoom : null}
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
        {productImages.map((image, index) => (
          <li key={index} className={`photos ${isZoomed ? 'zoomed-photos' : ''}`}>
            <img
              className={`photo ${isZoomed ? 'zoomed-secondary-photos' : ''}`}
              src={`http://localhost:8080/images/${image.filename}`}
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

CarGallery.propTypes = {
  productImages: PropTypes.arrayOf(
    PropTypes.shape({
      filename: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CarGallery;