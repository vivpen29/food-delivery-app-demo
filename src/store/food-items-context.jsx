import {createContext, useEffect, useState} from "react";


export const FoodItemsContext = createContext({
    foodItems: [],
    cartItems: [],
    addToCart: () => {},
    removeFromCart: () => {},
})


export function FoodItemsContextProvider({children}) {

    const [foodItems, setFoodItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        async function getItems() {
            const response = await fetch("http://localhost:3000/meals", {
                method: "GET",
            });
            if(!response.ok) {
                return;
            }
            setFoodItems(await response.json());
        }
        getItems();
    }, [])

    const addItemToCart = (chosenItem) => {
        const item = foodItems.find(item => item.id === chosenItem.id);
        if (item) {
            const cartItem = cartItems.find(cartItem => cartItem.id === chosenItem.id);
            if (cartItem) {
                cartItem.count++;
                setCartItems([...cartItems]);
                return;
            }

            setCartItems([...cartItems, chosenItem]);
        } else {
            console.log('Item trying to be added to cart does not exist!');
        }
    }

    const ocntextValue = {
        foodItems: foodItems,
        cartItems: cartItems,
        addToCart: (id) => {addItemToCart(id)},
        removeFromCart: () => {},
    }



    return (
        <FoodItemsContext value={ocntextValue}>
            {children}
        </FoodItemsContext>
    )
}