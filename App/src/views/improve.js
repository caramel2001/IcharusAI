import React, { useState } from "react";
import NavBar from "../components/header";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import JobList from "../components/joblist";
import JobDescriptionInput from "../components/jdinput";
import "./recommendation.css";
import { CircularProgress, Paper, Typography } from "@mui/material";

const Input = styled("input")({
  display: "none",
});

const Improve = (props) => {
  const apiKey = props.apiKey;
  const service = props.service;
  const [loading, setLoading] = useState(false); // New state for loading indicator

  console.log(apiKey);
  console.log(service);
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    generated_jd: "No Description Generated",
    job_recommendations: { metadatas: [[]], documents: [[]] },
  });
  const [response, setResponse] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Set the first (and should be only) file
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file || !props.apiKey || props.service === "openai") {
      alert("Please select a file and enter your API key.");
      return;
    }
    setLoading(true); // End loading

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("api_key", props.apiKey);
    formData.append("ai_service", props.service);
    formData.append("jd", jobDescription);

    try {
      const response = await fetch("http://127.0.0.1:8000/improve-record/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const resp = await response.json();
      setResponse(resp);
    } catch (error) {
      console.error("There was an error!", error);
    }
    setLoading(false); // End loading
  };

  const handleSubmitPast = async (event) => {
    event.preventDefault();

    if (!file || !props.apiKey || props.service !== "openai") {
      alert("Please select a file and enter your API key.");
      return;
    }
    setLoading(true); // End loading

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("api_key", props.apiKey);
    formData.append("ai_service", props.service);

    try {
      const response = await fetch(
        "http://127.0.0.1:8000/improve-record-past/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const resp = await response.json();
      setResponse(resp);
    } catch (error) {
      console.error("There was an error!", error);
    }
    setLoading(false); // End loading
  };

  return (
    <div>
      <NavBar />
      <div className="recommendation-depth2-frame1">
        <div className="recommendation-depth3-frame01">
          <span className="recommendation-text02">Tailor your resume</span>
          <JobDescriptionInput
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
          />
          <div className="recommendation-depth4-frame3">
            <label htmlFor="contained-button-file">
              <Input
                accept=".docx"
                id="contained-button-file"
                type="file"
                onChange={handleFileChange}
              />
              <Button
                variant="contained"
                component="span"
                sx={{
                  backgroundColor: "lightgrey",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "darkgrey",
                  },
                }}
                startIcon={<CloudUploadIcon />}
              >
                Upload .docx
              </Button>
            </label>
            <Button
              variant="contained"
              component="span"
              onClick={handleSubmit}
              sx={{
                backgroundColor: "lightgrey",
                color: "black",
                "&:hover": {
                  backgroundColor: "darkgrey",
                },
              }}
              startIcon={<AutoAwesomeIcon />}
            >
              Generate Improvement Suggestions
            </Button>

            <Button
              variant="contained"
              component="span"
              onClick={handleSubmitPast}
              sx={{
                backgroundColor: "lightgrey",
                color: "black",
                "&:hover": {
                  backgroundColor: "darkgrey",
                },
              }}
              startIcon={<AutoAwesomeIcon />}
            >
              Generate Improvement Suggestions based on Past History
            </Button>
          </div>
          <div>{file ? file.name : "No files uploaded"}</div>
          {loading ? (
            <CircularProgress /> // Show loading indicator when API call is in progress
          ) : (
            <Paper
              elevation={3}
              style={{ padding: "20px", marginTop: "20px" }}
              className="rounded-lg"
            >
              <Typography variant="h6" component="h3">
                Improvement Suggestions
              </Typography>
              <Typography component="p" style={{ marginTop: "10px" }}>
                <div style={{ whiteSpace: "pre-wrap" }}>{response}</div>
              </Typography>
            </Paper>
          )}
        </div>
      </div>
    </div>
  );
};

export default Improve;
