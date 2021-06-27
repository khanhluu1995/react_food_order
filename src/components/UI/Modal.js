import ReactDOM from 'react-dom'
import $ from 'jquery'

import classes from './Modal.module.css'
import {Fragment, useContext} from "react";
import CloseModalContext from "../../store/close-modal-context";

const Backdrop = props => {
    const ctx = useContext(CloseModalContext)
    return <div onClick={ctx.onCloseModal} className={classes.backdrop}></div>
}

const ModalOverlay = props => {

    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}

const Modal = (props) => {
    const portalElement = $('#overlay-modal')[0]
    return(
        <Fragment>
            {ReactDOM.createPortal(<Backdrop/>, portalElement)}
            {ReactDOM.createPortal(<ModalOverlay >{props.children}</ModalOverlay>, portalElement)}
        </Fragment>
    )
}

export default Modal