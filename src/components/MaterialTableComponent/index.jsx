import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import MaterialTable from "material-table";
import { ThemeProvider, createTheme, Tabs, Tab } from "@mui/material";
import { Checkbox } from "@material-ui/core";
import { getRowBackgroundColor } from "./tableUtils";
import { localizationStrings } from "./localization";
import { columns } from "./columns";

const defaultMaterialTheme = createTheme();

function MaterialTableComponent({ data }) {
  const [filter, setFilter] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const [status, setStatus] = useState("all");
  const [tabValue, setTabValue] = useState(0); // Додана стейт-змінна для визначення активної вкладки
  const navigate = useNavigate();
  const handleChange = () => {
    setFilter(!filter);
  };
  useEffect(() => {
    const storedTabValue = localStorage.getItem("selectedTab");
    if (storedTabValue !== null) {
      setTabValue(parseInt(storedTabValue, 10));
      setStatus(getStatusFromTabIndex(parseInt(storedTabValue, 10)));
    }
  }, []);

  // Update localStorage and URL when the tab value changes
  useEffect(() => {
    localStorage.setItem("selectedTab", tabValue);

    // Update URL with the selected tab value
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set("selectedTab", tabValue);

    // Replace the current URL with the updated search parameters
    window.history.replaceState(
      {},
      "",
      `${window.location.pathname}?${searchParams}`
    );
  }, [tabValue]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
    setStatus(getStatusFromTabIndex(newValue));
  };
  const getStatusFromTabIndex = (index) => {
    switch (index) {
      case 0:
        return "all";
      case 1:
        return "в дорозі";
      case 2:
        return "завантаження";
      case 3:
        return "закритий";
      default:
        return "all";
    }
  };

  const [params] = useSearchParams();
  useEffect(() => {
    if (!data) return;
    setFilteredData(
      status === "all" ? data : data.filter((dt) => dt.status === status)
    );
  }, [status, data]);

  const onChangePage = (page, pageSize) => {
    params.set("page", page);
    params.set("pageSize", pageSize);
    navigate({
      search: params.toString(),
    });
  };
  const compareValues = (value, target) => {
    // Додайте додаткові перевірки на типи за необхідністю
    return String(value).toLowerCase().includes(String(target).toLowerCase());
  };

  const handleRowClick = (event, rowData) => {
    console.log("Натискані дані рядка:", rowData);

    // Отримати значення, на якому ви натискаєте
    const clickedValue = event.target.textContent;

    // Визначити колонку, значення якої відповідає натисканому значенню
    let filterColumn = null;

    for (const column in rowData) {
      if (
        Object.prototype.hasOwnProperty.call(rowData, column) &&
        compareValues(rowData[column], clickedValue)
      ) {
        filterColumn = column;
        break; // Зупинитися, якщо знайдено відповідну колонку
      }
    }

    if (filterColumn) {
      console.log(`Стовпець для фільтрації: ${filterColumn}`);
      console.log(`Значення для фільтрації: ${clickedValue}`);

      // Фільтрувати дані за значенням у відповідному стовпці
      setFilteredData(
        data.filter((dt) => compareValues(dt[filterColumn], clickedValue))
      );
    } else {
      console.log("Стовпець для фільтрації не знайдено");
    }

    // Залиште іншу логіку або модифікуйте її відповідно до своїх вимог
  };
  return (
    filteredData.length > 0 && (
      <div style={{}}>
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
                backgroundColor: getRowBackgroundColor(rowData.status),
              }),
              selection: true,
              initialPage: params.get("page") ? +params.get("page") : 0,
              pageSize: params.get("pageSize") ? +params.get("pageSize") : 25,
              pageSizeOptions: [25, 50, 100],
              paginationType: "stepped",
            }}
            onChangePage={onChangePage}
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
                  <Tabs
                    value={tabValue}
                    onChange={handleTabChange}
                    indicatorColor="primary"
                    textColor="primary"
                  >
                    <Tab label="Стан" component="div" />
                    <Tab label="в дорозі" component="div" />
                    <Tab label="завантаження" component="div" />
                    <Tab label="закритий" component="div" />
                  </Tabs>
                ),
                tooltip: "Оберіть стан",
                isFreeAction: true,
                onClick: () => {},
              },
            ]}
            onRowClick={handleRowClick}
          />
        </ThemeProvider>
      </div>
    )
  );
}

export default MaterialTableComponent;
