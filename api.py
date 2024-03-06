from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
import uvicorn
import os

# Assuming your Recommendation class is updated elsewhere in your project
from jobTracker.recommendation import Recommendation
from jobTracker.track import (
    update_track_data,
    get_track_data,
    delete_track_data,
    TrackFile,
)
from jobTracker.explain import explain_openai_gpt

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # This allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)


@app.post("/recommend-jobs/")
async def recommend_jobs(
    resume: UploadFile = File(...),
    ai_service: str = Form(...),  # New form field to choose the AI service
    api_key: Optional[str] = Form(None),  # Make API key optional
    jobtitle: Optional[str] = Form(None),
):
    # Save temporary file to disk to be read by Document
    temp_file_path = f"temp_{resume.filename}"
    with open(temp_file_path, "wb") as buffer:
        buffer.write(await resume.read())

    # Initialize the Recommendation class with the new parameters
    recommendation_engine = Recommendation(
        resume=temp_file_path, ai_service=ai_service, api_key=api_key, jobtitle=jobtitle
    )

    # Generate job description based on the resume
    generated_jd = recommendation_engine.get_generated_jd()

    # Clean up the temporary file
    os.remove(temp_file_path)

    if not generated_jd:
        return {"error": "Failed to generate job description from the resume."}

    job_recommendations = recommendation_engine.search_jd(generated_jd, k=20)

    return {"generated_jd": generated_jd, "job_recommendations": job_recommendations}


@app.post("/search-jobs/")
def search_jobs(
    jd: str = Form(...),
    ai_service: str = Form("openai"),  # Default to 'openai' for backward compatibility
    api_key: Optional[str] = Form(None),  # Make API key optional
):
    # Initialize with minimal params as this method only uses the search functionality
    recommendation_engine = Recommendation(
        resume="./", ai_service=ai_service, api_key=api_key
    )

    job_recommendations = recommendation_engine.search_jd(jd, k=10)

    return {"job_recommendations": job_recommendations}


@app.post("/explain-record/")
async def explain_record(    jd: str = Form(...),resume: UploadFile = File(...), ai_service: str = Form("llama"),api_key: Optional[str] = Form(None)):
    print(ai_service,"ai_service called")
    temp_file_path = f"temp_{resume.filename}"
    with open(temp_file_path, "wb") as buffer:
        buffer.write(await resume.read())
        
    explain_data = explain_openai_gpt(jd_text=jd, res=temp_file_path, ai_service=ai_service, api_key=api_key)

    return explain_data


@app.post("/download-models/")
def create_track():

    return "success"


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
async def get_track():
    track_data = get_track_data()
    return track_data


@app.post("/delete-record/")
def delete_track(index: int):
    track_data = delete_track_data(index)
    return track_data


@app.post("/add-record/")
def add_track(
    title: str,
    company: str,
    stage: str,
    location: str,
):
    stage_map = {"Applied": 0, "OA": 1, "Interview": 2, "Offer": 3, "Rejection": 4}
    stage = stage_map[stage]
    rejected = 1 if stage == 4 else 0
    track = TrackFile()
    track = track.add_record(
        title=title, company=company, stage=stage, rejected=rejected, location=location
    )
    return track.to_dict(orient="records")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
