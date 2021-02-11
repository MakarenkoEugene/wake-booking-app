/* eslint-disable */
import React, { useState } from 'react';
import { Paper, TableSortLabel, TableHead, TableRow, TableBody, TableCell, TableContainer, TablePagination, Table as MatTable, IconButton } from '@material-ui/core';
import { Checkbox } from '@components/ui/checkbox';
import { Input } from '@components/ui/input';
import './table.scss';

export function Table({ data, columns, pagination, onRowClick, id, ...props }) {
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

  const ascComparator = (a, b, id) => {
    if (typeof a[id] === 'string') {
      return a[id].toLowerCase() > b[id].toLowerCase() ? 1 : -1;
    }

    return a[id] > b[id] ? 1 : -1
  };

  const getComparator = (order, orderBy) => order === 'asc'
    ? (a, b) => ascComparator(a, b, orderBy)
    : (a, b) => -ascComparator(a, b, orderBy);

  const createSortHandler = (property) => (event) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const onRowClicked = row => onRowClick && onRowClick(row);

  const onFilter = (id) => (value) => setFilters(s => ({ ...s, [id]: value }));

  const filter = data => data.filter(row =>
    Object.entries(filters).every(([id, val]) => row[id].toString().toLowerCase().includes(val.toLowerCase()))
  );

  const filteredData = filter(data);
  let sortedData = filteredData.sort(getComparator(order, orderBy));
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
                    {column.filter
                      ? <Input
                          margin='dense'
                          variant='outlined'
                          placeholder={column.label}
                          value={filters[column.id] || ''}
                          onClick={(e) => e.stopPropagation()}
                          onChange={onFilter(column.id)}
                      />
                      : column.label
                    }
                  </TableSortLabel>

                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedData.map((row) => (
              <TableRow hover role='checkbox' tabIndex={-1} key={row[id]} onClick={() => onRowClicked(row)}>
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
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      )}
    </Paper>
  );
}
