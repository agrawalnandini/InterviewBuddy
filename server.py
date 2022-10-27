from crypt import methods
from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
import textwrap as tw
import openai
import json
import time
from dotenv import load_dotenv
import os

app = Flask(__name__)
load_dotenv()

OPENAI_KEY = os.environ.get("API_KEY")
openai.api_key = OPENAI_KEY

topics = {
    "0" : "Behavioral",
    "1" : "Brain-teaser",
    "2" : "Communication",
    "3" : "Opinion",
    "4" : "Situational",
    "5" : "Technical",
}

fields = {
    "acc" : "Accounting",
    "bio" : "Biology",
    "bsn" : "Business",
    "cs" : "Computer Science",
    "eng" : "Engineering",
    "fin" : "Finance",
    "he" : "Health",
}

# Helper function to ensure output in a particular format
def convertResponseToList(response):
    return list(map(lambda option: option.lstrip('0123456789.-) '), response.split("\n")))

# Initial route called when page loaded via GET request
# Send the data for topics and fields to display on home page
@app.route('/')
def index():
    return render_template("home.html", topics= topics,fields = fields)

# Ajax call which gets the chosen topic and field, and returns all the questions
@app.route('/generateQuestions', methods = ['GET','POST'])
def generateQuestions():
    json_data = request.get_json()
    chosen_topic = topics[json_data['topic_idx']] 
    chosen_field = fields[json_data['field_idx']]
    prompt = f"List 5 {chosen_topic.lower()} interview questions for a role in {chosen_field.lower()} numbered 1 to 5 "
    completion = openai.Completion.create(engine="text-davinci-002",
                                          max_tokens=256,
                                          prompt=prompt)
    result = completion.choices[0].text.strip()
    result = convertResponseToList(result)
    returnData = {'prompt': prompt, 'result': result}
    return jsonify(returnData)

# Evaluates the user's answer to the selected question and sends the feedback and keywords
# Called again when user re-enters a new answer to incorporate the feedback 
@app.route('/evaluateAnswer', methods = ['GET','POST'])
def evaluateAnswer():
    json_data = request.get_json()
    user_answer = json_data['answer']
    question = json_data['question']

    grading = 'give a grade out of 5 with reasoning and useful feedback'
    prompt = f"Evaluate the answer '{user_answer}' to the interview question '{question}' and {grading}."
    completion = openai.Completion.create(engine="text-davinci-002",
                                          max_tokens=256,
                                          prompt=prompt)
    result = completion.choices[0].text.strip()

    chained_prompt =  f"Find keywords from the interview answer '{prompt}'"
    completion = openai.Completion.create(engine="text-davinci-002",
                                          max_tokens=256,
                                          prompt=chained_prompt)

    keyword_result = completion.choices[0].text.strip()

    returnData = {'prompt': prompt, 'feedback': result, 'keywords': keyword_result}
    return jsonify(returnData)

if __name__ == "__main__":
    app.run(debug=True)