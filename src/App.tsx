import { useState, useEffect } from 'react';
import axios from 'axios'



export type Competitor = {
  id: string;
  points: number;
  discord: string;
};

function App() {

  const [competitors, setCompetitors] = useState<Competitor[] | null>([]);
    useEffect(() => {
      const  url:string = "https://api.hackillinois.org/profile/leaderboard/?limit=100";
      axios.get(url).then((response) => {
        console.log(response.data.profiles);
        setCompetitors(response.data.profiles);
      }); 
    },[]);


    return (
      <body>
        <header>
          <img src="../assets/hackIllinoisLogo.svg" alt = "" className="logo"/>
        </header>
        <div className="container">
          <div className="filter-bar">
              <label htmlFor="places-per-page">Places per page:</label>
              <select id="places-per-page">
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="100">100</option>
              </select>
              <label htmlFor="sort-by">Sort by:</label>
              <select id="sort-by">
                <option value="place">Place</option>
                <option value="discord-name">Discord Name</option>
                <option value="points">Points</option>
              </select>
          </div>
          <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Place</th>
                  <th>Discord Name</th>
                  <th>Points</th>
                </tr>
              </thead>
              <tbody>
                {competitors ? competitors.map((competitor, index) => {
                  return (
                    <tr key={competitor.id}>
                      <td>{index + 1}</td>
                      <td>{competitor.discord}</td>
                      <td>{competitor.points}</td>
                    </tr>
                  );
                }) : null}
              </tbody>
          </table>
        </div>
      </body>
        
    );

}

export default App;