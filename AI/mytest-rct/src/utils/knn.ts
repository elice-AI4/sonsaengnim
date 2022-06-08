import KNN from "ml-knn"

let dataset = [
    [0, 0, 0],
    [0, 1, 1],
    [1, 1, 0],
    [2, 2, 2],
    [1, 2, 2],
    [2, 1, 2]
  ];
let predictions = [0, 0, 0, 1, 1, 1];

// knn = cv2.ml.KNearest_create()
// knn.train(angle, cv2.ml.ROW_SAMPLE, label)
let knn = new KNN(dataset, predictions);

let test_dataset = [
    [0.9, 0.9, 0.9],
  [1.1, 1.1, 1.1],
  [1.1, 1.1, 1.2],
  [1.2, 1.2, 1.2],
]

// knn.findNearest(data, 3)
let ans = knn.predict(test_dataset)

  
export default knn;
  