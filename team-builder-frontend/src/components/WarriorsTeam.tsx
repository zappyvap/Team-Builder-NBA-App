import React from 'react'
import "./WarriorsTeam.css"

interface Props{
    setSelectedOpponent : (s : string) => void
}


const WarriorsTeam : React.FC<Props>= ({setSelectedOpponent}) => {
  const onClick = () =>{
    setSelectedOpponent("2017 Golden State Warriors")
  }


  return (
    <div className='warriorsBackground' onClick={onClick}>
        <p className='warriorsText'>2017 Golden State Warriors</p>
    </div>
  )
}

export default WarriorsTeam