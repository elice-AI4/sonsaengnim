import React from 'react'
import ReactDOM from 'react-dom'
import { Hands } from '@mediapipe/hands'
import * as HandsMP from '@mediapipe/hands'
import * as cam from '@mediapipe/camera_utils'
import Webcam from 'react-webcam'
import { useRef, useEffect } from 'react'
import translator from '../utils/translator';

function Webcamdisplay() {
  const webcamRef = useRef<any>(null)
  const canvasRef = useRef<any>(null)

  let camera = null

  const connect = window.drawConnectors
  const landmark = window.drawLandmarks

  function onResults(results: any) {
    canvasRef.current.width = webcamRef.current.video.videoWidth
    canvasRef.current.height = webcamRef.current.video.videoHeight

    const canvasElement = canvasRef.current
    const canvasCtx = canvasElement.getContext('2d')

    canvasCtx.save()
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height)
    canvasCtx.drawImage(
      results.image,
      0,
      0,
      canvasElement.width,
      canvasElement.height,
    )
    if (results.multiHandLandmarks) {
      /** landmark를 통해 알파벳 예측하는 함수 사용 부분
      * const predicted = translator(results.multiHandLandmarks)
      */
      // console.log("multi hand landmark: ", results.multiHandLandmarks);
      for (const landmarks of results.multiHandLandmarks) {
        connect(canvasCtx, landmarks, HandsMP.HAND_CONNECTIONS, {
          color: '#00FF00',
          lineWidth: 5,
        })
        landmark(canvasCtx, landmarks, { color: '#FF0000', lineWidth: 2 })
      }
      const predicted = translator(results.multiHandLandmarks)
      // console.log("predicted: ", predicted);
    }
    canvasCtx.restore()
  }

  useEffect(() => {
    const hands = new Hands({
      locateFile: file => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
      },
    })

    hands.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    })

    hands.onResults(onResults)

    if (
      typeof webcamRef.current !== 'undefined' &&
      webcamRef.current !== null
    ) {
      camera = new cam.Camera(webcamRef.current.video, {
        onFrame: async () => {
          await hands.send({ image: webcamRef.current.video })
        },
        width: 640,
        height: 480,
      })
      camera.start()
    }
  })
  return (
    // <Router>
    //   <Routes>
        <div className="App">
          <Webcam
            ref={webcamRef}
            style={{
              position: 'absolute',
              marginRight: 'auto',
              marginLeft: 'auto',
              left: 0,
              right: 0,
              textAlign: 'center',
              zIndex: 9,
              width: 640,
            }}
          />

          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              marginRight: 'auto',
              marginLeft: 'auto',
              left: 0,
              right: 0,
              textAlign: 'center',
              zIndex: 9,
              width: 640,
            }}
          ></canvas>
        </div>
    //   </Routes>
    // </Router>
  )
}

export default Webcamdisplay
