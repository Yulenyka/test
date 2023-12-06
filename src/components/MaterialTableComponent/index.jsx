import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import MaterialTable from 'material-table';
import { ThemeProvider, createTheme } from '@mui/material';
import { Checkbox, Select, MenuItem } from '@material-ui/core';
import { getRowBackgroundColor } from './tableUtils';
import { localizationStrings } from './localization';
import { columns } from './columns';

const defaultMaterialTheme = createTheme();

function MaterialTableComponent({ data }) {
  const [filter, setFilter] = useState(false);
  const [filteredData, setFilteredData] = useState(data);
  const [status, setStatus] = useState('all');
  const navigate = useNavigate();
  const handleChange = () => {
    setFilter(!filter);
  };
  const [params] = useSearchParams();
  useEffect(() => {
    if (!data) return;
    setFilteredData(
      status === 'all' ? data : data.filter((dt) => dt.status === status)
    );
  }, [status, data]);

  const onChangePage = (page, pageSize) => {
    params.set('page', page);
    params.set('pageSize', pageSize);
    navigate({
      search: params.toString(),
    });
  };
  return (
    filteredData.length > 0 && (
      <div style={{ zoom: '70%' }}>
        <ThemeProvider theme={defaultMaterialTheme}>
          <MaterialTable
            title="Управління рейсами"
            columns={columns}
            data={filteredData}
            localization={localizationStrings}
            options={{
              filtering: filter,
              headerStyle: { backgroundColor: '#0183b4', color: '#FFF' },
              rowStyle: (rowData) => ({
                backgroundColor: getRowBackgroundColor(rowData.status),
              }),
              selection: true,
              initialPage: params.get('page') ? +params.get('page') : 0,
              pageSize: params.get('pageSize') ? +params.get('pageSize') : 25,
              pageSizeOptions: [5, 50, 100],
              paginationType: 'stepped',
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
                      inputProps={{ 'aria-label': 'uncontrolled-checkbox' }}
                    />
                  </div>
                ),
                tooltip: 'Hide/Show Filter option',
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
                    <MenuItem value={'all'}>
                      <em>Стан</em>
                    </MenuItem>
                    <MenuItem value={'в дорозі'}>в дорозі</MenuItem>
                    <MenuItem value={'завантаження'}>завантаження</MenuItem>
                    <MenuItem value={'закритий'}>закритий</MenuItem>
                  </Select>
                ),
                tooltip: 'Стан',
                isFreeAction: true,
                onClick: () => {},
              },
            ]}
          />
        </ThemeProvider>
      </div>
    )
  );
}

export default MaterialTableComponent;
