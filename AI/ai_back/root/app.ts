import express, { Request, Response, NextFunction } from 'express';
import KNN from 'ml-knn';
import * as fs from 'fs';
import cors from 'cors';

const app = express();
app.use(cors<Request>());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/json", (req: Request, res: Response, next: NextFunction) => {
  const file = fs.readFileSync(__dirname+'/public/dataSet.json', 'utf-8');
  res.json(file);
})

app.post('/welcome', (req: Request, res: Response, next: NextFunction) => {

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
    //여기에 req.body로 받은 데이터 셋 넣기
    let predicted = "none";
    if (req.body?.data_xy) {
      const test_dataset = JSON.parse(req.body["data_xy"]);
      console.log(test_dataset)
      console.log(typeof(test_dataset))
      let result = knn.predict(test_dataset)
      console.log("result: ", result)
      if (parseInt(result) <= 26) {
        predicted = String.fromCharCode((parseInt(result) + 'a'.charCodeAt(0)))
      }
    }
    console.log("predicted: ", predicted);
    res.send(predicted);
});

app.listen('1234', () => {
    console.log(`
  ################################################
  🛡️  Server listening on port: 1234🛡️
  ################################################
`);
});