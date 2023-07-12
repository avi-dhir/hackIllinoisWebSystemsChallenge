import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Board from "./Board.tsx";
import { Container } from "reactstrap";

export type Competitor = {
  id: string;
  points: number;
  discord: string;
};

function App() {
  return (
    <Container>
      <header>
        <img src="../assets/hackIllinoisLogo.svg" alt="" className="logo" />
      </header>
      <Router>
        <Routes>
          <Route path="/:pageNumber?/:items?" element={<Board />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
