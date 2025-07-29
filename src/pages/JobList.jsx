import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import FilterBar from "../components/FilterBar";
import JobCard from "../components/JobCard";
import FilterTag from "../components/FilterTag";
import styles from "../styles/JobList.module.css";

const API_BASE = "https://teknorix.jobsoid.com/api/v1";

function JobList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [jobs, setJobs] = useState([]);
  const [groupedJobs, setGroupedJobs] = useState({});

  const fetchJobs = async () => {
    const params = new URLSearchParams();
    if (searchParams.get("q")) params.append("q", searchParams.get("q"));
    if (searchParams.get("department"))
      params.append("department", searchParams.get("department"));
    if (searchParams.get("location"))
      params.append("location", searchParams.get("location"));
    if (searchParams.get("function"))
      params.append("function", searchParams.get("function"));

    const res = await fetch(`${API_BASE}/jobs?${params.toString()}`);
    const data = await res.json();

    const grouped = {};
    data.forEach((job) => {
      const dept = job.department?.title || "Others";
      if (!grouped[dept]) grouped[dept] = [];
      grouped[dept].push(job);
    });
    setGroupedJobs(grouped);
    setJobs(data);
  };

  const handleFilterRemove = (key) => {
    searchParams.delete(key);
    setSearchParams(searchParams);
  };

  useEffect(() => {
    fetchJobs();
  }, [searchParams]);

  return (
    <div className={styles.container}>
      <FilterBar />
      <div className={styles.filters}>
        {["q", "department", "location", "function"].map(
          (key) =>
            searchParams.get(key) && (
              <FilterTag
                key={key}
                label={searchParams.get(key)}
                onRemove={() => handleFilterRemove(key)}
              />
            )
        )}
        {["q", "department", "location", "function"].some((key) =>
          searchParams.get(key)
        ) && (
          <span className={styles.clearAll} onClick={() => setSearchParams({})}>
            Clear All
          </span>
        )}
      </div>

      {Object.keys(groupedJobs).map((dept) => (
        <div key={dept} className={styles.departmentGroup}>
          <h2>{dept}</h2>
          {groupedJobs[dept].map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default JobList;
