import React, {useState, useEffect} from 'react'
import axios from 'axios'
import '../styless/CategoryList.css'

const CategoryList = () => {

    const[categories, setCategories] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
        try{
            const response = await axios.get('http://localhost:8080/categories')
            setCategories(response.data)
        }catch(error){
            console.error("Error fetching categories", error)
            }
        }
        fetchCategories();

    },[])

  return (
    <div className="category-list-container">
      <h2>Categories</h2>
      <div className="category-list">
        {categories.map((category, index) => (
          <div key={category.id} className="category-item">
            <h3>{category.name}</h3>
            <p>{category.description}</p>
            <img src={category.image_url} alt={category.name} style={{ maxWidth: '200px' }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryList