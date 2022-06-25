from flask_socketio import SocketIO, emit, disconnect
from flask import Flask
from flask_cors import CORS
from random import random
from threading import Thread, Event
from time import sleep

from model_load_HS import prediction

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'secret!'
socket = SocketIO(app, cors_allowed_origins='*', engineio_logger=True)

# prediction generator
class HandSignModel:
    def __init__(self, mode):
        # self.delay = 0.5
        # super(ModelPrediction, self).__init__()
        self.mode = mode

    def predict(self, data):
        print('start prediction')
        return prediction(data, mode=self.mode)

    def run(self, data):
        result = self.predict(data)
        return result


# Handle the webapp 

@socket.on('connect')
def connect_socket():
    print('user connected')
    

@socket.on('coordinate')
def handle_coordinate(data):
    print('coordinate', data)
    model = HandSignModel(mode='A')
    result = model.run(data)
    emit("answer", result)


@socket.on("disconnect")
def disconnect_socket(payload):
    emit("disconnect", "ok")
    disconnect()


if __name__ == '__main__':
    socket.run(app, port = 4000)
