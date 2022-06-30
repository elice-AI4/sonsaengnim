from flask_socketio import SocketIO, emit, disconnect
from flask import Flask
from flask_cors import CORS
from threading import Thread, Event

from utils import get_top_n_frequency
from model_load import HandSignModel

socket = SocketIO()


def create_app():
    app = Flask(__name__)
    CORS(app)
    app.config['SECRET_KEY'] = 'secret!'

    socket.init_app(app, async_mode='eventlet', cors_allowed_origins='*', engineio_logger=True)

    # Handle the webapp 
    @app.route("/")
    def index():
        print('hi flask')
        return "hello world"

    @socket.on('connect')
    def connect_socket():
        print('user connected')

    @socket.on('coordinate')
    def handle_coordinate(data):
        model = HandSignModel()
        seq_results = []
        # 60 프레임을 4 steps 30 프레임씩 검사
        if len(data) == 30:
            seq_results = model.predict(data)
        else:
            for frame_no in range(0, len(data)-30, 4):
                seq_results += model.predict(data[frame_no:frame_no + 30])
        result = get_top_n_frequency(seq_results, 3)
        emit("answer", result)

    @socket.on("disconnect")
    def disconnect_socket():
        # emit("disconnect", "ok")
        disconnect()

    return app
