import classes from './Cart.module.css'
import Modal from "../UI/Modal";
import {Fragment, useContext, useState} from "react";
import CloseModalContext from "../../store/close-modal-context";
import CartItem from "./CartItem";
import AddItemsContext from "../../store/add-items-context";
import Checkout from "./Checkout";

const Cart = (props) => {

    const [isCheckout, setIsCheckout] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [successOrder, setSuccessOrder] = useState(false)

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
        setIsCheckout(true)
    }

    const submitOrderHandler = (data) => {
        setIsSubmitting(true)
        fetch('https://react-http-test-8e21c-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                user: data,
                orderedItems: cartCtx.items
            }),
        }).then((response) => {
            console.log('response: ', response)
            // return response.json().then(data => {
            //
            // })
            if (response.ok) {
                setSuccessOrder(true)
            }
        }).catch(error=> {
            console.log('error: ', error.message)
        })
        setIsSubmitting(false)
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

    const modalActions = <div className={classes.actions}>
        <button onClick={ctx.onCloseModal} className={classes['button--alt']}>Close</button>
        <button onClick={onOrderHandler} className={classes.button}>Order Now!</button>
    </div>

    const generalCart = <Fragment>{cartItems}
        <div>
            <span className={classes.total}>Total Amount: {totalPrice}</span>
        </div>
        {isCheckout && <Checkout onSubmitOrder={submitOrderHandler} onCancel={ctx.onCloseModal}/>}
        {!isCheckout && modalActions }</Fragment>

    const successModal = <Fragment><div>
        <span className={classes.total}>Sucessfully ordered your food! Happy Meals!</span>
    </div>
    <button onClick={ctx.onCloseModal} className={classes['button--alt']}>Close</button></Fragment>

    return(
        <div>
            {ctx.isOpen &&
            <Modal>
                {!successOrder && generalCart}
                {successOrder && successModal}
            </Modal>}
        </div>

    )
}

export default Cart