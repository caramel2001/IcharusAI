import React from "react";
import { Stepper, Step, StepLabel, Typography, Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// Define the steps in the job application process
const steps = ["Applied", "OA", "Interview", "Offer", "Rejection"];

const JobApplicationTracker = ({ job, index, setJobs }) => {
  // Find the index of the stage to set the active step in the Stepper

  const deleteJob = async (index) => {
    try {
      console.log(index, typeof index);
      const response = await fetch(
        `http://127.0.0.1:8000/delete-record/?index=${index}`,
        {
          method: "POST",
          // body: JSON.stringify({ index }),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const resp = await response.json();
      console.log(resp);
      setJobs(resp);

      // Handle success - perhaps set state with returned job recommendations
    } catch (error) {
      console.error("There was an error!", error);
    }
  };
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
      {job.logo && (
        <Avatar
          alt={job.company}
          src={job.logo}
          style={{ marginBottom: "10px" }}
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
        <Typography variant="body2" style={{ fontWeight: "800" }}>
          {job.title}
        </Typography>
        <Typography
          variant="subtitle1"
          style={{ fontWeight: "300", fontSize: "14px" }}
        >
          {job.company}
        </Typography>
        <Typography variant="caption" style={{ marginBottom: "10px" }}>
          SG
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => deleteJob(index)}
        >
          <DeleteOutlineIcon />
        </Button>
      </div>
    </div>
  );
};

export default JobApplicationTracker;
