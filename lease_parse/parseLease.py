import datetime
from PyPDF2 import PdfFileReader
from pathlib import Path
import re

#create pdf file
pdf = PdfFileReader('convex/lease_temp1.pdf')

#grab pages
page_1_object = pdf.getPage(0)


#extract text
page_1_text = page_1_object.extract_text()

with Path('convex/lease_temp1.txt').open(mode='w') as output_file:
    text = ''
    for page in pdf.pages:
        text += page.extract_text()
    output_file.write(text)
#prop info    
address = re.search("(?<=(Address: )).*?(?=( b))", text).group(0)
tenants = re.findall(r'(?<= - )([A-Za-z]+(?: [A-Za-z]+)*)', text)
tenants = tenants[:3]
rent_amount = re.search(r'\$(\d+(?:\.\d+)?)', text)
emails = re.findall("\S+@\S+", text)

#rent info with roomates
num_tenants = len(tenants[:3])
rent_per_tenant = round(int(rent_amount.group(1)) / num_tenants, 2)

#lease info
dates = re.findall(r'\b\d{1,2}/\d{1,2}/\d{4}\b', text)
rent_due_date =  dates[1] 
end_of_lease = dates[2]

