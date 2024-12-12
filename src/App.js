import './App.css';
import About from './components/About';
import Home from './components/Home';
import Create from './components/Create';
import Services from './components/Services';
import { Route, Routes, Navigate } from 'react-router-dom';
import Navi from './components/Navbar.tsx';
import React from 'react';
import Login from './components/login.js';
import Video from './components/video.js';
import Register from './components/register.js';
import Department from './components/department.jsx';
import CompanyList from './components/Companylist';
import ViewCompany from './components/Viewcompany';
import EditCompany from './components/Editcompany.js';
import DepartmentList from './components/Departmentlist.js';
import ViewDepartment from './components/Viewdepartment.js';
import EditDepartment from './components/Editdepartment.js';
import CreateEmployee from './components/Createemployee.js';
import EditEmployee from './components/Editemployee.js';
import ViewEmployee from './components/Viewemployee.js';
import EmployeeList from './components/Employeelist.js';
import { AuthProvider, useAuth } from './context/AuthContext';
import ReactDOM from 'react-dom/client';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navi />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/video" element={<Video />} />

          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/aboutpage" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/Createrecord" element={<ProtectedRoute><Create /></ProtectedRoute>} />
          <Route path="/Services" element={<ProtectedRoute><Services /></ProtectedRoute>} />
          <Route path="/dept" element={<ProtectedRoute><Department /></ProtectedRoute>} />
          <Route path="/companies" element={<ProtectedRoute><CompanyList /></ProtectedRoute>} />
          <Route path="/companies/:id" element={<ProtectedRoute><ViewCompany /></ProtectedRoute>} />
          <Route path="/edit-company/:id" element={<ProtectedRoute><EditCompany /></ProtectedRoute>} />
          <Route path="/departments" element={<ProtectedRoute><DepartmentList /></ProtectedRoute>} />
          <Route path="/departments/:id" element={<ProtectedRoute><ViewDepartment /></ProtectedRoute>} />
          <Route path="/edit-department/:id" element={<ProtectedRoute><EditDepartment /></ProtectedRoute>} />
          <Route path="/create-employee" element={<ProtectedRoute><CreateEmployee /></ProtectedRoute>} />
          <Route path="/edit-employee/:id" element={<ProtectedRoute><EditEmployee /></ProtectedRoute>} />
          <Route path="/viewemployees/:id" element={<ProtectedRoute><ViewEmployee /></ProtectedRoute>} />
          <Route path="/employees" element={<ProtectedRoute><EmployeeList /></ProtectedRoute>} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

function ProtectedRoute({ children }) {
  const { loginUser } = useAuth();

  if (!loginUser) {
    return <Navigate to="/" />;
  }

  return children;
}

export default App;
