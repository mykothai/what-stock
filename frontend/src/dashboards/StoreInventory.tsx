import React, { useState, useEffect } from 'react'
import { getInventories } from '../api/StoreApi'
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
        backgroundColor: theme.palette.primary.main,
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
          component="div"
          color="white">
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
    // TODO: get data from store / db
    // commented out to avoid getting rate limited by BL

    const inventory: { meta: any; data: StoreInventoryData[] } = {
      meta: {
        description: 'OK',
        message: 'OK',
        code: 200,
      },
      data: [
        {
          inventory_id: 96114605,
          item: {
            no: '74188c01',
            name: 'Magnet Brick, Modified 2 x 4 Sealed Base with Extension Plate with 2 Studs and Hole',
            type: 'PART',
            category_id: 14,
          },
          color_id: 3,
          color_name: 'Yellow',
          quantity: 4,
          new_or_used: 'N',
          unit_price: '0.7200',
          bind_id: 0,
          description: '',
          remarks: 'D14',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2016-06-12T04:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 96114606,
          item: {
            no: '74188c01',
            name: 'Magnet Brick, Modified 2 x 4 Sealed Base with Extension Plate with 2 Studs and Hole',
            type: 'PART',
            category_id: 14,
          },
          color_id: 7,
          color_name: 'Blue',
          quantity: 4,
          new_or_used: 'N',
          unit_price: '0.4800',
          bind_id: 0,
          description: '',
          remarks: 'D14',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2016-06-12T04:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 96114607,
          item: {
            no: '74188c01',
            name: 'Magnet Brick, Modified 2 x 4 Sealed Base with Extension Plate with 2 Studs and Hole',
            type: 'PART',
            category_id: 14,
          },
          color_id: 85,
          color_name: 'Dark Bluish Gray',
          quantity: 1,
          new_or_used: 'N',
          unit_price: '0.4200',
          bind_id: 0,
          description: '',
          remarks: 'D15',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2016-06-12T04:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 316589677,
          item: {
            no: '90398',
            name: 'Minifigure, Utensil Statuette / Trophy',
            type: 'PART',
            category_id: 18,
          },
          color_id: 250,
          color_name: 'Metallic Copper',
          quantity: 1,
          new_or_used: 'N',
          unit_price: '9.9900',
          bind_id: 0,
          description: '',
          remarks: '',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2022-10-10T04:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 358087854,
          item: {
            no: 'col044',
            name: 'Space Alien, Series 3 &#40;Minifigure Only without Stand and Accessories&#41;',
            type: 'MINIFIG',
            category_id: 746,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 1,
          new_or_used: 'N',
          unit_price: '10.9900',
          bind_id: 0,
          description: 'COMES WITH ACCESSORIES. No plate.',
          remarks: '',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2023-07-09T04:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 316588684,
          item: {
            no: 'col048',
            name: 'Gorilla Suit Guy, Series 3 &#40;Minifigure Only without Stand and Accessories&#41;',
            type: 'MINIFIG',
            category_id: 746,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 2,
          new_or_used: 'N',
          unit_price: '24.9900',
          bind_id: 0,
          description:
            'Opened to verify contents and immediately placed into plastic bag. Comes with banana. No stand.',
          remarks: '',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2022-10-10T04:00:00.000Z',
          my_cost: '5.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 96114613,
          item: {
            no: '2855041',
            name: 'Magnet Set, Minifigure Pirates Imperial Soldier - with 2 x 4 Brick Base &#40;Bricktober Week 1&#41; polybag',
            type: 'GEAR',
            category_id: 14,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 1,
          new_or_used: 'N',
          unit_price: '16.9900',
          bind_id: 0,
          description: '',
          remarks: 'SB01',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2016-06-12T04:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 96114616,
          item: {
            no: '4624977',
            name: 'Magnet Set, Minifigure Holiday Santa Magnet 2010 polybag',
            type: 'GEAR',
            category_id: 14,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 3,
          new_or_used: 'N',
          unit_price: '21.9900',
          bind_id: 0,
          description: '',
          remarks: 'SB01',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2016-06-12T04:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 358085345,
          item: {
            no: 'col053',
            name: 'Surfer Girl, Series 4 &#40;Minifigure Only without Stand and Accessories&#41;',
            type: 'MINIFIG',
            category_id: 746,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 1,
          new_or_used: 'N',
          unit_price: '7.9900',
          bind_id: 0,
          description: '',
          remarks: '',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2023-07-09T04:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 358087427,
          item: {
            no: 'col057',
            name: 'Street Skater, Series 4 &#40;Minifigure Only without Stand and Accessories&#41;',
            type: 'MINIFIG',
            category_id: 746,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 2,
          new_or_used: 'N',
          unit_price: '9.9900',
          bind_id: 0,
          description: 'COMES WITH SKATEBOARD',
          remarks: '',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2023-07-09T04:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 358085759,
          item: {
            no: 'col060',
            name: 'Werewolf, Series 4 &#40;Minifigure Only without Stand and Accessories&#41;',
            type: 'MINIFIG',
            category_id: 746,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 1,
          new_or_used: 'N',
          unit_price: '9.9900',
          bind_id: 0,
          description: 'Comes with bone, no plate.',
          remarks: '',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2023-07-09T04:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 358085321,
          item: {
            no: 'col059',
            name: 'Soccer Player, Series 4 &#40;Minifigure Only without Stand and Accessories&#41;',
            type: 'MINIFIG',
            category_id: 746,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 1,
          new_or_used: 'N',
          unit_price: '7.9900',
          bind_id: 0,
          description: '',
          remarks: '',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2023-07-09T04:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 316588917,
          item: {
            no: 'poc029',
            name: 'Captain Jack Sparrow Voodoo',
            type: 'MINIFIG',
            category_id: 761,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 1,
          new_or_used: 'U',
          unit_price: '10.9900',
          bind_id: 0,
          description: '',
          remarks: '',
          bulk: 1,
          is_retain: false,
          is_stock_room: true,
          stock_room_id: 'A',
          date_created: '2022-10-10T04:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 96114611,
          item: {
            no: '2856223',
            name: 'Magnet Set, Minifigure Retro Ninja Princess - with 2 x 4 Brick Base &#40;Bricktober Week 1&#41; polybag',
            type: 'GEAR',
            category_id: 14,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 0,
          new_or_used: 'N',
          unit_price: '12.9900',
          bind_id: 0,
          description: '',
          remarks: 'SB01',
          bulk: 1,
          is_retain: false,
          is_stock_room: true,
          stock_room_id: 'A',
          date_created: '2016-06-12T04:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 358084974,
          item: {
            no: 'col083',
            name: 'Sleepyhead, Series 6 &#40;Minifigure Only without Stand and Accessories&#41;',
            type: 'MINIFIG',
            category_id: 746,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 1,
          new_or_used: 'N',
          unit_price: '14.9900',
          bind_id: 0,
          description: '',
          remarks: '',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2023-07-09T04:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 316588988,
          item: {
            no: 'col140',
            name: 'Mermaid, Series 9 &#40;Minifigure Only without Stand and Accessories&#41;',
            type: 'MINIFIG',
            category_id: 746,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 1,
          new_or_used: 'N',
          unit_price: '13.9900',
          bind_id: 0,
          description:
            'Opened to verify contents and immediately placed into plastic bag. Comes with starfish accessory. No stand.',
          remarks: '',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2022-10-10T04:00:00.000Z',
          my_cost: '5.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 96114609,
          item: {
            no: '40077-1',
            name: 'Geoffrey polybag',
            type: 'SET',
            category_id: 171,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 2,
          new_or_used: 'N',
          completeness: 'X',
          unit_price: '12.9900',
          bind_id: 0,
          description: '',
          remarks: 'SB01',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2016-06-12T04:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 358084673,
          item: {
            no: '11602pb02',
            name: 'Cat, Friends / Elves, Sitting with Medium Azure Eyes and Collar with Bright Pink Heart Tag, Black Nose and Light Bluish Gray Patches Pattern &#40;Jewel&#41;',
            type: 'PART',
            category_id: 147,
          },
          color_id: 1,
          color_name: 'White',
          quantity: 1,
          new_or_used: 'N',
          unit_price: '4.9900',
          bind_id: 0,
          description: '',
          remarks: '',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2023-07-09T04:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 261614045,
          item: {
            no: '70145-1',
            name: 'Maula&#39;s Ice Mammoth Stomper',
            type: 'SET',
            category_id: 787,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 2,
          new_or_used: 'N',
          completeness: 'S',
          unit_price: '159.9900',
          bind_id: 0,
          description: '',
          remarks: '',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2021-08-31T04:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 358084680,
          item: {
            no: 'frnd088',
            name: 'Friends Mia - Dark Blue Trousers, Medium Lavender Jacket with Scarf',
            type: 'MINIFIG',
            category_id: 771,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 1,
          new_or_used: 'N',
          unit_price: '5.9900',
          bind_id: 0,
          description: '',
          remarks: '',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2023-07-09T04:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 358084645,
          item: {
            no: 'frnd089',
            name: 'Friends Ewa - Red Skirt and Black Boots, Red and White Holiday Top with Scarf',
            type: 'MINIFIG',
            category_id: 771,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 1,
          new_or_used: 'N',
          unit_price: '6.9900',
          bind_id: 0,
          description: '',
          remarks: '',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2023-07-09T04:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 246608117,
          item: {
            no: '70410-1',
            name: 'Soldiers Outpost',
            type: 'SET',
            category_id: 61,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 0,
          new_or_used: 'N',
          completeness: 'S',
          unit_price: '64.9900',
          bind_id: 0,
          description: '',
          remarks: '',
          bulk: 1,
          is_retain: false,
          is_stock_room: true,
          stock_room_id: 'A',
          date_created: '2021-04-30T04:00:00.000Z',
          my_cost: '14.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 261614987,
          item: {
            no: '30275-1',
            name: 'TIE Advanced Prototype - Mini polybag',
            type: 'SET',
            category_id: 65,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 5,
          new_or_used: 'N',
          completeness: 'S',
          unit_price: '9.9900',
          bind_id: 0,
          description: '',
          remarks: '',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2021-08-31T04:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 358088755,
          item: {
            no: 'col13-15',
            name: 'Lady Cyclops, Series 13 &#40;Complete Set with Stand and Accessories&#41;',
            type: 'SET',
            category_id: 746,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 2,
          new_or_used: 'N',
          completeness: 'S',
          unit_price: '10.9900',
          bind_id: 0,
          description: 'NO STAND.',
          remarks: '',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2023-07-09T04:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 316483617,
          item: {
            no: 'col210',
            name: 'Galaxy Trooper, Series 13 &#40;Minifigure Only without Stand and Accessories&#41;',
            type: 'MINIFIG',
            category_id: 746,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 1,
          new_or_used: 'N',
          unit_price: '9.9900',
          bind_id: 0,
          description:
            'Opened to verified contents, then immediately placed in little plastic bag.',
          remarks: '',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2022-10-10T04:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 358089439,
          item: {
            no: 'sh0147',
            name: 'Gorilla Grodd',
            type: 'MINIFIG',
            category_id: 768,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 1,
          new_or_used: 'N',
          unit_price: '49.9900',
          bind_id: 0,
          description: '',
          remarks: '',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2023-07-09T04:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 358085722,
          item: {
            no: 'tlm094',
            name: 'Benny - Closed Eyes',
            type: 'MINIFIG',
            category_id: 804,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 1,
          new_or_used: 'N',
          unit_price: '11.9900',
          bind_id: 0,
          description: '',
          remarks: '',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2023-07-09T04:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 358085164,
          item: {
            no: 'tlm095',
            name: 'President Business - Smiling, Raised Eyebrows',
            type: 'MINIFIG',
            category_id: 804,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 1,
          new_or_used: 'N',
          unit_price: '7.9900',
          bind_id: 0,
          description: '',
          remarks: '',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2023-07-09T04:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 358084998,
          item: {
            no: 'tlm096',
            name: 'Emmet - Lopsided Open Mouth Smile',
            type: 'MINIFIG',
            category_id: 804,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 1,
          new_or_used: 'N',
          unit_price: '5.9900',
          bind_id: 0,
          description: '',
          remarks: '',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2023-07-09T04:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 322439328,
          item: {
            no: 'sh0173',
            name: 'Hulk - Giant, Dark Purple Pants with Avengers Logo',
            type: 'MINIFIG',
            category_id: 768,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 1,
          new_or_used: 'N',
          unit_price: '35.9900',
          bind_id: 0,
          description: 'Brand new, never assembled.',
          remarks: '',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2022-11-19T05:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 358090323,
          item: {
            no: 'sh0175',
            name: 'Ultron Prime',
            type: 'MINIFIG',
            category_id: 768,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 1,
          new_or_used: 'N',
          unit_price: '35.9900',
          bind_id: 0,
          description: '',
          remarks: '',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2023-07-09T04:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 358091041,
          item: {
            no: 'sim029',
            name: 'Date Night Marge, The Simpsons, Series 2 &#40;Minifigure Only without Stand and Accessories&#41;',
            type: 'MINIFIG',
            category_id: 746,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 1,
          new_or_used: 'N',
          unit_price: '7.9900',
          bind_id: 0,
          description: 'Comes with accessories but no plate.',
          remarks: '',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2023-07-09T04:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 261614028,
          item: {
            no: '75918-1',
            name: 'T. rex Tracker',
            type: 'SET',
            category_id: 850,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 1,
          new_or_used: 'N',
          completeness: 'S',
          unit_price: '174.9900',
          bind_id: 0,
          description: '',
          remarks: '',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2021-08-31T04:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 413624106,
          item: {
            no: '70226-1',
            name: "Mammoth's Frozen Stronghold",
            type: 'SET',
            category_id: 787,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 2,
          new_or_used: 'N',
          completeness: 'S',
          unit_price: '104.9900',
          bind_id: 0,
          description: '',
          remarks: '',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2024-06-02T04:00:00.000Z',
          my_cost: '50.4000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 261614734,
          item: {
            no: '70225-1',
            name: "Bladvic's Rumble Bear",
            type: 'SET',
            category_id: 787,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 2,
          new_or_used: 'N',
          completeness: 'S',
          unit_price: '79.9900',
          bind_id: 0,
          description: '',
          remarks: '',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2021-08-31T04:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 96114620,
          item: {
            no: 'col219',
            name: 'Tiger Woman, Series 14 &#40;Minifigure Only without Stand and Accessories&#41;',
            type: 'MINIFIG',
            category_id: 746,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 1,
          new_or_used: 'N',
          unit_price: '11.4900',
          bind_id: 0,
          description:
            '* comes with accessories, no plate. Blind bag opened to verify correct minifig',
          remarks: 'SB00',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2016-06-12T04:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 232278806,
          item: {
            no: '30372-1',
            name: 'Robin&#39;s Mini Fortrex polybag',
            type: 'SET',
            category_id: 868,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 1,
          new_or_used: 'N',
          completeness: 'S',
          unit_price: '6.9900',
          bind_id: 0,
          description: '',
          remarks: '',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2021-01-18T05:00:00.000Z',
          my_cost: '0.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 316483742,
          item: {
            no: 'col235',
            name: 'Animal Control, Series 15 &#40;Minifigure Only without Stand and Accessories&#41;',
            type: 'MINIFIG',
            category_id: 746,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 1,
          new_or_used: 'N',
          unit_price: '9.9900',
          bind_id: 0,
          description:
            'Opened to verify contents, then immediate placed in a plastic bag. Comes with accessories: skunk and net. No stand.',
          remarks: '',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2022-10-10T04:00:00.000Z',
          my_cost: '5.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
        {
          inventory_id: 316483703,
          item: {
            no: 'col232',
            name: 'Tribal Woman, Series 15 &#40;Minifigure Only without Stand and Accessories&#41;',
            type: 'MINIFIG',
            category_id: 746,
          },
          color_id: 0,
          color_name: '(Not Applicable)',
          quantity: 1,
          new_or_used: 'N',
          unit_price: '15.9900',
          bind_id: 0,
          description:
            'Opened to verify contents, then placed into a plastic bag. Includes accessories: the baby. No plate.',
          remarks: '',
          bulk: 1,
          is_retain: false,
          is_stock_room: false,
          date_created: '2022-10-10T04:00:00.000Z',
          my_cost: '5.0000',
          sale_rate: 0,
          tier_quantity1: 0,
          tier_price1: '0.0000',
          tier_quantity2: 0,
          tier_price2: '0.0000',
          tier_quantity3: 0,
          tier_price3: '0.0000',
          my_weight: '0.0000',
        },
      ],
    }

    setInventory(inventory.data ? inventory.data : [])
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
    backgroundColor: theme.palette.primary.light,
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
    backgroundColor: 'blue !important',
  },
}))

const StyledTableSortLabel = styled(TableSortLabel)(() => ({
  color: theme.palette.primary.contrastText,
}))
