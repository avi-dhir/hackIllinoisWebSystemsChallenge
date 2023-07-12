import axios from "axios";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Select from "react-select";
import { Button } from "reactstrap";

export type Competitor = {
  id: string;
  points: number;
  discord: string;
};

interface loadOption {
  value: number;
  label: string;
}
function Board() {
  const { pageNumber } = useParams();
  const siteNumber: number = pageNumber ? Number(pageNumber) : 1;
  const { items } = useParams();
  const numToLoad: number = items ? Number(items) : 25;

  const previousSite: number = siteNumber - 1 > 1 ? siteNumber - 1 : 1;
  const nextSite: number = siteNumber + 1;

  const options: loadOption[] = [
    { value: 10, label: "10" },
    { value: 25, label: "25" },
    { value: 50, label: "50" },
    { value: 100, label: "100" },
  ];

  const [selected, setSelected] = useState({
    value: numToLoad,
    label: numToLoad.toString(),
  });

  const [competitors, setCompetitors] = useState<Competitor[] | null>([]);

  useEffect(() => {
    const maxLoading: number = selected.value * siteNumber;
    const url: string =
      "https://api.hackillinois.org/profile/leaderboard/?limit=" +
      maxLoading.toString();
    axios.get(url).then((response) => {
      const filteredProfiles = response.data.profiles.slice(
        maxLoading - selected.value,
        maxLoading + 1
      );
      setCompetitors(filteredProfiles);
    });
  }, [siteNumber, selected]);

  const handleChange = (selectedOption: any) => {
    setSelected(selectedOption);
  };

  return (
    <div>
      <div className="container">
        <div className="filter-bar">
          <label htmlFor="places-per-page">Places per page:</label>
          <Select
            tabIndex={1}
            defaultValue={selected}
            options={options}
            onChange={handleChange}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Place</th>
              <th>Discord Name</th>
              <th>Points</th>
            </tr>
          </thead>
          <tbody>
            {competitors
              ? competitors.map((competitor, index) => {
                  return (
                    <tr
                      tabIndex={index + 2}
                      role="tabpanel"
                      key={competitor.id}
                    >
                      <td>{selected.value * (siteNumber - 1) + index + 1}</td>
                      <td>{competitor.discord}</td>
                      <td>{competitor.points}</td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
        <div className="nav-buttons">
          <Link to={`/${previousSite}/${selected.label}`}>
            <Button
              tabIndex={selected.value + 2}
              disabled={siteNumber == previousSite ? true : false}
              color="secondary"
            >
              Back
            </Button>
          </Link>
          <Link to={`/${nextSite}/${selected.label}`}>
            <Button
              tabIndex={selected.value + 3}
              disabled={siteNumber * selected.value + 1 > 743 ? true : false}
              color="secondary"
            >
              Forward
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Board;
