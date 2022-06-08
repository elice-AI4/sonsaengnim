import express, { Request, Response, NextFunction } from 'express';
import KNN from 'ml-knn';
import * as fs from 'fs';

const app = express();

app.get('/welcome', (req: Request, res: Response, next: NextFunction) => {
    res.send('welcome!');

    const datasetFile = fs.readFileSync(__dirname+'/public/dataSet.txt', 'utf-8').toString().split("\n")
    let angleFile = []
    let labelFile = []
    for(let i in datasetFile) {
      let line = datasetFile[i].split(",")
      angleFile.push(line.slice(0, -1));
      labelFile.push(line.slice(-1))
    }
    angleFile.map((x) => Number(x))
    labelFile.map((x) => Number(x))
    let knn = new KNN(angleFile, labelFile)
    console.log('isknn?', knn)
    //여기에 req.body로 받은 데이터 셋 넣기
    // let result = knn.predict(test_dataset)

    //res.send()
});

app.listen('1234', () => {
    console.log(`
  ################################################
  🛡️  Server listening on port: 1234🛡️
  ################################################
`);
});