import React, { useEffect, useState } from "react";
import MeetingCard from "./components/MeetingCard";
import FilterBar from "./components/FilterBar";
import StatisticsPanel from "./components/StatisticsPanel";
import MapView from "./components/MapView";
import { fetchMeetings, fetchRoute } from "./api/meetings";
import "./styles.css";

const App: React.FC = () => {
  const [meetings, setMeetings] = useState([]);
  const [filters, setFilters] = useState({ date: "", search: "", sort: "time" });
  const [route, setRoute] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchMeetings(filters).then(data => {
      setMeetings(data);
      setLoading(false);
    });
  }, [filters]);

  const handleFiltersChange = (f: any) => setFilters(f);

  const handleShowRoute = () => {
    setLoading(true);
    fetchRoute({ date: filters.date }).then(data => {
      setRoute(data);
      setLoading(false);
    });
  };

  return (
    <div className="container">
      <header className="header-mgx">
        <h1>🗺️ Optymalizator Tras</h1>
        <p>Automatyczne planowanie spotkań</p>
      </header>
      <FilterBar filters={filters} onChange={handleFiltersChange} />
      <button className="route-btn" onClick={handleShowRoute}>Wyznacz trasę dnia</button>
      {loading ? <div className="loader">Ładowanie...</div> :
        <>
          <StatisticsPanel meetings={meetings} />
          <div className="meeting-list">
            {meetings.length === 0 ? <div>Brak spotkań</div> :
              meetings.map((m, idx) => <MeetingCard key={idx} meeting={m} />)}
          </div>
          <MapView meetings={route} />
        </>
      }
    </div>
  );
};
export default App;