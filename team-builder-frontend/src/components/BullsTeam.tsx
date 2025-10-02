import React from 'react'

import "./BullsTeam.css"


interface Props{
  setSelectedOpponent : (s : string) => void
  setOpponentScore : (x : number) => void
}

const BullsTeam : React.FC<Props> = ({setSelectedOpponent,setOpponentScore}) => {
  const score = 200

  const onClick = () =>{
    setSelectedOpponent("1996 Chicago Bulls");
    setOpponentScore(score);
  }


  return (
    <div className={'bullsBackground'}onClick={onClick}>
      <p className='bullsText'>1996 Chicago Bulls</p>
    </div>
  )
}

export default BullsTeam