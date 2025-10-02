import React from 'react'
import './CelticsTeam.css'

interface Props{
    setSelectedOpponent : (s : string) => void
}


const CelticsTeam : React.FC<Props> = ({setSelectedOpponent}) => {

    const onClick = () =>{
        setSelectedOpponent("1986 Boston Celtics")
    }


  return (
    <div className='celticsBackground' onClick={onClick}>
        <p className='celticsText'>1986 Boston Celtics</p>
    </div>
  )
}

export default CelticsTeam