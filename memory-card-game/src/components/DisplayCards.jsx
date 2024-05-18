import { useEffect, useState } from "react";

function DisplayCards(props){
    const numberOfCards = props.pokemonDataArray.length;
    const [selectedPokemon , setSelectedPokemon] = useState([]);
    const [randomisedIndexArray , setRandomisedIndexArray] = useState(getRandomisedIndexArray());

    

    console.log("DISPLAY CARD INFO");
    console.log(props.pokemonDataArray);
    console.log(numberOfCards)
    console.log(randomisedIndexArray);
    console.log(selectedPokemon);

    

    function getRandomisedIndexArray(){
    
        let indexArray = [];
        for(let i=0; i<numberOfCards ;i++){
            indexArray[i] = i;
        }
        let randomisedIndexArray = indexArray.sort((a,b)=>0.5 - Math.random());
        return randomisedIndexArray;
    }



    function restartGame(){
        props.setCurrentScore(0);
        setSelectedPokemon([]);
        props.setRestartGame(gamestatus=>{!gamestatus});
    }

    function handleClick(e){
        console.log("CLICKED ------------------------------------");
        console.log(e.target.id);
        
        if(selectedPokemon.includes(e.target.id)){
            console.log(" YOU LOOSE : ");
            console.log(props.currentScore)
            restartGame()

        }else{
            props.setCurrentScore(score=>score+1);
            if((props.currentScore+1)===numberOfCards){
                console.log("YOU WIN");
                props.setBestScore(numberOfCards);
                restartGame()
            }else{
                let newSelectedPokemonArray = [...selectedPokemon]
                newSelectedPokemonArray.push(e.target.id);
                props.setCurrentScore(props.currentScore + 1);
                setSelectedPokemon(newSelectedPokemonArray);
                setRandomisedIndexArray(getRandomisedIndexArray());
            }
        }   
        
    }

        return(
            
            <div className="cardsContainer">
                {
                    randomisedIndexArray.map((randomIndex)=>{
                        return <div 
                            className="card" 
                            id={props.pokemonDataArray[randomIndex].name} 
                            onClick={handleClick}>
                                <img
                                    id={props.pokemonDataArray[randomIndex].name} 
                                    src={props.pokemonDataArray[randomIndex].sprites.front_default} 
                                    alt="" />
                                <p 
                                className="cardTitle"
                                id={props.pokemonDataArray[randomIndex].name}>{
                                props.pokemonDataArray[randomIndex].name}
                                </p>
                            </div>
                    })
                }

            </div>
    
        )
    

    
}

export default DisplayCards;