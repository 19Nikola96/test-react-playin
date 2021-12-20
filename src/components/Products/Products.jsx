import React, { useState } from 'react'
import Loading from '../Loading/Loading'
import Product from '../Product/Product'
import '../Products/Products.css'

const Products = ({ productSearch, products }) => {
    const [productsResults, setProductsResults] = useState(products['hydra:member'])
    const [page,setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    

    // Déclenche la fonction showMoreProducts quand on arrive à la fin de la page
    window.onscroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight) {
            showMoreProducts()
        }
    }

    const showMoreProducts = async () => {
        const url = 'https://api-dev.play-in.com/api/'
        
        if (productSearch !== '' && products['hydra:totalItems'] !== productsResults.length) {
            try {
                setIsLoading(true)

                const response = await fetch(`${url}sealed-products?search=${productSearch}&page=${page + 1}`)
                const data = await response.json()

                setPage(prevState => prevState + 1)
                setProductsResults([...productsResults, ...data['hydra:member']])
                setIsLoading(false)
            } catch (error) {
                console.log(error)
                setIsLoading(false)
            }
        }  
        
    }

    // Fonction de tri
    const sortBy = (e) => {
        let sortElements = document.querySelectorAll('.products table thead tr th div')

        sortElements.forEach((sortElement) => {
            if (e.currentTarget.classList.value === sortElement.classList.value) {
                e.currentTarget.childNodes[1].classList.replace('sort-off', 'sort-on')    

                setProductsResults(prevState => [...prevState.sort((a,b) => (a[sortElement.classList.value] > b[sortElement.classList.value]) ? 1 : ((b[sortElement.classList.value] > a[sortElement.classList.value]) ? -1 : 0))])
            } else {
                sortElement.childNodes[1].classList.replace('sort-on', 'sort-off')
            }
        })
    }

    return (
        <div className="products">
            <h2>{products['hydra:totalItems'] > 1 ? `${products['hydra:totalItems']} produits trouvés` : `${products['hydra:totalItems']} produit trouvé`}  :</h2>
            {productsResults.length > 0 &&
                <table>
                    <thead>
                        <tr>
                            <th>
                                <div onClick={(e) => sortBy(e)} className="id">
                                    N° de produit <span className="sort-on"></span>
                                </div>
                            </th>
                            <th>
                                <div onClick={(e) => sortBy(e)} className="barCode">
                                    Code-barres <span className="sort-off"></span>
                                </div>
                            </th>
                            <th colSpan="2">
                                <div onClick={(e) => sortBy(e)} className="name">
                                    Nom du produit <span className="sort-off"></span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        { productsResults.map((productData) => (
                            <Product key={productData.id} productData={productData} />
                        ))}
                    </tbody>
                </table>
            }       
            {isLoading && <Loading />}
            <button onClick={() => showMoreProducts()} className="more-products">Voir plus de produits</button>
        </div>
    )
}

export default Products
