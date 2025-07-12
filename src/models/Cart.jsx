export default function Cart({cartStuff, availableStuff, addCartItem, removeCartItem}) {

    console.log("Received cartStuff in Cart component: ", cartStuff);

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

    return (
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

    )
}