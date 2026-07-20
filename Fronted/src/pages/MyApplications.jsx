import { useEffect, useState } from "react";
import api from "../api/axios";

function MyApplications() {
  const [applications,
    setApplications] = useState([]);

  useEffect(() => {
    loadApplications();
  }, []);

  const loadApplications = async () => {
    const response =
      await api.get("/my-applications");

    setApplications(response.data);
  };

  return (
    <div>
      <h2>My Applications</h2>

      {applications.map((item) => (
        <div key={item.id}>
          <h4>
            {item.job.title}
          </h4>

          <p>
            Status:
            {item.status}
          </p>
        </div>
      ))}
    </div>
  );
}

export default MyApplications;