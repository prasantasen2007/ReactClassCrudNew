import React, { useState } from 'react'
import { Dialog,DialogContent,DialogTitle,Stack,TextField,DialogActions,Button } from '@mui/material'

export const AddEditModal = ({open,handleClose,name,price}) => {
    const [productName,setProductName]=useState("");
    const [productPrice,setProductPrice]=useState("");
    const addProduct=()=>{

    }
  return (
    <>
    <Dialog open={open} onClose={handleClose}>
        <DialogContent>
            <Stack spacing={2}>
                <TextField label='Product Name' value={productName} onChange={(e)=>setProductName(e.target.value)}/>
                <TextField label='Product Price' value={productPrice} onChange={(e)=>setProductPrice(e.target.value)}/>
            </Stack>
        </DialogContent>
        <DialogActions>
            <Button variant='outlined' onClick={handleClose}>Cancel</Button>
            <Button variant='outlined' onClick={addProduct}>Add</Button>
        </DialogActions>
    </Dialog>
    
    </>
  )
}
