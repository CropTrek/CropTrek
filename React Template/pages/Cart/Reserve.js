import PageBanner from "../../src/components/PageBanner";
import Layout from "../../src/layouts/Layout";
import { useEffect,useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch,useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../../Redux/Actions/cartActions';
import Link from "next/link";
import React from "react";
import { number } from "prop-types";
import { Button } from "reactstrap";
function CartItem({ item, updateCart }) {
  const [quantity, setQuantity] = useState(item.qty);

  const increment = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    updateCart(item.productId, newQuantity);
  }

  const decrement = () => {
    const newQuantity = quantity - 1;
    setQuantity(newQuantity);
    updateCart(item.productId, newQuantity);
  }

  return (
    // <tr>
    //   <td>{item.name}</td>
    //   <td>{item.price}</td>
    //   <td>
    //     <button onClick={decrement} disabled={quantity === 1}>-</button>
    //     {quantity}
    //     <button onClick={increment}>+</button>
    //   </td>
    //   <td>{item.price * quantity}</td>
    // </tr>


<div className="row">

<div className="col-lg-12">
  <div className="cart-wrapper">
    <div className="cart-table table-responsive">
      <table className="table">
        <tbody>
      
          <tr key={item.product}>
            <td onClick={ ()=>removeFromHandler(item.product) } className="remove">
              <a href="#">
                <i className="fas fa-trash-alt" ></i>
              </a>
            </td>

            
            <td className="thumbnail-title">
              <img
                src="../assets/images/products/product-thumb-4.jpg"
                alt=""
              />
              <a href={`/Products/ProductDetails/${item.product}`} >
              <span className="title">{item.name}</span></a>
            </td>

  <td>{item.qty}</td>
   <td>
        <button onClick={decrement} disabled={quantity === 1}>-</button>
         {quantity}
         <button onClick={increment}>+</button>
      </td>

            <td className="price">{item.price}DT</td>
           {/* <td className="quantity">
              <div className="quantity-input">
                <button className="quantity-down">-</button>
                <input
                  className="quantity"
                  type="text"
                  defaultValue={1}
                  name="quantity"
                />
                <button className="quantity-up">+</button>
              </div>
            </td>  
            
           <td className="subtotal">${total}</td> */}
          </tr>
        
       
        </tbody>
      </table>
    </div>
  </div>

</div>
</div>



  );
}
const CartPage = () => {
  const router = useRouter();
  const dispatch=useDispatch();
  const productId=  router.query.id;
  const qty = router.query.qty ? Number(router.query.qty) : 1;

const cart =useSelector( (state)=>state.cart )
const {cartItems}=cart;
const total=cartItems.reduce( (a,i)=>a+i.qty*i.price ,0).toFixed(2)
 
useEffect(() => {
    window.scrollTo(0, 0);
    if(productId){
      dispatch(addToCart(productId,qty))
      console.log(productId)
    }


  }, [dispatch,productId,qty]);
console.log(cartItems);


const checkoutHandler=()=>{
router.push("/Auth?redirect=shipping")

}
const removeFromHandler=(id)=>{
dispatch(removeFromCart(id) )
  
  }
  const updateCart = (productId, quantity) => {
    const newCartItems = cartItems.map(item => {
      if (item.productId === productId) {
        item.qty = quantity;
      }
      return item;
    });
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  }
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.qty), 0);

  return (
    <Layout>
   
                <link
          rel="shortcut icon"
          href="assets/images/favicon.ico"
          type="image/png"
        />
        {/*====== FontAwesome css ======*/}
        <link
          rel="stylesheet"
          href="../../../../assets/fonts/fontawesome/css/all.min.css"
        />
        {/*====== Flaticon css ======*/}
        <link rel="stylesheet" href="../../../../assets/fonts/flaticon/flaticon.css" />
        {/*====== Bootstrap css ======*/}
        <link
          rel="stylesheet"
          href="../../../../assets/vendor/bootstrap/css/bootstrap.min.css"
        />
        {/*====== magnific-popup css ======*/}
        <link
          rel="stylesheet"
          href="../../../../assets/vendor/magnific-popup/dist/magnific-popup.css"
        />
        {/*====== Slick-popup css ======*/}
        <link rel="stylesheet" href="../../../../assets/vendor/slick/slick.css" />
        {/*====== Nice Select css ======*/}
        <link
          rel="stylesheet"
          href="../../../../assets/vendor/nice-select/css/nice-select.css"
        />
        {/*====== Animate css ======*/}
        <link rel="stylesheet" href="../../../../assets/vendor/animate.css" />
        {/*====== Default css ======*/}
        <link rel="stylesheet" href="../../../../assets/css/default.css" />
        {/*====== Style css ======*/}
        <link rel="stylesheet" href="../../../../assets/css/style.css" />


      <PageBanner pageName={"Cart"} />

      <div>
      <h1>Cart</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => <CartItem key={item.productId} item={item} updateCart={updateCart} />)}
        </tbody>
      </table>
      <p>Total: {totalPrice}</p>
    </div>

      <section className="cart-section pt-170 pb-130">
        <div className="container">
        {
        cartItems.length===0 ?(
          <div className="alert alert-info text-center mt-3">
            Your Cart is Empty  
            <b>  <a className="btn btn-success mx-5 px-5 py-3"
          href="/Products"
            style={{ fontSize:"12px"}}
            > Shopping Now </a></b> 
          </div>
        )
        :(
<>


<div className=" alert alert-info text-center mt-3 ">
Total Cart Products
<a className="text-success mx-2" >
({cartItems.length})

</a>
</div>
{cartItems.map( (item)=>(
 
  <div className="row">

            <div className="col-lg-12">
              <div className="cart-wrapper">
                <div className="cart-table table-responsive">
                  <table className="table">
                    <tbody>
                  
                      <tr key={item.product}>
                        <td onClick={ ()=>removeFromHandler(item.product) } className="remove">
                          <a href="#">
                            <i className="fas fa-trash-alt" ></i>
                          </a>
                        </td>

                        
                        <td className="thumbnail-title">
                          <img
                            src="../assets/images/products/product-thumb-4.jpg"
                            alt=""
                          />
                          <a href={`/Products/ProductDetails/${item.product}`} >
                          <span className="title">{item.name}</span></a>
                        </td>

              <td>{item.qty}</td>
                        <td   style={{margin:"-50px"}} className="quantity">
                   
                        <select
            value={item.qty}
            onChange={(e) =>
              dispatch(addToCart(item.product, Number(e.target.value)))
            }
          >
            {[...Array(item.countInStock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </select>

          
                          </td>
 
                        <td className="price">{item.price}DT</td>
                       {/* <td className="quantity">
                          <div className="quantity-input">
                            <button className="quantity-down">-</button>
                            <input
                              className="quantity"
                              type="text"
                              defaultValue={1}
                              name="quantity"
                            />
                            <button className="quantity-up">+</button>
                          </div>
                        </td>  
                        
                       <td className="subtotal">${total}</td> */}
                      </tr>
                    
                   
                    </tbody>
                  </table>
                </div>
              </div>
           
            </div>
          </div>
) )}
   <div className="cart-middle mt-40 mb-20">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="coupon-box mb-40">
                      <form onSubmit={(e) => e.preventDefault()}>
                        <div className="form_group">
                          <input
                            type="text"
                            className="form_control"
                            placeholder="Coupon Code"
                          />
                          <button className="main-btn btn-yellow">
                            Appply Coupon
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>


                  {
                    total>0 &&(
                      <div className="col-lg-6">
                      <div className="update-cart float-lg-right mb-40">
                        <Button onClick={checkoutHandler} href="#" className="main-btn btn-yellow mr-2">
                          Shopping
                        </Button>
                        {/* <a href="#" className="main-btn btn-yellow">
                          Update Cart
                        </a> */}
                      </div>
                    </div>
                    )
                  }
           
                </div>
              </div>
          <div className="row justify-content-end">
            <div className="col-lg-5">
              <div className="shopping-cart-total">
                <h4 className="title">Cart Totals</h4>
                <table className="table">
                  <tbody>
                    <tr>
                      <td>Cart Subtotal</td>
                      <td>${total}</td>
                    </tr>
                    <tr>
                      <td>Shipping Fee</td>
                      <td>$50</td>
                    </tr>
                    <tr>
                      <td className="total">
                        <span>Order Total</span>
                      </td>
                      <td className="total">
                        <span>$250</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button className="main-btn btn-yellow">
                  Proceed to checkout
                </button>
              </div>
            </div>
          </div>
</>
        )
        }
          
        </div>
      </section>
    </Layout>
  );
};
export default CartPage;
