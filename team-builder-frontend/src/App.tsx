import { useEffect, useState } from 'react';
import './App.css'
import PlayerCard from './components/PlayerCard';

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

  useEffect(() =>{
    const api_url = 'http://localhost:8000/api/nba/random-players'; 

    fetch(api_url)
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


  },[])

  if(loading){
    return(
      <div>
        Loading Players...
      </div>
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
    <>
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
            />
        ))}
      </div>
    </>
  )

}
export default App
