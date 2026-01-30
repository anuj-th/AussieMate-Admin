import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import JobsTable from "../components/jobs/JobsTable";
import JobDetails from "../components/jobs/JobDetails";

export default function Jobs() {
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const jobsTableRef = useRef(null);

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

  const handlePaymentStatusUpdate = (jobId, paymentStatus) => {
    // Update selectedJob if it matches
    if (selectedJob && (selectedJob.jobId === jobId || selectedJob._id === jobId || selectedJob.id === jobId)) {
      setSelectedJob(prev => ({
        ...prev,
        paymentStatus: paymentStatus,
        payment: {
          ...prev.payment,
          escrowStatus: paymentStatus
        }
      }));
    }
    
    // Update JobsTable to reflect the change
    if (jobsTableRef.current && jobsTableRef.current.updateJobPaymentStatus) {
      jobsTableRef.current.updateJobPaymentStatus(jobId, paymentStatus);
    }
  };

  return (
    <div className="w-full overflow-x-hidden">
      {selectedJob ? (
        <JobDetails 
          job={selectedJob} 
          onBackToList={handleBack}
          onPaymentStatusUpdate={handlePaymentStatusUpdate}
        />
      ) : (
        <JobsTable 
          ref={jobsTableRef}
          onViewJob={handleViewJob} 
        />
      )}
    </div>
  );
}

