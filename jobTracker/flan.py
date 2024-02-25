from transformers import AutoModelForSeq2SeqLM, AutoTokenizer
import torch
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
import os


class JobTitleCompanyNameExtractor:
    def __init__(self, model="google/flan-t5-base"):
        self.model = AutoModelForSeq2SeqLM.from_pretrained("google/flan-t5-base")
        self.tokenizer = AutoTokenizer.from_pretrained("google/flan-t5-base")

    def get_jobtitle(self, email_text: str):
        question = ("What is the job title?If not available output None",)
        input_text = f"question: {question} context: {email_text}"
        inputs = self.tokenizer(input_text, return_tensors="pt")

        with torch.no_grad():
            outputs = self.model.generate(**inputs)
        answer = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        return answer

    def get_company(self, email_text: str):
        question = ("What is the name of the company?If not available output None",)
        input_text = f"question: {question} context: {email_text}"
        inputs = self.tokenizer(input_text, return_tensors="pt")

        with torch.no_grad():
            outputs = self.model.generate(**inputs)
        answer = self.tokenizer.decode(outputs[0], skip_special_tokens=True)
        return answer


class GeminiJobTitleCompanyNameExtractor:
    def __init__(self, model="google/flan-t5-base"):
        self.apikey = os.getenv("GOOGLE_API_KEY")
        genai.configure(api_key=self.apikey)
        self.model = genai.GenerativeModel("gemini-pro")
        print("Calling Gemini API")

    def get_jobtitle(self, email_text: str):
        question = ("What is the job title?If not available output None",)
        input_text = f"question: {question} context: {email_text}"
        response = self.model.generate_content(input_text)
        return response.text

    def get_company(self, email_text: str):
        question = ("What is the name of the company?If not available output None",)
        input_text = f"question: {question} context: {email_text}"
        response = self.model.generate_content(input_text)
        return response.text


if __name__ == "__main__":
    email_text = "Subject: HRT Application Status - Pratham Agarwala. Body: Hi Pratham, We want to thank you very much for your interest in Hudson River Trading and the Algorithm Developer role. We have reviewed your candidacy for this position, along with other available opportunities, and have decided not to move forward with your application at this time. We ask that you refrain from applying again during this campus recruiting cycle. The new recruiting season will start in July/August 2024. We would encourage you to stay in touch with us, because as HRT grows, it's possible our hiring needs will change. We're always eager to network with smart candidates with an interest in our industry. Thanks again for your interest and time, and good luck with your job search. Regards, Hudson River Trading"
    job_title_extractor = JobTitleCompanyNameExtractor()
    print(job_title_extractor.get_jobtitle(email_text))
    print(job_title_extractor.get_company(email_text))
    gemini_job_title_extractor = GeminiJobTitleCompanyNameExtractor()
    print(gemini_job_title_extractor.get_jobtitle(email_text))
    print(gemini_job_title_extractor.get_company(email_text))
