import React from "react";

const MapView = ({ meetings }: any) => (
  <div className="map-view">
    <h2>⛳ Planowana Trasa Spotkań</h2>
    {meetings && meetings.length > 0 ?
      <ol>
        {meetings.map((m: any, idx: number) => (
          <li key={idx}>{m.address} ({m.meeting_time})</li>
        ))}
      </ol>
      :
      <div>Brak trasy<br /><span style={{fontSize:"small"}}>Mapa docelowa po podpięciu Google Maps API</span></div>
    }
  </div>
);

export default MapView;
