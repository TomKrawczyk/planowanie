import React from "react";

const FilterBar = ({ filters, onChange }: any) => (
  <div className="filter-bar">
    <input
      type="date"
      value={filters.date}
      onChange={e => onChange({ ...filters, date: e.target.value })}
      placeholder="Data spotkania"
    />
    <input
      type="text"
      value={filters.search}
      onChange={e => onChange({ ...filters, search: e.target.value })}
      placeholder="Szukaj imię, nazwisko, adres"
    />
    <select
      value={filters.sort}
      onChange={e => onChange({ ...filters, sort: e.target.value })}
    >
      <option value="time">Godzina</option>
      <option value="date">Data</option>
      <option value="name">Nazwisko</option>
    </select>
  </div>
);

export default FilterBar;
