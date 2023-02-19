import datetime
from PyPDF2 import PdfFileReader
from pathlib import Path
import re
from typing import Optional, NamedTuple

class PropertyInfo(NamedTuple):
    owner: str
    tenant_list: list
    rent: int
    rent_due_date: datetime.date
    address: str
    lease_signed: datetime.date
    lease_start: datetime.date
    lease_end: datetime.date
    tenant_emails: list

def parse_pdf():
    #create pdf file
    pdf = PdfFileReader('chatbot/lease_temp1.pdf')

    #grab pages
    page_1_object = pdf.getPage(0)


    #extract text
    page_1_text = page_1_object.extract_text()

    with Path('chatbot/lease_temp1.txt').open(mode='w') as output_file:
        text = ''
        for page in pdf.pages:
            text += page.extract_text()
        output_file.write(text)

def extract_txt(text):
    #prop info    
    address = re.search("(?<=(Address: )).*?(?=( b))", text).group(0)
    tenants = re.findall(r'(?<= - )([A-Za-z]+(?: [A-Za-z]+)*)', text)
    tenants = tenants[:3]
    rent_amount = re.search(r'\$(\d+(?:\.\d+)?)', text)
    tenant_emails = re.findall("\S+@\S+", text)

    #rent info with roomates
    num_tenants = len(tenants[:3])
    rent_per_tenant = round(int(rent_amount.group(1)) / num_tenants, 2)

    #lease info
    dates = re.findall(r'\b\d{1,2}/\d{1,2}/\d{4}\b', text)
    rent_due_date =  dates[1] 
    end_of_lease = dates[2]

    return PropertyInfo(
        owner="Jonathon",
        tenant_list= tenants,
        rent = rent_amount.group(1),
        address = address,
        lease_signed = dates[0],
        lease_start = dates[1],
        lease_end = end_of_lease,
        tenant_emails = tenant_emails,
        rent_due_date= rent_due_date
    )


if __name__ == "__main__":
    parse_pdf()