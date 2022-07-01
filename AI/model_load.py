import os
import numpy as np
import tensorflow as tf
from utils import top_n

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'


# Actions that we try to detect
def set_actions():
    alphabet = np.array([chr(ord('a') + i) for i in range(26)])
    words = np.array([
        "angel", "banana", "cry", "dance", "egg", "fun", "game", "house",
        "internet", "jump", "key", "love", "music", "name",
        "open", "paper", "rabbit", "school", "tiger", "video", "walk"])
    return np.concatenate((alphabet, words))


# load model by folder name
def build_model(actions):
    """
    alphabet / word 모델 다르게 사용할 경우 mode 설정
    issue - saved_model은 _UserObject 형식으로 반환되기 때문에 h5로 가중치만 불러오는 방법 사용
    :return model:
    """
    model = tf.keras.models.Sequential()
    model.add(tf.keras.layers.LSTM(64, return_sequences=True, activation='relu', input_shape=(30, 258)))
    model.add(tf.keras.layers.LSTM(128, return_sequences=True, activation='relu'))
    model.add(tf.keras.layers.LSTM(64, return_sequences=False, activation='relu'))
    model.add(tf.keras.layers.Dense(64, activation='relu'))
    model.add(tf.keras.layers.Dense(32, activation='relu'))
    model.add(tf.keras.layers.Dense(actions.shape[0], activation='softmax'))

    weight = 'sl_model_weight.h5'
    base_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(base_dir, 'weights', weight)
    model.load_weights(file_path)

    return model


def extract_keypoints(results):
    """
    pose(33), left_hand(21), right_hand(21) 의 모든 인덱스를 flatten하는 함수
    ( => 33 * 4 + 21 * 3 + 21 * 3 = 258 )
    :param results:
    :return numpy array (shape=(1, 258)):
    """
    try:
        poses = [{"x": 0, "y": 0, "z": 0, "visibility": 0} for res in range(33)] \
            if 'poseLandmarks' not in results else results['poseLandmarks']
        lhs = [{"x": 0, "y": 0, "z": 0} for res in range(21)] \
            if 'leftHandLandmarks' not in results else results['leftHandLandmarks']
        rhs = [{"x": 0, "y": 0, "z": 0} for res in range(21)] \
            if 'rightHandLandmarks' not in results else results['rightHandLandmarks']
    except Exception as e:
        print(e)
        return

    pose = np.array([[res['x'], res['y'], res['z'], res['visibility']] for res in poses]).flatten()
    lh = np.array([[res['x'], res['y'], res['z']] for res in lhs]).flatten()
    rh = np.array([[res['x'], res['y'], res['z']] for res in rhs]).flatten()

    return np.concatenate([pose, lh, rh])


def result_to_sequence(data):
    """
    30개의 프레임별 관절 좌표 데이터셋을 모델 input shape에 알맞은 형태로 변환하는 작업
    :param data:
    :return input_sequences (shape=(30, 258)):
    """
    input_sequences = []
    sequence_length = 30
    for num in range(sequence_length):
        keypoint = extract_keypoints(data[num])
        input_sequences.append(keypoint)

    return input_sequences


class HandSignModel:
    def __init__(self):
        self.actions = set_actions()
        self.model = build_model(self.actions)

    def predict(self, data):
        """
        예측 메인 함수
        입력 데이터를 모델 input 형태로 변환, 유사한 알파벳 idx 3개 추출, 해당 idx로 가장 유사도가 높은 3개의 단어 반환
        :param data:
        :return top3_result:
        """
        sequence = result_to_sequence(data)
        res = self.model.predict(np.expand_dims(sequence, axis=0))[0]
        # 최상위 3개 결과
        predict_top3_idx = top_n(res, 3)
        top3_result = [self.actions[i] for i in predict_top3_idx]
        return top3_result
