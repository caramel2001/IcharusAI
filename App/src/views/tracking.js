import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Helmet } from "react-helmet";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import JobApplicationTracker from "../components/tracker";
import responseEx from "../components/response.json";
import CircularProgress from "@mui/material/CircularProgress"; // Import MUI CircularProgress for loading indicator

import "./tracking.css";

const Tracking = (props) => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  var listOfJobs = jobs.map((job, i) => (
    // <JobApplicationTracker key={i} job={{ job, i, setJobs }} />
    <JobApplicationTracker key={i} job={job} index={i} setJobs={setJobs} />
  ));

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://127.0.0.1:8000/get-records/", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const resp = await response.json();
        console.log(resp);
        setJobs(resp);
        listOfJobs = jobs.map((job) => <JobApplicationTracker job={job} />);

        // Handle success - perhaps set state with returned job recommendations
      } catch (error) {
        setJobs(responseEx);
        listOfJobs = jobs.map((job) => <JobApplicationTracker job={job} />);

        console.error("There was an error!", error);
      }
    }
    fetchData();
  }, []);

  const updateData = async (event) => {
    event.preventDefault;
    if (props.username == null || props.password == null) {
      alert("Please enter your username and password");
      return;
    }
    setIsLoading(true); // Start loading
    const formData = new FormData();
    formData.append("gmail_username", props.username);
    formData.append("gmail_password", props.password);

    try {
      const response = await fetch("http://127.0.0.1:8000/update-records/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const resp = await response.json();
      console.log(resp);
      setJobs(resp);
      listOfJobs = jobs.map((job) => <JobApplicationTracker job={job} />);

      // Handle success - perhaps set state with returned job recommendations
    } catch (error) {
      setJobs(responseEx);
      listOfJobs = jobs.map((job) => <JobApplicationTracker job={job} />);

      console.error("There was an error!", error);
    } finally {
      setIsLoading(false); // Stop loading regardless of the outcome
    }
  };

  return (
    <div className="tracking-container">
      <Helmet>
        <title>Tracking - Outlandish Past Hare</title>
        <meta property="og:title" content="Tracking - Outlandish Past Hare" />
      </Helmet>
      <div className="tracking-tracking">
        <div className="tracking-depth0-frame0">
          <div className="tracking-depth1-frame0">
            <div className="tracking-depth2-frame0">
              <div className="tracking-depth3-frame0">
                <div className="tracking-depth4-frame1">
                  <div className="tracking-depth5-frame0">
                    <img
                      src="/external/depth6frame01512-phla.svg"
                      alt="Depth6Frame01512"
                      className="tracking-depth6-frame0"
                    />
                  </div>
                  <div className="home-depth6-frame001">
                    <Button
                      variant="transparent"
                      style={{ padding: "0px", textTransform: "none" }}
                      onClick={() => props.history.push("/")}
                    >
                      <span className="tracking-text">
                        <span>Career Compass</span>
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
              <div className="tracking-depth3-frame1">
                <div className="tracking-depth4-frame0">
                  <div className="tracking-depth5-frame01">
                    <div className="tracking-depth6-frame002">
                      <div className="tracking-depth7-frame0">
                        <span className="tracking-text02">
                          <Button variant="inherit">Generate Chart</Button>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="tracking-depth5-frame11">
                    <div className="tracking-depth6-frame003">
                      <div className="tracking-depth7-frame001">
                        <span className="tracking-text04">
                          <Button variant="inherited">Add Application</Button>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="tracking-depth5-frame2">
                    <div className="tracking-depth6-frame004">
                      <img
                        src="/external/depth7frame01592-715.svg"
                        alt="Depth7Frame01592"
                        className="tracking-depth7-frame002"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="tracking-depth2-frame1">
              <div className="tracking-depth3-frame01">
                <div className="tracking-depth4-frame01">
                  <div className="tracking-depth5-frame02">
                    <div className="tracking-depth6-frame005">
                      <div className="tracking-depth7-frame003">
                        <div className="tracking-depth8-frame0"></div>
                      </div>
                      <div className="tracking-depth7-frame1">
                        <div className="tracking-depth8-frame1">
                          <div className="tracking-depth9-frame01"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tracking-depth5-frame12">
                    <div className="tracking-depth6-frame006">
                      <div className="tracking-depth7-frame004">
                        <div className="tracking-depth8-frame02">
                          <span className="tracking-text08">
                            <Button variant="inherit" onClick={updateData}>
                              Update Data
                            </Button>
                            {/* {isLoading ? <CircularProgress /> : null} */}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* {isLoading ? null : <CircularProgress />} */}
                    <div style={{ padding: "10px" }}>
                      {isLoading ? <CircularProgress /> : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="tracking-depth3-frame11">
                <div className="tracking-depth4-frame02">
                  <div className="tracking-depth5-frame03">
                    <div className="tracking-depth6-frame007">
                      <div className="tracking-depth7-frame006">
                        <span className="tracking-text12">
                          <span>Active</span>
                        </span>
                      </div>
                    </div>
                    <div className="tracking-depth6-frame11">
                      <img
                        src="/external/depth7frame01510-g74g.svg"
                        alt="Depth7Frame01510"
                        className="tracking-depth7-frame007"
                      />
                    </div>
                  </div>
                  <div className="tracking-depth5-frame13">
                    <div className="tracking-depth6-frame008">
                      <div className="tracking-depth7-frame008">
                        <span className="tracking-text14">
                          <span>Archived</span>
                        </span>
                      </div>
                    </div>
                    <div className="tracking-depth6-frame12">
                      <img
                        src="/external/depth7frame01510-2x1j.svg"
                        alt="Depth7Frame01510"
                        className="tracking-depth7-frame009"
                      />
                    </div>
                  </div>
                </div>
                <div className="tracking-depth4-frame11">
                  <div className="tracking-depth5-frame04">
                    <div className="tracking-depth6-frame009">
                      <img
                        src="/external/depth7frame01510-p50e.svg"
                        alt="Depth7Frame01510"
                        className="tracking-depth7-frame010"
                      />
                    </div>
                    <div className="tracking-depth6-frame13">
                      <div className="tracking-depth7-frame011">
                        <span className="tracking-text16">
                          <span>Search For Companies</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="tracking-depth4-frame2">
                  <div className="tracking-depth5-frame05">
                    <div className="tracking-depth6-frame010">
                      <div className="tracking-depth7-frame012">
                        <div className="tracking-depth8-frame04">
                          <div className="tracking-depth9-frame03">
                            <div className="tracking-depth10-frame0">
                              <span className="tracking-text18">
                                <span> Position</span>
                              </span>
                            </div>
                          </div>
                          <div className="tracking-depth9-frame1">
                            <div className="tracking-depth10-frame001">
                              <span className="tracking-text20">
                                <span>Company</span>
                              </span>
                            </div>
                          </div>
                          <div className="tracking-depth9-frame4">
                            <div className="tracking-depth10-frame002">
                              <span className="tracking-text22">
                                <span>Application Timeline</span>
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="tracking-depth7-frame11"></div>
                      {listOfJobs}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
