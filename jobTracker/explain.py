from openai import OpenAI
import boto3
import logging
import os
import json
from docx import Document

from dotenv import load_dotenv
load_dotenv()
def read_word_document(resume):
    print('this is the bug', resume)
    doc = Document(resume)  # RESUME HAS TO BE A PATH OR I/O object
    text = ""
    for paragraph in doc.paragraphs:
        text += paragraph.text + "\n"
    return text

def explain_openai_gpt(jd_text, res, rec=True, ai_service='llama', api_key=None):
    # Define the content based on whether the job description was recommended or not
    resume_text= read_word_document(res)
    if rec:
        content =  "You are an Explainable Job Recommendation system. The resume submitted by the user is:\n {res}\n Please give reasons why the user was recommended the role with the following job description and job requirements:{jd}\n Do not use more than 3 lines. Use passive voice for the response".format(res=resume_text,jd=jd_text)
    else:
        content = "The resume submitted by the user is:\n{res}\nAs a job recommendation system, give reasons why the user should not apply for the role with the following job description and job requirements:{jd}".format(res=resume_text, jd=jd_text)

    try:
        if ai_service == 'openai':
            client = OpenAI(api_key=api_key)
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role": "user",
                        "content": content,
                    }
                ],
                temperature=0.3,
                top_p=1,
                frequency_penalty=0,
                presence_penalty=0,
            )
            result = response.choices[0].message.content.strip()
        elif ai_service == 'llama':
            prompt = "You are an Explainable Job Recommendation system. The resume submitted by the user is:\n {res}\n Please give reasons why the user was recommended the role with the following job description and job requirements:{jd}\n Do not use more than 3 lines. Use passive voice for the response".format(res=res,jd=jd_text)

            body = {
                "prompt": prompt,
                "temperature": 0.3,
                "top_p": 1,
            }
            bedrock_runtime_client = boto3.client('bedrock-runtime',region_name='us-east-1', aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"), aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"))
            response = bedrock_runtime_client.invoke_model(
                modelId="meta.llama2-13b-chat-v1", body=json.dumps(body)
            )
            response_body = json.loads(response["body"].read())
            completion = response_body["generation"]
            print("explaination generated with Llama")
            return completion
        else:
            logging.warning("Invalid AI service specified.")
            return ""
        
        print("Explanation for Recommendation generated")
        return result
    except Exception as e:
        logging.warning(e)
        return ""