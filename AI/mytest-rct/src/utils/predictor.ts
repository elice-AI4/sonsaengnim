import KNN from 'ml-knn';


function predictor(dataset :Array<any>, angles: Array<any>) : string {
  let angleFile :Array<any> = [];
  let labelFile :Array<any> = [];
  dataset.forEach((cur:Array<Number>) => {
    angleFile.push(cur.slice(0, -1));
    labelFile.push(cur.slice(-1))
  })

  let knn = new KNN(angleFile, labelFile)
  let result = knn.predict(angles)
  let predicted = "none";
  if (parseInt(result) <= 26) {
    predicted = String.fromCharCode((parseInt(result) + 'a'.charCodeAt(0)))
  }
  return predicted;
}

export default predictor;