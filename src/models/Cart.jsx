import Checkout from "./Checkout.jsx";
import {useRef} from "react";

export default function Cart({cartStuff, availableStuff, addCartItem, removeCartItem, cartDialog}) {

    console.log("Received cartStuff in Cart component: ", cartStuff);

    const dialogRef = useRef(null);

    let cartTotal = 0;

    for (const cartItem of cartStuff) {
        cartTotal += cartItem.count * (availableStuff.find(item => item.id === cartItem.id))?.price;
    }

    function handleCartItemRemoval(event) {
        console.log("Removing item with id: ", event.target.id);
        removeCartItem({
            id: event.target.id,
        });
    }

    function handleCartItemAddition(event) {
        console.log("Adding item with id: ", event.target.id);
        addCartItem({
            id: event.target.id,
        });
    }

    const handleDialogClose = () => {
        if (cartDialog.current.hasAttribute("open")) {
            cartDialog.current.close();
        }
    }

    function handleCheckoutToggle() {
        if (dialogRef.current) {
            dialogRef.current.hasAttribute("open")
                ? dialogRef.current.close() : dialogRef.current.showModal();
        }
    }

    return (
        <>
            <div className="cart">
                <h2>Your Cart</h2>
                {
                    cartStuff.map(cartItem => <ul className="cart-item" key={cartItem.id}>
                        <p>{(availableStuff.find(item => item.id === cartItem.id))?.name} - {cartItem.count} x ${(availableStuff.find(item => item.id === cartItem.id))?.price} </p>
                        <div className="cart-item-actions">
                            <button onClick={handleCartItemRemoval} id={cartItem.id}>-</button>
                            <p>{cartItem.count}</p>
                            <button onClick={handleCartItemAddition} id={cartItem.id}>+</button>
                        </div>
                    </ul>)
                }
                <p className="cart-total">Total: ${cartTotal}</p>
            </div>
            <div className="modal-actions">
                <button className="text-button" onClick={handleDialogClose}>Close</button>
                <button className="button" onClick={handleCheckoutToggle}>Go to Checkout</button>
            </div>
            {<dialog ref={dialogRef} className="modal">
                <Checkout ref={dialogRef} dialogRef={dialogRef} cartTotal={cartTotal} orderItems={cartStuff}></Checkout>
            </dialog>}
        </>
    )
}