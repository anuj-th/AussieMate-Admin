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
    <div className="w-full overflow-x-hidden">
      <div className="mx-auto w-6xl">
        <PageHeader
          title={selectedJob ? selectedJob.jobId : "Jobs"}
          subtitle={selectedJob ? (selectedJob.jobTitle || selectedJob.jobType) : ""}
          role={selectedJob?.cleaner?.role}
          showBackArrow={!!selectedJob}
          onBack={selectedJob ? handleBack : undefined}
        />
      </div>

      {selectedJob ? (
        <JobDetails job={selectedJob} onBackToList={handleBack} />
      ) : (
        <JobsTable onViewJob={handleViewJob} />
      )}
    </div>
  );
}

