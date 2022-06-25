from flask_socketio import SocketIO, emit
from flask import Flask
from flask_cors import CORS
from random import random
from threading import Thread, Event
from time import sleep

from model_load_CJ import prediction

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socket = SocketIO(app)
CORS(app, cors_allowed_origins='*', engineio_logger=True)

# prediction generator
class ModelPrediction():
    def __init__(self):
        self.delay = 0.5
        # super(ModelPrediction, self).__init__()
    def alpha_prediction(self, data):
        print('start prediction')
        try:
            return prediction(data)
        except:
            print("predict Error: could not predict")
    def run(self, data):
        self.alpha_prediction(data)

# Handle the webapp 

@socket.on('connect')
def connect_socket():
    print('user connected')
    

@socket.on('coordinate')
def handle_coordinate(data):
    print('coordinate', data)
    alpha_modelPrediction = ModelPrediction()
    answer = alpha_modelPrediction.run(data)
    emit("answer", answer)

@socket.on("disconnect")
def disconnect_socket(payload):
    emit("disconnect", "ok")

if __name__ == '__main__':
    socket.run(app)