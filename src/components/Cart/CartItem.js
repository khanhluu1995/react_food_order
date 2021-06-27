import classes from './CartItem.module.css';

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;

  const onMinusButtonHandler = (event) => {
      event.preventDefault()
      props.onRemove(props.id)
  }

  const onPlusButtonHandler = (event) => {
      event.preventDefault()
      props.onAdd({
          id: props.id,
          name: props.name,
          price: props.price,
          amount: 1
      })
  }

  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <button onClick={onMinusButtonHandler}>−</button>
        <button onClick={onPlusButtonHandler}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
