import React from "react";
import { Stepper, Step, StepLabel, Typography, Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

// Define the steps in the job application process
const steps = ["Applied", "OA", "Interview", "Offer"];

const JobApplicationTracker = ({
  companyName = "Optiver",
  jobPosition = "Quantitative Researcher",
  logoUrl = "https://storage.googleapis.com/simplify-imgs/company/default/logo.png",
  currentStage = "Applied",
  date = "23/01/2024",
}) => {
  // Find the index of the current stage to set the active step in the Stepper
  const activeStep = steps.findIndex((step) => step === currentStage);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        margin: "20px",
      }}
    >
      {logoUrl && (
        <Avatar
          alt={companyName}
          src={logoUrl}
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
        <Typography variant="h7">{jobPosition}</Typography>
        <Typography variant="subtitle1">{companyName}</Typography>
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
      {date && (
        <Typography variant="caption" style={{ marginTop: "10px" }}>
          {currentStage}: {date}
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
        <Button variant="contained" color="primary">
          <DeleteOutlineIcon />
        </Button>
      </div>
    </div>
  );
};

export default JobApplicationTracker;
