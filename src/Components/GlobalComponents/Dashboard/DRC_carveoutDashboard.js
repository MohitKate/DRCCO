import React, { useEffect, useState } from 'react';
import './DRC_carveoutDashboard.css'

import jwt_decode from "jwt-decode";
import Add_Role from '../../../Assets/image/AddRole1.png';
import NoteImg from '../../../Assets/image/note.png';
import Remove_Role from '../../../Assets/image/RemoveRole1.png';
import CAMT054_Reports from '../../../Assets/image/reports.png';
import SepaFileReconcilandStatus from '../../../Assets/image/sepa_file.png'
import Role_List_Report from '../../../Assets/image/role_list.png';
import Header from '../Header/Header'
import { Outlet, useNavigate, Link } from 'react-router-dom';

import {
  Row, Col, Button, UncontrolledDropdown, DropdownToggle,
  DropdownMenu, DropdownItem, ButtonGroup, Card, Table, Input, Dropdown, PaginationItem, Pagination, PaginationLink
} from 'reactstrap';
import swal from "sweetalert";

function DRC_CarveoutDashboard() {
   //Roles that we get from Localstorage
   const [isRole, setIsRole] = useState(false);
   const [userName, setUserName] = useState("");
   const [isActiveDashboard,setIsActiveDashboard]=useState(false)
  const navigate = useNavigate();

  // const navigateToCAMTReport = () => {
  //   navigate('/ReportSection_CAMT054')
  // }
  // const navigateToReconcillationReport = () => {
  //   navigate('/ReconcilationReport')

  // }
  const backtoLogin = () => {
    navigate('/')

  }
  // const navigatetoFileApproval=()=>{
  //   navigate('/SepaFileApproval')

  // }

    /*Function to check token in LocalStorage and extract the roles and set the State
   */

    const toGetRoles = () => {
      if (localStorage.getItem("id_token")) {
        let decoded_token = jwt_decode(localStorage.getItem("id_token"));
        let allowedRoles=process.env.REACT_APP_ALLOWEDROLES
        const userRoles = decoded_token?.roles || [];
       if(decoded_token?.roles){
  
         const hasAllowedRole = userRoles.some(role => allowedRoles.includes(role));
         setIsRole(hasAllowedRole);
         setUserName(decoded_token.subname);
       }
  
      
      }
    };
  
    useEffect(() => {

      
      toGetRoles();
     

      setIsActiveDashboard(true)
    }, [isRole]);


  return (
    <div style={{ 'backgroundColor': '#d9e3e4' }}>
  

     <div>

    
     <Header  isActiveDashboard={isActiveDashboard}/>
      

     
      <div className='container'>
      <Row className='py-5'>
      <Col xs='12' lg='4' xxl='4' >
      <Link to='/Dashboard/Operations/SepaFileApprovalReconcileStatus' className='addRoles'>
      <Card className='Card shadow-sm myCard'>
        <div className='card-body'>
        <img src={SepaFileReconcilandStatus}  className='card-icon'/>
        <p className='card-title'>Sepafile Approval and <br/>Reconcile Status</p>
        </div>
      </Card>
      </Link>
        </Col>
        <Col xs='12' lg='4' xxl='4' >
      <Link to='/Dashboard/Reports/Pain008AccompanyingNote' className='addRoles'>
      <Card className='Card shadow-sm myCard'>
        <div className='card-body'>
        <img src={NoteImg}  className='card-icon'/>
        <p className='card-title'>PAIN008 Accompanying <br/>Note</p>
        </div>
      </Card>
      </Link>
        </Col>
        <Col xs='12' lg='4' xxl='4' >
      <Link to='/Dashboard/Report_CAMT054' className='addRoles'>
      <Card className='Card shadow-sm myCard'>
        <div className='card-body'>
        <img src={CAMT054_Reports}  className='card-icon'/>
        <p className='card-title'>CAMT054 Report<br/>&nbsp;</p>
        </div>
      </Card>
      </Link>
        </Col>
      
       
        
        </Row>
      
      </div>

      </div>
    
    </div>
  )
}

export default DRC_CarveoutDashboard
