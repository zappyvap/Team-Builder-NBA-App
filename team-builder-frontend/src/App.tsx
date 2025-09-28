import { useEffect, useState } from 'react';
import './App.css'
import PlayerCard from './components/PlayerCard';
import SelectedPlayer from './components/SelectedPlayer';

interface PlayerInfo{
  id : string
  full_name : string
  position : string
  team_name : string
  photo_url : string
}

function App() {
  const [playerList, setPlayerList] = useState<PlayerInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedList, setSelectedList] = useState<PlayerInfo[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState(false);

  useEffect(() =>{
    setLoading(true);
    const api_url = 'http://localhost:8000/api/nba/random-players';  // url for backend

    fetch(api_url) // fetch call to python venv and grabs the data from the nba api
      .then((res) =>{
        if (!res.ok){
          throw new Error(`HTTP error, Status: ${res.status}`);
        }
        return res.json()
      }) // gets the json
      .then((json) => {
        // takes the results of the json and adds it to the player list
        if (Array.isArray(json) && json.length > 0) {
          setPlayerList(json);
          setLoading(false);
        } else {
          console.log("No Results Found, Please Try Again.");
          setPlayerList([]);
          setLoading(false);
        }
      })
      .catch((err) => { // catches error if there is one
        console.error("Fetch failed:", err);
        setError(err.message);
        setLoading(false); 
      });


  },[selectedList])

  if(loading){ // for when its loading
    return(
      <>
      <h1>Loading Players...</h1>
      <div className='selectedPlayerContent'>
      <h1 className='yourTeamTitle'>Your Team</h1>
        <div className='selectedPlayer'>
        {selectedPlayer && (
          
            selectedList.map((m)=>(
                <SelectedPlayer
                key={m.id}
                photo_url={m.photo_url}
                player_name={m.full_name}
                />
            ))
        )}
        </div>
      </div>
    </>
    )
  }
  if(error!== null){
    return(
      <div>
        There was an error
      </div>
    )
  }

  return (
    <div className='allContent'>
      <div className='selectedPlayerContent'>
      <h1 className='yourTeamTitle'>Your Team</h1>
        <div className='selectedPlayer'>
        {selectedPlayer && (
          
            selectedList.map((m)=>(
                <SelectedPlayer
                key={m.id}
                photo_url={m.photo_url}
                player_name={m.full_name}
                />
            ))
        )}
        </div>
      </div>
      <div className='mainContent'>
        <h1 className='title'>NBA Team Builder</h1>
        <div className='playerCard'>
          {playerList.map((m) => (
            <PlayerCard
              key = {m.id}
              player_id={m.id}
              full_name={m.full_name}
              position={m.position}
              team_name={m.team_name}
              photo_url={m.photo_url}
              player={m}
              setSelectedList={setSelectedList}
              selectedList={selectedList}
              setSelectedPlayer={setSelectedPlayer}
            />
          ))}
        </div>
      </div>
    </div>
  )

}
export default App
