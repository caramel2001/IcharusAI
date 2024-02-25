from .gmail import Gmail
from datetime import datetime
from setfit import SetFitModel
from bs4 import BeautifulSoup
import os
import pandas as pd
from .flan import JobTitleCompanyNameExtractor, GeminiJobTitleCompanyNameExtractor
import gdown

email_classifier_model = "https://drive.google.com/drive/folders/1Jn_cjP1OjO5Ttj9-xs63o9cTPNhKwHOv?usp=drive_link"
file_path = os.path.dirname(os.path.abspath(__file__))
os.makedirs(file_path + "/model", exist_ok=True)
model_path = file_path + "/model/email_classifer"


def download_model():
    if os.path.exists(model_path):
        print("Model already exists")
        return
    print("Downloading model")

    gdown.download_folder(
        email_classifier_model,
        quiet=True,
        use_cookies=False,
        output=model_path,
    )
    return


class JobClassifier:
    def __init__(self) -> None:
        download_model()
        self.model = SetFitModel.from_pretrained(model_path)
        self.extractor = GeminiJobTitleCompanyNameExtractor()

    def infer(self, sentence):
        predtext = [sentence]
        predicted_class = self.model(predtext)
        return str(predicted_class.numpy()[0])

    def classify(self, email, preprocess=True):
        if preprocess:
            _, email = self.preprocess_email(email)

        predicted_class = self.infer(email)
        return _, predicted_class

    def preprocess_email(self, email):
        try:
            subject = (email["subject"]).decode("utf-8")
        except:
            subject = email["subject"]
        html = str(BeautifulSoup(email["body"], "html.parser").text)
        string_list = [s.strip() for s in str(html).split()]
        final_string = " ".join(string_list)
        final_string_without_subject = " ".join(string_list)
        final_string = "Subject: " + str(subject) + ". Body: " + final_string
        return final_string, final_string_without_subject


if __name__ == "__main__":
    jc = JobClassifier()
    gmail = Gmail(
        username="agarwalpratham2001@gmail.com", password="iwxw mlyh dyru oecx"
    )
    gmail.authenticate()
    specified_date = datetime(2024, 2, 1)
    formatted_date = specified_date.strftime("%d-%b-%Y")
    ids = gmail.get_email_by_date(from_date=formatted_date)
    email_dict = gmail.parse_emails(ids[:20])
    preds = []
    for i in email_dict:
        out = jc.classify(i)
        preds.append(out)
    pd.Series(preds).to_csv("preds.csv")
