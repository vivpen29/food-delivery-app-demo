export default function Cart({cartStuff, availableStuff}) {

    console.log("Received cartStuff in Cart component: ", cartStuff);

    let cartTotal = 0;

    for (const cartItem of cartStuff) {
        cartTotal += cartItem.count * (availableStuff.find(item => item.id === cartItem.id))?.price;
    }

    return (
        <div className="cart">
            <h2>Your Cart</h2>
            {
                cartStuff.map(cartItem => <ul className="cart-item" key={cartItem.id}>
                    <p>{(availableStuff.find(item => item.id === cartItem.id))?.name} - {cartItem.count} x ${(availableStuff.find(item => item.id === cartItem.id))?.price} </p>
                    <div className="cart-item-actions">
                        <button>-</button>
                        <p>{cartItem.count}</p>
                        <button>+</button>
                    </div>
                </ul>)
            }
            <p className="cart-total">Total: ${cartTotal}</p>
        </div>

    )
}