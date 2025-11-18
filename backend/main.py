from fastapi import FastAPI, Query
from typing import List, Optional
from google_sheets import get_meetings_from_sheet
from models import Meeting
import uvicorn

app = FastAPI()

@app.get("/meetings", response_model=List[Meeting])
def meetings(
    date: Optional[str] = Query(None, description="Filtruj po dacie (YYYY-MM-DD)"),
    search: Optional[str] = Query(None, description="Wyszukaj po imieniu, nazwisku lub adresie"),
    sort: Optional[str] = Query("time", description="Sortuj po polu: time, date, name")
):
    meetings = get_meetings_from_sheet()
    # Filtrowanie
    if date:
        meetings = [m for m in meetings if m.meeting_date == date]
    if search:
        search_lower = search.lower()
        meetings = [
            m for m in meetings if search_lower in m.first_name.lower()
            or search_lower in m.last_name.lower()
            or search_lower in m.address.lower()
        ]
    # Sortowanie
    if sort == "time":
        meetings.sort(key=lambda m: m.meeting_time)
    elif sort == "date":
        meetings.sort(key=lambda m: m.meeting_date)
    elif sort == "name":
        meetings.sort(key=lambda m: (m.last_name, m.first_name))
    return meetings

# Trasa (póki nie ma Directions API, zwracamy proste dane w kolejności spotkań)
@app.get("/route", response_model=List[Meeting])
def route(date: Optional[str] = Query(None)):
    meetings = get_meetings_from_sheet()
    if date:
        meetings = [m for m in meetings if m.meeting_date == date]
    meetings.sort(key=lambda m: m.meeting_time)
    return meetings

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000)