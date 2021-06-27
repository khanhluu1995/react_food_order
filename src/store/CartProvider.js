import {useReducer} from "react";

import AddItemsContext from "./add-items-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
}
const cartReducer = (prevState, action) => {
    if (action.type === 'ADD_NEW_ITEM') {
        if (prevState.items.length === 0) {
            const updatedItems = prevState.items.concat(action.item)
            const updatedTotalAmount = prevState.totalAmount + action.item.price * action.item.amount

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }
        }else {
            for (let item of prevState.items) {
                if (item.id === action.item.id) {
                    // foundExistedItem = true
                    item.amount += action.item.amount
                    const updatedItems = prevState.items
                    const updatedTotalAmount = prevState.totalAmount + action.item.price * action.item.amount

                    return {
                        items: updatedItems,
                        totalAmount: updatedTotalAmount
                    }
                }
            }
            const updatedItems =  prevState.items.concat(action.item)
            const updatedTotalAmount = prevState.totalAmount + action.item.price * action.item.amount

            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }

        }
    } else if (action.type === 'REMOVE_ITEM') {

        let arrayIndex = parseInt(action.id.split('m')[1]) - 1

        console.log('item: ', prevState.items[arrayIndex])

        prevState.items[arrayIndex].amount--
        const updatedItems = prevState.items
        const updatedTotalAmount = prevState.totalAmount - prevState.items[arrayIndex].price

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }
    }
    return {
        defaultCartState
    }
}
const CartProvider = (props) => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState)

    const addItemsHandler = (item) => {
        dispatchCartAction({type: 'ADD_NEW_ITEM', item: item})
    }

    const removeItemsHandler = (id) => {
        dispatchCartAction({type: 'REMOVE_ITEM', id: id})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemsHandler,
        removeItem: removeItemsHandler,
    }
    return <AddItemsContext.Provider value={cartContext}>
        {props.children}
    </AddItemsContext.Provider>
}

export default CartProvider