import os
import json
import boto3
from botocore.exceptions import ClientError
from docx import Document
import chromadb
import logging
from chromadb.utils import embedding_functions
from openai import OpenAI  # Assuming you still want to keep this for OpenAI usage

class Recommendation:
    def __init__(self, resume, ai_service='openai', api_key=None, jobtitle=None):
        self.resume = resume
        self.jobtitle = jobtitle
        self.ai_service = ai_service
        if self.ai_service == 'openai':
            self.client = OpenAI(api_key=api_key)
        elif self.ai_service == 'llama':
            self.bedrock_runtime_client = boto3.client('bedrock',region_name='us-west-2', aws_access_key_id='AKIAZ7SUIREX75EJUIUT', aws_secret_access_key='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')
        else:
            raise ValueError("Invalid AI service. Choose 'openai' or 'llama'.")
        self.file_path = os.path.join(os.getcwd(), "data/jd_vectordb")
        self.chroma_client = chromadb.PersistentClient(path=self.file_path)
        self.collection = self.chroma_client.get_or_create_collection(
            name="mycareersfuture_jd",
            embedding_function=embedding_functions.DefaultEmbeddingFunction(),
        )

    def read_word_document(self):
        doc = Document(self.resume)  # RESUME HAS TO BE A PATH OR I/O object
        text = ""
        for paragraph in doc.paragraphs:
            text += paragraph.text + "\n"
        return text

    def get_generated_jd(self):
        text = self.read_word_document()
        logging.info("Document Read")
        if self.ai_service == 'openai':
            return self.invoke_openai_gpt(text)
        elif self.ai_service == 'llama':
            return self.invoke_llama2(text)

    def invoke_openai_gpt(self, text):
        prompt = f"Resume: {text}\n\n---\n\nJob Description:"
        try:
            response = self.client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {
                        "role": "system",
                        "content": "Based on the given resume above, create a suitable job posting. Include job description, responsibilities, and requirements without company name and location.",
                    },
                    {"role": "user", "content": prompt},
                ],
                temperature=0.3,
                top_p=1,
                frequency_penalty=0,
                presence_penalty=0,
            )
            logging.info("JD Generated with OpenAI")
            return response.choices[0].message.content.strip()
        except Exception as e:
            logging.warning(e)
            return ""

    def invoke_llama2(self, text):
        print("here")
        prompt = f"Based on the given resume above, create a suitable job posting. Include job description, responsibilities, and requirements without company name and location. Resume: {text}\n\n---\n\nJob Description:"
        try:
            body = {
                "prompt": prompt,
                "temperature": 0.3,
                "top_p": 1,
            }
            response = self.bedrock_runtime_client.invoke_model(
                modelId="meta.llama2-13b-chat-v1", body=json.dumps(body)
            )
            response_body = json.loads(response["body"].read())
            completion = response_body["generation"]
            logging.info("JD Generated with Llama")
            return completion
        except ClientError as e:
            logging.error(f"Couldn't invoke Llama 2: {e}")
            return ""

    def search_jd(self, jd, k=20):
        results = self.collection.query(
            query_texts=[jd],
            n_results=k,
            include=["documents", "distances", "metadatas"],
        )
        return results
