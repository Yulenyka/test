import React, { useState, useEffect } from "react";
import MaterialTableComponent from "./components/MaterialTableComponent";
import data from "./data/data.json";

function App() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(data);
  }, []);

  return (
    <div className="App">
      <MaterialTableComponent data={tableData} />
    </div>
  );
}

export default App;
