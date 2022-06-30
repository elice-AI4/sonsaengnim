import numpy as np
from scipy.stats import rankdata
from collections import Counter


def top_n(array, n=3):
    """
    유사도 상위 n개 데이터의 인덱스 반환 함수
    :param n:
    :param array:
    :return top_n_idx:
    """
    ranks = rankdata(array)
    top_n_idx = []
    length = len(array)
    for i in range(length, length-n, -1):
        top_n_idx.append(np.where(ranks == i)[0][0])
    return top_n_idx


def get_top_n_frequency(array, n=3):
    """
    최빈값 상위 n개 데이터 반환
    :param n:
    :param array:
    :return top_n_freq_actions:
    """
    counter = Counter(array)
    top_n_freq_actions = [i[0] for i in counter.most_common(n=n)]
    return top_n_freq_actions
