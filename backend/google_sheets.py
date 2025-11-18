import os
from google.oauth2 import service_account
from googleapiclient.discovery import build
from models import Meeting

# Konfiguracja (podmień arkusz i zakres)
SHEET_ID = "1aH4Fx4p1T7cpMKBQYKCqGQXJo4DMobwdUxq2NAp9jo8"
RANGE_NAME = "Spotkania!A2:F"

def get_meetings_from_sheet():
    creds = service_account.Credentials.from_service_account_file(
        os.environ.get("GOOGLE_SERVICE_ACCOUNT_JSON"), scopes=["https://www.googleapis.com/auth/spreadsheets.readonly"]
    )
    service = build("sheets", "v4", credentials=creds)
    sheet = service.spreadsheets()
    result = sheet.values().get(spreadsheetId=SHEET_ID, range=RANGE_NAME).execute()
    values = result.get("values", [])
    meetings = []
    for row in values:
        # dopasuj pola do struktury arkusza
        try:
            meetings.append(Meeting(
                first_name = row[0],
                last_name = row[1],
                address = row[2],
                postal_code = row[3],
                meeting_date = row[4],
                meeting_time = row[5]
            ))
        except IndexError: continue  # pomiń niepełne wiersze
    return meetings
