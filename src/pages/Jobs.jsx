import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import JobsTable from "../components/jobs/JobsTable";
import JobDetails from "../components/jobs/JobDetails";
import PageHeader from "../layout/PageHeader";

export default function Jobs() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { jobId } = useParams();


  // Handle deep-link when landing on /jobs/:jobId with state
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        // Replace with your actual API endpoint
        const response = await fetch("/api/jobs");
        if (!response.ok) throw new Error("Failed to fetch jobs");
        const data = await response.json();
        setJobs(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleBack = () => {
    setSelectedJob(null);
    navigate("/jobs", { replace: true });
  };

    useEffect(() => {
    if (location.state?.job) {
      setSelectedJob(location.state.job);
    } else if (jobId && jobs.length > 0) {
      const job = jobs.find(j => j.jobId === jobId);
      if (job) setSelectedJob(job);
    }
  }, [location.state, jobId, jobs]);

  const handleViewJob = (job) => {
    setSelectedJob(job);
    navigate(`/jobs/${job.jobId}`, { state: { job }, replace: true });
  };
  

  return (
    <div>
        <PageHeader
          title={selectedJob ? selectedJob.jobId : "Jobs"}
          subtitle={selectedJob ? (selectedJob.jobTitle || selectedJob.jobType) : ""}
          showBackArrow={!!selectedJob}
          onBack={selectedJob ? handleBack : undefined}
        />

      {selectedJob ? (
        <JobDetails job={selectedJob} onBackToList={handleBack} />
      ) : (
        <JobsTable onViewJob={handleViewJob} />
      )}
    </div>
  );
}

