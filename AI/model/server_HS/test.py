# from flask_socketio import SocketIO, emit, disconnect
# from flask import Flask
# from flask_cors import CORS
# from random import random
# from threading import Thread, Event
# from time import sleep

from model_load_HS import prediction
from mock import test_data, test_data_2

# prediction generator
class HandSignModel:
    def __init__(self, mode):
        # self.delay = 0.5
        # super(ModelPrediction, self).__init__()
        self.mode = mode

    def predict(self, data):
        print('start prediction')
        print("mode: ", self.mode)
        # try:
        #     return prediction(data, mode=self.mode)
        # except Exception as e:
        #     print(e)
        return prediction(data, mode=self.mode)

    def run(self, data):
        result = self.predict(data)
        return result


# Handle the webapp
def handle_coordinate(data):
    # print('coordinate', data)
    model = HandSignModel(mode='W')
    result = model.run(data)
    return result


if __name__ == '__main__':
    '''
    test_data 는 'a' 데이터
    test_data_2 는 'angel' 데이터 입니다.
    '''
    print("result: ", handle_coordinate(data=test_data_2))
