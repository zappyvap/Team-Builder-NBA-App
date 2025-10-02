import React from 'react'

import "./BullsTeam.css"


interface Props{
  setSelectedOpponent : (s : string) => void
}

const BullsTeam : React.FC<Props> = ({setSelectedOpponent}) => {

  const onClick = () =>{
    setSelectedOpponent("1996 Chicago Bulls");
  }


  return (
    <div className={'bullsBackground'}onClick={onClick}>
      <p className='bullsText'>1996 Chicago Bulls</p>
    </div>
  )
}

export default BullsTeam