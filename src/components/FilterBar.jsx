import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import styles from "../styles/FilterBar.module.css";

const API_BASE = "https://teknorix.jobsoid.com/api/v1";

function FilterBar() {
  const [departments, setDepartments] = useState([]);
  const [locations, setLocations] = useState([]);
  const [functions, setFunctions] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");

  const fetchLookups = async () => {
    const [dRes, lRes, fRes] = await Promise.all([
      fetch(`${API_BASE}/departments`),
      fetch(`${API_BASE}/locations`),
      fetch(`${API_BASE}/functions`),
    ]);
    setDepartments(await dRes.json());
    setLocations(await lRes.json());
    setFunctions(await fRes.json());
  };

  const handleFilterChange = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const newParams = new URLSearchParams(searchParams);
    if (search) newParams.set("q", search);
    else newParams.delete("q");
    setSearchParams(newParams);
  };

  useEffect(() => {
    fetchLookups();
  }, []);

  return (
    <div className={styles.filterBar}>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search for Job"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">🔍</button>
      </form>
      <select
        onChange={(e) => handleFilterChange("department", e.target.value)}
        value={searchParams.get("department") || ""}
      >
        <option value="">Department</option>
        {departments.map((dep) => (
          <option key={dep.id} value={dep.id}>
            {dep.title}
          </option>
        ))}
      </select>
      <select
        onChange={(e) => handleFilterChange("location", e.target.value)}
        value={searchParams.get("location") || ""}
      >
        <option value="">Location</option>
        {locations.map((loc) => (
          <option key={loc.id} value={loc.id}>
            {loc.title}
          </option>
        ))}
      </select>
      <select
        onChange={(e) => handleFilterChange("function", e.target.value)}
        value={searchParams.get("function") || ""}
      >
        <option value="">Function</option>
        {functions.map((func) => (
          <option key={func.id} value={func.id}>
            {func.title}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FilterBar;
