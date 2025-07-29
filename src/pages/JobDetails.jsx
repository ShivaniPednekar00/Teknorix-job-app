import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from "../App.module.css";

const API_BASE = "https://teknorix.jobsoid.com/api/v1";

export default function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);

  useEffect(() => {
    const fetchJob = async () => {
      const res = await fetch(`${API_BASE}/jobs/${id}`);
      const data = await res.json();
      setJob(data);

      if (data.department?.id) {
        const relRes = await fetch(
          `${API_BASE}/jobs?department=${data.department.id}`
        );
        const relData = await relRes.json();

        const filtered = relData.filter((j) => j.id !== data.id);
        setRelatedJobs(filtered);
      }
    };

    fetchJob();
  }, [id]);

  if (!job) return <p className={styles.container}>Loading job details...</p>;

  return (
    <div className={styles.container}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: "1rem" }}>
        ← Back to Listings
      </button>

      <div className={styles.card}>
        <h2>{job.title}</h2>
        <p>
          <strong>Department:</strong> {job.department?.title} <br />
          <strong>Location:</strong> {job.location?.title} <br />
          <strong>Function:</strong> {job.function?.title} <br />
          <strong>Type:</strong>{" "}
          <span className={styles.badge}>{job.type}</span>
        </p>
        <div
          dangerouslySetInnerHTML={{ __html: job.description }}
          style={{ marginTop: "1rem" }}
        />

        <div className={styles.actions} style={{ marginTop: "1.5rem" }}>
          <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
            <button>Apply</button>
          </a>
        </div>
      </div>

      {relatedJobs.length > 0 && (
        <div className={styles.departmentGroup}>
          <h2>Other jobs in {job.department?.title}</h2>
          {relatedJobs.map((j) => (
            <div key={j.id} className={styles.card}>
              <h4>{j.title}</h4>
              <p>
                📍 {j.location?.title} <br />
                <span className={styles.badge}>{j.type}</span>
              </p>
              <div className={styles.actions}>
                <button onClick={() => window.open(j.applyUrl, "_blank")}>
                  Apply
                </button>
                <button onClick={() => navigate(`/jobs/${j.id}`)}>View</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
