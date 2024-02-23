# Filename - server.py
 
# Import flask and datetime module for showing date and time
from flask import Flask, request
import datetime
# import langchain_chatbot
 
x = datetime.datetime.now()
 
# Initializing flask app
app = Flask(__name__)


'''
@app.route('/chat', methods=['POST'])
def chat():
    try:
        input_data = request.json
        response = langchain_chatbot.chat_with_input(input_data)  # Replace with your function
        return jsonify(response)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
'''

# Fake response
@app.route('/fake', methods=['POST'])
def fake():
	return {
		"text":"This is a fake response! Echo prompt: " + request.json["text"],
	}
 
# Route for seeing a data
@app.route('/data')
def get_time():
 
    # Returning an api for showing in  reactjs
    return {
        'Name':"geek", 
        "Age":"22",
        "Date":x, 
        "programming":"python"
        }
 
     
# Running app
if __name__ == '__main__':
    app.run(debug=True)
