import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import "./Login.css";
import "./Signin.css";
import "./font/BootstrapIcons.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
 const [tokens, setTokens]=useState()
  const moveToDashboard = () => {
    navigate("/Dashboard");
  };

  /*Function to redirect Forgerock Login Form
  */

  const redirectFRLogin = async () => {
    const baseUrl = process.env.REACT_APP_FR_URL;
    window.open(baseUrl, "_top", "open");
  };

  /*Function to Extract the code from FR URL
   */

  const getQuerystring = (key, url) => {
    let query = url;
    let vars = query.split("#");
    let pair = vars[1].split("&");
    for (let i = 0; i < pair.length; i++) {
      let pair1 = pair[i].split("=");
      if (pair1[0] == key) {
        return pair1[1];
      }
    }
  };

  /*Function to Prepare body for getting  tokens
   */

  const toGetFormBody = (secret) => {
    const body = {
      grant_type: "authorization_code",
      client_id: `${process.env.REACT_APP_FR_CLIENT_ID}`,
      client_secret: `${process.env.REACT_APP_FR_CLIENT_SECRET}`,
      redirect_uri: `${process.env.REACT_APP_FR_REDIRECT_URI}`,
      code: secret,
      state: `${process.env.REACT_APP_FR_STATE}`,
    };

    return Object.keys(body)
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(body[key])
      )
      .join("&");
  };

  useEffect(() => {
    if (window.location.href.includes("#")) {
      const code = getQuerystring("code", window.location.href);
      console.log(code, "GOT CODE");
      if (code) {
        // Make POST CALL
        console.log("code", code);
        tokensApiCall(code);
      }
    } else {
        redirectFRLogin(); //if # not available
    }
  }, []);


  /*Function to get Access Token and id Token
  */
  const tokensApiCall = async (code) => {
    const responseTokens = await axios
      .post(`${process.env.REACT_APP_FR_TOKENS_API}`, toGetFormBody(code), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
      })
      .then((response) => {
        console.log(response);
        navigate("/Dashboard");
        return response;
      })
      .catch((err) => {
        console.log("error", err.toJSON(), err.name, err.fileName, err.message);
        return err;
      });
    if (responseTokens.data.access_token || responseTokens.data.id_token) { 
        setTokens(responseTokens);
        //Decoding Access Token and ID Token
        localStorage.setItem("access_token", responseTokens.data.access_token);
        localStorage.setItem("id_token", responseTokens.data.id_token);   
        // Cookies.set('access_token', responseTokens.data.access_token, { httpOnly: true }); 
        // Cookies.set('id_token',responseTokens.data.id_token , { httpOnly: true }); 
    } else {
      console.log("error", responseTokens.data.message);
    }
  };

  return (
    <div className="text-center body">
      {/* <main className="form-signin w-100 m-auto">
        <form>
          <img
            className="mb-5"
            src={Telefonicalogo}
            alt=""
            style={{ maxWidth: "200px" }}
          />
          <h1 className="h3 mb-5 fw-normal">SINGLE SIGN ON</h1>
          <div className="input-group has-validation mb-3">
            <span className="input-group-text text-bg-dark">
              <i className="bi bi-person-fill"></i>
            </span>
            <input
              type="text"
              className="form-control text-bg-dark"
              id="username"
              placeholder="Username"
              required=""
            />
            <div className="invalid-feedback">Your username is required.</div>
          </div>
          <div className="input-group has-validation mb-3">
            <span className="input-group-text text-bg-dark">
              <i className="bi bi-lock-fill"></i>
            </span>
            <input
              type="password"
              className="form-control text-bg-dark"
              id="password"
              placeholder="Password"
              required=""
            />
            <div className="invalid-feedback">Your username is required.</div>
          </div>

          <button
            className="w-100 btn btn-primary"
            type="submit"
            onClick={moveToDashboard}
          >
            LOGIN
          </button>
          <b>OR</b>
          <button
            className="w-100 btn btn-primary"
            type="button"
            onClick={() => openInNewTab()}
          >
            LOGIN with SSO
          </button>
        </form>
      </main>
      <footer style={{ position: "absolute", bottom: "10px", width: "100%" }}>
        <div className="container-fluid d-flex justify-content-between flex-wrap">
          <div className="col-md-4 d-flex align-items-center">
            <span className="mb-md-0 text-muted" style={{ marginLeft: "30px" }}>
              © Telefonica Germany GmbH & Co. OHG
            </span>
          </div>

          <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li style={{ marginRight: "30px" }} className="text-muted">
              Version 2.1.4 Release
            </li>
          </ul>
        </div>
      </footer> */}
    </div>
  );
}

export default Login;
