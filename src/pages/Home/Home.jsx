import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom';

function Home() {
  
const {allCoin, currency} = useContext(CoinContext);
const [displayCoin, setDisplayCoin] = useState([]);
const [input, setInput] = useState('');

const inputHandler = (e) =>{
  setInput(e.target.value); //Collect input info
  if(e.target.value === ''){
    setDisplayCoin(allCoin);
  }
}

const searchHandler = async (e) => {
  e.preventDefault();
  const coins = await allCoin.filter((item) =>{
    return item.name.toLowerCase().includes(input.toLowerCase()) //se o input for igual a alguma moeda(item) em "allCoins" vai retornar essa moeda/s
  })
  setDisplayCoin(coins);
} 

useEffect(() => {
  setDisplayCoin(allCoin) //When allCoin is fetched, the function is executed, and the "displayCoin" state value is set with the fetched data with the setter function "setDisplayCoin(allCoin)"
},[allCoin])
  
  return (
    <div className='home'>
      <div className="hero">
        <h1>Largest <br /> Crypto MarketPlace</h1>
        <p>Welcome to the world's largest cryptocurrency marketplace. We hope we can help you in your crypto jorney!</p>
        <form onSubmit={searchHandler}>
          <input onChange={inputHandler} list='coinlist' value={input} type="text" required placeholder='Search crypto...'/>
          
          <datalist id='coinlist'>
            {allCoin.map((item, index) => (<option key={index} value={item.name}/>))}
          </datalist>
          
          
          <button type='submit'>Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p className='h-change'>24H Change</p>
          <p className='market-cap'>Market Cap</p>
        </div>
        {
          displayCoin.slice(0, 10).map((item, index) => ( //Slice, only gets 10 out of x items, map, loops all the items
            <Link to={`/coin/${item.id}`} className="table-layout" key={index}>
              <p>{item.market_cap_rank}</p>
              <div>
                <img src={item.image} alt="" />
                <p>{item.name + " - " + item.symbol}</p>
              </div>
              <p>{currency.symbol} {item.current_price.toLocaleString()}</p>
              <p className={`h-change ${item.price_change_percentage_24h > 0 ? 'green' : 'red'}`}>{Math.floor(item.price_change_percentage_24h*100)/100}</p>
              <p className='market-cap'>{item.market_cap.toLocaleString()}</p>
            </Link>
          ))
        }
      </div>  
    </div>
  )
}

export default Home