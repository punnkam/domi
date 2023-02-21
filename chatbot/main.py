import os
import pathlib
import sys
import json
from datetime import datetime

import modal
from pydantic import BaseModel

from property_data import create_qanda_data
from chatbot import create_chatbot_langchain
from config import USER_SETTINGS
from ingest import ingest_data, ingest_examples

image = modal.Image.debian_slim().pip_install(
    "httpx",
    "langchain~=0.0.85",
    "loguru",
    "openai~=0.26.5",
    "psycopg2-binary",
    "sqlalchemy",
    "tiktoken~=0.2.0",
    "weaviate-client~=3.11.0",
    "PyPDF2~=3.0.1"
)
stub = modal.Stub(
    name="domi", image=image,
    secrets=[
        modal.Secret.from_name("openai-secret")
    ]
)


class ChatResponseRequest(BaseModel):
    text: str
    # type structure: list[(human, ai)]
    history: list[list[str]] = []
 
weaviate_url = 'https://domi.weaviate.network'

@stub.webhook(
    method="POST",
    label="domi",
    secrets=[
        modal.Secret.from_name("openai-secret")
    ],
)
def chatbot_web(request: ChatResponseRequest):
    """
    The entire chatbot API, a single HTTP POST endpoint. The state of the conversation
    is maintained client-side, and is passed to the endpoint on each inference request.
    """
    import weaviate
    from langchain.vectorstores import Weaviate

    client = weaviate.Client(
        url= weaviate_url,
        additional_headers={"X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"]},
    )
    vectorstore = Weaviate(client, "Paragraph", "content", attributes=["source"])
    chain = create_chatbot_langchain(vectorstore, weaviate_url)
    result = chain({"question": request.text, "chat_history": request.history})
    return {"answer": result["answer"]}


@stub.function
def chatbot_cli(text: str, history: list[list[str]]):
    import weaviate
    from langchain.vectorstores import Weaviate

    client = weaviate.Client(
        url= weaviate_url,
        additional_headers={"X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"]},
    )
    vectorstore = Weaviate(client, "Paragraph", "content", attributes=["source"])
    chain = create_chatbot_langchain(vectorstore, weaviate_url)
    result = chain({"question": text, "chat_history": history})

    return {"answer": result["answer"]}

@stub.function()
def ingest(qanda_data):
    """
    Run this ad-hoc with `modal run`. It will setup the chat bot's
    knowledge base data.
    """
    ingest_data(
        weaviate_url= weaviate_url,
        openai_api_key = os.environ["OPENAI_API_KEY"],
        docs=qanda_data,
    )
    ingest_examples(
        weaviate_url= weaviate_url,
        openai_api_key= os.environ["OPENAI_API_KEY"],
    )
    print("Done!")


def db_config_from_env() -> dict[str, str]:
    required_keys = {"PGHOST", "PGDATABASE", "PGUSER", "PGPASSWORD"}
    import os

    extracted_env = {k: os.environ[k] for k in required_keys if k in os.environ}

    missing_keys = required_keys - set(extracted_env.keys())
    if missing_keys:
        raise RuntimeError(
            f"Missing required environment variables: {missing_keys}. "
            "Did you forget to add a modal.Secret, or are some keys missing from "
            "the provided modal.Secret?"
        )
    return {k.replace("PG", "").lower(): v for k, v in extracted_env.items()}

#for the api
@stub.function
def get_chatbot_response(text, history):
    with stub.run():
        ans = chatbot_cli.call(text=text, history=history)
        response = ans['answer']
    return json.dumps({"response": response})

if __name__ == "__main__":
    stub.deploy()
    # if len(sys.argv) != 2:
    #     exit("Must pass path to lease file")
    # lease_data_path = sys.argv[1]
    # print(f"Using lease data file at '{lease_data_path}'")
    # text = pathlib.Path(lease_data_path).read_text()
    # qanda_data = create_qanda_data(text)
    
    # with stub.run():
    #     ingest.call(qanda_data=qanda_data)
    #     # ans = chatbot_cli.call(text="can I move out early?", history=[])
        # print(ans['answer'])
    # #     ingest.call(qanda_data=qanda_data)

