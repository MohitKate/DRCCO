import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Row, Col, Table, Input, Button } from "reactstrap";
import swal from "sweetalert";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jwt_decode from "jwt-decode";
import Moment from "moment";
import "./NotInTimeProcessedTransaction.css";

import Header from "../../GlobalComponents/Header/Header";


import { GfileType, Gstatus } from "../../Constants/constant";

import { GetNotProcessedPain008Transactions } from "../../Constants/AxiosHandler/request";
import FromDatePicker from "../../GlobalComponents/FromDateorCreationDatePicker/FromDatePicker";
import ToDatePicker from "../../GlobalComponents/ToDatePicker/ToDatePicker";
import { useNavigate } from "react-router-dom";


function NotInTimeProcessedTransaction() {
  const [fromDate, setFromDate] = useState(new Date());
  const [isActive, setIsActive]=useState(false)
  const navigate = useNavigate();

  
  const [fromDate2, setFromDate2] = useState(
    Moment(new Date()).format("yyyy-MM-DD")
  );


  const [fromDate2Time, setFromDate2Time] = useState(
    Moment(new Date()).format("HH:mm:ss")
  );
  const [toDate, setToDate] = useState(new Date());
  const [toDate2, setToDate2] = useState(
    Moment(new Date()).format("yyyy-MM-DD")
  );

  const [toDate2Time, setToDate2Time] = useState(
    Moment(new Date()).format("HH:mm:ss")
  );
  const [
    notProcessedPain008TransactionsTable,
    setNotProcessedPain008TransactionsTable,
  ] = useState();
  const [notProcessedPain008TransactionsTableStatus, setNotProcessedPain008TransactionsTableStatus]=useState('')
  const [notProcessedPain008TransactionsTableMessage, setNotProcessedPain008TransactionsTableMessage]=useState('')

  //Variables for SSO
  const [isRole, setIsRole] = useState(false);
 const [userName, setUserName]=useState('')
 

  /*Function to work when  from Date is Changed from DatePicker

	*/

  const updatedFromDate = (date) => {
    setFromDate2Time(Moment(date).format("HH:mm:ss"));
    setFromDate(date);
    const formatDate = Moment(date).format("yyyy-MM-DD");
    setFromDate2(formatDate);
  };

  const searchRecords = async () => {
    console.log(fromDate2+"T"+fromDate2Time,"LLLLLLLLLLL");
    let payload = {
      date: fromDate2+"T"+fromDate2Time,
    };

    const response = await GetNotProcessedPain008Transactions(payload);
    console.log(response);
    if(response.status=='success' && response.message==''){
      setNotProcessedPain008TransactionsTable(response.notProcessedTransactions);
      setNotProcessedPain008TransactionsTableStatus(response.status);
      setNotProcessedPain008TransactionsTableMessage(response.message)
    }else{
      setNotProcessedPain008TransactionsTable(response.notProcessedTransactions);
      setNotProcessedPain008TransactionsTableStatus(response.status);
      setNotProcessedPain008TransactionsTableMessage(response.message)
    }
  };

  /*Function to check that below Roles are available or not

	*/
  const checkRoles = (data) => {
    switch (data) {
      case "PAYMENT_ADMIN":
      case "PAYMENT_OTCSupervisor":
      case "PAYMENT_TreasurySupervisor":
        return true;
        break;
      default:
        return false;
        break;
    }
  };

  /*Function to check token in LocalStorage and extract the roles and set the State
   */
  const toGetRoles = () => {
    if (localStorage.getItem("id_token")) {
      let decoded_token = jwt_decode(localStorage.getItem("id_token"));
      let allowedRoles=process.env.REACT_APP_ALLOWEDROLES;
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
    setIsActive(true)
  }, []);

  const changePageSepa = (e) => {
    console.log(e);
  };

  return (
    <div>
      <div>
        <Header isActive={isActive} />
      </div>

      <div className="container-fluid">
        {true ? (
          <section>
            <div style={{ marginTop: "10px" }}>
              <div style={{ marginLeft: "5px" }}>
                <span className="resendsepafile-navigationroute">
                  <b>Operations/</b>{" "}
                  <span style={{ color: "#06608e", fontWeight: "bold" }}>
                    Not In Time Processed Transactions
                  </span>
                </span>
              </div>
           
            </div>

            <br />
            <br />

            <div style={{'marginLeft':'15px'}}>
            <Row >  
          <Col  xs="2" sm="2" md="2"  >
          < >
                  <b style={{'fontSize':"12px","float":'left'}}>Date:<span style={{ color: "red" }}>*</span></b>
                </>
                <FromDatePicker
                          onDateChange={updatedFromDate}
                          date={fromDate}
                          showTimeSelect={"showTimeSelect"}
                          istime={true}
                        />
          </Col>
         
       
                   
        <Col  xs="2" sm={{offset:1}} md="2" >
        <>
        <b style={{'fontSize':"12px","float":'left'}}>File Type:<span style={{ color: "red" }}>*</span></b>
                </>
                <Input
                          className="notIntime-dropdown shadow-sm"
                          bsSize="sm"
                          type="select" 
                          style={{'width':'103%'}}
                        >
                          <option value="">FileType</option>
                          <option value={GfileType[2]}>PAIN_008</option>
                          <option value={GfileType[0]}>PAIN_001_001_03</option>
                        </Input>
        
        </Col>
                       
               
               
            
             
             <Col xs="4" sm={{offset:3}} md="4">
             <Button color="primary" style={{'width':'184px',"height":'35px',"borderRadius":'0',"marginTop":'17px'
         ,"marginLeft":'208px' }} onClick={searchRecords}>
                    SEARCH
                  </Button>
             </Col>
             
             
              
                
              
            
          
        </Row>
        </div>
        <br/>
           <div className="container-fluid">
           <Table responsive bordered className="bg-white mb-0" id="not-intimeTable">
              <thead>
                <tr>
                 
                <th>FILE TYPE</th>
                  <th>END TO END ID</th>
                  <th>
                    SEPA
                    <br /> MANDATE IBAN
                  </th>
                  <th>
                    SEPA
                    <br />
                    MANDATE BIC
                  </th>
                  <th>
                    PAYMENT
                    <br /> METHOD REFERENCE
                  </th>
                  <th>
                  SEPA<br/> MANDATE OWNER
                  </th>
                  <th>
                    BANK
                    <br /> PROCESSING DATE
                  </th>
                  <th>
                    CREATION
                    <br /> DATE
                  </th>
                  <th>
                    TRANSACTION
                    <br /> AMOUNT
                  </th>
                  <th>STATUS</th>
                  {/* <th>ACTION</th> */}
                </tr>
              </thead>
              <tbody>
                {(notProcessedPain008TransactionsTableStatus=='success') && (notProcessedPain008TransactionsTableMessage=="") ? (
                  notProcessedPain008TransactionsTable.map((record, i) => {
                    return (
                      <tr key={i}>
                        <td>PAIN_008</td>
                        <td>{record.endToEndId}</td>
                        <td>{record.sepaMandateIBAN}</td>
                        <td>{record.sepaMandateBIC}</td>
                        <td>{record.paymentMethodReference}</td>
                        <td>{record.sepaMandateName}</td>
                        <td>
                          {Moment(record.bankProcessingDate).format(
                            "yyyy-MM-DD"
                          )}
                        </td>
                        <td>
                          {Moment(record.createdDate).format("yyyy-MM-DD")}
                        </td>
                        <td style={{ textAlign: "right" }}>
                          &#x20AC;{record.amount}
                        </td>
                        <td>{record.status}</td>
                        {/* <td>
                          {" "}
                          {checkRoles(role) && record.status == Gstatus[0] ? (
                            <Button
                              style={{ backgroundColor: "#495ede" }}
                              size="sm"
                              onClick={() => {
                                swal({
                                  title: "",
                                  text: `Resend has been Updated Successfully!`,
                                  icon: "success",
                                  button: "OK",
                                });
                              }}
                            >
                              RESEND
                            </Button>
                          ) : (
                            ""
                          )}
                        </td> */}
                      </tr>
                    );
                  })
                ) : (notProcessedPain008TransactionsTableStatus=='success') && (notProcessedPain008TransactionsTableMessage!=="") ? (
                  <tr>
                    <td colSpan="12" style={{ border: "none" }}>
                      <h4 className="ErrorMessage">{notProcessedPain008TransactionsTableMessage}</h4>
                    </td>
                  </tr>
                ) : (
                  <>
                    <tr>
                      <td
                        colSpan="16"
                        style={{ border: "none", textAlign: "center" }}
                      >
                        <h4 className="ErrorMessage">No Data Available</h4>
                      </td>
                    </tr>
                  </>
                )}
              </tbody>
            </Table>

           </div>
           
           
          </section>
          
        ) : (
          ""
        )}
         <div style={{'float':'right','marginTop':"10px"}}>
              {notProcessedPain008TransactionsTable?.length > 0 ? (
                <></>
              ) : (
                ""
              )}
            </div>
         
      </div>
     
    </div>
  );
}

export default NotInTimeProcessedTransaction;
