import React, { createContext, useContext, useState} from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundKeyboard;
    let index;

    const onAdd = (keyboard, quantity) => {
        const checkKeyboardInCart = cartItems.find((item) => item._id === keyboard._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + keyboard.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        if (checkKeyboardInCart) {
            const updatedCartItems = cartItems.map((cartKeyboard) => {
                if (cartKeyboard._id === keyboard._id) return {
                    ...cartKeyboard,
                    quantity: cartKeyboard.quantity + quantity
                }
            })

            setCartItems(updatedCartItems);
        } else {
            keyboard.quantity = quantity;

            setCartItems([...cartItems, { ...keyboard }]);
        }

        toast.success(`${qty} ${keyboard.name} added to the cart.`);
    }

    const onRemove = (keyboard) => {
        foundKeyboard = cartItems.find((item) => item._id === keyboard._id);
        const newCartItems = cartItems.filter((item) => item._id !== keyboard._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundKeyboard.price * foundKeyboard.quantity);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundKeyboard.quantity);
        setCartItems(newCartItems);
    }

    const toggleCartItemQuanitity = (id, value) => {
        foundKeyboard = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((keyboard) => keyboard._id === id);
        const newCartItems = cartItems.filter((item) => item._id !== id)

        if (value === 'inc') {
            setCartItems([...newCartItems, { ...foundKeyboard, quantity: foundKeyboard.quantity + 1 }]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundKeyboard.price)
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1)
        } else if (value === 'dec') {
            if (foundKeyboard.quantity > 1) {
                setCartItems([...newCartItems, { ...foundKeyboard, quantity: foundKeyboard.quantity - 1 }]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundKeyboard.price)
                setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1)
            }
        }
    }

    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;

            return prevQty - 1;
        });
    }

    return (
        <Context.Provider
            value={{
                showCart,
                setShowCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuanitity,
                onRemove,
                setCartItems,
                setTotalPrice,
                setTotalQuantities
            }}
        >
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);