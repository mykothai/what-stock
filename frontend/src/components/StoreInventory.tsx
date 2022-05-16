import React from 'react';
import { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getInventories } from '../api/StoreApi';

export default function StoreInventory() {
  const classes = useStyles();

  useEffect(() => {
    getStoreInventories()
  }, [])

  const getStoreInventories = async() => {
    console.log("Inventories\n", await getInventories())
  }

  return (
    <div>

    </div>
  )
}

const useStyles = makeStyles({

})