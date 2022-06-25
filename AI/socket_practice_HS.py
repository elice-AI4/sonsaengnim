from flask import *
from flask_cors import CORS
from flask import Flask, jsonify, send_from_directory
from flask_socketio import SocketIO, send, emit

# flask app create
app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'secret!'
socket = SocketIO(app, cors_allowed_origins='*', engineio_logger=True)


@app.route('/')
def index():
    """
    메인 페이지 렌더링
    :return: template file
    """
    return render_template('index.html')


def retrieve_active_users():
    emit('respond', {"data": "hi, mr.client"})


@socket.on('connect')
def on_connect():
    print('user connected')
    retrieve_active_users()


@socket.on('greet')
def greet():
    print("연결 했습니다!")
    emit("respond", {"data": "hi, mr.client"}, json=True)


@socket.on('test')
def handle_json(payload):
    print('received: ')
    print(payload)
    emit("response", "하이")


@socket.on("disconnect")
def disconnect_socket(payload):
    emit("disconnect", "ok")


if __name__ == "__main__":
    socket.run(app)
