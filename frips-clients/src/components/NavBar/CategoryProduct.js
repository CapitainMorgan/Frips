import React from 'react'
import { useParams } from 'react-router-dom';

const CategoryProduct = () => {
    const {id, category,subcategory} = useParams();


  return (
    <div>CategoryProduct</div>
  )
}

export default CategoryProduct