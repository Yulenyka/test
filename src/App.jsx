import React, { useState, useEffect } from "react";
import MaterialTableComponent from "./components/MaterialTableComponent";
import data from "./data/data.json";

function App() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(data);
  }, []);

  const handleRowDelete = (oldData) =>
    new Promise((resolve) => {
      const newData = [...tableData];
      const index = newData.findIndex(
        (row) => row.tableData.id === oldData.tableData.id,
      );
      newData.splice(index, 1);
      setTableData(newData);
      resolve();
    });

  return (
    <div className="App">
      <MaterialTableComponent data={tableData} onRowDelete={handleRowDelete} />
    </div>
  );
}

export default App;
