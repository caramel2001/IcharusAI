from scrapers.utils import HEADERS
import requests
import time
from tqdm import tqdm

class MyCareersFuture:

    def __init__(self,verbose=True,*args, **kwargs):
        self.url = f"https://api.mycareersfuture.gov.sg/v2/search"
        self.verbose = verbose

    def requests_page(self,page,json):
        # Start with the first page
        response=requests.post(url=f"{self.url}?limit=100&page={page}",headers=HEADERS,json=json)
        return response.json()
    
    def collect(self,sleep_time=1,json=None):
        page = 1  # Start from page 1
        jobs=[]
        json = json or {"employmentTypes":["Full Time"],"positionLevels":["Fresh/entry level"],"postingCompany":[]}
        data = self.requests_page(page,json=json)
        time.sleep(sleep_time)
        jobs.extend(data.get('results',[]))
        total = data["total"]//100
        print(f"Total pages {total}")
        for page in tqdm(range(2,total+1)):
            data = self.requests_page(page,json=json)
            jobs.extend(data.get('results',[]))
            time.sleep(sleep_time)
        if self.verbose:
            print(f"Extracted {len(jobs)} jobs")
        return jobs

    def get_job_data(self,id):
        response = requests.get(f'https://api.mycareersfuture.gov.sg/v2/jobs/{id}?updateApplicationCount=true',headers=HEADERS)
        return response.json()
