import { useEffect, useState } from 'react';
import './App.css'
import PlayerCard from './components/PlayerCard';
import SelectedPlayer from './components/SelectedPlayer';
import BullsTeam from './components/BullsTeam';
import WarriorsTeam from './components/WarriorsTeam';
import CelticsTeam from './components/CelticsTeam';
import {GoogleGenerativeAI} from "@google/generative-ai";


const geminiKey = import.meta.env.VITE_GEMINI_KEY;
const genAI = new GoogleGenerativeAI(geminiKey);

interface PlayerInfo{ // player object
  id : string
  full_name : string
  position : string
  team_name : string
  photo_url : string
}

interface PlayerStats{
  id : string
  ppg : string
  apg : string
  rpg : string
  spg : string
  bpg : string
}

function Home() {
  const [playerList, setPlayerList] = useState<PlayerInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedList, setSelectedList] = useState<PlayerInfo[]>([]);
  const [selectedPlayer, setSelectedPlayer] = useState(false);
  const [selectedOpponent, setSelectedOpponent] = useState('');
  const [AIText,setAIText] = useState('');
  const [AILoading, setAILoading] = useState(false);
  const [opponentScore, setOpponentScore] = useState(0);
  const [userWin,setUserWin] = useState(false);
  const [userScore, setUserScore] = useState(0);

  async function aiCall(){ // this handles the api call to the ai
    setAILoading(true);

    const playerScoreArr = await determineWinner();
    const userCalculatedScore = winnerAlgorithm(playerScoreArr);
    setUserScore(userCalculatedScore);

    const model = genAI.getGenerativeModel({model: "gemini-2.5-flash"});

    let prompt;

    if(userCalculatedScore >= opponentScore){
      setUserWin(true);
      prompt = 
      `write a narrative about ${displayPlayers()} beating ${selectedOpponent} in a head to head match in one paragraph`;
    }
    else{
      prompt = 
        `write a narrative about ${selectedOpponent} beating ${displayPlayers()} in a head to head match in one paragraph`;
    }
    
    const result = await model.generateContent(prompt);
    const response = result.response;
    setAIText(response.text());
    setAILoading(false);
}

  const displayPlayers = () =>{ // this is a helper function that lists out the players the user selected
    const playerNames = selectedList.map(player => player.full_name);
    return playerNames.join(', ');
  }

  const determineWinner = async () =>{
    const api_url = 'http://localhost:8000/api/nba/player-stats';

    const payload = selectedList.map(player => String(player.id));

    return fetch(api_url, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })
    .then(response => {
        // check if everything is good with the response
        if (!response.ok) {
            // throwing an error here moves execution to the .catch() block
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // returns the promise that converts the raw stream to a JSON object
        return response.json(); 
    })
    .then(json => {

        if (Array.isArray(json) && json.length > 0) {
          setLoading(false);
          return json;
          
        } else {
          console.log("No Results Found, Please Try Again.");
          setLoading(false);
          return []
        }
    })
    .catch((err) => { 
        // This catches network errors AND the error thrown in step 1
        console.error("Fetch failed:", err);
        setError(err.message);
        setLoading(false); 
        return []
    });

  }

  const winnerAlgorithm = (playerList : PlayerStats[]) =>{
    return playerList.reduce((acc : number, e : PlayerStats) =>{
      const p = parseInt(e.ppg);
      const a = parseInt(e.apg) * 2;
      const r = parseInt(e.rpg) * 1.75;
      const s = parseInt(e.spg) * 3;
      const b = parseInt(e.bpg) * 4;
      acc = acc + p + a + r + s + b;
      console.log(acc)
      return acc;
    },0)
  }

  useEffect(() =>{ // this calls the backend to which calls the nba api to get the random players
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

  useEffect(()=>{ // this calls the ai function if the user has selected their opponent
    if(selectedOpponent.length !== 0 && AIText.length === 0){
      aiCall()
    }
    console.log(displayPlayers());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[selectedOpponent])


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
  if(error!== null){ // for when there is an error
    return(
      <div>
        There was an error
      </div>
    )
  }

  if(AILoading){ // for when the ai response is loading
    return(
      <h1>Loading Results...</h1>
    )
  }

  // this resets all the values so that the user can use the program again
  const handlePlayAgain = () =>{ 
    setPlayerList([]);
    setSelectedList([]);
    setSelectedOpponent('');
    setAIText('');
    setOpponentScore(0);
    setUserWin(false);
    setUserScore(0);
  }

  /**
   * This is the main loading window of the code.
   * This will keep loading random player objects until the user selects 5
   * different players to their team.
   * It will then display the opponents that they can play.
   * Once they click an opponent, it will generate the score for the opponent and 
   * the user score and determine if they win or not, and display accordingly.
   */
  return (
    <>
      {selectedList.length >= 5? (
        selectedOpponent.length !== 0 ? (
          <>
            {userWin ?(
              <>
                <div className='aiDisplay'>
                  <h1 className='aiHeader'>You Win!</h1>
                  <div className='aiTextBox'>
                  <p className='aiText'>{AIText}</p>
                  </div>
                  <p className='userScore'>Your Score: {userScore}</p>
                  <button onClick={handlePlayAgain} className='playAgainButton'>Play Again</button>
                </div>
              </>
            ):(
              <>
                <div className='aiDisplay'>
                  <h1 className='aiHeader'>You Lose!</h1>
                  <div className='aiTextBox'>
                  <p className='aiText'>{AIText}</p>
                  </div>
                  <p className='userScore'>Your Score: {userScore}</p>
                  <button onClick={handlePlayAgain} className='playAgainButton'>Play Again</button>
                </div>
              </>
            )}
          </>
        ):(
          <>
            <div className='opponentUnit'>
              <h1 className='opponentHeader'>Choose Your Opponent</h1>
              <div className='opponentsBox'>
                <BullsTeam setOpponentScore={setOpponentScore} setSelectedOpponent={setSelectedOpponent}/>
                <WarriorsTeam setOpponentScore={setOpponentScore} setSelectedOpponent={setSelectedOpponent}/>
                <CelticsTeam  setOpponentScore={setOpponentScore} setSelectedOpponent={setSelectedOpponent}/>
              </div>
            </div>
          </>
          )
      ):(
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
      )}
    </>
  )

}
export default Home
