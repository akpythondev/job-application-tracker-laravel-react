import { useEffect, useState } from "react";
import api from "../api/axios";

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const response =
      await api.get("/job-posts");

    setJobs(response.data.data);
  };

  const applyJob = async (id) => {
    try {
      await api.post(`/apply/${id}`);

      alert("Applied Successfully");
    } catch {
      alert("Already Applied");
    }
  };

  return (
    <div>
      <h2>Jobs</h2>

      {jobs.map((job) => (
        <div key={job.id}>
          <h3>{job.title}</h3>

          <p>{job.company}</p>

          <button
            onClick={() =>
              applyJob(job.id)
            }
          >
            Apply
          </button>
        </div>
      ))}
    </div>
  );
}

export default JobList;