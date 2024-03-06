from docx import Document
from openai import OpenAI
import boto3
import logging

class Improve:
    def __init__(self, ai_service='openai', api_key=None):
        self.ai_service = ai_service
        if self.ai_service == 'openai':
            self.client = OpenAI(api_key=api_key)
        elif self.ai_service == 'llama':
            self.bedrock_runtime_client = boto3.client('bedrock-runtime',region_name='us-east-1', aws_access_key_id='AKIAZ7SUIREX75EJUIUT', aws_secret_access_key='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')
        else:
            raise ValueError("Invalid AI service. Choose 'openai' or 'llama'.")
    
    def read_word_document(self,resume:str):
        doc = Document(resume)  # RESUME HAS TO BE A PATH OR I/O object
        text = ""
        for paragraph in doc.paragraphs:
            text += paragraph.text + "\n"
        return text
    
    def __call__(self, resume_:str, jd_list:list):   # RESUME HAS TO BE A PATH OR I/O object
        resume = self.read_word_document(resume_)
        content = "Please make appropriate improvements and revisions based on the user‘s original resume and job description of interest to generate a concise and clear new resume, highlighting more skills and experience information, in order to improve the accuracy of the matching recommendation system in locating and identifying the user’s capability. The user‘s resume is:\n {res}\nThe job descriptions that interests the user are: {jds}.".format(res=resume,jds=jd_list)
        try:
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role": "system",
                        "content": content,
                    }
                ],
                temperature=0.3,
                top_p=1,
                frequency_penalty=0,
                presence_penalty=0,
            )
            logging.info("Returned Improved Resume")
            return response.choices[0].message.content.strip()
        except Exception as e:
            logging.warning(e)
            return ""
        
im = Improve(api_key="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")
jd = ['''Machine Learning Intern (Ref.No. R1004783)

at our location in Singapore

You will enjoy having this responsibility:

Consulting with managers to determine and refine machine learning objectives. 
Working with the Software team and Product Owner for Designing machine learning systems and self-running artificial intelligence (AI) software to automate predictive models. 
Transforming data science prototypes and applying appropriate ML algorithms and tools. 
Ensuring that algorithms generate accurate user recommendations. 
Turning unstructured data into useful information by auto-tagging images and text-to-speech conversions. 
Developing ML algorithms to analyze huge volumes of historical data to make predictions. 
Running tests, performing statistical analysis, and interpreting test results. 

You have:

Study computer science, data science, mathematics, or a related field. 
Knowledge in computational linguistics, data analytics, or similar will be advantageous. 
Proficiency with Python, Java, or R code writing. 
Knowledge of ML frameworks, libraries, data structures, data modeling, and software architecture. 
Knowledge of mathematics, statistics, and algorithms. 
Analytical and problem-solving abilities. 
Great communication and collaboration skills. 
Good in time management and organizational abilities. ''']
print(im(resume_="IcharusAI/CV.docx",jd_list=jd))