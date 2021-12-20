import React from 'react'
import '../Product/Product.css'

const Product = ({ productData }) => {
    return (
        <tr className="product">
            <td>{productData.id}</td>
            <td>{productData.barCode}</td>
            <td>{productData.name}</td>
            <td>
                <button className="green-button">Voir le détail du produit</button>
            </td>
        </tr>
    )
}

export default Product
