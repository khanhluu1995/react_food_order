import classes from './MealItemForm.module.css'
import Input from "../../UI/Input";
import {useRef, useState} from "react";

const MealItemForm = (props) => {
    const inputRef = useRef()
    const [isAmountValid, setIsAmountValid] = useState(true )
    const submitHandler = (event) => {
        event.preventDefault()
        const enteredAmount = parseInt(inputRef.current.value)

        if (enteredAmount < 1 || enteredAmount > 5) {
            setIsAmountValid(false)
            return;
        }
        props.onAddToCart(enteredAmount)
    }
    const inputSettings = {
        id: 'amount_' + props.id,
        type: 'number',
        min: 1,
        max: 5,
        step:1,
        label: 'amount',
        defaultValue: 1,
    }
    return(
        <form className={classes.form} onSubmit={submitHandler}>
            <Input ref={inputRef}
                   input={inputSettings}/>
            <button>+ Add To Cart</button>
            {!isAmountValid && <p style={{color: 'red'}}>Please enter valid amount (1-5)</p>}
        </form>
    )
}

export default MealItemForm