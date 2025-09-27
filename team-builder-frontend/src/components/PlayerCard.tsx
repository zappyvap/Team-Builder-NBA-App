import React from 'react'
import './PlayerCard.css'

interface Props{
    player_id : string
    full_name : string
    team_name : string
    position : string
    photo_url : string
}


const PlayerCard : React.FC<Props>= ({photo_url,full_name,team_name,position}) => {
  return (
    <div className='playerCardBackground'>
      <img src = {photo_url} alt = {full_name}></img>
      <p className='positionText'>{position}</p>
      <p className='nameText'>{full_name}</p>
      <p className='teamText'>{team_name}</p>

    </div>
  )
}

export default PlayerCard