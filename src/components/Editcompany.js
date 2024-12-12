import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const EditCompany = () => {
    const [company, setCompany] = useState({ CompanyName: '', NumberofDepartments: 0, NumberofEmployees: 0 });
    const [companies, setCompanies] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [errors, setErrors] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/company_api/${id}/`)
            .then((response) => {
                setCompany(response.data);
            })
            .catch((error) => {
                console.error('Error fetching the company:', error);
            });
    }, [id]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/company_api/')
            .then(response => {
                setCompanies(response.data);
            })
            .catch(error => {
                console.error('Error fetching companies:', error);
            });
    }, []);

    useEffect(() => {
        if (company.Company) {
            axios.get(`http://127.0.0.1:8000/api/department_api/?Company=${company.Company}`)
                .then(response => {
                    setDepartments(response.data);
                })
                .catch(error => {
                    console.error('Error fetching departments:', error);
                });
        }
    }, [company.Company]);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/company_api/${id}/`, company)
            .then(() => {
                navigate('/');
            })
            .catch((error) => {
                if (error.response && error.response.data) {
                    setErrors(error.response.data);
                }
            });
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCompany((prevCompany) => ({
            ...prevCompany,
            [name]: value,
        }));
    };

    return (
        <div>
            <h1>Edit Company</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Company Name"
                    name="CompanyName"
                    value={company.CompanyName}
                    onChange={handleChange}
                    required
                    error={!!errors.CompanyName}
                    helperText={errors.CompanyName}
                />
                <TextField
                    label="Number of Departments"
                    name="NumberofDepartments"
                    type="number"
                    value={company.NumberofDepartments}
                    onChange={handleChange}
                    required
                    error={!!errors.NumberofDepartments}
                    helperText={errors.NumberofDepartments}
                />
                <TextField
                    label="Number of Employees"
                    name="NumberofEmployees"
                    type="number"
                    value={company.NumberofEmployees}
                    onChange={handleChange}
                    required
                    error={!!errors.NumberofEmployees}
                    helperText={errors.NumberofEmployees}
                />
                <Button type="submit">Update Company</Button>
            </form>
        </div>
    );
};

export default EditCompany;
