import classes from './Cart.module.css'
import Modal from "../UI/Modal";
import {useContext, useState} from "react";
import CloseModalContext from "../../store/close-modal-context";
import CartItem from "./CartItem";
import AddItemsContext from "../../store/add-items-context";

const Cart = (props) => {

    const ctx = useContext(CloseModalContext)

    const cartCtx = useContext(AddItemsContext)

    const totalPrice = `$${cartCtx.totalAmount.toFixed(2)}`

    const removeItemHandler = (id) => {
        cartCtx.removeItem(id)
    }

    const addItemHandler = (item) => {
        cartCtx.addItem(item)
    }

    const onOrderHandler = () => {
        ctx.onCloseModal()
        console.log('Ordering...')
    }
    const cartItems = (
        <ul className={classes['cart-items']}>
            {cartCtx.items.map((cartItem) =>
                <CartItem key={cartItem.id}
                          id={cartItem.id}
                          amount={cartItem.amount}
                          name={cartItem.name}
                          price={cartItem.price}
                          onRemove={removeItemHandler}
                          onAdd={addItemHandler}/>
            )}
        </ul>)

    return(
        <div>
            {ctx.isOpen &&
            <Modal>
                {cartItems}
                <div>
                    <span className={classes.total}>Total Amount</span>
                    <span>{totalPrice}</span>
                </div>
                <div className={classes.actions}>
                    <button onClick={ctx.onCloseModal} className={classes['button--alt']}>Close</button>
                    <button onClick={onOrderHandler} className={classes.button}>Order Now!</button>
                </div>
            </Modal>}
        </div>

    )
}

export default Cart