from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import uvicorn
import os

# Assuming your Recommendation class is defined elsewhere in your project
from jobTracker.recommendation import Recommendation
from jobTracker.track import update_track_data, get_track_data, delete_track_data

app = FastAPI()

# CORS middleware configuration to allow requests from web applications hosted on different origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "*"
    ],  # This allows all origins, for production you might want to restrict this
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


@app.post("/recommend-jobs/")
async def recommend_jobs(
    resume: UploadFile = File(...),
    openai_key: str = Form(...),
    jobtitle: Optional[str] = Form(None),
):
    # Save temporary file to disk to be read by Document
    temp_file_path = f"temp_{resume.filename}"
    with open(temp_file_path, "wb") as buffer:
        buffer.write(await resume.read())

    # Initialize the Recommendation class with the provided details
    recommendation_engine = Recommendation(
        resume=temp_file_path, openai_key=openai_key, jobtitle=jobtitle
    )

    # Generate job description based on the resume
    generated_jd = recommendation_engine.get_generated_jd()

    # Clean up the temporary file
    os.remove(temp_file_path)

    # If no job description was generated, return an error message
    if not generated_jd:
        return {"error": "Failed to generate job description from the resume."}

    # # Search for job recommendations based on the generated job description
    job_recommendations = recommendation_engine.search_jd(generated_jd, k=20)

    # Return the top 10 job recommendations
    return {"generated_jd": generated_jd, "job_recommendations": job_recommendations}


@app.post("/search-jobs/")
def search_jobs(
    jd: str = Form(...),
):
    recommendation_engine = Recommendation(resume="./", openai_key="sd")

    # # Search for job recommendations based on the generated job description
    job_recommendations = recommendation_engine.search_jd(jd, k=10)

    # Return the top 10 job recommendations
    return {"job_recommendations": job_recommendations}


@app.post("/download-models/")
def create_track():

    return "success"


# @app.post("/create-records/")
# def create_track():

#     return "success"


@app.post("/update-records/")
async def update_track(
    gmail_username: str = Form(...),
    gmail_password: str = Form(...),
):
    track_data = update_track_data(
        gmail_username=gmail_username,
        gmail_api_key=gmail_password,
    )
    return track_data


@app.get("/get-records/")
def get_track():
    track_data = get_track_data()
    return track_data


@app.post("/delete-record/")
def delete_track(index: int):
    track_data = delete_track_data(index)
    return track_data


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
