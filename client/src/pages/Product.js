import { useParams } from "react-router-dom"
import NavBar from "../components/navbar"
import { useEffect, useState } from "react"
import axios from "axios"
import ProductReviews from "../components/product-reviews"

function Product() {
    const params = useParams()
    const [product, setProduct] = useState([])

    const getProduct = async () => {
        await axios.get('https://dummyjson.com/products/'+params.id)
            .then(data => {
                setProduct(product => [...product, data.data])
            })
    }

    const addToBasket = (product) => {
        let cart = JSON.parse(localStorage.getItem('cart'))

        if(cart) {
            let isItemInCart = cart.find(item => item.product.id === product.id)
            if(isItemInCart) {
                cart = cart.map(item => {
                    if(item.product.id === product.id) {
                        return {
                            ...item,
                            quantity: item.quantity + 1
                        }
                    } else {
                        return item
                    }
                })
                localStorage.setItem('cart', JSON.stringify(cart))
            } else {
                cart = [...cart, {
                    product,
                    quantity: 1
                }]
                localStorage.setItem('cart', JSON.stringify(cart))
            }
        } else {
            cart = [{
                product,
                quantity: 1
            }]
            localStorage.setItem('cart', JSON.stringify(cart))
        }
    }

    useEffect(() => {
        getProduct()
    }, [])

    return (
        <>
            <NavBar />
            
            <div className="container main-holder">
                {
                    product.map(prod => {
                        return (
                            <>
                                <div className="row">
                                    <div className="col-5">
                                        <img src={prod.images} class="card-img-top" alt="..." />
                                    </div>
                                    <div className="col-7">
                                        <p><h2>{prod.title}</h2><p className="small">{prod.reviews.length} reviews</p></p>
                                        <hr />
                                        <p>{prod.description}</p>
                                        <p>£{prod.price}</p>
                                        <p><button className="btn btn-success" onClick={() => { addToBasket(prod) }}>Add To Basket</button></p>
                                    </div>
                                </div>
                                
                                <div className="row">
                                    <h2>Reviews</h2>
                                    <hr />
                                    <ProductReviews reviews={prod.reviews} />
                                </div>
                            </>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Product