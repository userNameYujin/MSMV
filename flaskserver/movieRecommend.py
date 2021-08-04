from sklearn.metrics.pairwise import linear_kernel
from sklearn.feature_extraction.text import TfidfVectorizer
from flask import Flask, jsonify, request

import pandas as pd
import numpy as np
import os
from dotenv import load_dotenv
load_dotenv(verbose=True)
csvPath = os.getenv('CSV_PATH')

df = pd.read_csv(csvPath+'/movieDataSet.csv')

tfidf = TfidfVectorizer()
df['summary'] = df['summary'].fillna('')
tfidf_matrix = tfidf.fit_transform(df['summary'])
app = Flask(__name__)

cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

indices = pd.Series(df.index, index=df['movieCode']).drop_duplicates()


def get_recommendations(movieCode, cosine_sim=cosine_sim):
    idx = indices[movieCode]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_scores = sim_scores[1:11]
    movie_indices = [i[0] for i in sim_scores]
    score = [i[1] for i in sim_scores]
    return df['movieCode'].iloc[movie_indices]


@app.route('/<movieCode>')
def home(movieCode):
    movieCd = int(movieCode)
    movies = get_recommendations(movieCd)
    data = movies.to_json(orient='columns', force_ascii=False)
    return data


if __name__ == '__main__':
    app.run(debug=True)
