import React, { createContext, useContext, useMemo, useState } from "react";


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

    const addFavouritesHandler = () => {};

    const value = useMemo(
        () => ({
        favourites,
        addFavouritesHandler,
    }), 
    [favourites],
    );

    return (
        <favouritesContext.Provider value = {value}> 
            {children}
            </favouritesContext.Provider>
            );
};

export default FavouritesContextProvider;