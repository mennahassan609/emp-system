# emp-system
The Employee Management System is a full-stack application that allows users to manage companies, departments, and employees. It implements role-based access control (RBAC) for security, and features a workflow for onboarding new employees. The system supports CRUD operations for all entities and integrates with both the backend API and the frontend React application.

This application adheres to the following requirements:

-User authentication with role-based access control (RBAC). -Management of companies, departments, and employees. -Validation of fields (e.g., email and phone number format). -Workflow for onboarding employees, handling stages like "Application Received", "Interview Scheduled", etc. -Secure API with proper error handling and cascading deletions.

Features

Backend Features:

User Accounts:

-User information includes username, email, and role. -Supports Admin, Manager, and Employee roles.

Company Management:

-CRUD operations for company records. -Tracks the number of departments and employees in each company.

Department Management:

-CRUD operations for departments. -Departments are linked to specific companies.

Employee Management:

-CRUD operations for employees. -Tracks employee information including name, email, status, and hire date. -Validations ensure required fields are filled and data formats are correct.

Onboarding Workflow:

Workflow for employee onboarding with stages: "Application Received", "Interview Scheduled", "Hired", and "Not Accepted".

API Endpoints:

Company:

GET /api/company_api/ Retrieve a list of all companies.

GET /api/company_api/{id}/ Retrieve a single company by its ID.

PATCH api/company_api/{id}/ Update an existing company by its ID.

Department:

GET /api/department_api/ Retrieve a list of all departments.

GET /api/department_api/{id}/ Retrieve a single department by its ID.

PATCH /api/department_api/{id}/ Update an existing department by its ID.

Employee:

POST /api/emp_api/ Create a new employee.

GET /api/emp_api/{id}/ Retrieve a single employee by their ID.

PATCH /api/emp_api/{id}/ Update an existing employee by their ID.

Missing Requirements (Not Implemented):

Ensure that the Department field in Employee Model only accepts departments related to the selected company. Status: Not implemented yet.

Security Measures – Role-Based Access Control (RBAC) for Admin, Manager, and Employee. Status: Not implemented yet.

Setup and Installation Prerequisites: Backend: Python 3.x, Django 5.x, Django REST Framework Frontend: Node.js 14.x+, React 19.x, React Router, Axios Backend Setup: Clone the repository:

1.git clone https://github.com/mennahassan609/emp-system.git 
-cd eEmployeeRecord

2.Create a virtual environment and install dependencies: 
-env\Scripts\activate 
-pip install -r requirements.txt

3.Run migrations to set up the database: python manage.py migrate

4.Start the Django server: python manage.py runserver

The backend will now be running at http://127.0.0.1:8000/.

Frontend Setup:

1.Navigate to the frontend directory: cd frontendapp

2.Install dependencies: npm install

4.Start the React development server: npm start

The frontend will now be running at http://localhost:3000/.

Task Completion Checklist Backend: User Accounts Model: Implemented user authentication with roles (Admin, Manager, Employee). Company Model: Created model to store company details and track the number of departments/employees. Department Model: Created model to store department details linked to companies. Employee Model: Created model for employee details, including department validation. Validation & Business Logic: Implemented validation for required fields, email, and phone format. Automated department and employee count. API Security: Implemented JWT authentication and secured API endpoints. Frontend: Login Page: Implemented user login with token-based authentication. Company Management: Implemented company listing, viewing, editing, and deletion. Department Management: Implemented department listing, viewing, editing, and deletion. Employee Management: Implemented employee listing, creation, editing, and deletion.

Security Measures -JWT Authentication: User authentication is managed using JSON Web Tokens (JWT). Upon successful login, a token is generated and stored in localStorage. This token is used for securing API requests. -Data Protection: All sensitive data such as passwords are securely hashed before storing them in the database.

employee-management-system