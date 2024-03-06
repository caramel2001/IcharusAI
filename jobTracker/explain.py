from docx import Document
from openai import OpenAI
import boto3
import logging

class Explain:
    def __init__(self, resume:str, ai_service='openai', api_key=None):
        self.resume = resume         # RESUME HAS TO BE A PATH OR I/O object
        self.text = self.read_word_document()
        self.ai_service = ai_service
        if self.ai_service == 'openai':
            self.client = OpenAI(api_key=api_key)
        elif self.ai_service == 'llama':
            self.bedrock_runtime_client = boto3.client('bedrock-runtime',region_name='us-east-1', aws_access_key_id='AKIAZ7SUIREX75EJUIUT', aws_secret_access_key='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')
        else:
            raise ValueError("Invalid AI service. Choose 'openai' or 'llama'.")
    
    def read_word_document(self):
        doc = Document(self.resume)  # RESUME HAS TO BE A PATH OR I/O object
        text = ""
        for paragraph in doc.paragraphs:
            text += paragraph.text + "\n"
        return text

    def explain_openai_gpt(self, jd_text, rec=True):
        
        # Whether jd was recommended to the user or not
        if(rec==True):
            content = "You are an Explainable Job Recommendation system. The resume submitted by the user is:\n {res}\n Please give reasons why the user was recommended the role with the following job description and job requirements:{jd}\n Do not use more than 3 lines. Use passive voice for the response".format(res=self.text,jd=jd_text)
        else:
            content = "You are an Explainable Job Recommendation system. The resume submitted by the user is:\n {res}\n Please give reasons why the user was not recommended the role with the following job description and job requirements:{jd} Do not use more than 3 lines. Use passive voice for the response".format(res=self.text,jd=jd_text)

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
            logging.info("Explanation for Recommendation generated")
            return response.choices[0].message.content.strip()
        except Exception as e:
            logging.warning(e)
            return ""
        
ex = Explain("IcharusAI/CV.docx",api_key="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")
res = ex.explain_openai_gpt(jd_text='''Machine Learning Intern (Ref.No. R1004783)

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
Good in time management and organizational abilities. ''')
print(res)