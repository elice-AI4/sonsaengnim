import numpy as np
import tensorflow as tf
from scipy.stats import rankdata

# Actions that we try to detect
actions = np.array(['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i' , 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'])

# load model by folder name
new_model = tf.keras.models.load_model('[모델 폴더 이름 넣기]')

def top3(array):
    ranks = rankdata(array)
    top3_idx = []
    for i in range(26, 23, -1):
        top3_idx.append(np.where(ranks==i)[0][0])
    return top3_idx

def prediction(sequence):
    # expand_dims은 프론트에서 넘어오는 데이터 형식 보고 확인하기
    res = new_model.predict(np.expand_dims(sequence, axis=0))[0]
    # 최상위 3개 알파벳
    predict_3 = top3(res)
    # print(actions[np.argmax(res)])

    predict_3.append(np.argmax(res))
    
    top_3_alpha = []

    for i in range(3):
        top_3_alpha.append(actions[predict_3[i]])
    
    return top_3_alpha
