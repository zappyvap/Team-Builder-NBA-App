import React from 'react'
import "./SelectedPlayer.css"

interface Props {
    player_name : string
    photo_url : string
}

const SelectedPlayer : React.FC<Props> = ({player_name,photo_url}) => {
  return (
    <div className='selectedPlayerCard'>
        <img src = {photo_url} alt={player_name}/>
        <p className='selectedPlayerName'>{player_name}</p>
    </div>
  )
}

export default SelectedPlayer