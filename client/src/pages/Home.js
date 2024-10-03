import NavBar from "../components/navbar"
import ImageSlider from "../components/image-slider"
import { useEffect, useState } from "react"
import axios from "axios"
import ProductCard from "../components/product-card"

function Home() {
    const [products, setProducts] = useState([])

    const getAllProducts = async () => {
        await axios.get('https://dummyjson.com/products?limit=10')
            .then(res => {
                setProducts(products => [...products, res.data.products])
            })
    }

    useEffect(() => {
        getAllProducts()
    }, [])

    return (
        <>
            <NavBar />
            
            <div className="container main-holder">
                <ImageSlider />
                
                <h1>Products</h1>
                <hr />

                {
                    products.map(product => {
                        return (
                            <ProductCard product={product} />
                        )
                    })
                }
            </div>
        </>
    )
}

export default Home