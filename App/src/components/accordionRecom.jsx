import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const TransparentAccordion = ({ text }) => {
  return (
    <Accordion sx={{ backgroundColor: "transparent", boxShadow: "none" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="job-description-content"
        id="job-description-header"
      >
        <Typography>View Job Description</Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          maxHeight: '250px', // Set a maximum height
          overflow: 'auto' // Enable scrolling
        }}
      >
        <Typography style={{ whiteSpace: "pre-wrap" }}>{text}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default TransparentAccordion;
