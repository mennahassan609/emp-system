import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DepartmentList = () => {
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/department_api/')
            .then(response => {
                setDepartments(response.data);
            })
            .catch(error => {
                console.error('Error fetching departments!', error);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/department_api/${id}/`)
            .then(() => {
                setDepartments(departments.filter(department => department.id !== id));
            })
            .catch(error => {
                console.error('Error deleting the department!', error);
            });
    };

    return (
        <div>
            <h1>Departments</h1>
            <ul>
                {departments.map(department => (
                    <li key={department.id}>
                        {department.DepartmentName}
                        <Link to={`/departments/${department.id}`}>View</Link>
                        <Link to={`/edit-department/${department.id}`}>Edit</Link>
                        <button onClick={() => handleDelete(department.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DepartmentList;
