import { useEffect, useState } from "react"
import NavBar from "../components/navbar"
import axios from "axios"
import useIsAuthenticated from 'react-auth-kit/hooks/useIsAuthenticated'
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import { useNavigate } from "react-router-dom"

function Orders() {
    const [orders, setOrders] = useState([])
    const isAuthenticated = useIsAuthenticated()
    const auth = useAuthUser()
    const navigate = useNavigate()

    const getOrders = async () => {
        await axios.get("http://localhost:8000/api/orders?user_id="+auth.id)
            .then(result => {
                result.data.orders.map(order => {
                    setOrders(orders => [...orders, order])
                })
            })
    }

    useEffect(() => {
        if(!isAuthenticated) {
            navigate('/')
        } else {
            getOrders()
        }
    }, [])

    return (
        <>
            <NavBar />

            <div className="container main-holder">
                <h2>Order History</h2>
                <hr />

                <table className="table table-striped table-hover table-bordered text-center">
                    <thead>
                        <tr>
                            <th>Order Number</th>
                            <th>Product</th>
                            <th>Order Quantity</th>
                            <th>Order Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map(order => {
                                console.log(order)
                                return (
                                    <>
                                        <tr>
                                            <td><a href={"/orders/"+order.order_id}>{order.order_id}</a></td>
                                            <td>{order.product}</td>
                                            <td>{order.Quantity}</td>
                                            <td>£{order.Total}</td>
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

export default Orders