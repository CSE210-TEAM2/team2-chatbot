# -*- coding: utf-8 -*-
"""Langchain_Chatbot.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/15_LzS3GQkdbgvsqENbPh_tcaJusfOOG8
"""

# Commented out IPython magic to ensure Python compatibility.
# %pip install --upgrade pip
# %pip install --upgrade --quiet kaleido python-multipart cohere langchain langchain-community pypdf langchainhub llama-cpp-python chromadb bs4

import getpass
import os

#os.environ["OPENAI_API_KEY"] = getpass.getpass()

# os.environ["LANGCHAIN_TRACING_V2"] = "true"
# os.environ["LANGCHAIN_API_KEY"] = getpass.getpass()

#import bs4
from langchain import hub
from langchain.text_splitter import RecursiveCharacterTextSplitter
# from langchain_community.document_loaders import WebBaseLoader
from langchain_community.document_loaders import PyPDFDirectoryLoader
from langchain_community.vectorstores import Chroma
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
# from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.embeddings import HuggingFaceEmbeddings

#Load the contents of the pdfs directory
loader = PyPDFLoader("Dataset/")
pages = loader.load_and_split()

#Chunk the text
text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
splits = text_splitter.split_documents(docs)

#TODO: GET EMBEDDINGS
vectorstore = Chroma.from_documents(documents=splits, embedding=HuggingFaceEmbeddings())

# Retrieve and generate using the relevant snippets of the blog.
retriever = vectorstore.as_retriever()
prompt = hub.pull("rlm/rag-prompt")

# TODO: GET LLM
# model_url = 
llm = LlamaCpp(
    model_url=model_url,
    streaming=False,
)
model = Llama2Chat(llm=llm)
# llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0)

def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)

from langchain_core.runnables import RunnableParallel

rag_chain_from_docs = (
    RunnablePassthrough.assign(context=(lambda x: format_docs(x["context"])))
    | prompt
    | model
    | StrOutputParser()
)

rag_chain_with_source = RunnableParallel(
    {"context": retriever, "question": RunnablePassthrough()}
).assign(answer=rag_chain_from_docs)

rag_chain_with_source.invoke("What is Task Decomposition")

# Load, chunk and index the contents of the blog.
# bs_strainer = bs4.SoupStrainer(class_=("post-content", "post-title", "post-header"))
# loader = WebBaseLoader(
#     web_paths=("https://lilianweng.github.io/posts/2023-06-23-agent/",),
#     bs_kwargs={"parse_only": bs_strainer},
# )

#TODO: LOAD DATA
docs = loader.load()

text_splitter = RecursiveCharacterTextSplitter(chunk_size=1000, chunk_overlap=200)
splits = text_splitter.split_documents(docs)
#TODO: GET EMBEDDINGS
# vectorstore = Chroma.from_documents(documents=splits, embedding=OpenAIEmbeddings())

# Retrieve and generate using the relevant snippets of the blog.
retriever = vectorstore.as_retriever()
prompt = hub.pull("rlm/rag-prompt")

#TODO: GET LLM
# llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0)


def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)


rag_chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

rag_chain.invoke("What is Task Decomposition?")

from langchain_core.runnables import RunnableParallel

rag_chain_from_docs = (
    RunnablePassthrough.assign(context=(lambda x: format_docs(x["context"])))
    | prompt
    | llm
    | StrOutputParser()
)

rag_chain_with_source = RunnableParallel(
    {"context": retriever, "question": RunnablePassthrough()}
).assign(answer=rag_chain_from_docs)

rag_chain_with_source.invoke("What is Task Decomposition")
