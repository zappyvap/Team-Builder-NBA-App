import React from 'react'
import './PlayerCard.css'


interface PlayerInfo{ // player object
  id : string
  full_name : string
  position : string
  team_name : string
  photo_url : string
}

interface Props{
    player_id : string
    full_name : string
    team_name : string
    position : string
    photo_url : string
    player : PlayerInfo
    setSelectedList : (p : PlayerInfo[] | ((prev : PlayerInfo[]) => PlayerInfo[])) => void 
    selectedList : PlayerInfo[]
    setSelectedPlayer : (b : boolean) => void
}


const PlayerCard : React.FC<Props>= ({setSelectedPlayer,player,photo_url,full_name,team_name,position, setSelectedList}) => {

  const onClick = () =>{
    setSelectedList((prev : PlayerInfo[]) => [...prev,player])
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