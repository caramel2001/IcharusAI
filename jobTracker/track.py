import requests
import pandas as pd
import os
from .gmail import Gmail
from .job_classifier import JobClassifier
from .job_stage import JobStageClassifier


class TrackFile:
    def __init__(self):
        self.file_path = os.path.join(
            os.getcwd(),
            "track.csv",
        )
        self.initiate_file()

    def initiate_file(self):
        if os.path.exists(self.file_path):
            return
        else:
            df = pd.DataFrame(columns=["date"])
            df.to_csv(self.file_path, index=False)

    def read_file(self):
        if os.path.exists(self.file_path):
            return pd.read_csv(self.file_path)
        else:
            return pd.DataFrame()

    def update_file(self, df: pd.DataFrame):
        track_data = self.read_file()
        track_data = pd.concat([df, track_data], axis=0)
        track_data.sort_values(by="date", inplace=True, ascending=False)
        track_data.to_csv(self.file_path, index=False)
        return track_data

    def delete_file(self, index):
        track_data = self.read_file()
        track_data.drop(index, inplace=True)
        track_data.to_csv(self.file_path, index=False)
        return track_data

    def get_last_update_date(self):
        if os.path.exists(self.file_path):
            if not pd.isna(pd.read_csv(self.file_path)["date"].max()):
                date = (
                    pd.to_datetime(pd.read_csv(self.file_path)["date"].max())
                    + pd.DateOffset(days=1)
                ).date()
                formatted_date = date.strftime("%d-%b-%Y")
                return formatted_date
            else:
                date = (pd.to_datetime("today") - pd.DateOffset(days=2)).date()
                formatted_date = date.strftime("%d-%b-%Y")
                return formatted_date
        else:
            # return date 1 week ago
            date = (pd.to_datetime("today") - pd.DateOffset(days=2)).date()
            formatted_date = date.strftime("%d-%b-%Y")
            return formatted_date


def get_logo_trustpilot(company_name):
    url = "https://www.trustpilot.com/api/consumersitesearch-api/businessunits/search"
    params = {
        "country": "US",
        "page": 1,
        "pageSize": 1,
        "query": company_name,
    }
    try:
        response = requests.get(
            url, params=params, headers={"user-agent": "Mozilla/5.0"}
        )
        if pd.DataFrame(response.json().get("businessUnits", [])).shape[0] == 1:
            temp = pd.DataFrame(response.json().get("businessUnits", []))
            if pd.isna(temp["logoUrl"].iloc[0]):
                print("No Logo Found")
                return "https://storage.googleapis.com/simplify-imgs/company/default/logo.png"
            else:
                return f'https://consumersiteimages.trustpilot.net/business-units/{temp["businessUnitId"].iloc[0]}-198x149-1x.jpg'
    except Exception as e:
        pass
    return "https://storage.googleapis.com/simplify-imgs/company/default/logo.png"


# def get_track_data(path):
#     if os.path.exists(path):
#         return pd.read_csv(path)
#     else:
#         return pd.DataFrame()


# def get_last_update_date(path):
#     if os.path.exists(path):
#         return pd.read_csv(path)["Date"].max()
#     else:
#         # return date 1 month ago
#         return (pd.to_datetime("today") - pd.DateOffset(days=7)).date()


def update_track_data(gmail_username, gmail_api_key):
    track = TrackFile()
    latest_date = track.get_last_update_date()
    gmail = Gmail(username=gmail_username, password=gmail_api_key)
    gmail.authenticate()
    ids = gmail.get_email_by_date(from_date=latest_date)
    print("Fetching emails")
    email_dict = gmail.parse_emails(ids)
    print("Identifying Job Emails")
    classifier = JobClassifier()
    preds = []
    for email in email_dict:
        out = classifier.classify(email)
        preds.append(out)
    dates = [pd.to_datetime(i["date"]).strftime("%Y-%m-%d") for i in email_dict]
    jobs = pd.DataFrame(preds, columns=["text", "job"])
    jobs["date"] = dates
    jobs = jobs[jobs["job"] != "0"]
    jobs.reset_index(inplace=True, drop=True)
    jobs["title"] = None
    jobs["company"] = None
    jobs["rejected"] = 0
    jobs["logo"] = (
        "https://storage.googleapis.com/simplify-imgs/company/default/logo.png"  # deafult placeholder logo
    )
    jobs["location"] = "Singapore"
    print("Identifying Company and Job title")
    for index, i in enumerate(jobs["text"]):
        jobs.loc[index, "company"] = classifier.extractor.get_company(i)
        jobs.loc[index, "title"] = classifier.extractor.get_jobtitle(i)
        jobs.loc[index, "logo"] = get_logo_trustpilot(jobs.loc[index, "company"])
    if jobs.shape[0] == 0:
        track_data = track.read_file()
        track_data["title"] = track_data["title"].fillna("")
        track_data["company"] = track_data["company"].fillna("")
        return track_data.to_dict(orient="records")
    print("Stage Classfiying")
    stage_classifier = JobStageClassifier()
    stages = []
    for index, i in enumerate(jobs["text"]):
        out = stage_classifier.classify(i)
        if int(out) == 4:  # rejected
            jobs.loc[index, "rejected"] = 1
        stages.append(int(out))
    jobs["stage"] = stages
    # jobs[["text", "job", "stage", "company", "title"]].to_csv(
    #     "job_stages_test.csv", index=False
    # )
    print("Updating Track Data")

    track_data = track.update_file(jobs)
    track_data["title"] = track_data["title"].fillna("")
    track_data["company"] = track_data["company"].fillna("")
    return track_data.to_dict(orient="records")


def get_track_data():
    track = TrackFile().read_file()
    track["title"] = track["title"].fillna("")
    track["company"] = track["company"].fillna("")
    return track.to_dict(orient="records")


def delete_track_data(index):
    track = TrackFile()
    track_data = track.delete_file(index)
    track_data["title"] = track_data["title"].fillna("")
    track_data["company"] = track_data["company"].fillna("")
    return track_data.to_dict(orient="records")
