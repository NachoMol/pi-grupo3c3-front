import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styless/CategoryList.css';
import {URL} from '../config/config';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${URL}/categories`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="category-list-container">
      <h2>Categories</h2>
      {!isMobile ? (
        <div className="category-list">
          {categories.map((category, index) => (
            <div key={category.id} className="category-item">
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <img src={category.image_url} alt={category.name} style={{ maxWidth: '200px' }} />
            </div>
          ))}
        </div>
      ) : (
        <p>This component is not available on mobile devices.</p>
      )}
    </div>
  );
};

export default CategoryList;