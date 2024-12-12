import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewEmployee = () => {
    const [employee, setEmployee] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/emp_api/${id}/`)
            .then(response => {
                setEmployee(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the employee details!', error);
            });
    }, [id]);

    return (
        <div>
            {employee ? (
                <div>
                    <h1>{employee.EmployeeName}</h1>
                    <p><strong>Email Address:</strong> {employee.EmailAddress}</p>
                    <p><strong>Mobile Number:</strong> {employee.MobileNumber}</p>
                    <p><strong>Address:</strong> {employee.Address}</p>
                    <p><strong>Designation:</strong> {employee.Designation}</p>
                    <p><strong>Hired On:</strong> {employee.HiredOn}</p>
                    <p><strong>Company:</strong> {employee.CompanyName}</p>
                    <p><strong>Department:</strong> {employee.DepartmentName}</p>
                    <p><strong>Status:</strong> {employee.EmployeeStatus}</p>
                    <p><strong>Days Employed:</strong> {employee.DaysEmployed}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ViewEmployee;
