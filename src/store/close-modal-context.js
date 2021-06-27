import React, {useState} from "react";

const CloseModalContext = React.createContext({
    isOpen: false,
    onCloseModal: () => {},
    onOpenModal: () => {}
})

export const CloseModalContextProvider = (props) => {

    const [isOpen, setIsOpen] = useState(false)

    const closeModalHandler = () => {
        setIsOpen(false)
    }

    const openModalHandler = () => {
        setIsOpen(true)
    }

    return(
        <CloseModalContext.Provider value={{
            isOpen: isOpen,
            onCloseModal: closeModalHandler,
            onOpenModal: openModalHandler
        }}>
            {props.children}
        </CloseModalContext.Provider>
    )


}

export default CloseModalContext