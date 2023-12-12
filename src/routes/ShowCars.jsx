import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { URL } from '../config/config'

const ShowCars = () => {

  const [car, setCar] = useState([])

  const fetchData = () => {
    return axios.get(`${URL}/products`)
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
              <p>Car Name: {carObj.name}</p>
              <p>Price: {carObj.price}</p>
            </li>
          )
        )}
      </ul>
    </div>
  )

}

export default ShowCars