import React from "react";
import { Button, TextField } from "@mui/material";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

import "./setup.css";

const Setup = (props) => {
  let history = useHistory();
  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState(null);
  const [password, setPassword] = React.useState(null);
  const [apiKey, setApiKey] = React.useState(null);

  const handleClick = () => {
    props.setLogin(true); // Set the state to false
    props.setName(name);
    props.setUsername(username);
    props.setPassword(password);
    props.setApiKey(apiKey);

    history.push("/"); // Redirect to home page
  };
  return (
    <div className="setup-container">
      <Helmet>
        <title>Setup Your Profile</title>
        <meta property="og:title" content="Career Compass" />
      </Helmet>
      <div className="setup-setup-page">
        <div className="setup-depth0-frame0">
          <div className="setup-depth1-frame0">
            <div className="setup-depth2-frame0">
              <div className="setup-depth3-frame0">
                <div className="setup-depth4-frame0">
                  <div className="setup-depth5-frame0">
                    <img
                      src="/external/depth6frame059-0tuh.svg"
                      alt="Depth6Frame059"
                      className="setup-depth6-frame0"
                    />
                  </div>
                  <div className="setup-depth5-frame1">
                    <div className="setup-depth6-frame01">
                      <Button
                        variant="transparent"
                        style={{ padding: "0px", textTransform: "none" }}
                        onClick={() => props.history.push("/")}
                      >
                        <span className="setup-text">
                          <span>Career Compass</span>
                        </span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="setup-depth2-frame1">
              <div className="setup-depth3-frame01">
                <div className="setup-depth4-frame01">
                  <div className="setup-depth5-frame01">
                    <span className="setup-text02">
                      <span>Welcome to TalentTrove</span>
                    </span>
                  </div>
                </div>
                <div className="setup-depth4-frame1">
                  <div className="setup-depth5-frame02">
                    <span className="setup-text04">
                      <span>
                        We&apos;ll help you keep track of your job applications
                        and automate the parts you hate.
                      </span>
                    </span>
                  </div>
                </div>
                <div className="setup-depth4-frame2">
                  <div className="setup-depth5-frame03">
                    <div className="setup-depth6-frame02">
                      <div className="setup-depth7-frame0">
                        <span className="setup-text06">
                          <span>Name</span>
                        </span>
                      </div>
                      <TextField
                        fullWidth
                        size="small"
                        variant="filled"
                        label="Name"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="setup-depth4-frame8">
                  <div className="setup-depth5-frame04">
                    <div className="setup-depth6-frame03">
                      <div className="setup-depth7-frame01">
                        <span className="setup-text10">
                          <span>Gmail</span>
                        </span>
                      </div>
                      <TextField
                        fullWidth
                        size="small"
                        variant="filled"
                        label="you@example.com"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="setup-depth4-frame3">
                  <div className="setup-depth5-frame05">
                    <div className="setup-depth6-frame04">
                      <div className="setup-depth7-frame02">
                        <span className="setup-text14">
                          <span>Gmail App Password</span>
                        </span>
                      </div>
                      <TextField
                        fullWidth
                        size="small"
                        variant="filled"
                        label="Password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="setup-depth4-frame7">
                  <div className="setup-depth5-frame06">
                    <div className="setup-depth6-frame05">
                      <div className="setup-depth7-frame03">
                        <span className="setup-text18">
                          <span>OpenAI API Key</span>
                        </span>
                      </div>
                      <TextField
                        fullWidth
                        size="small"
                        variant="filled"
                        label="API Key"
                        type="password"
                        onChange={(e) => setApiKey(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                <div className="setup-depth4-frame5">
                  <div className="setup-depth5-frame07">
                    <div className="setup-depth6-frame06">
                      <div className="setup-depth7-frame04">
                        <span className="setup-text22">
                          <span>
                            What&apos;s your job search plan? List any specific
                            companies or roles you&apos;re targeting
                          </span>
                        </span>
                      </div>
                      <TextField
                        fullWidth
                        size="small"
                        variant="filled"
                        label="Write Here"
                        multiline
                        rows={4}
                      />
                    </div>
                  </div>
                </div>
                <div className="setup-depth4-frame6">
                  <div className="setup-depth5-frame08">
                    <div className="setup-depth6-frame07">
                      <div className="setup-depth7-frame05">
                        <div className="setup-depth8-frame05">
                          <div className="setup-depth9-frame05">
                            <span className="setup-text26">
                              <Button variant="transparent">Back</Button>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="setup-depth6-frame1">
                      <div className="setup-depth7-frame06">
                        <div className="setup-depth8-frame06">
                          <div className="setup-depth9-frame06">
                            <span className="setup-text28">
                              <Button variant="inherit" onClick={handleClick}>
                                Submit
                              </Button>
                            </span>
                          </div>
                        </div>
                      </div>
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

export default Setup;
