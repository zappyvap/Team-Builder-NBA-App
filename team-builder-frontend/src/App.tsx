import { useEffect, useState } from 'react';
import './App.css'
import PlayerCard from './components/PlayerCard';


function App() {
  const [playerList, setPlayerList] = useState([
  { id: '', full_name: '', position: '', team_name: '', photo_url: '' }
]);


  useEffect(() =>{
    const api_url = 'http://localhost:8000/api/nba/random-players/3'; 

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
        } else {
          console.log("No Results Found, Please Try Again.");
          setPlayerList([]);
        }
      })
      .catch((err) => console.error(err)); // catches any error with retrieving the json


  },[])

  return (
    <div>
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
  )

}
export default App
