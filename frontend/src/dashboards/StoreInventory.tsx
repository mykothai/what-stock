import React, { useState, useEffect } from 'react'
import { getInventory } from '../api/StoreApi'
import { alpha, styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DeleteIcon from '@mui/icons-material/Delete'
import FilterListIcon from '@mui/icons-material/FilterList'
import { visuallyHidden } from '@mui/utils'
import { StoreInventoryData, InventoryHeaders } from '../constants'
import { useAppSelector } from '../app/hooks'
import { theme } from '../theme'

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

type Order = 'asc' | 'desc'

// FIXME: sorting is not working for string values
function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: any, b: any) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

interface StoreInventoryProps {
  numSelected: number
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof StoreInventoryData,
  ) => void
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void
  order: Order
  orderBy: string
  rowCount: number
}

function StoreInventoryHead(props: StoreInventoryProps) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props
  const createSortHandler =
    (property: keyof StoreInventoryData) =>
    (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead>
      <StyledTableRow>
        <StyledTableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all items',
            }}
          />
        </StyledTableCell>
        {InventoryHeaders.map((inventoryHeader) => (
          <StyledTableCell
            key={inventoryHeader.id}
            align={inventoryHeader.numeric ? 'right' : 'center'}
            padding={inventoryHeader.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === inventoryHeader.id ? order : false}>
            <StyledTableSortLabel
              active={orderBy === inventoryHeader.id}
              direction={orderBy === inventoryHeader.id ? order : 'asc'}
              onClick={createSortHandler(inventoryHeader.id)}>
              {inventoryHeader.label}
              {orderBy === inventoryHeader.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </StyledTableSortLabel>
          </StyledTableCell>
        ))}
      </StyledTableRow>
    </TableHead>
  )
}

interface StoreInventoryToolbarProps {
  numSelected: number
}

const StoreInventoryToolbar = (props: StoreInventoryToolbarProps) => {
  const { numSelected } = props

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        // backgroundColor: theme.palette.primary.main,
        font: 'white',
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity,
            ),
        }),
      }}>
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div">
          Inventory
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

export default function StoreInventory() {
  const [order, setOrder] = React.useState<Order>('asc')
  const [orderBy, setOrderBy] =
    React.useState<keyof StoreInventoryData>('inventory_id')
  const [selected, setSelected] = React.useState<readonly number[]>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(25)
  const [inventory, setInventory] = useState<StoreInventoryData[]>([])

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof StoreInventoryData,
  ) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const selectedItem = inventory.map((n) => n.inventory_id)
      setSelected(selectedItem)
      return
    }
    setSelected([])
  }

  const handleClick = (
    event: React.MouseEvent<unknown>,
    itemNumber: number,
  ) => {
    const selectedIndex = selected.indexOf(itemNumber)
    let newSelected: readonly number[] = []

    if (!selected.length) return

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, itemNumber)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      )
    }

    setSelected(newSelected)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const isSelected = (itemNumber: number) => selected.indexOf(itemNumber) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - inventory.length) : 0

  const getStoreInventories = async () => {
    try {
      const inventory = await getInventory().then((res) => res.data)
      setInventory(inventory)
    } catch (error) {
      console.log('Failed to retrieve inventory.', error)
    }
  }

  useEffect(() => {
    getStoreInventories()
  }, [])

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <StoreInventoryToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ maxWidth: '100%' }}
            aria-labelledby="tableTitle"
            size={'small'}
            align="center">
            <StoreInventoryHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={inventory.length}
            />
            <TableBody>
              {inventory.length
                ? inventory
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .sort(getComparator(order, orderBy))
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.inventory_id)
                      const labelId = `enhanced-table-checkbox-${index}`

                      return (
                        <StyledTableRow
                          hover
                          onClick={(event) =>
                            handleClick(event, row.inventory_id)
                          }
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.inventory_id}
                          selected={isItemSelected}>
                          <StyledTableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': labelId,
                              }}
                            />
                          </StyledTableCell>
                          <StyledTableCell
                            component="th"
                            scope="row"
                            padding="none"
                            align="right">
                            {row.inventory_id}
                          </StyledTableCell>
                          <StyledTableCell align="right">
                            {row.item.no}
                          </StyledTableCell>
                          <Tooltip
                            disableFocusListener
                            title={row.item.name}
                            arrow>
                            <StyledTableCell
                              align="left"
                              style={{ width: '1px', whiteSpace: 'nowrap' }}>
                              {row.item.name.length <= 30
                                ? row.item.name
                                : `${row.item.name.substring(0, 30)}...`}
                            </StyledTableCell>
                          </Tooltip>
                          <StyledTableCell align="center">
                            {row.item.type}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.quantity}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.unit_price}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.my_cost}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.my_weight}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.new_or_used}
                          </StyledTableCell>
                          <Tooltip
                            disableFocusListener
                            title={row.item.name}
                            arrow>
                            <StyledTableCell
                              align="left"
                              style={{ width: '1px', whiteSpace: 'nowrap' }}>
                              {row.description.length <= 40
                                ? row.description
                                : `${row.description.substring(0, 40)}...`}
                            </StyledTableCell>
                          </Tooltip>
                          <StyledTableCell align="left">
                            {row.color_name}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            {row.is_stock_room ? row.is_stock_room : 'N'}
                          </StyledTableCell>
                        </StyledTableRow>
                      )
                    })
                : []}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}>
                  <StyledTableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[25, 50, 100]}
          component="div"
          count={inventory.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  )
}

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(() => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.primary.light,
  },
  '&:nth-of-type(even)': {
    backgroundColor: theme.palette.secondary.light,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
  '&:hover': {
    backgroundColor: '#ddc2ee !important',
  },
}))

const StyledTableSortLabel = styled(TableSortLabel)(() => ({
  color: theme.palette.primary.contrastText,
}))
