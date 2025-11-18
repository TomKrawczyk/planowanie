import React from "react";

const StatisticsPanel = ({ meetings }: any) => {
  const numMeetings = meetings.length;
  const regions = [...new Set(meetings.map((m: any) => m.postal_code?.slice(0,2)))].length;
  return (
    <div className="stats-panel">
      <div><b>Spotkania:</b> {numMeetings}</div>
      <div><b>Województwa:</b> {regions}</div>
    </div>
  );
};

export default StatisticsPanel;