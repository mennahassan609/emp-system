import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewDepartment = () => {
    const [department, setDepartment] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/department_api/${id}/`)
            .then(response => {
                setDepartment(response.data);
            })
            .catch(error => {
                console.error('Error fetching the department!', error);
            });
    }, [id]);

    return (
        <div>
            {department ? (
                <div>
                    <h1>{department.DepartmentName}</h1>
                    <p>Company: {department.CompanyName}</p>
                    <p>Number of Employees: {department.NumberofEmployees}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ViewDepartment;
