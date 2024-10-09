import { useEffect, useState } from "react"
import NavBar from "../components/navbar"
import axios from "axios"
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { useNavigate, useParams } from "react-router-dom"

function Order() {
    const [orderProducts, setOrderProducts] = useState([])
    const isAuthenticated = useIsAuthenticated()
    const auth = useAuthUser()
    const navigate = useNavigate()
    const params = useParams()

    const getOrder = async () => {
        await axios.get("http://localhost:8000/api/orders/get?order_id="+params.id)
            .then(result => {
                result.data.order.map(userOrder => {
                    setOrderProducts(orderProducts => [...orderProducts, userOrder])
                })
            })
    }

    useEffect(() => {
        console.log(params)
        if(!isAuthenticated) {
            navigate('/')
        } else {
            getOrder()
        }
    }, [])

    return (
        <>
            <NavBar />

            <div className="container main-holder">
                <h2>Order</h2>
                <hr />

                <table className="table table-striped table-hover table-bordered text-center">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Product</th>
                            <th>Order Quantity</th>
                            <th>Order Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderProducts.map((order, index) => {
                                return (
                                    <>
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{order.product}</td>
                                            <td>{order.quantity}</td>
                                            <td>£{order.total}</td>
                                        </tr>
                                    </>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default Order