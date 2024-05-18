import { useState , useEffect } from 'react'
import React from 'react';
import DisplayCards from './DisplayCards';
import Pokedex  from 'pokedex-promise-v2'
import '../styles/App.css'


function getRandomIndexArray(){
  let numberOfCards = 10;
  let randomIndexArray=[];
  for(let i=0; i<numberOfCards;i++){
    while(true){
      let randomNumber = Math.floor(Math.random() * 1025) + 1;
      if(!randomIndexArray.includes(randomNumber)){
        randomIndexArray[i] = randomNumber;
        break;
      }
    }
  }
  return randomIndexArray;
}


function App() {
  console.log("APP START");
  const [currentScore , setCurrentScore] = useState(0);
  const [bestScore , setBestScore] = useState(0);
  const [pokemonData , setPokemonData] = useState([]);
  const [restartGame , setRestartGame] = useState(false);
  
  
 useEffect(()=>{
    const P = new Pokedex();
    const pokemonIdArray = getRandomIndexArray();  
    P.getPokemonByName(pokemonIdArray) // with Promise
    .then((response) => {
      console.log("RESPONE RECEIVED");
      console.log(response);
      const result = response;
      setPokemonData(result);
    })
    .catch((error) => {
      console.log('There was an ERROR: ', error);
    });

  },[restartGame]);
  

  useEffect(()=>{
    if(currentScore > bestScore){
      setBestScore(currentScore)
    }
  },[currentScore])




  return (
    <>
    
    <div className="mainContainer">

    <div className="headerContainer">
      <div className="logo">
        <p className="logoPara">Memory Game</p>
        <p className='gameInfo'>Click different images every time to get points.</p>
      </div>
    <div className="scoreBoard">
      <h3>Score : {currentScore}</h3>
     <h3>Best Score : {bestScore}</h3>
      </div>
      
    </div>
      
    
      {pokemonData.length>0 &&<DisplayCards
          pokemonDataArray={pokemonData}
          currentScore = {currentScore}
          bestScore ={bestScore}
          setBestScore = {setBestScore}
          setCurrentScore = {setCurrentScore}
          setRestartGame = {setRestartGame}
     />}

    </div>
    

     
    </>
  )
}

export default App
