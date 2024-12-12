import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const EditDepartment = () => {
    const [department, setDepartment] = useState({
        DepartmentName: '',
        NumberofEmployees: 0,
    });
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

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/department_api/${id}/`, department)
            .then(() => {
                navigate('/departments');
            })
            .catch((error) => {
                console.error('There was an error updating the department!', error);
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
                />
                <TextField
                    label="Number of Employees"
                    name="NumberofEmployees"
                    type="number"
                    value={department.NumberofEmployees}
                    onChange={handleChange}
                    required
                />
                <Button type="submit">Update Department</Button>
            </form>
        </div>
    );
};

export default EditDepartment;
