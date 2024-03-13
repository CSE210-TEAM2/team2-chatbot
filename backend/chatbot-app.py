# app.py
import os
import pickle
import uuid
from flask import Flask, request, jsonify
from langchain.chains import RetrievalQA
from langchain_openai import ChatOpenAI
from langchain_community.document_loaders import DirectoryLoader, PyPDFLoader, TextLoader
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings
from langchain.text_splitter import RecursiveCharacterTextSplitter

os.environ["OPENAI_API_KEY"] = os.getenv('OPENAI_API_KEY')

app = Flask(__name__)

# Initialize global variables for the chain and retriever
qa_chain = None
retriever = None

#Initialize global variable for the source map
siteToSourceMap = None


def process_response_data(response_data):
    """
    Removes duplicate documents based on the 'source' key in the metadata of each document.

    Args:
    - response_data (dict): The original response data with source documents.

    Returns:
    - dict: The updated response data without duplicate source documents.
    """

    if "i don't know" in response_data['result'].lower():
        response_data['source_documents'] = [{'page_content': 'None', 'metadata': {'source': 'None'}}]
        return response_data

    unique_sources = set()
    unique_documents = []

    for document in response_data['source_documents']:
        source = document['metadata'].get('source')
        if source not in unique_sources:
            unique_sources.add(source)
            unique_documents.append(document)
    
    #Replace the source in the document's metadata with the url to the site, acquired from the stored dict
    for document in unique_documents:
        #Only do this if the source is not a pdf
        source = document['metadata']['source']
        if source.endswith('.pdf'):
            prefix = "https://github.com/CSE210-TEAM2/team2-chatbot/tree/main/backend/"
            document['metadata']['source'] = prefix + source
        else:
            file_name = os.path.basename(source)
            file_id = str(os.path.splitext(file_name)[0])
            print(f"File ID: {file_id}")
            site = siteToSourceMap[file_id]
            document['metadata']['source'] = site

    response_data['source_documents'] = unique_documents
    return response_data


def update_db(persist_directory):
    # Load PDF files
    pdf_loader = DirectoryLoader('./Dataset/PDFs', glob="./*.pdf", loader_cls=PyPDFLoader)
    pdf_documents = pdf_loader.load()

    # Load txt files
    txt_loader = DirectoryLoader('./Dataset/Webpages/Files', glob="./*.txt", loader_cls=TextLoader)
    txt_documents = txt_loader.load()

    # Combine PDF and txt documents
    documents = pdf_documents + txt_documents

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
                                           
    # Custom Prompt
    prompt = "Use the following pieces of context to answer the user's question. \nIf you can not answer based on the context, just say \"I don't know\".\n----------------\n{context}"
    
    llm_chain = qa_chain.combine_documents_chain.llm_chain
    chat_prompt_template = llm_chain.prompt
    system_message_prompt_template = chat_prompt_template.messages[0]  # Assuming it's the first in the list
    system_message_prompt_template.prompt.template = prompt
    

@app.route('/chatbot', methods=['POST'])
def handle_query():
    query = request.json["text"]    
    if query:
        llm_response = qa_chain(query)
        # Prepare the response data for JSON serialization
        response_data = {
            'query': llm_response['query'],
            'result': llm_response['result'],
            'source_documents': [{
                'page_content': doc.page_content,
                'metadata': doc.metadata
            } for doc in llm_response['source_documents']]
        }
        

        response_data = process_response_data(response_data)
        
        # Return the serialized response data as JSON
        return jsonify(response_data)
    else:
        return jsonify({"error": "No query provided"}), 400

if __name__ == "__main__":
    #Load in the site to source mapping
    saved_dictionary_file = "./Dataset/filenames_to_urls.pickle"
    with open(saved_dictionary_file, 'rb') as file:
        siteToSourceMap = pickle.load(file)
    
    initialize_qa_chain()  # Ensure the QA chain is initialized and ready before starting the app
    app.run(host='0.0.0.0', port=5000, debug=True)
