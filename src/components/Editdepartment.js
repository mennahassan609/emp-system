import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const EditDepartment = () => {
    const [department, setDepartment] = useState({
        DepartmentName: '',
        NumberofEmployees: 0,
        Company: '', 
    });
    const [companies, setCompanies] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/department_api/${id}/`)
            .then((response) => {
                setDepartment(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the department!', error);
            });
    }, [id]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/company_api/')
            .then((response) => {
                setCompanies(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the companies!', error);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Department Data:', department);
        axios.put(`http://127.0.0.1:8000/api/department_api/${id}/`, department)
            .then(() => {
                navigate('/departments');
            })
            .catch((error) => {
                console.error('There was an error updating the department!', error.response);
            });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDepartment((prevDepartment) => ({
            ...prevDepartment,
            [name]: value,
        }));
    };

    return (
        <div>
            <h1>Edit Department</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Department Name"
                    name="DepartmentName"
                    value={department.DepartmentName}
                    onChange={handleChange}
                    required
                    fullWidth
                />
                <TextField
                    label="Number of Employees"
                    name="NumberofEmployees"
                    type="number"
                    value={department.NumberofEmployees}
                    onChange={handleChange}
                    required
                    fullWidth
                />

                <FormControl fullWidth required>
                    <InputLabel>Company</InputLabel>
                    <Select
                        name="Company"
                        value={department.Company}
                        onChange={handleChange}
                        label="Company"
                    >
                        {companies.map((company) => (
                            <MenuItem key={company.id} value={company.id}>
                                {company.CompanyName}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button type="submit" variant="contained" sx={{ marginTop: 2 }}>
                    Update Department
                </Button>
            </form>
        </div>
    );
};

export default EditDepartment;
