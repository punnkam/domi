"""
Property data from parsed leased information with sample questions that tenants can ask their landlord.
"""

import sys

from lease_parse import extract_txt 

def create_qanda_data(text: str):
    PROPERTY_INFO = extract_txt(text)
    return [
        """Who should I contact in case of a maintenance issue or repair request?
    Great question! You can share any maintenance issues or repair request via this chat, and 
    I will share updates on your request on domi.
        """,
        """Are there any rules or restrictions on decorating or making changes to the apartment?
    We allow some minor changes to the apartment, such as hanging pictures or painting with our approval. 
    However, we do not allow any structural changes to the apartment without prior approval. 
    Please check with us before making any significant changes.
    """,
        """Can I sublet or have roommates, and if so, what is the process for doing so?
    We allow subletting and having roommates, subject to our approval. 
    Please send us an email with the details of your proposed sublet or roommate arrangement, 
    and we will let you know the process and any required forms.
    """,
        """
    What is the policy on renewing my lease or extending my rental agreement?
    We typically send lease renewal offers to our tenants 60 days before the end of their lease term. 
    If you wish to renew your lease or extend your rental agreement, 
    please contact us at least 30 days before the end of your lease term.
    """,
        """
    Are there any penalties for breaking my lease early?
    Yes, according to the lease agreement, there is an Early Termination clause (Section XIX) that states that the 
    Tenant shall have the right to terminate the agreement at any time by providing at least 60 days’ written notice 
    to the Landlord along with an early termination fee of $1500 (US Dollars). During the notice period for termination, 
    the Tenant will remain responsible for the payment of rent.
    """,
        """
    What is the pet policy?
    We generally do not allow pets on the premises, unless they are certified as service animals or emotional support pets. 
    If you require an accommodation for a service animal or emotional support pet, please let us know in advance and we will work with you to make the necessary arrangements.
    """,
        """
    What is the policy on rent increases, and how much notice will I receive before any increase?
    We typically review our rental rates annually and adjust them based on market conditions. 
    We will provide you with at least 30 days' notice before any rent increase.
    """,
        """
    Are there any shared amenities, and what are the policies for using them?
    Yes, we have shared amenities such as a gym, pool, or common areas. 
    The policies for using them are posted in the shared areas and included in your lease agreement. 
    Please follow these policies to ensure the safety and enjoyment of all residents.
    """,
        """
    How do I contact the landlord or property management in case of an emergency?
    Please call our emergency contact number at 888-888-8888 in case of an emergency. 
    We also have an online emergency contact form that you can use if you cannot reach us by phone. 
    Please note that the emergency contact is for urgent issues only, such as floods or fires. 
    For non-emergency issues, please contact us during normal business hours.
    """,
        """
    What is the policy on security deposits, and when will I receive my deposit back after I move out?
    We require a security deposit to cover any damages or unpaid rent at the end of your lease term. 
    We will inspect the property after you move out and return your security deposit within the time frame allowed by law, typically within 21 to 45 days after you vacate the property.
    """,
        """
    What is the policy on late rent payments, and are there any late fees?
    Our policy requires rent to be paid on time. If rent is not paid by the due date, we do assess a late fee of $100. This fee is charged if rent is not received by the end of the third day after the due date. 
    It is important to make timely payments to avoid the late fee and ensure that you are meeting your obligations under the lease agreement.
    """,
        """
    How often do you inspect the property, and will I receive notice before an inspection?
    We inspect the property periodically to ensure that it is well-maintained and to identify any issues that need to be addressed. 
    We will provide you with at least 24 hours' notice before an inspection.
    """,
        """
    Are there any noise restrictions or quiet hours that I should be aware of?
    While there are no formal noise restrictions or designated quiet hours in place, we do expect our tenants to be considerate of their neighbors and keep noise levels reasonable. 
    Excessive noise and any complaints from other tenants will be addressed promptly to ensure a peaceful living environment for all.
    """,
        """
    What is the process for moving in and moving out, and are there any move-in/move-out fees?
    We will provide you with a move-in/move-out checklist and instructions to ensure a smooth transition. 
    There may be move-in/move-out fees associated with the process. If you do not renew your lease, your move out date would be""" 
    + PROPERTY_INFO.lease_end
    ,
        """
    Can I make changes to my rental agreement or request changes to be made by the landlord?
    We are open to discussing any changes or requests to the rental agreement. 
    Please contact us to discuss any changes you would like to make.
    """,
        """
    Are utilities included in my rent, or do I have to set them up myself?
    Utilities included in the rent are water and electricity, but any other utilities or 
    services not mentioned will be the responsibility of the Tenant.
    """,
        """
    What is the parking situation at the property, and are there any assigned parking spots or parking fees?
    The lease agreement states that there is a Parking Fee of $100 due at signing, and you will be assigned a parking spot.
    """,
        """
    What is my rent?
    Your rent is $""" + PROPERTY_INFO.rent
    ]