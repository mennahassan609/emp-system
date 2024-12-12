import React from "react"
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import {Link} from 'react-router-dom';

const Department =() =>{
    return (
        <div>
    <div>Add new Department</div>
    <div style={{marginTop: '20px', marginBottom: '16px'}}>
    <TextField id="outlined-basic" label="Enter the name of department" variant="outlined" style={{marginRight: '16px'}} />
    <TextField id="outlined-basic" label="Enter the company" variant="outlined" style={{marginRight: '16px'}} />
    <TextField id="outlined-basic" label="Enter the number of employees" variant="outlined" style={{marginRight: '16px'}} />
    </div>
    <div style={{marginBottom: '20px'}}>
    <TextField id="outlined-basic" label="Enter your password" style={{marginRight: '16px'}} type='password' variant="outlined" />
    <TextField id="outlined-basic" label="Confirm your password" style={{marginRight: '16px'}} type='password' variant="outlined" />
    </div>
    <Button variant="contained">Register</Button>
    <div style={{marginTop: '16px'}}>
        <small>
        <Link to ="/Createrecord">Add new employee</Link>
        </small>
    </div>
    </div>
    )
}
export default Department