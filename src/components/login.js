import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
  
    console.log("Email:", email, "Password:", password);
  
    try {
      await login(email, password);
      if (localStorage.getItem("authToken")) {
        navigate("/home");
      } else {
        alert("Login failed, check your credentials");
      }
    } catch (error) {
      console.error("Login failed:", error);
      alert("Login failed, please check your credentials or try again later.");
    }
  };

  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#9A616D" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block"></div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form onSubmit={handleSubmit}>
                        <h5 className="fw-normal mb-3 pb-3" style={{ letterSpacing: 1 }}>
                          Sign into your account
                        </h5>
                        <div className="form-outline mb-4">
                          <input type="email" id="form2Example17" className="form-control form-control-lg" name="email" />
                          <label className="form-label" htmlFor="form2Example17">Email address</label>
                        </div>
                        <div className="form-outline mb-4">
                          <input type="password" id="form2Example27" className="form-control form-control-lg" name="password" />
                          <label className="form-label" htmlFor="form2Example27">Password</label>
                        </div>
                        <div className="pt-1 mb-4">
                          <button className="btn btn-dark btn-lg btn-block" type="submit">
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
