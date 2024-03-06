import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal"; // Import Modal
import Box from "@mui/material/Box"; // Required for the modal content
import TransparentAccordion from "../components/accordionRecom";
import CloseIcon from '@mui/icons-material/Close'; // Import the Close icon
// Make sure you have IconButton imported as well


const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600, // Increase the width as needed
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

// Style for the modal content


const JobCard = ({
  companyName = "Optiver",
  logoUrl = "https://storage.googleapis.com/simplify-imgs/company/default/logo.png",
  positionName = "Quantitative Researcher",
  date = "23/01/2024",
  applyUrl = "#",
  description = "No description available",
  file,
  ai_service="llama",
  api_key
}) => {
  const [explain, setExplain] = useState('');
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility
  const [loading, setLoading] = useState(false); // State to track loading status


  const handleApplyClick = () => {
    window.location.href = applyUrl;
  };
  const handleExplainClick = async () => {
    setModalOpen(true); // Open the modal immediately
    setLoading(true); // Indicate that loading has started
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("api_key", api_key);
    formData.append("ai_service", ai_service);
    formData.append("jd", description);
    console.log(ai_service,'formdata')
    console.log(api_key,'formdata api' )
  
    try {
      const response = await fetch("http://127.0.0.1:8000/explain-record/", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const resp = await response.json();
      setExplain(resp);
    } catch (error) {
      console.error("There was an error!", error);
      setExplain("Failed to fetch explanation.");
    } finally {
      setLoading(false); // Loading is done
    }
  };
  

  // Function to close the modal
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <Card
        sx={{
          width: "90%",
          height: "100%",
          boxShadow: 3,
          border: 0,
          borderRadius: 5,
          backgroundColor: "rgba(248, 248, 248, 1)",
        }}
      >
        <CardHeader
          avatar={<Avatar src={logoUrl} aria-label="company-logo" />}
          title={companyName}
          subheader="Singapore, SG"
          titleTypographyProps={{ variant: "subtitle1" }}
          subheaderTypographyProps={{ variant: "caption" }}
          sx={{ paddingBottom: 0 }}
        />
        <CardContent>
          <Typography variant="subtitle1" component="div">
            {positionName}
          </Typography>
          <Typography variant="caption" display="block" color="text.secondary">
            Posted on {date}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ marginTop: 2 }}
            onClick={handleApplyClick}
          >
            Apply
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ marginTop: 2, marginLeft: 1 }}
            onClick={handleExplainClick}
          >
            Explain
          </Button>
        </CardContent>
      </Card>
      {/* Modal for displaying the explanation */}
      <Modal
  open={modalOpen}
  onClose={handleCloseModal}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={modalStyle}>
    <IconButton
      aria-label="close"
      onClick={handleCloseModal}
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        color: (theme) => theme.palette.grey[500],
      }}
    >
      <CloseIcon />
    </IconButton>
    <TransparentAccordion text={description} />
    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
      Explanation
    </Typography>
    {loading ? (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
        <Typography>Loading...</Typography>
      </Box>
    ) : (
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        {explain}
      </Typography>
    )}
  </Box>
</Modal>


    </>
  );
      };  

export default JobCard;
