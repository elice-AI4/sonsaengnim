import axios from "axios";

async function loadData() :Promise<any> {
    const res = await axios.get("http://localhost:1234/json")
    const jsonData = res.data;
    const parsedData = JSON.parse(jsonData);
    const dataset : Array<any> = parsedData.reduce((acc:Array<any>, cur:Object) => {
      const valueArr = Object.values(cur).map((val) => Number(val));
      acc.push(valueArr);
      return acc;
    }, [])
    return dataset;
  }

export default loadData;
