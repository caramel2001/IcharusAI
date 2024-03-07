import React from "react";
import { Button } from "@mui/material";
import { Helmet } from "react-helmet";
import { Icharus } from "../components/lamps";
import NavBar from "../components/header";
import { Input } from "../components/input";
import "./home.css";

const Home = (props) => {
  console.log(props);
  return (
    <div>
      <NavBar login={props.login} />
      <Icharus />

      <Helmet>
        <title>Icarus AI</title>
        <meta property="og:title" content="Icarus AI" />
      </Helmet>
      <div className="home-landing">
        <div className="home-depth0-frame0">
          <div className="home-depth1-frame0" id="home">
            <div className="home-depth2-frame1">
              <div className="home-depth3-frame01">
                <div className="home-depth4-frame02">
                  <div className="home-depth5-frame02">
                    <div className="home-depth6-frame007">
                      <div className="home-depth7-frame02">
                        <div className="home-depth8-frame0">
                          <div className="home-depth9-frame0">
                            <div className="home-depth10-frame0">
                              <div className="home-depth11-frame0">
                                <span className="home-text12">
                                  <span>Get the job you want</span>
                                </span>
                              </div>
                            </div>
                            <div className="home-depth10-frame1">
                              <div className="home-depth11-frame01">
                                <span className="home-text14">
                                  <span>
                                    Automated job application tracking and
                                    explainable recommendation using LLM.
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="home-depth4-frame11">
                  <div className="home-depth5-frame03">
                    <div className="home-depth6-frame008">
                      <div className="home-depth7-frame03">
                        <div className="home-depth8-frame01">
                          <div className="home-depth9-frame002">
                            <span className="home-text20">
                              <span>
                                All-in-one job recommendation and application
                                tracking tool
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="home-depth8-frame11">
                          <div className="home-depth9-frame003">
                            <span className="home-text22">
                              <span>
                                Career Compass is an all-in-one job
                                recommendation and application tracking tool
                                that helps you get the job you want. It uses
                                state-of-the-art AI to provide personalized job
                                recommendations and allows you to track all of
                                your applications in one place. Career Compass
                                is perfect for anyone looking for a new job,
                                from recent grads to seasoned professionals.
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="home-depth6-frame1">
                      <div className="home-depth7-frame04">
                        <div className="home-depth8-frame02">
                          <div className="home-depth9-frame004"></div>
                        </div>
                        <div className="home-depth8-frame12">
                          <div className="home-depth9-frame005">
                            <span className="home-text24">
                              <span>Track all your applications</span>
                            </span>
                          </div>
                          <div className="home-depth9-frame1">
                            <span className="home-text26">
                              <span>
                                See where you&apos;ve applied, what stage
                                you&apos;re in, and what&apos;s next.
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="home-depth7-frame1">
                        <div className="home-depth8-frame03">
                          <div className="home-depth9-frame006"></div>
                        </div>
                        <div className="home-depth8-frame13">
                          <div className="home-depth9-frame007">
                            <span className="home-text28">
                              <span>Get job recommendations</span>
                            </span>
                          </div>
                          <div className="home-depth9-frame11">
                            <span className="home-text30">
                              <span>
                                Get personalized job recommendations based on
                                your profile and preferences.
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="home-depth7-frame2">
                        <div className="home-depth8-frame04">
                          <div className="home-depth9-frame008"></div>
                        </div>
                        <div className="home-depth8-frame14">
                          <div className="home-depth9-frame009">
                            <span className="home-text32">
                              <span>Explainable AI</span>
                            </span>
                          </div>
                          <div className="home-depth9-frame12">
                            <span className="home-text34">
                              <span>
                                Understand why you were recommended a job with
                                our explainable AI.
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="home-depth4-frame2">
                  <div className="home-depth5-frame04">
                    <div className="home-depth6-frame009">
                      <div className="home-depth7-frame05"></div>
                    </div>
                  </div>
                  <div className="home-depth5-frame13">
                    <div className="home-depth6-frame010">
                      <div className="home-depth7-frame06"></div>
                    </div>
                  </div>
                </div>
                <div className="home-depth4-frame3">
                  <div className="home-depth5-frame05">
                    <div className="home-depth6-frame011">
                      <div className="home-depth7-frame07">
                        <div className="home-depth8-frame05">
                          <div className="home-depth9-frame010">
                            <span className="home-text36">
                              <span>Get started with Career Compass</span>
                            </span>
                          </div>
                        </div>
                        <div className="home-depth8-frame15">
                          <div className="home-depth9-frame011">
                            <span className="home-text38">
                              <span>
                                Sign up today to get early access to Career
                                Compass&apos;s all-in-one job recommendation and
                                application tracking tool.
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="home-depth6-frame11">
                      <button
                        className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm"
                        onClick={() => props.history.push("/setup")}
                      >
                        Setup Profile
                      </button>
                      {/* <Button
                        variant="contained"
                        color="primary"
                        style={{ padding: "10px" }}
                        onClick={() => props.history.push("/setup")}
                      >
                        Setup Profile
                      </Button> */}
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

export default Home;
