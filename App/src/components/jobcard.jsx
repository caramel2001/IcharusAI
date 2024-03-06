import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

const JobCard = ({
  companyName = "Optiver",
  logoUrl = "https://storage.googleapis.com/simplify-imgs/company/default/logo.png",
  positionName = "Quantitative Researcher",
  positionType = "Fresh/entry level",
  date = "23/01/2024",
  applyUrl = "#",
  description = "No description available",
  file,
  service="llama",
  api_key

}) => {
  const [explain, setExplain] = useState('');

  const handleApplyClick = () => {
    // Redirect to the apply URL
    window.location.href = applyUrl;
  };
  const handleExplainClick = async () => {
    // Redirect to the apply URL
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("api_key", api_key);
    formData.append("ai_service", service);
    formData.append("jd",description)
    try {
      const response = await fetch("http://127.0.0.1:8000/explain-record/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const resp = await response.json();
      console.log(resp);
      setExplain(resp)

      // Handle success - perhaps set state with returned job recommendations
    } catch (error) {
      console.error("There was an error!", error);
    }
   return (
    <div>{explain}</div>
   ) ;

  };
  return (
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
        // action={
        //   <IconButton aria-label="add to favorites">
        //     <FavoriteBorderIcon />
        //   </IconButton>
        // }
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
        {/* <Typography variant="body2" color="text.secondary">
          {positionType}
        </Typography> */}
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
          sx={{ marginTop: 2 , marginLeft: 1}}
          onClick={handleExplainClick}
        >
          Explain
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobCard;
