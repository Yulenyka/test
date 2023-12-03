import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import { Checkbox, Select, MenuItem } from "@material-ui/core";

const defaultMaterialTheme = createTheme();

function MaterialTableComponent({ data }) {
  const [filter, setFilter] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const [status, setStatus] = useState("all");
  const handleChange = () => {
    setFilter(!filter);
  };
  useEffect(() => {
    setFilteredData(
      status === "all" ? data : data.filter((dt) => dt.status === status)
    );
  }, [status, data]);

  const columns = [
    { title: "Дата", field: "date" },
    { title: "Час", field: "time" },
    { title: "Рейс", field: "id" },
    { title: "Тип рейсу", field: "type", lookup: { 0: 0, 1: 1 } },
    { title: "Пункт відправки", field: "address" },
    { title: "Пункт призначення", field: "address_2" },
    { title: "Назва клієнта", field: "company" },
    { title: "АТП", field: "driver" },
    { title: "Авто", field: "vehicle" },
    { title: "Водій", field: "driver" },
    { title: "Вантаж", field: "cargo", filtering: false },
    { title: "Поточне завдання", field: "action" },
    { title: "Орієнтир прибуття", field: "arrival" },
    { title: "Стан", field: "status" },
    { title: "Сумма(з ПДВ)", field: "price" },
  ];

  return (
    <div style={{ zoom: "70%" }}>
      <ThemeProvider theme={defaultMaterialTheme}>
        <MaterialTable
          title="Управління рейсами"
          columns={columns}
          data={filteredData}
          options={{
            filtering: filter,
            headerStyle: { backgroundColor: "#0183b4", color: "#FFF" },
            rowStyle: { backgroundColor: "#EEE" },
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
                </Select>
              ),
              tooltip: "Стан",
              isFreeAction: true,
            },
          ]}
          localization={{
            body: {
              emptyDataSourceMessage: "Немає записів для відображення",
              filterRow: {
                filterTooltip: "Фільтрація",
              },
            },
            pagination: {
              labelDisplayedRows: "{from}-{to} з {count}",
              labelRowsSelect: "",
              labelRowsPerPage: "Число рядків:",
            },
            toolbar: {
              nRowsSelected: "Вибрано {0} рядків",
              searchTooltip: "Пошук",
              searchPlaceholder: "Пошук",
            },
          }}
        />
      </ThemeProvider>
    </div>
  );
}

export default MaterialTableComponent;
