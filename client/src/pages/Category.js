import { useEffect, useState } from "react"
import NavBar from "../components/navbar"
import { useParams } from "react-router-dom"
import axios from "axios"
import ProductCard from "../components/product-card"

function Category() {
    const category = useParams()
    const [allProducts, setProducts] = useState([])

    const getProducts = async () => {
        await axios.get("https://dummyjson.com/products/category/"+category.category)
            .then(data => {
                setProducts(allProducts => [...allProducts, data.data.products])
            })
    }

    useEffect(() => {
        getProducts()
    }, [])
    return (
        <>
            <NavBar />

            <div className="container main-holder">                
                <h1>{ category.category }</h1>
                <hr />

                {
                    allProducts.map(product => {
                        return (
                            <ProductCard product={product} />
                        )
                    })
                }
            </div>
        </>
    )
}

export default Category