import React from "react";
import { Stepper, Step, StepLabel, Typography, Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// Define the steps in the job application process
const steps = ["Applied", "OA", "Interview", "Offer", "Rejection"];

const JobApplicationTracker = ({ job, deleteJob }) => {
  // Find the index of the stage to set the active step in the Stepper
  job = job.job;
  const activeStep = steps.findIndex((step) => step === steps[job.stage]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: "20px",
        width: "100%",
        borderBottom: "1px solid rgba(236,236,236,1)",
      }}
    >
      {job.logoUrl && (
        <Avatar
          alt={job.company}
          src={job.logoUrl}
          style={{ width: 64, height: 64, marginBottom: "10px" }}
        />
      )}
      <div
        style={{
          width: "20%",
          flexDirection: "column",
          alignItems: "center",
          margin: "20px",
        }}
      >
        <Typography variant="h7">{job.jobPosition}</Typography>
        <Typography variant="subtitle1">{job.company}</Typography>
        <Typography variant="caption" style={{ marginBottom: "10px" }}>
          New York, NY, USA
        </Typography>
      </div>
      <Stepper
        style={{ width: "70%" }}
        activeStep={activeStep}
        alternativeLabel
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {job.date && (
        <Typography variant="caption" style={{ marginTop: "10px" }}>
          {steps[job.stage]}: {job.date}
        </Typography>
      )}
      <div
        style={{
          width: "5%",
          flexDirection: "column",
          alignItems: "center",
          margin: "20px",
        }}
      >
        <Button variant="contained" color="primary" onClick={deleteJob}>
          <DeleteOutlineIcon />
        </Button>
      </div>
    </div>
  );
};

export default JobApplicationTracker;
