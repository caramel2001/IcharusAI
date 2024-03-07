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
    content = f"""
Objective: Enhance the user's resume to specifically match job descriptions, ensuring it showcases relevant skills, experiences, and qualifications effectively.

Instructions for the AI:

1. Read and Analyze:
    a. Resume Content: Review the user's provided resume to identify key skills, experiences, achievements, and educational background.
    b. Job Descriptions: Examine the provided job descriptions to understand the required and desired qualifications for the roles.

2. Alignment Process:
    a. Skill Matching: Align the user's skills and experiences with the requirements mentioned in the job descriptions, focusing on direct relevance and transferability.
    b. Customization: Adjust the resume for each job description, highlighting the user's qualifications that meet the job's needs.
    c. Optimization: Refine the resume's language to incorporate terminology and keywords from the job descriptions, ensuring it speaks directly to the roles applied for.

3. Formatting and Structuring:
    a. Professional Summary: Draft a compelling summary at the beginning of the resume, tailored to reflect the user's fit for the target roles.
    b. Experience Section: Strategically organize the experience section, prioritizing positions and accomplishments that are most relevant to the job descriptions.
    c. Skills Section: Explicitly list skills that are emphasized in the job descriptions, organizing them into relevant categories (e.g., technical skills, soft skills).
    d. Education and Certifications: Update the education section to highlight qualifications specifically required or preferred in the job descriptions.

4. Final Review and Enhancement:
    a. Relevance Check: Ensure each section of the resume contributes to presenting the user as an ideal candidate for the positions described in the job descriptions.
    
    make sure to not too much info thats not in the resume. try to keep the users style.
    
    here is ther resume {resume_text} and here is the job descript {jd_text}. output the new tailored resume.
"""

    
  

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
