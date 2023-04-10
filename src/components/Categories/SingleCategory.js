import React from 'react'

export default function SingleCategory(props) {
  return (
    <tr>
        <td>{props.category.categoryName}</td>
        <td>{props.category.categoryDescription}</td>
    </tr>
  )
}
