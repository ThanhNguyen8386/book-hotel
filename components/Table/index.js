import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

const rows = [
  { id: 1, col1: 'Hello', col2: 'World' },
  { id: 2, col1: 'DataGridPro', col2: 'is Awesome' },
  { id: 3, col1: 'Material-UI', col2: 'is Great' },
];

const handleEdit = (id) => {
  console.log(`Edit row with id: ${id}`);
};

const handleDelete = (id) => {
  console.log(`Delete row with id: ${id}`);
};

const columns = [
  { field: 'col1', headerName: 'Column 1', width: 150 },
  { field: 'col2', headerName: 'Column 2', width: 150 },
  {
    field: 'actions',
    headerName: 'Actions',
    sortable: false,
    width: 150,
    renderCell: (params) => (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleEdit(params.id)}
        >
          Edit
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleDelete(params.id)}
          style={{ marginLeft: '10px' }}
        >
          Delete
        </Button>
      </div>
    ),
  },
];

export default function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid rows={rows} columns={columns} pageSize={5} />
    </div>
  );
}
