import numpy as np
import tensorflow as tf
from scipy.stats import rankdata

# 정리를 해야함
# Actions that we try to detect
def choose_action(mode):
    alphabet = [chr(ord('a') + i) for i in range(26)]
    words = ["angel", "banana", "cry", "dance", "egg", "fun", "game", "house"\
        , "internet", "jump", "key", "love", "music", "name"\
        , "open", "paper", "rabbit", "school", "tiger", "video", "walk"]
    return alphabet if mode == "A" else words


# load model by folder name
def build_model(mode='A'):
    '''
    alphabet / word 모델 다르게 사용할 경우 mode 설정
    :return model:
    '''
    model_path = "alphabet 모델 폴더 이름 넣기" if mode == 'A' else "word 모델 폴더 이름 넣기"
    return tf.keras.models.load_model(model_path)


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
    return top_n_idx


def extract_keypoints(results):
    pose = np.array([[res.x, res.y, res.z, res.visibility] for res in results.pose_landmarks.landmark]).flatten() if results.pose_landmarks else np.zeros(33*4)
    lh = np.array([[res.x, res.y, res.z] for res in results.left_hand_landmarks.landmark]).flatten() if results.left_hand_landmarks else np.zeros(21*3)
    rh = np.array([[res.x, res.y, res.z] for res in results.right_hand_landmarks.landmark]).flatten() if results.right_hand_landmarks else np.zeros(21*3)
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

    return input_sequences[-30:]


def prediction(result, mode):
    # expand_dims은 프론트에서 넘어오는 데이터 형식 보고 확인하기
    try:
        model = build_model()
        sequence = result_to_sequence(result)
        actions = choose_action(mode)
        res = model.predict(np.expand_dims(sequence, axis=0))[0]
        # 최상위 3개 알파벳
        predict_top3_idx = top_n(3, res)
        top3_alphabet = [actions[i] for i in predict_top3_idx]
        return top3_alphabet
    except:
        raise Exception("Predict ERROR: predict_error")

