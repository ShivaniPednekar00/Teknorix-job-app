import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/JobCard.module.css";

function JobCard({ job }) {
  const navigate = useNavigate();

  return (
    <div className={styles.card}>
      <h4>{job.title}</h4>
      <p>
        🏢 {job.department?.title} &nbsp;&nbsp; 📍 {job.location?.title}{" "}
        &nbsp;&nbsp;
        <span className={styles.badge}>{job.type}</span>
      </p>
      <div className={styles.actions}>
        <button onClick={() => window.open(job.applyUrl, "_blank")}>
          Apply
        </button>
        <button onClick={() => navigate(`/jobs/${job.id}`)}>View</button>
      </div>
    </div>
  );
}

export default JobCard;
