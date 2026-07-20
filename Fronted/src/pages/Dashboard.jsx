import {
    FaBriefcase,
    FaUsers,
    FaCheckCircle
} from "react-icons/fa";

import "../styles/Dashboard.css";
import { useEffect, useState } from "react";
import api from "../api/axios";

function Dashboard() {

    const [section, setSection] = useState("dashboard");

    const [dashboardData, setDashboardData] = useState(null);

    const [jobs, setJobs] = useState([]);

    const [applications, setApplications] = useState([]);

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const response =
                await api.get("/dashboard");

            setDashboardData(
                response.data
            );

            setSection("dashboard");

        } catch (error) {

            console.log(error);

            alert("Dashboard API Error");

        }

    };

    const loadJobs = async () => {

        try {

            const response =
                await api.get("/job-posts");

            console.log(response.data);

            setJobs(
                response.data.data
            );

            setSection("jobs");

        } catch (error) {

            console.log(error);

        }

    };

    const loadApplications = async () => {

        try {

            const response =
                await api.get("/my-applications");

            setApplications(
                response.data
            );

            setSection("applications");

        } catch (error) {

            console.log(error);

        }

    };

    const loadProfile = async () => {

        try {

            const response =
                await api.get("/me");

            setProfile(
                response.data
            );

            setSection("profile");

        } catch (error) {

            console.log(error);

        }

    };

    const applyJob = async (id) => {

        try {

            await api.post(
                `/apply/${id}`
            );

            alert(
                "Applied Successfully"
            );

        } catch (error) {

            alert(
                "Already Applied"
            );

        }

    };

    const logout = async () => {

        try {

            await api.post(
                "/logout"
            );

        } catch (error) {

            console.log(error);

        }

        localStorage.removeItem(
            "token"
        );

        window.location.href = "/";

    };

    if (!dashboardData) {

        return (
            <div className="loading">
                Loading Dashboard...
            </div>
        );

    }

    return (

        <div className="dashboard">

            <aside className="sidebar">

                <h2>JobTracker</h2>

                <ul>

                    <li onClick={loadDashboard}>
                        Dashboard
                    </li>

                    <li onClick={loadJobs}>
                        Jobs
                    </li>

                    <li onClick={loadApplications}>
                        Applications
                    </li>

                    <li onClick={loadProfile}>
                        Profile
                    </li>

                </ul>

            </aside>

            <main className="content">

                <div className="topbar">

                    <h1>
                        Welcome,
                        {" "}
                        {dashboardData?.user?.name}
                    </h1>

                    <button
                        className="logout-btn"
                        onClick={logout}
                    >
                        Logout
                    </button>

                </div>

                {
                    section === "dashboard" && (

                        <>

                            <div className="stats">

                                <div className="card">

                                    <FaBriefcase />

                                    <h2>
                                        {dashboardData?.stats?.total_jobs}
                                    </h2>

                                    <p>
                                        Total Jobs
                                    </p>

                                </div>

                                <div className="card">

                                    <FaUsers />

                                    <h2>
                                        {dashboardData?.stats?.applied_jobs}
                                    </h2>

                                    <p>
                                        Applications
                                    </p>

                                </div>

                                <div className="card">

                                    <FaCheckCircle />

                                    <h2>
                                        {dashboardData?.stats?.pending_jobs}
                                    </h2>

                                    <p>
                                        Pending Jobs
                                    </p>

                                </div>

                            </div>

                            <div className="table-card">

                                <h2>
                                    Recent Jobs
                                </h2>

                                <table>

                                    <thead>

                                        <tr>
                                            <th>Title</th>
                                            <th>Company</th>
                                            <th>Location</th>
                                        </tr>

                                    </thead>

                                    <tbody>

                                        {
                                            dashboardData?.recent_jobs?.map(
                                                (job) => (

                                                    <tr key={job.id}>

                                                        <td>
                                                            {job.title}
                                                        </td>

                                                        <td>
                                                            {job.company}
                                                        </td>

                                                        <td>
                                                            {job.location}
                                                        </td>

                                                    </tr>

                                                )
                                            )
                                        }

                                    </tbody>

                                </table>

                            </div>

                        </>

                    )
                }

                {
                    section === "jobs" && (

                        <div>

                            <h2>All Jobs</h2>

                            {
                                jobs.length > 0 ? (

                                    jobs.map((job) => (

                                        <div
                                            key={job.id}
                                            className="job-card"
                                        >

                                            <h3>{job.title}</h3>

                                            <p>
                                                Company:
                                                {job.company}
                                            </p>

                                            <p>
                                                Location:
                                                {job.location}
                                            </p>

                                            <p>
                                                Salary:
                                                ₹{job.salary}
                                            </p>

                                            <button
                                                onClick={() =>
                                                    applyJob(job.id)
                                                }
                                            >
                                                Apply Now
                                            </button>

                                        </div>

                                    ))

                                ) : (

                                    <h3>No Jobs Found</h3>

                                )
                            }

                        </div>

                    )
                }

                {
                    section === "applications" && (

                        <div>

                            <h2>
                                My Applications
                            </h2>

                            {
                                applications.map(
                                    (item) => (

                                        <div key={item.id}>

                                            <h3>
                                                {item.job?.title}
                                            </h3>

                                            <p>
                                                {item.status}
                                            </p>

                                        </div>

                                    )
                                )
                            }

                        </div>

                    )
                }

                {
                    section === "profile" &&
                    profile && (

                        <div>

                            <h2>
                                My Profile
                            </h2>

                            <h3>
                                {profile.name}
                            </h3>

                            <p>
                                {profile.email}
                            </p>

                        </div>

                    )
                }

            </main>

        </div>

    );

}

export default Dashboard;