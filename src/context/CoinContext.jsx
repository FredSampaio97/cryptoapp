import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext();

const CoinContextProvider = (props) => {
    
    const [allCoin, setAllCoin] = useState([]); //Info feched from API in array format
    const [currency, setCurrency] = useState({ //Object with 2 props name and symbol
        name: "usd",
        symbol: "$"
    })

    const fetchAllCoin = async () => {
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-qoFnMfreijSBeokBA9Fa162U'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(response => response.json())
            .then(response => setAllCoin(response))
            .catch(err => console.error(err));
    }

useEffect(() => {
    fetchAllCoin();
},[currency])
    
    const contextValue = {
        allCoin, currency, setCurrency
    }
    
    return(
        <CoinContext.Provider value={contextValue}>
            {props.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider;