import { useEffect } from "react";
import KNN from "ml-knn"

function KnnTest() {

    let dataset = [
        [0, 0, 0],
        [0, 1, 1],
        [1, 1, 0],
        [2, 2, 2],
        [1, 2, 2],
        [2, 1, 2]
      ];
    let predictions = [0, 0, 0, 1, 1, 1];
    let knn = new KNN(dataset, predictions);
    
    let test_dataset = [
        [0.9, 0.9, 0.9],
        [1.1, 1.1, 1.1],
        [1.1, 1.1, 1.2],
        [1.2, 1.2, 1.2],
    ]
    
    let ans = knn.predict(test_dataset)
    
    useEffect(() => {
        console.log('knn', knn)
        console.log('ans', ans)
    })
  
  return (
    <div className="App">
      Hi this is test page for knn
    </div>
  );
}

export default KnnTest;
