import { useState } from "react";
import JobsTable from "../components/jobs/JobsTable";
import JobDetails from "../components/jobs/JobDetails";
import PageHeader from "../layout/PageHeader";

export default function Jobs() {
  const [selectedJob, setSelectedJob] = useState(null);

  const handleBack = () => {
    setSelectedJob(null);
  };

  return (
    <div>
      <PageHeader
        title={selectedJob ? selectedJob.jobId : "Jobs"}
        showBackArrow={!!selectedJob}
        onBack={selectedJob ? handleBack : undefined}
      />

      {selectedJob ? (
        <JobDetails job={selectedJob} onBackToList={handleBack} />
      ) : (
        <JobsTable onViewJob={setSelectedJob} />
      )}
    </div>
  );
}

