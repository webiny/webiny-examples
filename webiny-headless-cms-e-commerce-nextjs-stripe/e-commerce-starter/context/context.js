import React, { useState } from 'react';

export const CartContext = React.createContext();

export const FavoriteContext = React.createContext();

export const ModalContext = React.createContext();

export const TotalContext = React.createContext();

export const CartProvider = (props) => {
    const [cart, setCart] = useState([]);
    const [favorites, setFavorite] = useState([]);
    const [visible, setVisible] = useState(false);
    const [totalPrice, settotalPrice] = useState(0);
    return (
        <CartContext.Provider value={[cart, setCart]}>
            <FavoriteContext.Provider value={[favorites, setFavorite]}>
                <ModalContext.Provider value={[visible, setVisible]}>
                    <TotalContext.Provider value={[totalPrice, settotalPrice]}>
                        {props.children}
                    </TotalContext.Provider>
                </ModalContext.Provider>
            </FavoriteContext.Provider>
        </CartContext.Provider>
    );
};
