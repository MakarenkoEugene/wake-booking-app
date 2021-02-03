/* eslint-disable */
import React, { useState } from 'react';
import { Paper, TableSortLabel, TableHead, TableRow, TableBody, TableCell, TableContainer, TablePagination, Table as MatTable, IconButton } from '@material-ui/core';
import { Checkbox } from '@components/ui/checkbox';
import { Input } from '@components/ui/input';
import { Edit } from '@material-ui/icons';
import './table.scss';

export function Table({ data, columns, pagination, onEdit, id, ...props }) {
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState(props.order);
  const [orderBy, setOrderBy] = useState(props.orderBy);
  const [filters, setFilters] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(25);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }

    if (b[orderBy] > a[orderBy]) {
      return 1;
    }

    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });

    return stabilizedThis.map((el) => el[0]);
  }

  const createSortHandler = (property) => (event) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  let sortedData = stableSort(data, getComparator(order, orderBy));
  sortedData = pagination ? sortedData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : sortedData;

  return (
    <Paper className='table-root'>
      <TableContainer className='container'>
        <MatTable stickyHeader size='small'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  sortDirection={orderBy === column.id ? order : false}
                  width={column.width}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? order : 'asc'}
                    onClick={createSortHandler(column.id)}
                    className='header-cell'
                  >
                    {column.label}
                  </TableSortLabel>

                  {/* <Input margin='dense' style={{ width: '100%' }} variant='outlined' value='' onChange={() => {}}/> */}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row) => (
              <TableRow hover role='checkbox' tabIndex={-1} key={row[id]} onClick={() => onEdit(row)}>
                {columns.map((column) => {
                  const value = row[column.id];

                  return (
                    <TableCell key={column.id}>

                      { typeof value === 'boolean'
                        ? <Checkbox checked={value} disabled />
                        : <span className='cell-value' style={{ width: column.width }}>{value}</span>}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </MatTable>
      </TableContainer>

      {pagination
        && (
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        )}
    </Paper>
  );
}
