# app.py
import os
from flask import Flask, request, jsonify
from langchain.chains import RetrievalQA
from langchain_openai import ChatOpenAI
from langchain_community.document_loaders import DirectoryLoader, PyPDFLoader
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter

os.environ["OPENAI_API_KEY"] = os.getenv('OPENAI_API_KEY')

app = Flask(__name__)

# Initialize global variables for the chain and retriever
qa_chain = None
retriever = None


def update_db(persist_directory):
    # Load and process the text files
    loader = DirectoryLoader('./PDFs_Dataset', glob="./*.pdf", loader_cls=PyPDFLoader)
    documents = loader.load()

    # Splitting the text into smaller chunks
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=100)
    texts = text_splitter.split_documents(documents)

    # Embed and store the texts
    embedding = OpenAIEmbeddings(model='text-embedding-3-small')

    vectordb = Chroma.from_documents(documents=texts,
                                     embedding=embedding,
                                     persist_directory=persist_directory)
    
    return vectordb


def initialize_qa_chain():
    global qa_chain, retriever

    persist_directory = './vectordb'

    # Load the Chroma vector database
    vectordb = update_db(persist_directory=persist_directory)

    # Set up the turbo LLM with your preferred settings
    turbo_llm = ChatOpenAI(
        temperature=0,
        model_name='gpt-3.5-turbo'
    )

    # Create the retriever and chain to answer questions
    retriever = vectordb.as_retriever(search_kwargs={"k": 3})
    qa_chain = RetrievalQA.from_chain_type(llm=turbo_llm,
                                           chain_type="stuff",
                                           retriever=retriever,
                                           return_source_documents=True)

@app.route('/fake', methods=['POST'])
def handle_query():
    query = request.json["text"]    
    if query:
        llm_response = qa_chain(query)
        # Prepare the response data for JSON serialization
        response_data = {
            'query': llm_response['query'],
            'text': llm_response['result'],
            'source_documents': [{
                'page_content': doc.page_content,
                'metadata': doc.metadata
            } for doc in llm_response['source_documents']]
        }
        
        # Return the serialized response data as JSON
        return jsonify(response_data)
    else:
        return jsonify({"error": "No query provided"}), 400

if __name__ == "__main__":
    initialize_qa_chain()  # Ensure the QA chain is initialized and ready before starting the app
    app.run(debug=True)
