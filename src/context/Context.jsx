import React, { createContext, useContext, useState } from 'react';
import api from '../axiosConfig';

const ProductContext = createContext();

export function useProduct() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
    const [products, setProducts] = useState([]);
  
    const addProduct = async (newProduct) => {
      try {
        const response = await api.post('/cars', newProduct);
        setProducts([...products, response.data]);
      } catch (error) {
        console.error('Error while trying to register a car:', error);
      }
    };

    return (
        <ProductContext.Provider value={{ products, addProduct }}>
          {children}
        </ProductContext.Provider>
      );
    }



