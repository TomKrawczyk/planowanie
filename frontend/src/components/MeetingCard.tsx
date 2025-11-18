import React from "react";

const MeetingCard = ({ meeting }: any) => (
  <div className="meeting-card">
    <h3>{meeting.first_name} {meeting.last_name}</h3>
    <p><b>Adres:</b> {meeting.address}</p>
    <p><b>Kod pocztowy:</b> {meeting.postal_code}</p>
    <p><b>Data:</b> {meeting.meeting_date} <b>Godzina:</b> {meeting.meeting_time}</p>
  </div>
);

export default MeetingCard;