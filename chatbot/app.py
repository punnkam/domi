from flask import Flask, request, jsonify
from main import get_chatbot_response
from flask_cors import CORS, cross_origin
import modal

app = Flask(__name__)
CORS(app)

@app.route('/chatbot', methods=['POST'])
def chatbot():
    data = request.get_json()
    text = data['text']
    history = data['history']
    f = modal.Function.lookup("domi", "chatbot_cli")
    response = f.call(text, history)
    #response.headers.add('Access-Control-Allow-Origin', '*')
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True, port=5003)


