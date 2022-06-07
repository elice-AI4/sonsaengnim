from flask import *
from flask_cors import CORS
import cv2
import mediapipe as mp
import numpy as np
import keyboard
import time


# setting_mediapipe
max_num_hands = 1

gesture = {i: chr(i + ord('a')) for i in range(26)}
gesture[26] = "spacing"
gesture[27] = "clear"

mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
hands = mp_hands.Hands(
    max_num_hands=max_num_hands,
    min_detection_confidence=0.5,
    min_tracking_confidence=0.5
)

# setting_model
file = np.genfromtxt('dataSet.txt', delimiter=',')
angleFile = file[:, :-1]
labelFile = file[:, -1]
angle = angleFile.astype(np.float32)
label = labelFile.astype(np.float32)
knn = cv2.ml.KNearest_create()
knn.train(angle, cv2.ml.ROW_SAMPLE, label)

# flask app create
app = Flask(__name__)
CORS(app)


def generate_frames(cap):
    """
    출처: Krish Naik, https://github.com/krishnaik06/Flask-Web-Framework/blob/main/Tutorial%207/app.py
    영상 출처: https://www.youtube.com/watch?v=vF9QRJwJXJk

    웹캠 프레임별 gesture detection 후 해당 프레임에 일치하는 글자 써서 response(generator)
    return 대신 yield를 사용하여 연속적인 return 구현
    :return: byte데이터 (img => buffer => byte)
    """
    global angle
    f = open('test.txt', 'w')
    start_time = time.time()
    prev_index = 0
    sentence = ''
    recognize_delay = 1
    while True:
        ret, img = cap.read()
        if not ret:
            continue
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        result = hands.process(img_rgb)

        if result.multi_hand_landmarks is not None:
            for res in result.multi_hand_landmarks:
                joint = np.zeros((21, 3))
                for j, lm in enumerate(res.landmark):
                    joint[j] = [lm.x, lm.y, lm.z]

                v1 = joint[[0, 1, 2, 3, 0, 5, 6, 7, 0, 9, 10, 11, 0, 13, 14, 15, 0, 17, 18, 19], :]
                v2 = joint[[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], :]

                v = v2 - v1
                v = v / np.linalg.norm(v, axis=1)[:, np.newaxis]
                compare_v1 = v[[0, 1, 2, 4, 5, 6, 7, 8, 9, 10, 12, 13, 14, 16, 17], :]
                compare_v2 = v[[1, 2, 3, 5, 6, 7, 9, 10, 11, 13, 14, 15, 17, 18, 19], :]
                angle = np.arccos(np.einsum('nt, nt->n', compare_v1, compare_v2))

                angle = np.degrees(angle)
                if keyboard.is_pressed('a'):
                    for num in angle:
                        num = round(num, 6)
                        f.write(str(num))
                        f.write(',')
                    f.write('27.000000')
                    f.write('\n')
                    print("next")
                data = np.array([angle], dtype=np.float32)
                ret, results, neighbors, dist = knn.findNearest(data, 3)
                cur_index = int(results[0][0])
                if cur_index in gesture.keys():
                    if cur_index != prev_index:
                        start_time = time.time()
                        prev_index = index
                    else:
                        if time.time() - start_time > recognize_delay:
                            if cur_index == 26:
                                sentence += ' '
                            elif cur_index == 27:
                                # sentence = ''
                                continue
                            else:
                                sentence += gesture[cur_index]
                            start_time = time.time()
                    cv2.putText(img, gesture[cur_index].upper(), (int(res.landmark[0].x * img.shape[1] - 10),\
                                                              int(res.landmark[0].y * img.shape[0] + 40)),
                                cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 255), 3)
                mp_drawing.draw_landmarks(img, res, mp_hands.HAND_CONNECTIONS)
        cv2.putText(img, sentence, (20, 440), cv2.FONT_HERSHEY_SIMPLEX, 2, (255, 255, 255), 3)
        ret, buffer = cv2.imencode('.jpg', img)
        frame = buffer.tobytes()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')
        # cv2로 테스트할 경우
        # cv2.imshow('HandTracking', img)
        # cv2.waitKey(1)
        # if keyboard.is_pressed('b'):
        #     break
    f.close()


@app.route('/')
def index():
    """
    메인 페이지 렌더링
    :return: template file
    """
    return render_template('index.html')
    # return "api테스트"


@app.route('/video', methods=['GET'])
def video():
    """
    generate_frames() : 프레임을 연속적으로 반환(제너레이터)
    multipart/x_mixed_replace; boundary=frame => 하나의 메시지는 다음 메시지로 대치된다
    출처: qaos, 서버푸시, https://qaos.com/sections.php?op=viewarticle&artid=272
    :return: response
    """
    cap = cv2.VideoCapture(0)
    return Response(generate_frames(cap), mimetype='multipart/x-mixed-replace; boundary=frame')


if __name__ == "__main__":
    app.run()
