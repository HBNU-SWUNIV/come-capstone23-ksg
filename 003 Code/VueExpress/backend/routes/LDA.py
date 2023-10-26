from tqdm import tqdm
import re
import pickle
import csv
import pandas as pd
from pandas import DataFrame
import numpy as np
import json

#from eunjeon import Mecab
from konlpy.tag import Mecab

mecab = Mecab('C:/mecab/share/mecab-ko-dic')

#board.json 전체 읽어와서 train_data.csv로 만들기. 
#title = pd.read_csv('C:/workspace/VueExpress/backend/data/train_data2.csv',encoding='cp949')

#file_path = 'C:/workspace/VueExpress/backend/data/board.json'

# with open(file_path) as file:
#     datas = json.load(file)

#     json_test = datas['id','title','contents']
#     print(json_test)




title = pd.read_json('C:/workspace/VueExpress/backend/data/board.json')

def clean_text(text):
    text = text.replace(".", "").strip()
    text = text.replace("·", " ").strip()
    pattern = '[^ ㄱ-ㅣ가-힣|0-9]+'
    text = re.sub(pattern=pattern, repl='', string=text)
    return text

def get_nouns(tokenizer, sentence):
    tagged = tokenizer.pos(sentence)
    nouns = [s for s, t in tagged if t in ['NNG', 'NNP', 'VA', 'XR'] and len(s) >1]
    return nouns

def tokenize(df):
    tokenizer = Mecab(dicpath='C:/mecab/share/mecab-ko-dic')
    processed_data = []
    for sent in tqdm(df['contents']):
        sentence = clean_text(str(sent).replace("\n", "").strip())
        processed_data.append(get_nouns(tokenizer, sentence))
    return processed_data

def save_processed_data(processed_data):
    with open("tokenized_data_"+title, 'w', newline="", encoding='utf-8') as f:
        writer = csv.writer(f)
        for data in processed_data:
            writer.writerow(data)

if __name__ == '__main__':
    df = title
    df.columns=['id','writer','year','month','day','title','contents', 'image_tag']
    df.dropna(how='any')
    processed_data= tokenize(df)
    #save_processed_data(processed_data)

#print(type(df['id'][0]))

#processed_data = [sent.strip().split(",") for sent in tqdm(open("tokenized_data_"+ title,'r',encoding='utf-8').readlines())]
processed_data = DataFrame(processed_data)
processed_data[0] = processed_data[0].replace("", np.nan)
processed_data = processed_data[processed_data[0].notnull()]
processed_data = processed_data.values.tolist()
processed_data2=[]

for i in processed_data:
  i = list(filter(None, i))
  processed_data2.append(i)

processed_data = processed_data2
#print(processed_data)

print("여 까진 왔음. 11111111111111111111111111111111111")

################################모델링#####################
from gensim.models.ldamodel import LdaModel
from gensim.models.callbacks import CoherenceMetric
from gensim import corpora
from gensim.models.callbacks import PerplexityMetric

import logging

logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)

dictionary = corpora.Dictionary(processed_data)
dictionary.filter_extremes(no_below=2, no_above=0.5)
corpus = [dictionary.doc2bow(text) for text in processed_data]

num_topics = 20
chunksize = 2000
passes = 20
iterations = 400
eval_every = None

temp = dictionary[0]
id2word = dictionary.id2token

model = LdaModel(
    corpus=corpus,
    id2word=id2word,
    chunksize=chunksize,
    alpha='auto',
    eta='auto',
    iterations=iterations,
    num_topics=num_topics,
    passes=passes,
    eval_every=eval_every
)

top_topics = model.top_topics(corpus) #, num_words=20)

# Average topic coherence is the sum of topic coherences of all topics, divided by the number of topics.
avg_topic_coherence = sum([t[1] for t in top_topics]) / num_topics
print('Average topic coherence: %.4f.' % avg_topic_coherence)

from pprint import pprint
#pprint(top_topics)





########시각화#########

import pickle
import pyLDAvis.gensim_models as gensimvis
import pyLDAvis
from gensim.models.coherencemodel import CoherenceModel
import matplotlib.pyplot as plt

lda_visualization = gensimvis.prepare(model, corpus, dictionary, sort_topics=False,mds='mmds')
pyLDAvis.save_html(lda_visualization, 'C:/workspace/VueExpress/backend/data/file_name.html')


for i, topic_list in enumerate(model[corpus]):
    if i==5:
        break
    print(i,'번째 문서의 topic 비율은',topic_list)

def make_topictable_per_doc(model, corpus,df):
    topic_table = pd.DataFrame()

    # 몇 번째 문서인지를 의미하는 문서 번호와 해당 문서의 토픽 비중을 한 줄씩 꺼내온다.
    for i, topic_list in enumerate(model[corpus]):
        doc = topic_list[0] if model.per_word_topics else topic_list
        doc = sorted(doc, key=lambda x: (x[1]), reverse=True)
        # 각 문서에 대해서 비중이 높은 토픽순으로 토픽을 정렬한다.
        # EX) 정렬 전 0번 문서 : (2번 토픽, 48.5%), (8번 토픽, 25%), (10번 토픽, 5%), (12번 토픽, 21.5%),
        # Ex) 정렬 후 0번 문서 : (2번 토픽, 48.5%), (8번 토픽, 25%), (12번 토픽, 21.5%), (10번 토픽, 5%)
        # 48 > 25 > 21 > 5 순으로 정렬이 된 것.

        #print(str(df['id'][i]) + ": df : id 값 ")

        # 모든 문서에 대해서 각각 아래를 수행
        for j, (topic_num, prop_topic) in enumerate(doc): #  몇 번 토픽인지와 비중을 나눠서 저장한다.
            if j == 0:  # 정렬을 한 상태이므로 가장 앞에 있는 것이 가장 비중이 높은 토픽
                topic_table = topic_table._append(pd.Series([int(df['id'][i]), int(topic_num), round(prop_topic,4), topic_list]), ignore_index=True)
                #topic_table = topic_table.concat([topic_table, pd.DataFrame([int(topic_num), round(prop_topic,4), topic_list])], ignore_index=True)
                # 가장 비중이 높은 토픽과, 가장 비중이 높은 토픽의 비중과, 전체 토픽의 비중을 저장한다.
            else:
                break
    return(topic_table)

topictable = make_topictable_per_doc(model, corpus,df)
topictable = topictable.reset_index() # 문서 번호을 의미하는 열(column)로 사용하기 위해서 인덱스 열을 하나 더 만든다.
topictable.columns = ['id 번호', '문서 번호', '가장 비중이 높은 토픽', '가장 높은 토픽의 비중', '각 토픽의 비중']
print(topictable[:50])

print(model.show_topics())


from gensim.models import Word2Vec

text = [["a", "b", "b", "a"],
["a", "b", "a", "c", "a"],
["a"] * 4,
["b"] * 4]

model = Word2Vec(sentences=text, size=30, negative=2, window=1, iter=500,min_count=1)
model.wv["a"]