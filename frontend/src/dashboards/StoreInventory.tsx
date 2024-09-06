import Moment from 'moment'
import React, { useState, useEffect } from 'react'
import { getInventories } from '../api/StoreApi'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
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

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (a: { [key in Key]: any }, b: { [key in Key]: any }) => number {
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
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all items',
            }}
          />
        </TableCell>
        {InventoryHeaders.map((inventoryHeader) => (
          <TableCell
            key={inventoryHeader.id}
            align={inventoryHeader.numeric ? 'right' : 'center'}
            padding={inventoryHeader.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === inventoryHeader.id ? order : false}>
            <TableSortLabel
              active={orderBy === inventoryHeader.id}
              direction={orderBy === inventoryHeader.id ? order : 'asc'}
              onClick={createSortHandler(inventoryHeader.id)}>
              {inventoryHeader.label}
              {orderBy === inventoryHeader.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
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
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [inventory, setInventory] = useState<Array<StoreInventoryData>>([
    {
      bind_id: 0,
      bulk: 0,
      // color_id: number
      color_name: 'string',
      date_created: 'string',
      description: 'string',
      inventory_id: 0,
      is_retain: true,
      is_stock_room: true,
      no: 'string',
      name: 'string',
      type: 'string',
      // category_id: number
      my_cost: 'string',
      my_weight: 'string',
      new_or_used: 'string',
      quantity: 0,
      remarks: 'string',
      sale_rate: 0,
      tier_price1: 'string',
      tier_price2: 'string',
      tier_price3: 'string',
      unit_price: 'string',
    },
  ])

  const totalQuantity = useAppSelector((state) => state.stock.quantity)

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

  useEffect(() => {
    getStoreInventories()
  }, [])

  const getStoreInventories = async () => {
    let inventories = await getInventories()

    console.log(inventories)
    if (inventories.data) {
      setInventory(inventories.data)
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <StoreInventoryToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ maxWidth: '100%' }}
            aria-labelledby="tableTitle"
            size={'small'}>
            <StoreInventoryHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={inventory.length}
            />
            <TableBody>
              {inventory
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .sort(getComparator(order, orderBy))
                .map((row, index) => {
                  const isItemSelected = isSelected(row.inventory_id)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.inventory_id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.inventory_id}
                      selected={isItemSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        scope="row"
                        padding="none"
                        align="center">
                        {row.inventory_id}
                      </TableCell>
                      <TableCell align="right">{row.no}</TableCell>
                      <Tooltip disableFocusListener title={row.name} arrow>
                        <TableCell align="left">
                          {row.name.length <= 30
                            ? row.name
                            : `${row.name.substring(0, 30)}...`}
                        </TableCell>
                      </Tooltip>
                      <TableCell align="right">{row.type}</TableCell>
                      <TableCell align="right">{row.description}</TableCell>
                      <TableCell align="right">{row.my_cost}</TableCell>
                      <TableCell align="right">{row.my_weight}</TableCell>
                      <TableCell align="right">{row.new_or_used}</TableCell>
                      <TableCell align="right">{row.quantity}</TableCell>
                      <TableCell align="right">{row.unit_price}</TableCell>
                      <TableCell align="right">{row.remarks}</TableCell>
                      <TableCell align="left">{row.color_name}</TableCell>
                      <TableCell align="right">{row.is_retain}</TableCell>
                      <TableCell align="right">{row.is_stock_room}</TableCell>
                      <TableCell align="right">{row.sale_rate}</TableCell>
                      <TableCell align="right">
                        {Moment(row.date_created).format('YYYY-MMM-DD')}
                      </TableCell>
                      <TableCell align="right">{row.bulk}</TableCell>
                      <TableCell align="right">{row.bind_id}</TableCell>
                    </TableRow>
                  )
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
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
