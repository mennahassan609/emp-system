import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CompanyList = () => {
    const [companies, setCompanies] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/company_api/')
            .then((response) => {
                setCompanies(response.data);
            })
            .catch((error) => {
                console.error('There was an error fetching companies!', error);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://127.0.0.1:8000/api/company_api/${id}/`)
            .then(() => {
                setCompanies(companies.filter(company => company.id !== id));
            })
            .catch((error) => {
                console.error('There was an error deleting the company!', error);
            });
    };

    return (
        <div>
            <h1>Companies</h1>
            <ul>
                {companies.map(company => (
                    <li key={company.id}>
                        {company.CompanyName}
                        <Link to={`/companies/${company.id}/`}>View</Link>
                        <Link to={`/edit-company/${company.id}/`}>Edit</Link>
                        <button onClick={() => handleDelete(company.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CompanyList;
