from openai import OpenAI
import boto3
import logging
import os
from dotenv import load_dotenv
load_dotenv()
def explain_openai_gpt(jd_text, res, rec=True, ai_service='llama', api_key=None):
    # Define the content based on whether the job description was recommended or not
    if rec:
        content = "The resume submitted by the user is:\n{res}\nAs a job recommendation system, give reasons why the user needs to apply for the role with the following job description and job requirements:{jd}".format(res=res, jd=jd_text)
    else:
        content = "The resume submitted by the user is:\n{res}\nAs a job recommendation system, give reasons why the user should not apply for the role with the following job description and job requirements:{jd}".format(res=res, jd=jd_text)

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
        elif ai_service == 'llama':
            # Assuming Llama is accessed through AWS Bedrock runtime client (adjust as necessary)
            bedrock_runtime_client = boto3.client('bedrock-runtime', region_name='us-east-1', aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"), aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"))
            # Replace the following line with the actual method to call Llama and process the response
            response = bedrock_runtime_client.your_llama_function_call_method_here(content=content)
            result = response['result']  # Adjust this according to the actual response structure from Llama
        else:
            logging.warning("Invalid AI service specified.")
            return ""
        
        logging.info("Explanation for Recommendation generated")
        return result
    except Exception as e:
        logging.warning(e)
        return ""