import appLogo from '../assets/logo.jpg';
import {useContext, useRef} from "react";
import {FoodItemsContext} from "../store/food-items-context.jsx";
import Cart from "../models/Cart.jsx";

export default function Header() {

    const dialogRef = useRef(null);
    const contextVal =  useContext(FoodItemsContext);

    let num = 0;
    for (const item of contextVal.cartItems) {
        num += item.count;
    }

    function cartOpenCloseHandler() {
       if (dialogRef.current) {
           dialogRef.current.hasAttribute("open")
               ? dialogRef.current.close() : dialogRef.current.showModal();
       }
    }

    return (
        <div id="main-header">
            <div id="title">
                <img src={appLogo} alt="logo"/>
                <h1>REACTFOOD</h1>
            </div>
            <div>
                <button className="text-button" onClick={cartOpenCloseHandler}>
                    Cart({num})
                </button>
            </div>

            {<dialog ref={dialogRef} className="modal">
                <Cart
                    cartStuff={contextVal.cartItems}
                    availableStuff={contextVal.foodItems}
                    addCartItem={contextVal.addToCart}
                    removeCartItem={contextVal.removeFromCart}
                    cartDialog={dialogRef}
                >
                </Cart>
            </dialog>}
        </div>
    )
}