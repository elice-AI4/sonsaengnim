import { useState, useEffect } from "react";
import axios from "axios";

function JsonTest() {
  const [data, setData] = useState("안녕");

  useEffect(() => {
    axios.get("http://localhost:1234/json")
        .then((res) => {
          const jsonData = res.data;
          console.log(jsonData);
          setData(jsonData);
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
