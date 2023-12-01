import React from "react";
import MaterialTable from "material-table";

function MaterialTableComponent({ data }) {
  const columns = [
    { title: "Name", field: "name" },
    { title: "Email", field: "email" },
    {
      title: "Phone Number",
      field: "phone",
      filtering: false,
    },
    { title: "Age", field: "age", type: "numeric" },
    { title: "Gender", field: "gender" },
    { title: "City", field: "city" },
  ];

  return (
    <MaterialTable
      columns={columns}
      data={data}
      title="Student information"
      options={{
        filtering: true,
      }}
    />
  );
}

export default MaterialTableComponent;
