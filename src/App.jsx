import Header from "./components/Header.jsx";
import Products from "./components/Products.jsx";
import {FoodItemsContextProvider} from "./store/food-items-context.jsx";

function App() {
  return (
    <FoodItemsContextProvider>
      <Header/>
      <Products/>
    </FoodItemsContextProvider>
  );
}

export default App;
