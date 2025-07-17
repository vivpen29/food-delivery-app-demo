import {useContext} from "react";
import {FoodItemsContext} from "../store/food-items-context.jsx";

export default function Products() {

    const contextStuff = useContext(FoodItemsContext);

    function handleAddToCart(event) {
        contextStuff.addToCart({
            id: event.target.id,
            count: 1
        });

    }

    return (
        <div id="meals">
            { contextStuff.foodItems.map(item =>
                (
                    <div className="meal-item" key={item.id}>
                        <article>
                            <img src={"https://backend-delivery-app-1nms.onrender.com/" + item.image} alt={item.name}/>
                            <h3>{item.name}</h3>
                            <div>
                                <p className="meal-item-price">${item.price}</p>
                            </div>
                            <div>
                                <p className="meal-item-description">{item.description}</p>
                            </div>
                            <div>
                                <button className="button meal-item-actions" onClick={handleAddToCart} id={item.id}>
                                    Add to cart</button>
                            </div>
                        </article>
                    </div>
                )
            )}
        </div>
    )
}