import * as React from 'react';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'country', headerName: 'Country', width: 130 },
  { field: 'city', headerName: 'City', width: 130 },
  { field: 'createdAt', headerName: 'Created At', type: 'datetime', width: 200 },
  {
    field: 'action',
    headerName: 'Action',
    width: 180,
    sortable: false,
    disableClickEventBubbling: true,

    renderCell: (params) => {
      const onEdit = (e) => {
        const currentRow = params.row;
        return alert(`Edit ${  JSON.stringify(currentRow, null, 4)}`);
      };
      const onDelete = (e) => {
        const currentRow = params.row;
        return alert(`Delete ${  JSON.stringify(currentRow, null, 4)}`);
      };

      return (
        <Stack direction="row" spacing={2}>
          <Button variant="outlined" color="warning" size="small" onClick={onEdit}>Edit</Button>
          <Button variant="outlined" color="error" size="small" onClick={onDelete}>Delete</Button>
        </Stack>
      );
    },
  }
];

const rows = [
  { id: 1, name: 'Snow', country: 'Jon' },
  { id: 2, name: 'Lannister', country: 'Cersei' },
  { id: 3, name: 'Lannister', country: 'Jaime' },
  { id: 4, name: 'Stark', country: 'Arya' },
  { id: 5, name: 'Targaryen', country: 'Daenerys' },
  { id: 6, name: 'Melisandre', country: null },
  { id: 7, name: 'Clifford', country: 'Ferrara' },
  { id: 8, name: 'Frances', country: 'Rossini' },
  { id: 9, name: 'Roxie', country: 'Harvey' },
];

export default function AdminPage() {
  const [tableData, setTableData] = useState([])
  const [paginationModel, setPaginationModel] = React.useState({
    pageSize: 10,
    page: 0,
  });
  useEffect(() => {
    fetch(`https://65b4c5bf41db5efd2866e486.mockapi.io/api/v1/users?page=${paginationModel.page + 1}&limit=${paginationModel.pageSize}`)
      .then((data) => data.json())
      .then((data) => setTableData(data))
  }, [paginationModel])
  console.log(tableData)

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        paginationMode='server'
        paginationModel={paginationModel}
        onPaginationModelChange={setPaginationModel}
        rowCount={999}
      />
    </div>
  );
}