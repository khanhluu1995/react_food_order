import React from "react";
const AddItemsContext = React.createContext({
    items: [],
    totalAmount: 0,
    addItem: (item)=> {},
    removeItem: (id) => {}
})

export default AddItemsContext