import toast, { Toaster } from 'react-hot-toast';

function ProductCard({ product }) {
    const notify = () => toast.success('Added to basket');

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
                notify()
            } else {
                cart = [...cart, {
                    product,
                    quantity: 1
                }]
                localStorage.setItem('cart', JSON.stringify(cart))
                notify()
            }
        } else {
            cart = [{
                product,
                quantity: 1
            }]
            localStorage.setItem('cart', JSON.stringify(cart));
            notify()
        }
    }

    return (
        product.map(prod => {
            return (
                <div class="card" style={{width: 18+'rem', display: 'inline-block', marginLeft: 25+'px', marginBottom: 10+'px'}}>
                    <img src={prod.images} class="card-img-top" alt="..." height={200} />
                    <div class="card-body">
                        <h5 class="card-title">
                            <a href={"/product/"+prod.id+"/"+prod.title.replaceAll(" ","-")}>{ prod.title }</a>
                        </h5>
                        <p>£{prod.price}</p>
                        <button onClick={() => { addToBasket(prod) }} class="btn btn-success">Add To Basket</button>
                        <Toaster />
                    </div>
                </div>
            )
        })
    )
}

export default ProductCard