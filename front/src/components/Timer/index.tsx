import React, { useState, useRef, useEffect } from "react";

function Timer() {
  const [min, setMin] = useState(10);
  const [sec, setSec] = useState(0);
  const time = useRef(600);
  const timerId: { current: any } = useRef(null);

  useEffect(() => {
    timerId.current = setInterval(() => {
      setMin(Math.floor(time.current / 60));
      setSec(time.current % 60);
      time.current -= 1;
    }, 1000);

    return () => clearInterval(timerId.current);
  }, []);
  useEffect(() => {
    // 만약 타임 아웃이 발생했을 경우
    if (time.current <= 0) {
      console.log("타임 아웃");
      clearInterval(timerId.current);
      // dispatch event
    }
  }, [sec]);
  return (
    <>
      {time.current <= 0 ? (
        <h4>시간이 초과되었습니다.</h4>
      ) : (
        <div className="timer">
          {min} : {sec}
        </div>
      )}
    </>
  );
}

export default Timer;
