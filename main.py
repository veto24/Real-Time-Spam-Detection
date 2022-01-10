from flask import Flask, request
from flask_restful import Api
from flask_cors import CORS
import pickle
import re
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('omw-1.4')

# Initialize server
app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
api = Api(app)

# Initialize lemmatizer
lemmatizer = WordNetLemmatizer()

# Opening our saved models
with open('./models/model.pkl', 'rb') as f:
    model = pickle.load(f)

with open('./models/tfidf.pkl', 'rb') as f:
    tfidf = pickle.load(f)

# Combination of clean, tokenize, removing stopwords and lemmatization
# Explained on 'procedures.ipynb'
def preprocess(msg):
    result = re.sub(r'^.+@[^\.].*\.[a-z]{2,}$', 'emailaddress', msg)
    result = re.sub(
        r'^http\://[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(/\S*)?$', 'webaddress', result)
    result = re.sub(r'£|\$', 'money-symbol', result)
    result = re.sub(
        r'^\(?[\d]{3}\)?[\s-]?[\d]{3}[\s-]?[\d]{4}$', 'phone-number', result)
    result = re.sub(r'\d+(\.\d+)?', 'number', result)
    result = re.sub(r'[^\w\d\s]', '', result)
    result = re.sub(r'[^\w\d\s]', '', result)
    result = result.lower()
    tokens = nltk.word_tokenize(result)
    stop_words = set(stopwords.words("english"))
    filtered_text = [word for word in tokens if word not in stop_words]
    lemmas = [lemmatizer.lemmatize(word, pos='v') for word in filtered_text]
    preprocessed_msg = ' '.join(lemmas)
    return preprocessed_msg

# Server entry point
@app.route('/fetch_spam', methods=['POST'])
def data():
    if request.method == 'POST':
        message = request.get_json()['message']

        # Preprocess message before vectorizing
        data = [preprocess(message)]

        # Vectorize and predict
        vector = tfidf.transform(data).toarray()
        prediction = model.predict(vector)

        # Returns `true` if prediction is 1 or spam, and `false` otherwise
        result = int(prediction[0]) == 1
        return {"isSpam": result}

    else:
        return None, 404


if __name__ == "__main__":
    app.run(debug=True)
