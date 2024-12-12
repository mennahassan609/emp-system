import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/emp_api/')
            .then((response) => {
                setEmployees(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching employees!', error);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/emp_api/${id}/`)
            .then(() => {
                setEmployees(employees.filter(employee => employee.id !== id));
            })
            .catch((error) => {
                console.error('There was an error deleting the employee!', error);
            });
    };

    return (
        <div>
            <h1>Employee List</h1>
            <ul>
                {employees.map(employee => (
                    <li key={employee.id}>
                        {employee.EmployeeName}
                        <Link to={`/viewemployees/${employee.id}/`}>View</Link>
                        <Link to={`/edit-employee/${employee.id}/`}>Edit</Link>
                        <button onClick={() => handleDelete(employee.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmployeeList;
