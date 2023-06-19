

import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import jwt_decode from "jwt-decode";
import "./font/BootstrapIcons.css";
import Telefonicalogo from "../../../Assets/image/Telefónica_2021_white.png";
import { LogOutFR } from "../../Constants/AxiosHandler/request";
import Avatar from "../../../Assets/image/ppl.png";
import "./Header.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Col, Row } from "reactstrap";
import UserPopDetails from "./UserPopDetails/UserPopDetails";


// let useClickOutside=(handler)=>{
//   let domNode=useRef();

//   useEffect(()=>{
//     let maybeHandler=(event)=>{
//       if(!domNode.current.contains(event.target)){
//         handler();

//       }
//     }
//       document.addEventListener('mousedown',maybeHandler);

//       return ()=>{
//         document.removeEventListener('mousedown', maybeHandler);
//       }
//   });

//   return domNode;
// }

function Header(props) {
  const { isActive, isActiveCamt, isActiveDashboard } = props
  const navigate = useNavigate();
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  const [userName, setUserName] = useState("");
  //Roles that we get from Localstorage
  const [isRole, setIsRole] = useState(false);

  const moveToDashboard = () => {
    navigate("/Dashboard");
  };

  /*Function to Logout and Clear the Cookies and LocalStorage
   */

  const clearLocalNCookiesandLogOut = async () => {

    let payload = {
      id_token_hint: localStorage.getItem('id_token'),
      post_logout_redirect_uri: process.env.REACT_APP_FR_REDIRECT_URI,
      client_id: process.env.REACT_APP_FR_CLIENT_ID
    }
    const response = await LogOutFR(payload);
    console.log(response);
    if (response) {
      localStorage.clear();
      // navigate('/');

    }



  };
  /*Function to check token in LocalStorage and extract the roles and set the State
   */

  const toGetRoles = () => {
    if (localStorage.getItem("id_token")) {
      let decoded_token = jwt_decode(localStorage.getItem("id_token"));
      let allowedRoles = process.env.REACT_APP_ALLOWEDROLES
      const userRoles = decoded_token?.roles || [];
      if (decoded_token?.roles) {

        const hasAllowedRole = userRoles.some(role => allowedRoles.includes(role));
        setIsRole(hasAllowedRole);
        setUserName(decoded_token.subname);
      }


    }
  };

  useEffect(() => {



    toGetRoles();


  }, [isRole]);



  return (
    <div>
      <header className="p-1 text-bg-dark container-fluid">
        <div className="container-fluid">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a className="nav-item d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
              <img src={Telefonicalogo} className="logo" />
            </a>

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li className="nav-item" >
                <a
                  className={isActiveDashboard ? "nav-link is-active" : "nav-link"}
                  style={{ cursor: "pointer" }}
                  onClick={moveToDashboard}
                >
                  Dashboard
                </a>
              </li>

              {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle " role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Role Management
                </a>
                <ul className="dropdown-menu">
                  <li><Link className="dropdown-item" to="/Dashboard/Add_Role">Add Role</Link></li>
                  <li><a className="dropdown-item" href="./">Remove Role</a></li>

                </ul>
              </li>  */}
              <li className="nav-item dropdown" >
                <a
                  className={isActive ? 'nav-link dropdown-toggle is-active' : "nav-link dropdown-toggle"}
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Operation
                </a>
                <ul className="dropdown-menu" id="header-dropdown"  >
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/Dashboard/Operations/SepaFileApprovalReconcileStatus"
                    >
                      <small>SepaFileApprovalApprovalReconcileStatus</small>
                    </Link>
                  </li>
                  {/*                  
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/Dashboard/Operations/CAMT054EntrieswithErrorState"
                    >
                      <small>CAMT054EntrieswithErrorState</small>
                    </Link>
                  </li> */}
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/Dashboard/Operations/Pain008AdHocSearchTransactions"
                    >
                      <small>Pain008AdHocSearchTransactions</small>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/Dashboard/Operations/NotInTimeProcessedTransaction"
                    >
                      <small>NotInTimeProcessedTransaction</small>
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="dropdown-item"
                      to="/Dashboard/Operations/ResendSepaFile"
                    >
                      <small>ResendSepaFile</small>
                    </Link>
                  </li>


                  <li>
                    <Link
                      className="dropdown-item"
                      to="/Dashboard/Operations/ConfigMasterBankAccounts"
                    >
                      <small>ConfigureMasterBankAccounts</small>
                    </Link>
                  </li>
                  {/* <li>
                    <Link
                      className="dropdown-item"
                      to="/Dashboard/Operations/camt053Credits"
                    >
                      <small>Camt053 Credits</small>
                    </Link>
                  </li> */}
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a
                  className={isActiveCamt ? 'nav-link dropdown-toggle is-active' : "nav-link dropdown-toggle"}
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Reports
                </a>
                <ul className="dropdown-menu" id="header-dropdown">
                  <li>
                    <Link

                      className="dropdown-item"
                      to="/Dashboard/Report_CAMT054"
                    >
                      <small>CAMT054 Reports</small>
                    </Link>
                  </li>

                  <li>
                    <Link

                      className="dropdown-item"
                      to="/Dashboard/Reports/Pain008AccompanyingNote"
                    >
                      <small>Pain008 AcompayningNote</small>
                    </Link>
                  </li>
                  <li>
                    <Link

                      className="dropdown-item"
                      to="/Dashboard/Reports/Pain001AccompanyingNote"
                    >
                      <small>Pain001 AccompanyingNote</small>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>

            <div className="text-end align-items-center justify-content-center text-center" >
              <a
                className="nav-link nav-profile d-flex align-items-center pe-0 "
                href="#"
                data-bs-toggle="dropdown"
                aria-expanded="true"
              >
                <img src={Avatar} alt="Profile" className="rounded-circle" />
              </a>


              <div
                id="profile"

                className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profileLogout"
                data-popper-placement="bottom-end"
              >
                <UserPopDetails />
              </div>




            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Header;
