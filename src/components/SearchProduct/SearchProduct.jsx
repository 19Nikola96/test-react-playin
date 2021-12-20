import React, { useState } from 'react'
import Loading from '../Loading/Loading'
import Products from '../Products/Products'
import '../SearchProduct/SearchProduct.css'

const SearchProduct = () => {

    const [productSearch, setProductSearch] =  useState('')
    const [products, setProducts] = useState({})
    
    const [displayProducts, setDisplayProducts] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleOnSubmit = async (e) => {
        e.preventDefault()
        const url = 'https://api-dev.play-in.com/api/'

        if (productSearch !== '') {
            try {
                setIsLoading(true)

                const response = await fetch(`${url}sealed-products?search=${productSearch}`)
                const data = await response.json()

                setProducts(data)
                setIsLoading(false)
                setDisplayProducts(true)
            } catch (err) {
                console.log(err);
                setIsLoading(false)
            }
        }        
    }

    return (
        <>
            <div className="search-product">
                <h2>Rechercher un produit :</h2>
                <form onSubmit={handleOnSubmit}>
                    <div>
                        <label>N° de produit</label>               
                        <input onChange={(e) => setProductSearch(e.target.value)} type="text"/>
                    </div>
                    <span>ou</span>
                    <div>
                        <label>Code-barres</label>
                        <input onChange={(e) => setProductSearch(e.target.value)} type="text"/>
                    </div>
                    <span>ou</span>                
                    <div>
                        <label>Nom</label>
                        <input onChange={(e) => setProductSearch(e.target.value)} type="text"/>
                    </div>                                
                    <button className="green-button" type="submit">Rechercher</button>
                </form>
                <p>Renseigner un ou plusieurs champs nécessaires à votre recherche.</p>
            </div>            
            { isLoading && <Loading /> }
            { isLoading === false && displayProducts && <Products productSearch={productSearch} products={products} />}            
        </>
    )
}

export default SearchProduct
