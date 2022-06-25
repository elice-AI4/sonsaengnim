import numpy as np
import tensorflow as tf
import os
from scipy.stats import rankdata
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Input
from tensorflow.keras.callbacks import TensorBoard, ModelCheckpoint
from tensorflow.keras.optimizers import Adam
from datetime import datetime

# 정리를 해야함
# Actions that we try to detect
def choose_action(mode):
    alphabet = [chr(ord('a') + i) for i in range(26)]
    words = ["angel", "banana", "cry", "dance", "egg", "fun", "game", "house",
             "internet", "jump", "key", "love", "music", "name",
             "open", "paper", "rabbit", "school", "tiger", "video", "walk"]
    return alphabet if mode == "A" else words


# load model by folder name
def build_model(mode='A'):
    '''
    alphabet / word 모델 다르게 사용할 경우 mode 설정
    :return model:
    '''
    print("실제 모델 모드: ", mode)
   
    actions = choose_action(mode)
    model = Sequential()
    model.add(LSTM(64, return_sequences=True, activation='relu', input_shape=(30,258)))
    model.add(LSTM(128, return_sequences=True, activation='relu'))
    model.add(LSTM(64, return_sequences=False, activation='relu'))
    model.add(Dense(64, activation='relu'))
    model.add(Dense(32, activation='relu'))
    model.add(Dense(actions.shape[0], activation='softmax'))
    model.compile(optimizer='Adam', loss='categorical_crossentropy', metrics=['categorical_accuracy'])
    
    if mode=="A":
        model.load_weights('action_hs_8.h5')
    else:
        model.load_weights('action_hs_word_1.h5')
    return model


def top_n(n, array):
    '''
    유사도 상위 n개 데이터의 인덱스 반환 함수
    :param n:
    :param array:
    :return top_n_idx:
    '''
    ranks = rankdata(array)
    top_n_idx = []
    length = len(array)
    for i in range(length, length-n, -1):
        top_n_idx.append(np.where(ranks == i)[0][0])
    print("top_n_idx: ", top_n_idx)
    return top_n_idx


def extract_keypoints(results):
    try:
        poses = results['poseLandmarks']
    except:
        poses = [{"x": 0, "y": 0, "z": 0, "visibility": 0} for res in range(33)]
    try:
        lhs = results['leftHandLandmarks']
    except:
        lhs = [{"x": 0, "y": 0, "z": 0} for res in range(21)]
    try:
        rhs = results['rightHandLandmarks']
    except:
        rhs = [{"x": 0, "y": 0, "z": 0} for res in range(21)]
    pose = np.array([[res['x'], res['y'], res['z'], res['visibility']] for res in poses]).flatten()
    lh = np.array([[res['x'], res['y'], res['z']] for res in lhs]).flatten()
    rh = np.array([[res['x'], res['y'], res['z']] for res in rhs]).flatten()

    return np.concatenate([pose, lh, rh])


def result_to_sequence(result):
    '''
    30개의 프레임별 관절 좌표 데이터셋을 numpy array 로 변환하여 이어붙이는 작업
    :param result:
    :return input_sequences:
    '''
    input_sequences = []
    SEQ_LENGTH = 30
    for num in range(SEQ_LENGTH):
        keypoint = extract_keypoints(result[num])
        input_sequences.append(keypoint)
    # print(input_sequences)
    return input_sequences


def prediction(result, mode):
    '''
    예측 메인 함수
    model build, 입력 데이터 input 형태로 변환, 유사한 알파벳 idx 뽑아서 반환
    :param result:
    :param mode:
    :return top3_alphabet:
    '''
    model = build_model(mode)
    sequence = result_to_sequence(result)
    actions = choose_action(mode)
    res = model.predict(np.expand_dims(sequence, axis=0))[0]
    # 최상위 3개 알파벳
    predict_top3_idx = top_n(3, res)
    top3_alphabet = [actions[i] for i in predict_top3_idx]
    return top3_alphabet