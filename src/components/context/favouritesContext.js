import React, { createContext, useContext, useMemo, useState, useCallback } from "react";


const favouritesContext = createContext(null);

export const useFavouritesContext = () => {
    const  context = useContext(favouritesContext);

    if(context === undefined){
        throw new Error('FavouritesContext should be within FavouritesContextProvider',
        );
    }

    return context;
};

const FavouritesContextProvider = ({children}) => {
    const [favourites, setFavourites] = useState([]);

    const addFavouritesHandler = useCallback(
        item => {
            const oldFavourites = [...favourites];
            const newFavourites = oldFavourites.concat(item);

            setFavourites(newFavourites);
    }, 
    [favourites],
    );

    const value = useMemo(
        () => ({
        favourites,
        addFavouritesHandler,
    }), 
    [favourites, addFavouritesHandler],
    );

    return (
        <favouritesContext.Provider value = {value}> 
            {children}
            </favouritesContext.Provider>
            );
};

export default FavouritesContextProvider;