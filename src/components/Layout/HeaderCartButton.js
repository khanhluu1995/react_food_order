import CartIcon from "../Cart/CartIcon";

import headerCartButtonStyles from './HeaderCartButton.module.css'
import {useContext} from "react";
import CloseModalContext from "../../store/close-modal-context";
import AddItemsContext from "../../store/add-items-context";

const HeaderCartButton = () => {
    const ctx = useContext(CloseModalContext)
    const cartCtx = useContext(AddItemsContext)

    const numberOfCartItems = cartCtx.items.reduce((curNum, item) => {
        return (
            curNum + item.amount
        )
    }, 0)

    // console.log(cartCtx.items)

    return(
        <button onClick={ctx.onOpenModal} className={headerCartButtonStyles.button}>
            <span className={headerCartButtonStyles.icon}>
               <CartIcon/>
            </span>
            <span>Your Cart</span>
            <span className={headerCartButtonStyles.badge}>{numberOfCartItems}</span>

        </button>
    )
}

export default HeaderCartButton