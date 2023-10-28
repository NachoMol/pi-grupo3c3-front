import React, {useEffect, useState} from 'react'
import axios from 'axios'
import api from '../axiosConfig'

const ShowCars = () => {

  const [car, setCar] = useState([])

  const fetchData = () => {
    return axios.get("http://localhost:8080/cars")
    .then((response) => setCar(response.data))
  }

  useEffect(() => {
    fetchData();
  }, [])

  return(
    <div>
      <h1>Cars</h1>
      <ul>
        {car && car.length > 0 && car.map(
          (carObj, index) => (
            <li className="detail-information" key={carObj.id}>
              <p>Car Name: {carObj.model.name}</p>
              <p>Brand: {carObj.model.brand.name}</p>
              <p>Car Type: {carObj.model.carType.name}</p>
              <p>Price: {carObj.price}</p>
              <p>Stock: {carObj.stock}</p>
            </li>
          )
        )}
      </ul>
    </div>
  )

}

export default ShowCars