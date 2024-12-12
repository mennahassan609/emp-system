import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Welcome to the Homepage</h1>
            <p style={styles.description}>This is the main page where you can navigate to other sections of the system.</p>
            <div style={styles.features}>
                <h2 style={styles.subtitle}>Features</h2>
                <ul>
                    <div style={styles.listItem}>
                        <Link to="/companies" style={styles.link}>
                            Company Management
                        </Link>
                    </div>
                    <div style={styles.listItem}>
                        <Link to="/departments" style={styles.link}>
                            Department Management
                        </Link>
                    </div>
                    <div style={styles.listItem}>
                        <Link to="/employees" style={styles.link}>
                            Employee Management
                        </Link>
                    </div>
                    <div style={styles.listItem}>
                <Link to="/create-employee" style={styles.link}>Create Employee</Link>
            </div>
                </ul>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
        fontFamily: "'Arial', sans-serif",
        color: "#333",
    },
    title: {
        color: "#4CAF50",
        fontSize: "36px",
        fontWeight: "bold",
    },
    description: {
        fontSize: "18px",
        marginBottom: "20px",
    },
    features: {
        marginTop: "30px",
    },
    subtitle: {
        fontSize: "24px",
        color: "#4CAF50",
    },
    listItem: {
        fontSize: "18px",
        margin: "5px 0",
    },
    link: {
        color: "#4CAF50",
        textDecoration: "none",
        fontSize: "18px",
        cursor: "pointer",
        transition: "color 0.3s",
    },
    linkHover: {
        color: "#45a049",
    },
    footer: {
        marginTop: "50px",
        textAlign: "center",
        fontSize: "14px",
        color: "#777",
    },
    footerText: {
        margin: "10px 0",
    },
};

export default Home;
