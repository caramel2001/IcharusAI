import React from "react";
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
}) => {
  const handleApplyClick = () => {
    // Redirect to the apply URL
    window.location.href = applyUrl;
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
      </CardContent>
    </Card>
  );
};

export default JobCard;
