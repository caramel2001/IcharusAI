import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { Helmet } from "react-helmet";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import JobApplicationTracker from "../components/tracker";
import responseEx from "../components/response.json";
import CircularProgress from "@mui/material/CircularProgress"; // Import MUI CircularProgress for loading indicator
import NavBar from "../components/header";
import CreateProductModal from "../components/add_modal";
import { useHistory } from "react-router-dom";
import "./tracking.css";

const Tracking = (props) => {
  let history = useHistory();
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
    console.log(isLoading);
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
    <div>
      <Helmet>
        <title>Job Tracking</title>
        <meta property="og:title" content="Icarus AI" />
      </Helmet>
      <NavBar login={true} />
      <div className="bg-slate-50 min-h-screen">
        <div>
          <div>
            <div className="tracking-depth2-frame1">
              <div className="flex flex-col gap-5">
                <button
                  className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm"
                  onClick={updateData}
                >
                  Update Data
                </button>
                <div className="w-0">
                  {isLoading ? <CircularProgress /> : null}
                </div>
                <div>
                  <button
                    className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm"
                    onClick={() => history.push("/analytics")}
                  >
                    Generate Chart
                  </button>
                </div>
                <div>
                  <CreateProductModal setJobs={setJobs} />
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
                      {jobs.length === 0 ? (
                        <div style={{ padding: "20px" }}>
                          No track records available
                        </div>
                      ) : null}
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
