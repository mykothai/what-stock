import React, { useState, useEffect, useMemo, useCallback } from 'react'
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
import { getInventory } from '@api/StoreApi'
import he from 'he'
import { Order, getComparator } from '@helper/sort'
import { InventoryHeaders, StoreInventoryFields } from '@constants'

interface StoreInventoryProps {
  numSelected: number
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof StoreInventoryFields,
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
    (property: keyof StoreInventoryFields) =>
    (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property)
    }

  return (
    <TableHead>
      <TableRow className="bg-primary-main text-white">
        <TableCell className="px-4 py-2">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {InventoryHeaders.map((inventoryHeader) => (
          <TableCell
            key={inventoryHeader.id}
            className="px-4 py-2 text-center font-bold text-primary-contrast bg-primary-main">
            <TableSortLabel
              active={orderBy === inventoryHeader.id}
              direction={orderBy === inventoryHeader.id ? order : 'asc'}
              onClick={createSortHandler(inventoryHeader.id)}
              className="text-white hover:text-gray-300">
              {inventoryHeader.label}
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
    <Toolbar className="flex justify-between bg-gray-100 px-4 py-2">
      {numSelected > 0 ? (
        <Typography className="text-lg font-semibold">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className="text-xl font-bold">Inventory</Typography>
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
    React.useState<keyof StoreInventoryFields>('inventory_id')
  const [selected, setSelected] = React.useState<readonly number[]>([])
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(25)
  const [inventory, setInventory] = useState<StoreInventoryFields[]>([])

  const handleSortRequest = useCallback(
    (
      _event: React.MouseEvent<unknown>,
      property: keyof StoreInventoryFields,
    ) => {
      const isAsc = orderBy === property && order === 'asc'

      setOrder(isAsc ? 'desc' : 'asc')
      setOrderBy(property)
    },
    [order, orderBy],
  )

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const sortedInventory = useMemo(() => {
    if (!orderBy) return inventory

    return [...inventory].sort(getComparator(order, orderBy))
  }, [inventory, order, orderBy])

  const paginatedData = useMemo(() => {
    const start = page * rowsPerPage
    return sortedInventory.slice(start, start + rowsPerPage)
  }, [sortedInventory, page, rowsPerPage])

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
    setSelected((prevSelected) => {
      const selectedIndex = prevSelected.indexOf(itemNumber)
      let newSelected: number[] = []

      if (selectedIndex === -1) {
        // If item is not selected, add it to the list of selected items
        newSelected = [...prevSelected, itemNumber]
      } else {
        // If item is selected, remove it
        newSelected = prevSelected.filter((id) => id !== itemNumber)
      }

      return newSelected
    })
  }

  const isSelected = (itemNumber: number) => selected.indexOf(itemNumber) !== -1

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - inventory.length) : 0

  const getStoreInventories = async () => {
    try {
      const inventory = (await getInventory().then((res) => res.data)) || []
      setInventory(inventory)
    } catch (error) {
      console.error('Failed fetching  inventory.', error)
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
          <Table aria-labelledby="tableTitle" size={'small'} align="center">
            <StoreInventoryHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleSortRequest}
              rowCount={inventory.length}
            />
            <TableBody>
              {paginatedData.length
                ? paginatedData.map((row, index) => {
                    const isItemSelected = isSelected(row.inventory_id)
                    return (
                      <TableRow
                        key={row.inventory_id}
                        role="checkbox"
                        selected={isItemSelected}
                        className={`cursor-pointer ${
                          isItemSelected ? 'bg-purple-300' : 'hover:bg-gray-100'
                        }`}>
                        <TableCell
                          className="px-4 py-2"
                          onClick={(event) =>
                            handleClick(event, row.inventory_id)
                          }>
                          <Checkbox color="primary" checked={isItemSelected} />
                        </TableCell>
                        <TableCell className="px-4 py-2 text-right">
                          {row.inventory_id}
                        </TableCell>
                        <TableCell className="px-4 py-2 text-center">
                          {row.item.no}
                        </TableCell>
                        <TableCell className="px-4 py-2 text-left truncate">
                          {row.item.name.length > 25 ? (
                            <Tooltip title={row.item.name} arrow>
                              <span>
                                {he.decode(row.item.name.substring(0, 25))}...
                              </span>
                            </Tooltip>
                          ) : (
                            he.decode(row.item.name)
                          )}
                        </TableCell>
                        <TableCell className="px-4 py-2 text-center">
                          {row.item.type}
                        </TableCell>
                        <TableCell className="px-4 py-2 text-center">
                          {row.quantity}
                        </TableCell>
                        <TableCell className="px-4 py-2 text-center">
                          {row.unit_price}
                        </TableCell>
                        <TableCell className="px-4 py-2 text-center">
                          {row.my_cost}
                        </TableCell>
                        <TableCell className="px-4 py-2 text-center">
                          {row.my_weight}
                        </TableCell>
                        <TableCell className="px-4 py-2 text-center">
                          {row.new_or_used}
                        </TableCell>
                        <TableCell className="px-4 py-2 text-left truncate">
                          {row.description.length > 40 ? (
                            <Tooltip title={row.description} arrow>
                              <span>
                                {he.decode(row.description.substring(0, 40))}...
                              </span>
                            </Tooltip>
                          ) : (
                            he.decode(row.description)
                          )}
                        </TableCell>
                        <TableCell className="px-4 py-2 text-center">
                          {row.color_name}
                        </TableCell>
                        <TableCell className="px-4 py-2 text-center">
                          {row.is_stock_room ? row.is_stock_room : 'N'}
                        </TableCell>
                      </TableRow>
                    )
                  })
                : []}
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
