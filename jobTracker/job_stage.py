from .gmail import Gmail
from datetime import datetime
from setfit import SetFitModel
import os
import pandas as pd
import gdown

stage_classifier_model = "https://drive.google.com/drive/folders/1gq-9kA_MIa6KsULSjWC9lHyQXXgWFekT?usp=drive_link"
file_path = os.path.dirname(os.path.abspath(__file__))
os.makedirs(file_path + "/model", exist_ok=True)
model_path = file_path + "/model/stage_classifer"


def download_model():
    if os.path.exists(model_path):
        print("Model already exists")
        return
    print("Downloading model")

    gdown.download_folder(
        stage_classifier_model,
        quiet=True,
        use_cookies=False,
        output=model_path,
    )
    return


class JobStageClassifier:
    def __init__(self) -> None:
        download_model()
        self.model = SetFitModel.from_pretrained(model_path)

    def infer(self, sentence):
        predtext = [sentence]
        predicted_class = self.model(predtext)
        return str(predicted_class.numpy()[0])

    def classify(self, email):
        predicted_class = self.infer(email)
        return predicted_class


# if __name__ == "__main__":
#     jc = JobClassifier()
#     gmail = Gmail(
#         username="agarwalpratham2001@gmail.com", password="lgjc xmxv ixyr nvxx"
#     )
#     gmail.authenticate()
#     specified_date = datetime(2023, 10, 1)
#     formatted_date = specified_date.strftime("%d-%b-%Y")
#     ids = gmail.get_email_by_date(from_date=formatted_date)
#     # email_dict = gmail.parse_emails(ids[:5])
#     preds = []
#     df = pd.read_csv("emails_jobs.csv")
#     print(df.head())
#     for i in df["text"]:
#         print(i[100:200])
#         out = jc.classify(i, preprocess=False)
#         print(out)
#         preds.append(out)
#     pd.Series(preds).to_csv("preds.csv")
