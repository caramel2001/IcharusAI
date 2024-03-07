import React from "react";
import { Stepper, Step, StepLabel, Typography, Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import TextField from '@mui/material/TextField';

// Define the steps in the job application process
const steps = ["Applied", "OA", "Interview", "Offer", "Rejection"];
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "50%",
  maxHeight: "50%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'auto',
};
const JobApplicationTracker = ({ job, index, setJobs }) => {
  // Find the index of the stage to set the active step in the Stepper
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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

  const showEmail = async (index) => {
    
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
        {/* <TextField label={job.title} variant="standard"/>
        <TextField label={job.company} variant="standard" size="small"/> */}
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
          onClick={handleOpen}
        >
          <MailOutlineIcon />
        </Button>
          <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Email Tagged to Job Application
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {job.text}
            </Typography>
          </Box>
        </Modal>
      </div>
      {/* <div
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
          <SaveOutlinedIcon />
        </Button>
      </div> */}
    </div>
  );
};

export default JobApplicationTracker;
