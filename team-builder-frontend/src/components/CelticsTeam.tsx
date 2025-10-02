import React from 'react'
import './CelticsTeam.css'

interface Props{
    setSelectedOpponent : (s : string) => void
    setOpponentScore : (x : number) => void
}


const CelticsTeam : React.FC<Props> = ({setSelectedOpponent,setOpponentScore}) => {
    const score = 228;

    const onClick = () =>{
        setSelectedOpponent("1986 Boston Celtics")
        setOpponentScore(score);
    }


  return (
    <div className='celticsBackground' onClick={onClick}>
        <p className='celticsText'>1986 Boston Celtics</p>
    </div>
  )
}

export default CelticsTeam