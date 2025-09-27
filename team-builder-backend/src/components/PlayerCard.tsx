import React from 'react'

interface Props{
    player_id : string
    full_name : string
    team_name : string
    position : string
    photo_url : string
}


const PlayerCard : React.FC<Props>= ({photo_url,full_name,team_name,position}) => {
  return (
    <div>
      <img src = {photo_url} alt = {full_name}></img>
      <p>{position}</p>
      <p>{full_name}</p>
      <p>{team_name}</p>

    </div>
  )
}

export default PlayerCard