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

const data = {
  generated_jd:
    "We are seeking a highly skilled and motivated Data Science Intern to join our team. The successful candidate will be responsible for conducting in-depth data analysis, developing predictive models, and creating insightful data visualizations. As a Data Science Intern, you will have the opportunity to work on a variety of projects involving machine learning, artificial intelligence, and data analysis.\n\nJob Responsibilities:\n- Conduct data analysis to extract valuable insights from large datasets\n- Develop and implement machine learning models for predictive analytics\n- Create data visualizations and dashboards to communicate findings effectively\n- Collaborate with cross-functional teams to understand business requirements and provide data-driven solutions\n- Stay up-to-date with the latest trends and technologies in data science and artificial intelligence\n- Assist in the development and deployment of data science projects\n- Present findings and recommendations to stakeholders in a clear and concise manner\n\nRequirements:\n- Currently pursuing a Bachelor's degree in Data Science, Computer Science, Statistics, or a related field\n- Strong programming skills in Python, R, and/or C++\n- Experience with data manipulation libraries such as NumPy and Pandas\n- Knowledge of machine learning frameworks like TensorFlow or PyTorch\n- Familiarity with data visualization tools like Matplotlib, Plotly, and Dash\n- Excellent analytical and problem-solving abilities\n- Strong communication and collaboration skills\n- Ability to work independently and in a team environment\n- Prior internship or project experience in data science or machine learning is a plus\n\nIf you are passionate about data science and eager to gain hands-on experience in a dynamic work environment, we encourage you to apply for this internship opportunity.",
  job_recommendations: {
    ids: [
      [
        "28",
        "998",
        "2452",
        "4554",
        "3332",
        "999845",
        "99989",
        "99935",
        "296",
        "3487",
      ],
    ],
    distances: [
      [
        0.5102383494377136, 0.5102383494377136, 0.5306837558746338,
        0.6047935485839844, 0.6319156289100647, 0.6571816802024841,
        0.7152504324913025, 0.7198405861854553, 0.7576413154602051,
        0.7682787179946899,
      ],
    ],
    metadatas: [
      [
        {
          apply_url:
            "https://www.mycareersfuture.gov.sg/job/consulting/data-science-intern-perm-bioquest-advisory-34c0794a9a27f8e6c3ef54e355a253f8",
          company_logo:
            "https://static.mycareersfuture.gov.sg/images/company/logos/54ac52d8e33f860e17f46dd78e1be4f8/bioquest-advisory.jpg",
          company_name: "BIOQUEST ADVISORY PTE. LTD.",
          date: "2023-10-24T09:08:25.000Z",
          job_post_id: "MCF-2023-0811153",
          jobtype: "['Fresh/entry level']",
          title: "Data Science Intern to Perm",
        },
        {
          apply_url:
            "https://www.mycareersfuture.gov.sg/job/consulting/data-science-intern-perm-bioquest-advisory-6405fc87693f2f30806434d8e173ff31",
          company_logo:
            "https://static.mycareersfuture.gov.sg/images/company/logos/54ac52d8e33f860e17f46dd78e1be4f8/bioquest-advisory.jpg",
          company_name: "BIOQUEST ADVISORY PTE. LTD.",
          date: "2023-10-06T02:40:06.000Z",
          job_post_id: "MCF-2023-0762334",
          jobtype: "['Fresh/entry level']",
          title: "Data Science Intern to Perm",
        },
        {
          apply_url:
            "https://www.mycareersfuture.gov.sg/job/banking-finance/data-science-associate-bioquest-advisory-8c616310fe86eef85a10fe68fc88169c",
          company_logo:
            "https://static.mycareersfuture.gov.sg/images/company/logos/54ac52d8e33f860e17f46dd78e1be4f8/bioquest-advisory.jpg",
          company_name: "BIOQUEST ADVISORY PTE. LTD.",
          date: "2023-10-24T07:23:04.000Z",
          job_post_id: "MCF-2023-0810512",
          jobtype: "['Fresh/entry level']",
          title: "Data Science Associate (Entry-Level, Fresh Graduate)",
        },
        {
          apply_url:
            "https://www.mycareersfuture.gov.sg/job/information-technology/business-analyst-intern-acp-computer-training-school-6199899b09e0de739c85b77a0abe7ba0",
          company_logo:
            "https://static.mycareersfuture.gov.sg/images/company/logos/c1e6047c4bff9af8f17f34cbee7a5664/acp-computer-training-school.png",
          company_name: "ACP COMPUTER TRAINING SCHOOL PTE. LTD.",
          date: "2023-10-12T07:48:41.000Z",
          job_post_id: "MCF-2023-0738869",
          jobtype: "['Fresh/entry level']",
          title: "Business Analyst Intern",
        },
        {
          apply_url:
            "https://www.mycareersfuture.gov.sg/job/banking-finance/data-analyst-persolkelly-singapore-73d400cc8a59016dfa9bf104ff878834",
          company_logo:
            "https://static.mycareersfuture.gov.sg/images/company/logos/4a663fed1ca6badeafbd191395681e47/persolkelly-singapore.jpg",
          company_name: "PERSOLKELLY SINGAPORE PTE. LTD.",
          date: "2023-10-27T09:23:53.000Z",
          job_post_id: "MCF-2023-0821272",
          jobtype: "['Fresh/entry level']",
          title: "Data Analyst (Banking/Central/Up to $5500)",
        },
        {
          apply_url:
            "/partner/jobListing.htm?pos=101&ao=1110586&s=58&guid=0000018c200eade8a7e040db092dc11b&src=GD_JOB_AD&t=NS&vt=w&cs=1_f199f7f8&cb=1701344882345&jobListingId=1008801804031",
          company_logo:
            "https://media.glassdoor.com/sql/8915/infineon-technologies-squarelogo.png",
          company_name: "Infineon Technologies",
          date: "2023-11-07T00:00:00",
          job_post_id: 1008801804031,
          jobtype: "['Full-time', 'Contract']",
          title: "Internship - Software Development (Data Application)",
        },
        {
          apply_url:
            "/partner/jobListing.htm?pos=101&ao=1110586&s=58&guid=0000018c20039afbb7b1067e917e7c58&src=GD_JOB_AD&t=NS&vt=w&cs=1_517af382&cb=1701344156632&jobListingId=1009004217017",
          company_logo:
            "https://media.glassdoor.com/sql/15/amd-squarelogo-1413388782139.png",
          company_name: "Advanced Micro Devices, Inc",
          date: "2023-11-29T00:00:00",
          job_post_id: 1009004217017,
          jobtype: "['Internship']",
          title: "Software Development Intern",
        },
        {
          apply_url:
            "/partner/jobListing.htm?pos=101&ao=1110586&s=58&guid=0000018c2002ef6dbb3534ec1fbccddb&src=GD_JOB_AD&t=NS&vt=w&cs=1_99cf5a68&cb=1701344112683&jobListingId=1008894301477",
          company_logo:
            "https://media.glassdoor.com/sql/3879/boston-consulting-group-squareLogo-1692189677151.png",
          company_name: "Boston Consulting Group",
          date: "2023-11-28T00:00:00",
          job_post_id: 1008894301477,
          jobtype: "nan",
          title: "Software Engineer – BCG X",
        },
        {
          apply_url:
            "https://www.mycareersfuture.gov.sg/job/others/associate-business-analyst-phoon-huat-f8ec682433425eef6468919073c62686",
          company_logo:
            "https://static.mycareersfuture.gov.sg/images/company/logos/5d202f45b271c176907cfdfabd9145ff/phoon-huat.jpg",
          company_name: "PHOON HUAT PTE. LTD.",
          date: "2023-10-11T08:11:23.000Z",
          job_post_id: "MCF-2023-0776089",
          jobtype: "['Fresh/entry level']",
          title: "Associate Business Analyst",
        },
        {
          apply_url:
            "https://www.mycareersfuture.gov.sg/job/consulting/management-consultant-intern-data-analytics-specialization-bioquest-advisory-6c91de39134c04f4254c0c6a7c645e06",
          company_logo:
            "https://static.mycareersfuture.gov.sg/images/company/logos/54ac52d8e33f860e17f46dd78e1be4f8/bioquest-advisory.jpg",
          company_name: "BIOQUEST ADVISORY PTE. LTD.",
          date: "2023-10-26T09:59:02.000Z",
          job_post_id: "MCF-2023-0817754",
          jobtype: "['Fresh/entry level']",
          title:
            "Management Consultant Intern with Data Analytics Specialization",
        },
      ],
    ],
    embeddings: null,
    documents: [
      [
        "This internship offers hands-on experience working on data science projects for our clients. As an intern, you'll gain valuable skills in understanding client business needs, data preparation, data analysis, and using machine learning models to derive insights. You'll work closely with our clients under the guidance of experienced professionals.\n\nOur Data Science Internship program has the potential to lead to a permanent position at our company. The minimum duration of the internship is six months.\n\nWe're looking for final year students currently pursuing degrees in Computer Science/Data Science, Statistical Mathematics, Engineering, Actuarial Science, or related fields with a strong background in data science. Proficiency in SQL and Python programming is required, and familiarity with Hadoop, Sparks, and its libraries is preferred. \n\nExperience with Graph Databases like Neo4j or AWS Neptune is a plus.\nWe're seeking enthusiastic learners with strong analytical and problem-solving skills, good communication skills, and a customer service attitude. You should enjoy working in a team and be able to commit to a six-month internship.\n\nAt BioQuest, we value collaboration, teamwork, and knowledge sharing. Our culture is supportive and inclusive, with a strong emphasis on ethics and diversity. You'll have opportunities to learn about emerging technologies, receive mentorship from experienced consultants, and work in a supportive and collaborative environment. For high performers, there is an excellent career growth path.",
        "This internship offers hands-on experience working on data science projects for our clients. As an intern, you'll gain valuable skills in understanding client business needs, data preparation, data analysis, and using machine learning models to derive insights. You'll work closely with our clients under the guidance of experienced professionals.\n\nOur Data Science Internship program has the potential to lead to a permanent position at our company. The minimum duration of the internship is six months.\n\nWe're looking for final year students currently pursuing degrees in Computer Science/Data Science, Statistical Mathematics, Engineering, Actuarial Science, or related fields with a strong background in data science. Proficiency in SQL and Python programming is required, and familiarity with Hadoop, Sparks, and its libraries is preferred. \n\nExperience with Graph Databases like Neo4j or AWS Neptune is a plus.\nWe're seeking enthusiastic learners with strong analytical and problem-solving skills, good communication skills, and a customer service attitude. You should enjoy working in a team and be able to commit to a six-month internship.\n\nAt BioQuest, we value collaboration, teamwork, and knowledge sharing. Our culture is supportive and inclusive, with a strong emphasis on ethics and diversity. You'll have opportunities to learn about emerging technologies, receive mentorship from experienced consultants, and work in a supportive and collaborative environment. For high performers, there is an excellent career growth path.",
        "We are seeking an ambitious and talented Data Science Associate to join our dynamic team of consultants. This entry-level position is ideal for recent graduates who are ready to begin their careers at the intersection of technology and consulting, contributing to high-impact projects that transform industries. With a focus on graph analytics and generative AI, the successful candidate will have the opportunity to dive into vast datasets, extract meaningful insights, and present findings that solve complex business challenges.\n\nKey Responsibilities:\n\n- Analyze large, complex datasets to reveal underlying patterns, correlations, and trends. Leverage your skills in SQL and Python to process, cleanse, and verify data integrity used for analysis.\n- Develop and implement graph analytics to understand relationships and networks, translating complex data into actionable strategies that drive client success.\n- Collaborate with cross-functional consulting teams to understand client needs, tailor data-driven solutions, and communicate technical concepts to non-technical stakeholders.\n- Continuously enhance your analytics toolkit by staying current with the latest technologies, methodologies, and best practices in data science.\n- Create data visualizations and reports that succinctly illustrate findings and effectively communicate results to stakeholders at all levels of the business.\n- Contribute to the development of proposals, presentations, and publications, showcasing BioQuest's thought leadership in data science and analytics.\n\nRole Requirements\n\n- Recent graduate with a Bachelor's degree in Computer Science, Data Science, Applied Mathematics, Statistics, or a related field.\n- Demonstrable experience with SQL, including the ability to write complex queries and tune performance.\n- Proficiency in Python, particularly familiar with libraries such as Pandas, NumPy, Scikit-learn, and Matplotlib.\n- Experience with graph analytics, Neo4j, or related techniques is highly desirable.\n- Strong problem-solving abilities and analytical thinking, with an insatiable curiosity to question, investigate, and solve data challenges.\n- Excellent communication and presentation skills, with the ability to convey intricate data concepts clearly and effectively to both technical and non-technical audiences.\n- Ability to work in a fast-paced, collaborative consulting environment, managing multiple priorities and meeting tight deadlines.\n\nAt BioQuest Advisory, we’re committed to creating a nurturing environment where our employees can develop their skills and are set up for long-term success. We’re dedicated to fostering innovation and curiosity. In addition to a competitive salary, we offer a range of benefits, ongoing training programs, and career development opportunities.\n\nJoin us, and let’s solve the business challenges of tomorrow, together.",
        "We are looking for an intern who is passionate about generating insights from data and problem-solving business issues.\nAs a Business Analyst Intern, you will be empowered to provide insights to assist the team in making informed business decisions.\nJob Description:\n\nCreate detailed business analysis, outlining problems, opportunities and solutions\nManage, track and raise project issues/exceptions where required for approval\nInvolve in the requirement study and gathering, testing, and driving a smooth deployment, adoption,\nand support the ongoing operations of the project\nAssist to understand and troubleshoot technical issues when needed\nLearn to undertake root cause analysis for problems in order to implement preventive and corrective\nmeasures to meet business and performance needs\nUse of Excel/Access/SQL to perform collection, analysis and profiling of large volumes of data\nWrite and document requirement and functional specifications\nObserve industry trend and recommend new features or solutions to the product development team\n\nJob Specifications:\n\nCurrently pursuing a Diploma or Degree in Business, Information System/Technology, or Computer Science or equivalent\nPrior knowledge/ experience in Business Analytics\nProficient with Microsoft Office tools like MS Word, MS Excel, and MS PowerPoint\nBasic SQL knowledge\nEffective oral and written management communication skills\nGood analytical skills\nClear communicators, smooth facilitators, precise analysers\nA team player with good communication skills\nSelf-motivated who thrives in a fast-paced environment\nMust be able to commit for at least 4 months (Full Time)\n\nBenefits:\n\nInternship that is more than 3 months will entitle to 1 AL from 4th month onwards.\n\nYou hereby freely give ACP Computer Training & Consultancy consent to use and process your personal data relating to my job application and have read and understood ACP Computer Training & Consultancy Data Protection Notice for Job Applicants. (Link: https://www.acpcomputer.com/data-protection-notice/) You may withdraw your consent at any time with future effect in line with the said Notice as well.",
        "Data Analyst (Banking/Central/Up to $5500)\n\nJob Description:\nAs a Data Analyst, you will play a crucial role in shaping our data-driven decision-making processes. Your primary responsibilities will include:\n\nFeature Creation: Collaborate with cross-functional teams to develop and enrich reusable assets, contributing to the enhancement of our data resources and analytical capabilities.\nAd Hoc Analysis: Generate on-demand analysis and insights, providing key stakeholders with actionable information for decision-making.\nScript Development: Build and maintain program scripts to automate data processes, ensuring data integrity and efficiency in data operations.\nAnalytics Tools: Utilize a variety of analytics tools and platforms, including SQL, Python, Sparks, and more, to manipulate and extract insights from complex datasets.\nStatistical Analysis: Apply basic proficiency in statistical analysis, data mining, and machine learning techniques to uncover patterns, trends, and opportunities within data.\nData Management: Work with large-scale datasets, ensuring data quality, organization, and effective storage.\n\nQualifications:\n\nBachelor's degree in a relevant field (e.g., Data Science, Computer Science, Statistics, Mathematics, etc.) with 1-3 years of working experience, fresh graduates are welcomed to apply.\nProven experience working with SQL, Python, Sparks, and other relevant analytics tools.\nBasic proficiency in statistical analysis, data mining, and machine learning concepts.\nStrong problem-solving skills and an analytical mindset.\nExcellent communication skills with the ability to convey complex data findings to non-technical stakeholders.\nA passion for staying up-to-date with industry trends and advancements in data analytics.\n\n\nEA License No. 01C4394 • RCB No. 200007268E •EA Registration No. R22109454 Malcolm Lee Jun Hao\nBy sending us your personal data and curriculum vitae (CV), you are deemed to consent to PERSOLKELLY Singapore Pte Ltd and its affiliates to collect, use and disclose your personal data for the purposes set out in the Privacy Policy available at  https://www.persolkelly.com.sg/policies. You acknowledge that you have read, understood, and agree with the Privacy Policy.",
        "The student, as part of the Product Ramp-up Management team and under the guidance of an assigned mentor, will undertake projects working on software development projects focusing on data application.\n\nIn your new role you will:\nE\n\nxperience development & deployment of data driven software solution in Product management & Supply Chain management\n\narea\n\nGain exposure in world leading Automotive Semiconductor provider process\n\nOpportunity to\n\nexperience state-of-the-art product engineering practices\n\nGiven\n\nopportunities to explore innovative technology and be involved in innovation projects\n\nInternship learning outcomes:\nGain insights of Automotive Semiconductor Test & Product Engineering\n\nLearn Data analytics skills in context\n\nYou are best equipped for this task if you have:\nOn track to attain a\n\nBachelor or Master Degree in Computer Science / Computer Engineering, Applied Mathematics, Statistics, Industrial / System Engineering\n\nStrong foundation in programming of Python, C#\n\nSolid understanding in object-oriented software development\n\nExperience in Data Visualization\n\nsuch as\n\nTableau, Power BI\n\nis highly appreciated\n\nExperience in Data base technology\n\nsuch as\n\nOracle\n\nis highly appreciated.\n\nExperience in Data mining & Advanced Data analytics\n\nlike predictive analysis using Python, R\n\nis highly appreciated\nSingapore is our regional headquarter for Asia-Pacific and consists of production, research & development, sales & marketing, supply chain and many central functions.\nDriving decarbonization and digitalization. Together.\n\nInfineon designs, develops, manufactures, and markets a broad range of semiconductors and semiconductor-based solutions, focusing on key markets in the automotive, industrial, and consumer sectors. Its products range from standard components to special components for digital, analog, and mixed-signal applications to customer-specific solutions together with the appropriate software.\n\nWe are on a journey to create the best Infineon for everyone.\n\nThis means we embrace diversity and inclusion and welcome everyone for who they are. At Infineon, we offer a working environment characterized by trust, openness, respect and tolerance and are committed to give all applicants and employees equal opportunities. We base our recruiting decisions on the applicant´s experience and skills.\n\nPlease let your recruiter know if they need to pay special attention to something in order to enable your participation in the interview process.\n\nMore about diversity & inclusion at Infineon at https://www.infineon.com/cms/en/careers/diversity-and-inclusion/",
        "Design and create tools to handle data analysis. Priority on Python and RasberryPi platform.\nAutomate manual data crunching work.\n\nQualifications:\nScripting experience in C++, Python\nExcel\nDegree undergrads in Computer Science, Computer Engineering or equivalent",
        "Responsibilities:\n- Own the full analytics value-chain end to end, including framing new business challenges, designing innovative algorithms, implementing and deploying scalable solutions, and enabling colleagues and clients to embrace AI\n- Partner with clients in various industries and regions to design, build, and deploy new and innovative solutions\n- Develop and deliver thought leadership in scientific communities and papers\n- Lead conferences on behalf of BCG X\n- Apply software development practices and standards to develop robust and maintainable software\n- Actively participate in every part of the software development process\n- Guide non-technical teams and consultants in best practices for robust software development\n- Optimize and enhance computational efficiency of algorithms and software design\n- Collaborate in teams to share software design and solution ideas\n- Problem-solve and demonstrate intellectual curiosity across a breadth of industries and topics\n\nRequirements:\n- Passion for software development, large-scale data analytics, and transforming organizations into AI-led innovative companies\n- Experience in applying software development practices and standards\n- Ability to guide non-technical teams and consultants in best practices for software development\n- Motivated by a fast-paced, service-oriented environment and direct interaction with clients\n- Enjoy collaborating in teams to share software design and solution ideas\n- Strong problem-solving skills and intellectual curiosity\n- Proficiency in Python programming language",
        "Responsibilities\n\nPrepare data and analyze data sets for actionable insigths and generate reports to support strategic & operational decision-making process.\nDesign, build and maintain data pipelines (ETL processes, data models and data warehousing solutions) to ensure efficient and accurate data.\nFacilitate various digitalization initiatives for the company such as identifying opportunities to leverage RPA and automation solutions to improve efficiency and effectiveness of daily operations.\nPrepare analysis and report for management meetings.\nDevelop reporting and visualization solutions to create interactive dashboards and reports that provide insights for internal stakeholders.\nCollaborate in cross-functional teams to develop business models, budgets and KPIs for new projects.\n\nPrerequisites\n\nMinimum 1 year experience in Data / Business / Systems Analysis or Quality Assurance.\nDegree in Mathematics, Economics, Computer Science, Information Management or Statistics.\nExcellent quantitative analytical & critical thinking skills with strong understanding of financial & accounting principles.\nProficient in MS Excel, PowerPoint, SQL, Python with ETL and working with large database.\nFamiliarity with automation tools (e.g. RPA scripting, Power Automate etc) is a plus.\nAble to work independently and commit to deadline.\nStrong written and verbal communication skills including technical writing skills\n",
        "At BioQuest Advisory, we are offering an exciting opportunity for a Management Consultant Intern who specializes in data analytics. This position will have you delving deep into the heart of the consulting industry, combining strategic management insights with data-driven decision-making. You'll be an integral member of our team, providing vital support for our consultants on a range of projects.\n\nKey Duties and Responsibilities:\n\n• Strategic Research & Data Collection: Undertake comprehensive research on industry shifts, market movements, and competitor strategies. Accumulate pertinent data to steer project strategies and management decisions.\n\n• Data-Driven Insights: Dive deep into data with advanced analytical tools to derive actionable insights. Articulate these insights for clients and internal teams, enhancing strategy formulations and execution.\n\n• Feasibility Analysis: Lead feasibility assessments for client-focused projects. Gauge the potential and inherent risks of strategic recommendations before they are presented.\n\n• Operational Excellence: Oversee administrative roles such as orchestrating meetings, coordinating conference dialogues, maintaining schedules, and systematizing project documentation.\n\n• Client Engagement: Engage actively in client dialogues, ensuring all crucial points are documented. Build and nurture professional ties with clients to ensure seamless communication.\n\n• Project Enhancement: Aid consultants in crafting top-tier project outputs, from presentations to comprehensive reports.\n\n• Team Synergy: Work in tandem with our consultancy team, sharing insights, and bringing innovative solutions to the table. Together, aim to deliver unparalleled value to our clientele.\n\n• Knowledge Upgradation: Remain at the forefront of industry evolutions, new-age technologies, and benchmark practices in management consulting.\n\nPrerequisites for the Role:\n\n• Enrolled in a Bachelor's program majoring in Business Management, Economics, or any related disciplines.\n\n• Adeptness in data analytics, with a keen ability to infer and apply insights.\n\n• Demonstrated organizational finesse and adeptness at multitasking.\n\n• Proficient in Microsoft Office tools, especially Excel and PowerPoint.\n\n• Potent communication skills, both written and verbal, for clear and impactful reporting.\n\n• A team player with a flair for adaptability and a hunger to learn from seasoned experts.\n\n• Experience in data interpretation, market intelligence, or consulting will be advantageous, though not mandatory.\n\n• Minimum internship duration stands at 6 months.\n\nJoin us\n\nAt BioQuest, we value collaboration, teamwork and knowledge transfers. Our culture is friendly and supportive with a strong emphasis on ethics, diversity and inclusiveness.\n\n• Learning opportunities in emerging technologies\n• Mentorship with experienced technical consultants\n• Supportive and collaborative work environment\n• Excellent career growth path for good performers\n\nWe are an equal opportunity employer.",
      ],
    ],
    uris: null,
    data: null,
  },
};

const Recommendation = (props) => {
  // Styled input component
  const Input = styled("input")({
    display: "none",
  });
  const [file, setFile] = useState(null);
  const [apiKey, setApiKey] = useState(
    "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"
  );
  const [data, setData] = useState({
    generated_jd: "No Description Generated",
    job_recommendations: { metadatas: [[]] },
  });
  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Set the first (and should be only) file
  };

  const handleApiKeyChange = (event) => {
    setApiKey(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file || !apiKey) {
      alert("Please select a file and enter your API key.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("openai_key", apiKey);

    try {
      const response = await fetch("http://127.0.0.1:8000/recommend-jobs/", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const resp = await response.json();
      console.log(resp);
      setData(resp);
      // Handle success - perhaps set state with returned job recommendations
    } catch (error) {
      console.error("There was an error!", error);
    }
  };

  return (
    <div className="recommendation-container">
      <Helmet>
        <title>AI Explainable Job Recommendation</title>
        <meta property="og:title" content="AI Explainable Job Recommendation" />
      </Helmet>
      <div className="recommendation-depth0-frame0">
        <div className="recommendation-depth1-frame0">
          <div className="recommendation-depth2-frame0">
            <div className="recommendation-depth3-frame0">
              <div className="recommendation-depth4-frame0">
                <div className="recommendation-depth5-frame0">
                  <img
                    src="/external/depth6frame09299-njyu.svg"
                    alt="Depth6Frame09299"
                    className="recommendation-depth6-frame0"
                  />
                </div>
                <div className="recommendation-depth5-frame1">
                  <div className="recommendation-depth6-frame001">
                    <span className="recommendation-text">
                      <span>Career Compass</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
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
                <JobList jobs={data["job_recommendations"]["metadatas"][0]} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;
