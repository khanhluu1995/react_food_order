import classes from './MealItem.module.css'
import MealItemForm from "./MealItemForm";
import {useContext} from "react";
import AddItemsContext from "../../../store/add-items-context";

const MealItem = (props) => {
    const price = `$${props.price.toFixed(2)}`

    const ctx = useContext(AddItemsContext)

    const addToCartHandler = (numberOfItems) => {
        ctx.addItem({
            id: props.id,
            name: props.name,
            price: props.price,
            amount: numberOfItems
        })
    }
    return(
        <li className={classes.meal}>
            <div>
                <h3>{props.name}</h3>
                <div className={classes.description}>{props.description}</div>
                <div className={classes.price}>{price}</div>

            </div>
            <MealItemForm onAddToCart={addToCartHandler} id={props.id}>

            </MealItemForm>
        </li>
    )
}

export default MealItem