import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import data from "./data/data.json";

function App() {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(data);
  }, []);

  const columns = [
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    { title: "Phone Number", field: "phone" },
    { title: "Age", field: "age", type: "numeric" },
    { title: "Gender", field: "gender" },
    { title: "City", field: "city" },
  ];

  return (
    <div className="App">
      <h1>MaterialTable</h1>
      <MaterialTable
        columns={columns}
        data={tableData}
        title="Student information"
        options={{
          filtering: true,
        }}
      />
    </div>
  );
}

export default App;
