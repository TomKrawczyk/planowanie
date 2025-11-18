from pydantic import BaseModel

class Meeting(BaseModel):
    first_name: str
    last_name: str
    address: str
    postal_code: str
    meeting_date: str  # YYYY-MM-DD
    meeting_time: str  # HH:MM
