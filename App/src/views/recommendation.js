import React, { useState } from "react";

import { Helmet } from "react-helmet";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SearchBar from "../components/search";
import JobList from "../components/joblist";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import TransparentAccordion from "../components/accordion";
import "./recommendation.css";
import NavBar from "../components/header";

const Recommendation = (props) => {
  // Styled input component
  const Input = styled("input")({
    display: "none",
  });
  const [file, setFile] = useState(null);
  const [data, setData] = useState({
    generated_jd: "No Description Generated",
    job_recommendations: { metadatas: [[]] ,documents: [[]], },
    
  });
  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Set the first (and should be only) file
  };
  const apiKey = props.apiKey;
  const service = props.service;
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file || !apiKey && service === "openai") {
      alert("Please select a file and enter your API key.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("api_key", apiKey);
    formData.append("ai_service", service);


    try {
      const response = await fetch("http://127.0.0.1:8000/recommend-jobs/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const resp = await response.json();
      console.log('response',resp);
      setData(resp);
      console.log("descs")
      console.log(data["job_recommendations"]['documents']['0']);
      console.log(data["job_recommendations"]['documents'][0]);

      // Handle success - perhaps set state with returned job recommendations
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div >
      <Helmet>
        <title>AI Explainable Job Recommendation</title>
        <meta property="og:title" content="AI Explainable Job Recommendation" />
      </Helmet>
      <div>
        <div>
          <div>
         <NavBar></NavBar>
         </div>
          <div className="recommendation-depth2-frame1">
            <div className="recommendation-depth3-frame01">
              <div className="recommendation-depth4-frame01">
                <div className="recommendation-depth5-frame01">
                  <div className="recommendation-depth6-frame002">
                    <div className="recommendation-depth7-frame0">
                      <span className="recommendation-text02">
                        Discover your next opportunity
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="recommendation-depth4-frame1">
                <div className="recommendation-depth5-frame02">
                  <div className="recommendation-depth6-frame003">
                    <div className="recommendation-depth7-frame001">
                      <span className="recommendation-text03">
                        <span>All</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="recommendation-depth5-frame11">
                  <div className="recommendation-depth6-frame004">
                    <div className="recommendation-depth7-frame002">
                      <span className="recommendation-text05">
                        <span>Software Engineer</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="recommendation-depth5-frame2">
                  <div className="recommendation-depth6-frame005">
                    <div className="recommendation-depth7-frame003">
                      <span className="recommendation-text07">
                        <span>Product Manager</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="recommendation-depth5-frame3">
                  <div className="recommendation-depth6-frame006">
                    <div className="recommendation-depth7-frame004">
                      <span className="recommendation-text09">
                        <span>Data Scientist</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="recommendation-depth5-frame4">
                  <div className="recommendation-depth6-frame007">
                    <div className="recommendation-depth7-frame005">
                      <span className="recommendation-text11">
                        <span>Marketing Manager</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="recommendation-depth7-frame007">
                <SearchBar />
              </div>

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
                      color: "black", // Set the text color to black
                      "&:hover": {
                        backgroundColor: "darkgrey",
                      },
                    }}
                    startIcon={<CloudUploadIcon />} // Add the upload icon
                  >
                    Upload .docx
                  </Button>
                </label>
                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    component="span"
                    onClick={handleSubmit}
                    sx={{
                      backgroundColor: "lightgrey",
                      color: "black", // Set the text color to black
                      "&:hover": {
                        backgroundColor: "darkgrey",
                      },
                    }}
                    startIcon={<AutoAwesomeIcon />} // Add the upload icon
                  >
                    Generate Job Description
                  </Button>
                </label>
              </div>
              <div>{file ? file.name : "No files uploaded"}</div>
              <div
                style={{
                  margin: "10px",
                }}
              >
                <TransparentAccordion text={data["generated_jd"]} />
              </div>

              <div className="recommendation-depth4-frame5">
                <span className="recommendation-text23">
                  <span>Recommended for you</span>
                </span>
              </div>
              <div style={{ height: "100%", padding: "10px" }}>
                <JobList jobs={data["job_recommendations"]["metadatas"][0] } descriptions={data["job_recommendations"]["documents"][0] } file={file} ai_service={service} api_key={apiKey}  />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
