function translator(landmarks :any) {
  for (const landmark of landmarks) {
    // 관절 좌표 얻는 부분
    // AI/flask_practice/main.py line: 63 - 65
    const joint :Array<any> = landmark.reduce((acc:any, cur:any) => {
      acc.push(cur)
      return acc
    },[])

    // 관절별 벡터 구하는 부분
    // AI/flask_practice/main.py line: 67 - 68
    let v1 : Array<any> = [];
    let v2 : Array<any> = [];
    joint.forEach((cur :Array<number>, idx :number) => {
      if (idx === 0) {
        v1.push(cur)
      }
      else if ((idx % 4 === 0) || (idx === 20)) {
        v1.push(joint[0])
        v2.push(cur)
      }
      else {
        v1.push(cur)
        v2.push(cur)
      }
            
    })

    // AI/flask_practice/main.py line: 70
    let v : Array<any> = [];
    for(let i=0; i < 21; i++) {
      let [x, y, z] = v2[i]
      let [a, b, c] = v1[i]
      v.push([x-a, y-b, z-c])
    }

    // np.linalg.norm => 제곱합으로 정규화
    // AI/flask_practice/main.py line: 71
    v = v.reduce((acc, cur) => {
      let [x, y, z] = cur;
      let squareSum = x**2 + y**2 + z**2;
      acc.push([x/squareSum, y/squareSum, z/squareSum])
      return acc;
    }, [])

    // np.einsum('nt, nt -> n', a, b) => 행렬 a, b의 행렬곱의 행별 합 구하기
    // [[1, 2], [3, 4]] , [[10, 11], [12, 13]] => [[10, 22], [36, 52]] => [32, 88]
    // AI/flask_practice/main.py line: 72 - 74
    let compareV1 = v.slice(0, 18); 
    let compareV2 = v.slice(1, 19);
    compareV1.splice(3, 1);
    compareV1.splice(10, 1);
    compareV1.splice(13, 1);
    compareV2.splice(3, 1);
    compareV2.splice(6, 1);
    compareV2.splice(9, 1);
    compareV2.splice(12, 1);
    let einsum = [];
    for (let i=0; i < compareV1.length; i++) {
      let [v1x, v1y, v1z] = compareV1[i];
      let [v2x, v2y, v2z] = compareV2[i];
      einsum.push(v1x * v2x + v1y * v2y + v1z * v2z)
    }
    
    // arccos으로 벡터별 각도(radian) 구한 후 degree로 변경
    // AI/flask_practice/main.py line: 74 - 76
    let angle = einsum.reduce((acc:Array<number>, cur:number) => {
      let arccos = Math.acos(cur)
      acc.push(arccos * 180 / Math.PI)
      return acc
    }, [])
    
    let data = [angle];
    
    // knn에 각도 넣어서 확인
    // gesture에서 해당 인덱스 값 찾아 결과 내기
  }
}

export default translator