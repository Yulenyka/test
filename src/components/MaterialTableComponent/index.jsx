import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import { Checkbox, Select, MenuItem } from "@material-ui/core";
import { getRowBackgroundColor } from "./tableUtils";
import { localizationStrings } from "./localization";

const defaultMaterialTheme = createTheme();

function MaterialTableComponent({ data }) {
  const [filter, setFilter] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const [status, setStatus] = useState("all");
  const handleChange = () => {
    setFilter(!filter);
  };
  useEffect(() => {
    if (!data) return;
    setFilteredData(
      status === "all" ? data : data.filter((dt) => dt.status === status)
    );
  }, [status, data]);

  const columns = [
    //{ title: "Ред.", field: "filter", filtering: false },
    { title: "Дата", field: "date" },
    { title: "Час", field: "time" },
    { title: "Рейс", field: "id" },
    { title: "Тип рейсу", field: "type", lookup: { 0: 0, 1: 1 } },
    { title: "Пункт відправки", field: "address" },
    { title: "Пункт призначення", field: "address_2" },
    { title: "Назва клієнта", field: "company" },
    { title: "АТП", field: "atp" },
    { title: "Авто", field: "vehicle" },
    { title: "Водій", field: "driver" },
    { title: "Вантаж", field: "cargo", filtering: false },
    { title: "Поточне завдання", field: "action" },
    { title: "Орієнтир прибуття", field: "arrival" },
    { title: "Стан", field: "status", filtering: false },
    { title: "Сумма(з ПДВ)", field: "price" },
  ];

  return (
    <div style={{ zoom: "70%" }}>
      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
          title="Управління рейсами"
          columns={columns}
          data={filteredData}
          localization={localizationStrings}
          options={{
            filtering: filter,
            headerStyle: { backgroundColor: "#0183b4", color: "#FFF" },
            rowStyle: (rowData) => ({
              backgroundColor: getRowBackgroundColor(rowData),
            }),
            selection: true,
            pageSize: 25,
            pageSizeOptions: [25, 50, 100],
          }}
          actions={[
            {
              icon: () => (
                <div>
                  <label htmlFor="filterCheckbox" style={{ fontSize: 18 }}>
                    Фільтр
                  </label>
                  <Checkbox
                    id="filterCheckbox"
                    checked={filter}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "uncontrolled-checkbox" }}
                  />
                </div>
              ),
              tooltip: "Hide/Show Filter option",
              isFreeAction: true,
              onClick: () => {},
            },
            {
              icon: () => (
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  style={{ width: 150 }}
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <MenuItem value={"all"}>
                    <em>Стан</em>
                  </MenuItem>
                  <MenuItem value={"в дорозі"}>в дорозі</MenuItem>
                  <MenuItem value={"завантаження"}>завантаження</MenuItem>
                  <MenuItem value={"закритий"}>закритий</MenuItem>
                </Select>
              ),
              tooltip: "Стан",
              isFreeAction: true,
              onClick: () => {},
            },
          ]}
        />
      </ThemeProvider>
    </div>
  );
}

export default MaterialTableComponent;
