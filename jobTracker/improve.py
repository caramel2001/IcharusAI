from docx import Document
import boto3
import logging
import json
import os
from openai import OpenAI
from dotenv import load_dotenv
load_dotenv()

def read_word_document(resume_path):
    doc = Document(resume_path)  # RESUME HAS TO BE A PATH OR I/O object
    text = ""
    for paragraph in doc.paragraphs:
        text += paragraph.text + "\n"
    return text

def improve_resume_with_ai(resume_path, jd_list, ai_service='llama', api_key=None):
    try:
        resume_text = read_word_document(resume_path)
        
        jd_text = ''.join(jd_list)
        print(jd_text)
    except Exception as e:
        print(e)
        return "the problem is here."
    
    content = f"You are a professional resume writer. The user‘s original resume is:\n{resume_text}\nThe job descriptions that align with the user's skills are:\n{jd_text}\nWrite a new resume by using the original resume and the aligning job descriptions. Do not add any information not present in the given job descriptions."

    try:
        if ai_service == 'openai':
            client = OpenAI(api_key=api_key)
            response = client.chat.completions.create(
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
            result = response.choices[0].message.content.strip()
            return result
        
        elif ai_service == 'llama':
            try:
                bedrock_runtime_client = boto3.client(
                    'bedrock-runtime',
                    region_name='us-east-1',
                    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
                    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY")
                )
                body = {
                    "prompt": content,
                    "temperature": 0.3,
                    "top_p": 1,
                }
                response = bedrock_runtime_client.invoke_model(
                    modelId="meta.llama2-13b-chat-v1",
                    body=json.dumps(body)
                )
                print(response, "response")
                response_body = json.loads(response["body"].read())
                completion = response_body["generation"]
                return completion
            except Exception as e:
                print("this is the error", e)
                return "this is hwats wrongs."
        
        else:
            logging.warning("Invalid AI service specified.")
            return "Invalid AI service specified."
    
    except Exception as e:
        logging.warning(e)
        return "An error occurred while processing the request."
