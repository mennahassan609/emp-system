import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewCompany = () => {
    const [company, setCompany] = useState(null);
    const { id } = useParams(); // Get the company ID from the URL

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/company_api/${id}/`)
            .then((response) => {
                setCompany(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching the company!', error);
            });
    }, [id]);

    return (
        <div>
            {company ? (
                <div>
                    <h1>{company.CompanyName}</h1>
                    <p>Number of Departments: {company.NumberofDepartments}</p>
                    <p>Number of Employees: {company.NumberofEmployees}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default ViewCompany;
