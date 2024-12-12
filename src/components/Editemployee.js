import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';

const EditEmployee = () => {
    const [employee, setEmployee] = useState({
        EmployeeName: '',
        EmailAddress: '',
        MobileNumber: '',
        Address: '',
        Designation: '',
        HiredOn: '',
        Company: '',
        Department: '',
        EmployeeStatus: '',
    });

    const [companies, setCompanies] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [errorMessages, setErrorMessages] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/emp_api/${id}/`)
            .then(response => {
                setEmployee(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the employee details!', error);
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
        if (employee.Company) {
            axios.get(`http://127.0.0.1:8000/api/department_api/?Company=${employee.Company}`)
                .then(response => {
                    setDepartments(response.data);
                })
                .catch(error => {
                    console.error('Error fetching departments:', error);
                });
        }
    }, [employee.Company]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee({ ...employee, [name]: value });
    };

    const validateFields = () => {
        let validationErrors = {};

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailPattern.test(employee.EmailAddress)) {
            validationErrors.EmailAddress = "Enter a valid email address";
        }

        const mobilePattern = /^\+?[0-9]{10,15}$/;
        if (employee.MobileNumber && !mobilePattern.test(employee.MobileNumber)) {
            validationErrors.MobileNumber = "Enter a valid mobile number";
        }

        if (!employee.EmployeeName) validationErrors.EmployeeName = "Employee Name is required";
        if (!employee.EmailAddress) validationErrors.EmailAddress = "Email Address is required";
        if (!employee.MobileNumber) validationErrors.MobileNumber = "Mobile Number is required";
        if (!employee.Address) validationErrors.Address = "Address is required";
        if (!employee.Designation) validationErrors.Designation = "Designation is required";
        if (!employee.HiredOn) validationErrors.HiredOn = "Hired On date is required";
        if (!employee.Company) validationErrors.Company = "Company is required";
        if (!employee.Department) validationErrors.Department = "Department is required";

        setErrorMessages(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (validateFields()) {
            axios.put(`http://127.0.0.1:8000/api/emp_api/${id}/`, employee)
                .then(() => {
                    navigate('/');
                })
                .catch((error) => {
                    console.error('There was an error updating the employee!', error);
                    if (error.response && error.response.data) {
                        setErrorMessages(error.response.data);
                    }
                });
        }
    };

    return (
        <div>
            <h1>Edit Employee</h1>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Employee Name"
                    name="EmployeeName"
                    value={employee.EmployeeName}
                    onChange={handleChange}
                    required
                    error={!!errorMessages.EmployeeName}
                    helperText={errorMessages.EmployeeName}
                />
                <TextField
                    label="Email Address"
                    name="EmailAddress"
                    type="email"
                    value={employee.EmailAddress}
                    onChange={handleChange}
                    required
                    error={!!errorMessages.EmailAddress}
                    helperText={errorMessages.EmailAddress}
                />
                <TextField
                    label="Mobile Number"
                    name="MobileNumber"
                    type="tel"
                    value={employee.MobileNumber}
                    onChange={handleChange}
                    required
                    error={!!errorMessages.MobileNumber}
                    helperText={errorMessages.MobileNumber}
                />
                <TextField
                    label="Address"
                    name="Address"
                    value={employee.Address}
                    onChange={handleChange}
                    required
                    error={!!errorMessages.Address}
                    helperText={errorMessages.Address}
                />
                <TextField
                    label="Designation"
                    name="Designation"
                    value={employee.Designation}
                    onChange={handleChange}
                    required
                    error={!!errorMessages.Designation}
                    helperText={errorMessages.Designation}
                />
                <TextField
                    label="Hired On"
                    name="HiredOn"
                    type="date"
                    value={employee.HiredOn}
                    onChange={handleChange}
                    required
                    InputLabelProps={{
                        shrink: true,
                    }}
                    error={!!errorMessages.HiredOn}
                    helperText={errorMessages.HiredOn}
                />
                <TextField
                    label="Company"
                    name="Company"
                    select
                    value={employee.Company}
                    onChange={handleChange}
                    required
                    SelectProps={{
                        native: true,
                    }}
                    error={!!errorMessages.Company}
                    helperText={errorMessages.Company}
                >
                    <option value="">Select Company</option>
                    {companies.map(company => (
                        <option key={company.id} value={company.id}>
                            {company.CompanyName}
                        </option>
                    ))}
                </TextField>

                <TextField
                    label="Department"
                    name="Department"
                    select
                    value={employee.Department}
                    onChange={handleChange}
                    required
                    SelectProps={{
                        native: true,
                    }}
                    error={!!errorMessages.Department}
                    helperText={errorMessages.Department}
                >
                    <option value="">Select Department</option>
                    {departments.map(department => (
                        <option key={department.id} value={department.id}>
                            {department.DepartmentName}
                        </option>
                    ))}
                </TextField>

                <TextField
                    label="Employee Status"
                    name="EmployeeStatus"
                    value={employee.EmployeeStatus}
                    onChange={handleChange}
                    required
                    error={!!errorMessages.EmployeeStatus}
                    helperText={errorMessages.EmployeeStatus}
                />

                <Button type="submit">Update Employee</Button>
            </form>
        </div>
    );
};

export default EditEmployee;
