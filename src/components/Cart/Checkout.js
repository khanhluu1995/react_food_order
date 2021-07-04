import classes from './Checkout.module.css';
import {useRef, useState} from "react";

const Checkout = (props) => {
    const nameRef = useRef()
    const addressRef = useRef()
    const cityRef = useRef()
    const postalRef = useRef()

    const [formInputValidity, setFormInputValidity] = useState({
        name: true,
        address: true,
        city: true,
        postal: true
    })

    const isEmpty = value => value.trim() !== ''
    const isFiveDigital  = value => value.length === 5

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredNameValid = isEmpty(nameRef.current.value)
        const enteredAddressValid = isEmpty(addressRef.current.value)
        const enteredCityValid = isEmpty(cityRef.current.value)
        const enteredPostalValid = isFiveDigital(postalRef.current.value)

        setFormInputValidity({
            name: enteredNameValid,
            address: enteredAddressValid,
            city: enteredCityValid,
            postal: enteredPostalValid
        })
        if (enteredAddressValid && enteredNameValid && enteredCityValid && enteredPostalValid) {
            console.log('passed form validation')
        }

        else {
            console.log('failed')
            return
        }

        props.onSubmitOrder({
            name: nameRef.current.value,
            address: addressRef.current.value,
            city: cityRef.current.value,
            postal: postalRef.current.value
        })
    };



    return (

        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={`${classes.control} ${formInputValidity.name ? '' : classes.invalid}` }>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameRef}/>
                {!formInputValidity.name && <p>Not a valid name</p>}
            </div>
            <div className={`${classes.control} ${formInputValidity.address ? '' : classes.invalid}` }>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={addressRef}/>
                {!formInputValidity.address && <p>Not a valid address</p>}
            </div>
            <div className={`${classes.control} ${formInputValidity.postal ? '' : classes.invalid}` }>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalRef}/>
                {!formInputValidity.postal && <p>Not a valid postal code</p>}
            </div>
            <div className={`${classes.control} ${formInputValidity.city ? '' : classes.invalid}` }>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityRef}/>
                {!formInputValidity.city && <p>Not a valid city</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;