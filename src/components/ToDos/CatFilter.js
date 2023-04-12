//This component will house a button for each category as well as an ALL button to remove filtering 
//in Resources.js
import React, { useState, useEffect } from 'react'
import axios from 'axios'

export default function CatFilter(props) {
    //We need to access and store castegories from the API for this component to work
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        axios.get(`https://localhost:7273/api/Categories`).then(response => {
            setCategories(response.data)
        })
    }, []);

  return (
    <div className='text-center mt-5'>
        <button className="btn btn-outline-info bg-dark m1" onClick={() => props.setFilter(0)}>
            All
        </button>
    {/* Below we map all the categories to thier own button that will be used to filter resources on that category*/}
    {categories.map(cat => 
            <button key={cat.categoryId}  className="btn btn-outline-info bg-dark m-1" 
            onClick={() => props.setFilter(Number(cat.categoryId))}>
                {cat.categoryName}
            </button>
        )}
    </div>
  )
  
}
 