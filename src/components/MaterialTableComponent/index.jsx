import React from "react";
import MaterialTable from "material-table";

function MaterialTableComponent({ data, onRowDelete }) {
    const columns = [
      { title: "Name", field: "name" },
      { title: "Email", field: "email" },
      {
        title: "Phone Number",
        field: "phone",
        filtering: false,
      },
      { title: "Age", field: "age", type: "numeric" },
      { title: "Gender", field: "gender", lookup: { m: "Male", f: "Female" } },
      { title: "City", field: "city" },
    ];
  
    return (
      <MaterialTable
        columns={columns}
        data={data}
        title="Student information"
        editable={{
          onRowDelete: onRowDelete,
        }}
        options={{
          filtering: true,
          headerStyle: { backgroundColor: "#01579b", color: "#FFF" },
        }}
      />
    );
  }
  
  export default MaterialTableComponent;
  