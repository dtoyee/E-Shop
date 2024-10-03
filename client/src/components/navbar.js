import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useAuthUser from 'react-auth-kit/hooks/useAuthUser'
import useSignOut from 'react-auth-kit/hooks/useSignOut'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function NavBar() {
    const [categories, allCategories] = useState([])

    const isAuthenticated = useIsAuthenticated();
    const user = useAuthUser()
    const signOut = useSignOut()
    const navigate = useNavigate()

    const logout = () => {
        signOut()
        navigate('/')
    }

    const getCategories = async () => {
        await axios.get('https://dummyjson.com/products/categories')
            .then(data => {
                const categoryList = data.data
                categoryList.map(category => {
                    allCategories(categories => [...categories, category])
                })
            })
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <nav class="navbar navbar-expand-lg bg-dark border-bottom border-body"  data-bs-theme="dark">
            <div class="container">
                <a class="navbar-brand" href="/">E-Shop</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <a class="nav-link" aria-current="page" href="/">Home</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Categories
                        </a>
                        <ul class="dropdown-menu">
                            {
                                categories.map(category => {
                                    return (
                                        <li><a class="dropdown-item" href={"/category/"+category.slug}>{ category.name }</a></li>
                                    )
                                })
                            }
                        </ul>
                        </li>
                    </ul>
                    <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
                        {
                            (!isAuthenticated) ?
                                <>
                                    <li class="nav-item">
                                        <a class="nav-link" aria-current="page" href="/">Basket</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" aria-current="page" href="/login">Login</a>
                                    </li>
                                    <li class="nav-item">
                                        <a class="nav-link" aria-current="page" href="/register">Register</a>
                                    </li>
                                </> :
                                <>
                                    <li class="nav-item">
                                        <a class="nav-link" aria-current="page" href="/">Basket</a>
                                    </li>
                                    <li class="nav-item dropdown">
                                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            { user.email }
                                        </a>
                                        <ul class="dropdown-menu">
                                            <li><a class="dropdown-item" href="#">Order History</a></li>
                                            <li><a class="dropdown-item" href="#">Settings</a></li>
                                            <li><hr class="dropdown-divider" /></li>
                                            <li><a class="dropdown-item" href="" onClick={logout}>Logout</a></li>
                                        </ul>
                                    </li>
                                </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar