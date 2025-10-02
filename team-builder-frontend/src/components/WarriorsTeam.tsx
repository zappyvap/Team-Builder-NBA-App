import React from 'react'
import "./WarriorsTeam.css"

interface Props{
    setSelectedOpponent : (s : string) => void
    setOpponentScore : (x : number) => void
}


const WarriorsTeam : React.FC<Props>= ({setSelectedOpponent, setOpponentScore}) => {
  const score = 223;

  const onClick = () =>{
    setSelectedOpponent("2017 Golden State Warriors")
    setOpponentScore(score);
  }


  return (
    <div className='warriorsBackground' onClick={onClick}>
        <p className='warriorsText'>2017 Golden State Warriors</p>
    </div>
  )
}

export default WarriorsTeam