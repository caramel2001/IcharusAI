import React from "react";
import Grid from "@mui/material/Grid";
import JobCard from "./jobcard";

const JobList = ({ jobs }) => {
  console.log(jobs[0]);
  // Accept job data as a prop
  return (
    <Grid container spacing={8} justifyContent="left">
      {jobs.map((job, index) => (
        <Grid item xs={12} sm={6} md={4} key={job.id || index}>
          {" "}
          {/* Use job's unique id or index as key */}
          <JobCard
            companyName={job.company_name}
            logoUrl={job.company_logo}
            positionName={job.title}
            positionType={job.jobtype}
            date={job.date}
            applyUrl={job.apply_url}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default JobList;
