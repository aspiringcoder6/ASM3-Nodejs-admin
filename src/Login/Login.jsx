import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from 'react-router-dom';
import UserAPI from "../API/UserAPI";
import { AuthContext } from "../Context/AuthContext";
import "./Login.css";
import { Redirect } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, error, dispatch } = useContext(AuthContext);
  const [redirect, setRedirect] = useState(false);
  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "https://asm3-nodejs-backend.onrender.com/users/adminLogin",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );
      const responseData = await response.json();
      if (!response.ok) {
        alert(responseData.message);
        return;
      }
      setRedirect(true);
    } catch (err) {
      alert(err);
    }

    // if (findUser.password !== password) {
    // 	setErrorPassword(true);
    // 	return;
    // } else {
    // 	setErrorPassword(false);

    // 	localStorage.setItem('id_user', findUser._id);

    // 	localStorage.setItem('name_user', findUser.fullname);

    // 	const action = addSession(localStorage.getItem('id_user'));
    // 	dispatch(action);

    // 	setCheckPush(true);
    // }
  };

  return (
    <div
      style={{
        marginTop: "30px",
        width: "82%",
        float: "right",
      }}
    >
      {redirect && <Redirect to={`/`} />}
      <div className="page-breadcrumb">
        <div className="row">
          <div class="login">
            <div class="heading">
              <h2>Sign in</h2>
              <form action="#">
                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-user"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="input-group input-group-lg">
                  <span className="input-group-addon">
                    <i className="fa fa-lock"></i>
                  </span>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="button" className="float" onClick={handleSubmit}>
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
