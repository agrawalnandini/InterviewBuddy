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
topics = [
    "Behavioral",
    "Brain-teaser",
    "Communication",
    "Opinion",
    "Situational",
    "Technical",
]

fields = [
    "Accounting",
    "Biology",
    "Business",
    "Computer Science",
    "Engineering",
    "Finance",
    "Health",
]

#initial route called when page loaded via GET request
#send the data for topics and fields to display on home page
@app.route('/')
def index():
    return render_template("index.html", topics= topics,fields = fields)

#ajax call which gets the chosen topic and field, and returns all the questions
@app.route('/generateQuestions', methods = ['GET','POST'])
def generateQuestions():
    json_data = request.get_json()
    chosen_topic = json_data['topic']
    chosen_field = json_data['field']
    prompt = f"List 5 {chosen_topic.lower()} interview questions for a role in {chosen_field.lower()} numbered 1 to 5 "
    completion = openai.Completion.create(engine="text-davinci-002",
                                          max_tokens=256,
                                          prompt=prompt)
    result = completion.choices[0].text.strip()
    returnData = {'prompt': prompt, 'result': result}
    return jsonify(returnData)

#evaluates the user's answer to the selected question and sends the feedback and keywords
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