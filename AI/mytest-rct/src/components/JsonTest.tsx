import { useState, useEffect } from "react";
import axios from "axios";

function JsonTest() {
  const [data, setData] = useState(["안녕"]);

  useEffect(() => {
    axios.get("http://localhost:1234/json")
        .then((res) => {
          const jsonData = res.data;
          const parsedData = JSON.parse(jsonData);
          const dataset : Array<any> = parsedData.reduce((acc:Array<any>, cur:Object) => {
            const valueArr = Object.values(cur).map((val) => Number(val));
            acc.push(valueArr);
            return acc;
          }, [])
          console.log(dataset);
          setData(dataset);
        });
  }, [])
  return (
    <div className="App">
      Hi this is test page for json transportation
      <p>
          {data}
      </p>
    </div>
  );
}

export default JsonTest;
