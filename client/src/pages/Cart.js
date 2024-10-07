import { useEffect, useState } from "react";
import NavBar from "../components/navbar";

function Cart() {
  const [cartProducts, setCartProducts] = useState([]);
  const [subTotal, setSubTotal] = useState(0);

  const getItems = () => {
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      console.log(cart);
      setCartProducts(cart);

      let tempSubTotal = 0;
      cart.map((item) => {
        tempSubTotal += item.product.price * item.quantity;
      });
      setSubTotal(tempSubTotal);
    } else {
      console.log("No cart data");
    }
  };

  const updateQuantity = (newQty, index) => {
    let newCart = [...cartProducts]
    if(newCart[index].quantity >= 1) {
        newCart[index].quantity = newQty
        setCartProducts(newCart)
        localStorage.setItem('cart', JSON.stringify(newCart))
        getItems()
    }
  }

  const removeFromCart = (index) => {
    let newCart = [...cartProducts]
    newCart.splice(index, 1)
    setCartProducts(newCart)
    localStorage.setItem('cart', JSON.stringify(newCart))
    getItems()
  }

  useEffect(() => {
    getItems();
  }, []);

  return (
    <>
      <NavBar />

      <div className="container main-holder">
        <h2>Cart</h2>
        <hr />
        {cartProducts.length > 0 ? (
          <>
            <table className="table table-striped table-hover table-bordered text-center">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Total</th>
                </tr>
                </thead>
                <tbody>
                {cartProducts.map((item, index) => {
                    return (
                    <tr>
                        <td>{index}</td>
                        <td>{item.product.title}</td>
                        <td>
                        <input
                            type="number"
                            min={1}
                            defaultValue={item.quantity}
                            step={1}
                            onChange={(e) => {updateQuantity(e.target.value, index)}}
                        />
                        <button onClick={() => { removeFromCart(index) }} style={{ marginLeft: 10+"px" }}>Remove</button>
                        </td>
                        <td>£{item.product.price * item.quantity}</td>
                    </tr>
                    );
                })}
                </tbody>
            </table>
            <div className="row">
                <div className="col-10">
                    Total: £{ subTotal.toFixed(2) }
                </div>
                <div className="col-2">
                    <button className="btn btn-primary">Check Out</button>
                </div>
            </div>
          </>
        ) : (
          "Your cart is empty"
        )}
      </div>
    </>
  );
}

export default Cart;
