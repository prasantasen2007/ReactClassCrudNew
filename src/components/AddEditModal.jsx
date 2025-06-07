import React, { useEffect, useState } from 'react'
import { Dialog,DialogContent,DialogTitle,Stack,TextField,DialogActions,Button } from '@mui/material'

export const AddEditModal = ({open,handleClose,submittedProduct,onSave}) => {
    const [productName,setProductName]=useState("");
    const [productPrice,setProductPrice]=useState("");
    const addProduct=()=>{
        if(!productName || !productPrice){
            alert('All values are required');
            return;
        }
        const updatedProduct={
            ...submittedProduct,
            name:productName,
            price:parseFloat(productPrice)
        }
        console.log(updatedProduct);
       // return;
        onSave(updatedProduct);
        setProductName("");
        setProductPrice("");
        handleClose();
    }
    useEffect(()=>{
        console.log("our product is",submittedProduct);
        if(submittedProduct){
            setProductName(submittedProduct.name);
            setProductPrice(submittedProduct.price);
        }else{
            setProductName('');
            setProductPrice('');
        }

    },[submittedProduct])
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
            <Button variant='outlined' onClick={addProduct}>
                {submittedProduct?'Update':'Add'}
            </Button>
        </DialogActions>
    </Dialog>
    
    </>
  )
}
