import {Fragment, useState} from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import {CloseModalContextProvider} from "./store/close-modal-context";
import CartProvider from "./store/CartProvider";

function App() {


    return (
        <CartProvider>
            <CloseModalContextProvider>
                <Cart />
                <Header/>
                <Meals/>
            </CloseModalContextProvider>
        </CartProvider>
    );
}

export default App;
