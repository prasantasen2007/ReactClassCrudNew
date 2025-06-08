import React,{useState,useEffect} from 'react'
import { Dialog,DialogContent,DialogTitle,Stack,TextField,DialogActions,Button } from '@mui/material'

export const AddEditModalNew = ({open,handleClose,submittedUser,onSave}) =>{
    console.log(submittedUser);
    const [firstName, setFirstName]=useState("");
    const [lastName, setLastName]=useState("");
    const [birthDate, setBirthDate]=useState("");
    const addUser=()=>{

    }
  useEffect(()=>{
    if(submittedUser){
        setFirstName(submittedUser.firstName);
        setLastName(submittedUser.lastName);
        setBirthDate(submittedUser.birthDate);
    }else{
        setFirstName('');
        setLastName('');
        setBirthDate('');
    }
  },[submittedUser])
  return (
    <>
        <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <Stack spacing={2}>
                        <TextField label='First Name' value={firstName} onChange={(e)=>setFirstName(e.target.value)}/>
                        <TextField label='Last Name' value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
                        <TextField label='DOB' value={birthDate} onChange={(e)=>setBirthDate(e.target.value)}/>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' onClick={handleClose}>Cancel</Button>
                    <Button variant='outlined' onClick={addUser}>
                        {submittedUser?'Update':'Add'}
                    </Button>
                </DialogActions>
            </Dialog>
    </>
  )
}
