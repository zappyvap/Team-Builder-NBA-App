import React from 'react'
import './PlayerCard.css'


// make sure you git ignore the venv folder somehow!!

interface Props{
    player_id : string
    full_name : string
    team_name : string
    position : string
    photo_url : string
    player : any
    setSelectedList : any
    selectedList : any
    setSelectedPlayer : any
}


const PlayerCard : React.FC<Props>= ({setSelectedPlayer,player,photo_url,full_name,team_name,position, setSelectedList}) => {

  const onClick = () =>{
    setSelectedList((prev) => [...prev,player])
    setSelectedPlayer(true)
  }

  return ( // Div that holds the players
    <div className='playerCardBackground' onClick={onClick}>
      <img className='playerImage' src = {photo_url} alt = {full_name}></img>
      <p className='nameText'>{full_name}</p>
      <p className='positionText'>{position}</p>
      <p className='teamText'>{team_name}</p>
    </div>
  )
}

export default PlayerCard