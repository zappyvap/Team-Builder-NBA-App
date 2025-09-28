from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from nba_api.stats.static import players
from nba_api.stats.endpoints import CommonPlayerInfo
import random
import time




app = FastAPI() # creates the app

origins = [ # covers the links that the app will run and won't run anything else
    "http://localhost:5174",     
    "http://127.0.0.1:5174",     
    "http://localhost:5173",     
    "http://127.0.0.1:5173"
]

app.add_middleware( # stops any CORS error
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

def _get_player_photo_url(player_id: int): # helper function for photo
    return f"https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/{player_id}.png"
    


@app.get("/api/nba/random-players")
def get_random_players():
    try:
        all_active_players = players.get_active_players() # gets all the players

        # gets 3 random players
        random_players_subset = random.sample(all_active_players, 3)
        
        player_data_list = []
        for player in random_players_subset:
            player_id = player['id']
            
            # this uses the CPI endpoint using the player id to turn the data frame into a dictionary
            player_info_data = CommonPlayerInfo(player_id=player_id).get_data_frames()[0].to_dict('records')[0]
            
            #adds the player data from the dictionary and appends it to the final list as an object
            player_data_list.append({
                "id": player_id,
                "full_name": player_info_data.get('DISPLAY_FIRST_LAST'),
                "team_name": player_info_data.get('TEAM_NAME'),
                "position": player_info_data.get('POSITION'),
                "photo_url": _get_player_photo_url(player_id)
            })

            # stops from overloading the API
            time.sleep(0.5) 

        return player_data_list

    except Exception as e: # catches any errors with gathering the data from the API
        print(f"An error occurred: {e}")
        return {"error": "Internal server error fetching player data"}, 500