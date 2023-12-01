import React, { useEffect, useState } from 'react';
import '../styless/CarGallery.css';
import PropTypes from 'prop-types';
import { fetchImageUrl } from '../utils/fetchImageUrl';

const CarGallery = ({productImages = [], productId}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [productImageUrls, setProductImageUrls] = useState([]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      if (!Array.isArray(productImages) || productImages.length === 0) {
        console.error('Invalid productImages');
        return;
      }

      if (typeof fetchImageUrl !== 'function') {
        console.error('fetchImageUrl is not a function');
        return;
      }

      try {
        const imageUrl = await fetchImageUrl(productId);
        setProductImageUrls(imageUrl);
      } catch (error) {
        console.error('Failed to fetch image URL', error);
      }
    };

    fetchImageUrls();
  }, [productImages, productId, fetchImageUrl]);
  
  // Verificación condicional para manejar el caso cuando productImages es undefined o vacío
  if (!productImages || productImages.length === 0) {
    return <div>No images available</div>;
  }

  return (
    <div className="gallery">
      <div className='mainPhotoArrowContainer'>
        <div className="arrow left-arrow" onClick={() => setCurrentImageIndex(prevIndex => (prevIndex - 1 + productImages.length) % productImages.length)}>
          <img className="arrowIcons" src="https://www.iconpacks.net/icons/2/free-icon-arrow-left-3099.png" alt="" />
        </div>
        <img
          className="mainPhoto"
          src={productImageUrls[currentImageIndex]}
          alt=''
        />
        <div className="arrow right-arrow" onClick={() => setCurrentImageIndex(prevIndex => (prevIndex + 1) % productImages.length)}>
          <img className="arrowIcons" src="https://www.iconpacks.net/icons/2/free-icon-arrow-right-3098.png" alt="" />
        </div>
      </div>
      <ul className="photosContainer">
        {productImageUrls.map((imageUrl, index) => (
          <li key={index} className="photos">
            <img
              className="photo"
              src={imageUrl}
              alt=''
              onClick={() => setCurrentImageIndex(index)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

CarGallery.propTypes = {
  productImages: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CarGallery;