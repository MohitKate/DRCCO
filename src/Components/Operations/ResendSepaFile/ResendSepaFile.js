import React, { useState,useEffect } from "react";

import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import { Table, Row, Col, Input, Button, Spinner } from "reactstrap";
import Moment from "moment";

import {
  faMagnifyingGlass,faHandPointer,
  faAnglesLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import swal from "sweetalert";
import { GetAllReconciliationFiles,ResendSepaFileCall,GetPain008TotalNumberOfRecordsSepaFileList,  RetrieveTransactionsPain0001OutPutEntry } from "../../Constants/AxiosHandler/request";
import Header from "../../GlobalComponents/Header/Header";
import "./ResendSepaFile.css";
import {
  GfileType,
  GReconciliatioStatus,
  Gstatus,
  pain002NCAMT053Status,
} from "../../Constants/constant";
import PaginationComponent from "../../GlobalComponents/paginationation/Pagination";
import FromDatePicker from "../../GlobalComponents/FromDateorCreationDatePicker/FromDatePicker";
import ToDatePicker from "../../GlobalComponents/ToDatePicker/ToDatePicker";

import { useNavigate,useLocation } from "react-router-dom";
function ResendPain008SepaFile() {

  const location = useLocation();
  //Variables for SSO
  const [isRole, setIsRole] = useState(false);
  const [userName, setUserName] = useState("");
  const [isActive, setIsActive]=useState(false)
  const [bothfromDateTime, setBothfromDateTime] = useState("");
  const [bothtoDateTime, setBothtoDateTime] = useState("");
  const [countSrNo, setCountSrNo] = useState(1);
  const [showloaderMainTable, setShowloaderMainTable] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchedValue, setSearchedValue] = useState("");
  const [showMainTable, setShowMainTable] = useState(true);
  const [approvalStatus, setApprovalStatus] = useState("");
  const [fileType, setFiletype] = useState("FileType");
  const [swictchToTransactions, setSwictchToTransactions] = useState(false);
  const [swictchToMainScreen, setSwictchToMainScreen] = useState(true);
  const [showloader, setShowloader] = useState(false);
  const navigate=useNavigate();
  
  const [totalNumberOfRecords, setTotalNumberOfRecords] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const [countOfRecords, setCountOfRecords] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [fromDate2Time, setFromDate2Time] = useState(
    Moment(new Date()).format("HH:mm:ss")
  );
  const [toDate2Time, setToDate2Time] = useState(
    Moment(new Date()).format("HH:mm:ss")
  );
  const [fromDate, setFromDate] = useState(new Date());
  const [fromDate2, setFromDate2] = useState(
    Moment(new Date()).format("yyyy-MM-DD")
  );
  const [toDate, setToDate] = useState(new Date());
  const [toDate2, setToDate2] = useState(
    Moment(new Date()).format("yyyy-MM-DD")
  );

  const [allReconciliationFilesData, setAllReconciliationFilesData] =
    useState();
  const [
    allReconciliationFilesDataStatus,
    setAllReconciliationFilesDataStatus,
  ] = useState();
  const [statusMessageOfData, setStatusMessageOfData] = useState("");


  const [
    retrieveTransactionsPain0001OutPutEntryCAMTnApprovednRejectedTable2,
    setRetrieveTransactionsPain0001OutPutEntryCAMTnApprovednRejectedTable2,
  ] = useState([]);
  const [
    reportCAMTnApprovednRejectedMessage2,
    setReportCAMTnApprovednRejectedMessage2,
  ] = useState("");
  const [
    reportCAMTnApprovednRejectedMessage2Status,
    setReportCAMTnApprovednRejectedMessage2Status,
  ] = useState("");

  /*Function to work when  from Date is Changed from DatePicker

	*/

  const updatedFromDate = (date) => {
    setFromDate2Time(Moment(date).format("HH:mm:ss"));
    setFromDate(date);
    const formatDate = Moment(date).format("yyyy-MM-DD");
    setFromDate2(formatDate);
  };

  /*Function to work when To Date is Changed from DatePicker
   */

  const updatedToDate = (date) => {
    setToDate2Time(Moment(date).format("HH:mm:ss"));
    setToDate(date);
    const formatDate = Moment(date).format("yyyy-MM-DD");
    setToDate2(formatDate);
  };

  /*Function runs to get SepaFileList for Approval

	*/

  const getSepaFileListForApproval = async (start = 0, recordCount = 10) => {
    var status = approvalStatus;
    var start = start;
    var recordCount = recordCount;

    if (fileType == GfileType[1]) {
      status = "";
    }
    

    setBothfromDateTime(fromDate2 + "T" + fromDate2Time);
    setBothtoDateTime(toDate2 + "T" + toDate2Time);
    const payload = {
      start: start,
      count: recordCount,
      filetype: fileType,
      status: status,
      fromDate: fromDate2 + "T" + fromDate2Time,
      toDate: toDate2 + "T" + toDate2Time,
    };

    const response = await GetAllReconciliationFiles(payload);
    if (response.message == "" && response.status == "success") {
      getPain008CountOfAllRecords(payload);
      setAllReconciliationFilesDataStatus(response.status);
      setAllReconciliationFilesData(response.reconciledData);
      setStatusMessageOfData(response.message);
    }
    
    setAllReconciliationFilesData(response.reconciledData);
    setStatusMessageOfData(response.message);
    setAllReconciliationFilesDataStatus(response.status);
  };


    /*Function runs to get TOTAL COUNT  of Pain008 from SepaFileListApprova.

	*/

  const getPain008CountOfAllRecords = async (payload) => {
    const { status, fromDate, toDate } = payload;
    let payload1 = {
      fromDate: fromDate,
      toDate: toDate,
      status: status,
    };
    const response = await GetPain008TotalNumberOfRecordsSepaFileList(payload1);
    if (response.message == "") {
      setTotalNumberOfRecords(response.Pain008FileCount);
    }
  };


    /*Function runs when we change page number in Pagination
   */

    const changePageSepa = (e) => {
      console.log(e);
      console.log(
        e * countOfRecords,
        countOfRecords,
        ":OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO"
      );
      setCountSrNo(e * countOfRecords + 1);
      getSepaFileListForApproval(e * countOfRecords, countOfRecords);
      setStartIndex(e * countOfRecords);
      setCurrentPage(e);
    };

  /*Function require when click on SEARCH Button

	*/

  const searchRecords = async () => {
    if (fileType === "FileType") {
      swal("Please select File Type!");
    } else {
      getSepaFileListForApproval(0, 10);
    }
  };

  const selectApprovalStatus = (status) => {
    setApprovalStatus(status);
  };
  const selectCountOfRecords = (countofRecords) => {
    getSepaFileListForApproval(startIndex, countofRecords);
    setCountOfRecords(countofRecords);
    setCountSrNo(1);
    
  };
  /*Function run when Report type is seleceted
   */
  const selectFileType = (filetype) => {
    setFiletype(filetype);
  };

  //Function run when Click on SepaFile  For Main  Table or Navigate Based on Status and FileType
  const clickedOnSepaFile = (record) => {
    const {
      sepaFileId,
      status,
      filename,
      numberOfTransactions,
      amount,
      businessType,
    } = record;

    
    CAMTnApprovednRejectedTable(sepaFileId, status);
      navigate(
        `/Dashboard/Operations/ResendSepaFile/pain008Transactions/sepaFileId=${sepaFileId}`
      );
    setSwictchToMainScreen(false);
    setSwictchToTransactions(true)

   
  };

  /*Function to set Variables when Click on Status Column to check the Transaction Details
   */
  const OpenPopForTransactionDetails = (record) => {};

  /*Function to set Variables when Click on PAIN001 and CAMT054 Column to check the Status Details
   */
  const OpenReconciledPain002andCamt054popupStatus = (record) => {};



  const callResendAPI=async(sepaFileId)=>{
    let payload={
      fileId:sepaFileId
    }

    const response=await ResendSepaFileCall(payload);
    console.log(response);
    if(response.status=='success'){
      swal({
        title: "",
        text: `Resend Request Submitted Successfully!`,
        icon: "success",
        button: "OK",
      });
     
      getSepaFileListForApproval(startIndex, countOfRecords);
    }

  }
  const Reset = () => {
    navigate(`/Dashboard/Operations/ResendSepaFile`);
    setSwictchToMainScreen(true);
    setSwictchToTransactions(false)
  };

  /*Function when we Click on Back button

	*/
  const moveToMainscreen = () => {
    Reset();
  };

   /*Functions runs when Click on SepaFile for  CAMT054 FileType
   */

   const CAMTnApprovednRejectedTable = async (sepafileid, status) => {
   
    setShowloader(true);
    let payload = {
      sepaFileId: sepafileid,
      filetype: fileType,
      status: "",
      fromDate: bothfromDateTime,
      toDate: bothtoDateTime,
    };
    const response = await RetrieveTransactionsPain0001OutPutEntry(payload);
    console.log(response, "CAMT and approved or Rejected Table");
    if (response.message == "") {
      setShowloader(false);
      setRetrieveTransactionsPain0001OutPutEntryCAMTnApprovednRejectedTable2(
        response.transactionsData
      );
      setReportCAMTnApprovednRejectedMessage2(response.message);
      setReportCAMTnApprovednRejectedMessage2Status(response.status);
    }
    setShowloader(false);
    setRetrieveTransactionsPain0001OutPutEntryCAMTnApprovednRejectedTable2(
      response.transactionsData
    );
    setReportCAMTnApprovednRejectedMessage2(response.message);
    setReportCAMTnApprovednRejectedMessage2Status(response.status);
  };



  const saveSearchedValue=(val)=>{
    setSearchValue(val)
  }

    /*Function to check token in LocalStorage and extract the roles and set the State
   */

    const toGetRoles = () => {
      if (localStorage.getItem("id_token")) {
        let decoded_token = jwt_decode(localStorage.getItem("id_token"));
        let allowedRoles=process.env.REACT_APP_ALLOWEDROLES;
        const userRoles = decoded_token?.roles || [];
       if(decoded_token?.roles){
         console.log(decoded_token?.roles);
        
         const hasAllowedRole = userRoles.some(role => allowedRoles.includes(role));
         setIsRole(hasAllowedRole);
         setUserName(decoded_token.subname);
       }
  
      
      }
    };
  
    useEffect(() => {
      console.log(location.pathname,"Loc");
      toGetRoles();
      setIsActive(true);

      const handleBackButton = (event) => {
        event.preventDefault();
        navigate(`/Dashboard/Operations/ResendSepaFile`);
        setSwictchToMainScreen(true);
        setSwictchToTransactions(false);
      };
      window.addEventListener("popstate", handleBackButton);

      return () => {
        window.removeEventListener("popstate", handleBackButton);
      };
    }, []);

  return (
    <div>
      <Header isActive={isActive}  />

      {swictchToMainScreen ? (
        <section>
          <div className="container-fluid">
            <p >
              <span style={{ float: "left", fontSize: "12px" }}>
               <b>Operations /</b>
                <span
                  style={{
                    color: "#06608e",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  Resend Pain008 SepaFile
                </span>
              </span>
            </p>
            <br />

            <Row>
              <Col>
                <Table id="topTable" className="table-bordered">
                  <tbody>
                    <tr>
                      <td className="lbltd">
                        File Type:<span style={{ color: "red" }}>*</span>
                      </td>
                      <td className="resend-input-width">
                        <Input
                          className="resend-dropdown shadow-sm"
                          onChange={(e) => selectFileType(e.target.value)}
                          bsSize="sm"
                          type="select"
                          value={fileType}
                        >
                          <option value="FileType">FileType</option>
                          <option value={GfileType[2]}>PAIN_008</option>
                        </Input>
                      </td>
                      <td className="lbltd">
                        From:<span style={{ color: "red" }}>*</span>
                      </td>
                      <td className="resend-input-width">
                        {" "}
                        <FromDatePicker
                          onDateChange={updatedFromDate}
                          date={fromDate}
                          showTimeSelect={"showTimeSelect"}
                          istime={true}
                          limitrange={toDate}
                        />
                      </td>
                      <td className="lbltd">
                        To:<span style={{ color: "red" }}>*</span>
                      </td>
                      <td className="resend-input-width">
                        <ToDatePicker
                          onDateChange={updatedToDate}
                          date={toDate}
                          showTimeSelect={"showTimeSelect"}
                          istime={true}
                          limitrange={fromDate}
                        />
                      </td>
                      <td className="lbltd"></td>
                      <td className="fldtd">
                        <Button
                          block
                          style={{"borderRadius":"0"}}
                          color="primary"
                          size=""
                          onClick={searchRecords}
                        >
                          SEARCH
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      <td className="lbltd">Status:</td>
                      <td className="resend-input-width">
                        <Input
                          onChange={(e) => selectApprovalStatus(e.target.value)}
                          bsSize=""
                          value={approvalStatus}
                          className="resend-dropdown shadow-sm"
                          type="select"
                        >
                          <option value="">Select Status</option>
                          <option value={Gstatus[0]}>OPEN</option>
                          <option value={Gstatus[1]}>APPROVED</option>
                          <option value={Gstatus[2]}>NOT_APPROVED</option>
                          <option value={Gstatus[3]}>PROCESSED</option>
                        </Input>
                      </td>

                      <td className="lbltd"></td>
                      <td className="fldtd"></td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>

            <br />

            {/* Table */}
            <Row>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginTop: "-26px",
                }}
              >
                <div>
                  <div
                    className={
                      showMainTable
                        ? "row searchbar-visible"
                        : "row searchbar-notvisible"
                    }
                  >
                    <div className="col-md-6">
                      <div className="show-entries">
                        <label className="pe-1 ms-4">Show</label>
                        <select
                          onChange={(e) => selectCountOfRecords(e.target.value)}
                        >
                          <option value="10">10</option>
                          <option value="15">15</option>
                          <option value="25">25</option>
                        </select>
                        <label className="ps-1">entries</label>
                      </div>
                    </div>
                    <div className="col-md-6" style={{ zIndex: "-2px" }}>
                      <div
                        className="input-group mb-2"
                        style={{
                          float: "right",
                          margin: "auto",
                          width: "300px",
                          zIndex: "-2px",
                        }}
                      >
                       
                       <input
                          type="text"
                          className="form-control text-bg-white style-for-search"
                          id="username"
                          placeholder="Search Here and Click.."
                          autoComplete="off"
                          onChange={(e) => saveSearchedValue(e.target.value)}
                        />
                        <span
                          className="input-group-text"
                          style={{
                            backgroundColor: "#91bed5"
                            
                            
                          }}
                          onClick={()=>setSearchedValue(searchValue)}>
                          {" "}
                          <FontAwesomeIcon icon={faHandPointer} size="lg"
                        
                           />
                        </span>
                      </div>
                    </div>
                  </div>

                  {showloaderMainTable ? (
                    <div className="text-center m-5 p-5">
                      <Spinner
                        color="primary"
                        style={{
                          height: "3rem",
                          width: "3rem",
                        }}
                      >
                        Loading...
                      </Spinner>
                    </div>
                  ) : (
                    ""
                  )}

                  {showMainTable ? (
                    <Table
                      bordered
                      responsive
                      className="tableFordata mb-0 bg-white"
                      size="sm"
                      style={{ textAlign: "left" }}
                    >
                      <thead>
                        <tr style={{ textAlign: "center" }}>
                          <th>Sr.No</th>
                          <th>FILE NAME</th>
                          <th>FILE TYPE</th>
                          <th>TEF IBAN</th>
                          <th>AMOUNT</th>
                          <th>
                            NUM OF
                            <br /> TRANSACTIONS
                          </th>
                          <th>TRANSACTION TYPE</th>
                          <th>MESSAGE ID</th>
                          <th>
                            SEPA
                            <br /> CREATION DATE
                          </th>
                          <th>STATUS</th>
                          <th>RECONCILE PAIN002</th>
                          <th>RECONCILE CAMT053</th>
                          <th>ACTION</th>
                        </tr>
                      </thead>

                      <tbody>
                        {allReconciliationFilesDataStatus === "success" &&
                        allReconciliationFilesData.length > 0 &&
                        statusMessageOfData == "" ? (
                          allReconciliationFilesData
                            ?.filter((record) => {
                              if (searchedValue == "" || searchValue=="")  {
                                return record;
                              } else if (
                                record?.fileReference?.includes(searchedValue.trim()) ||
                                record?.status?.includes(searchedValue.trim()) ||
                                record?.approverUser?.includes(searchedValue.trim()) ||
                                String(record.amount)
                                .includes(searchedValue.trim()) ||
                                (record?.numberOfTransactions===Number(searchedValue)) ||
                                String(record.companyCode).includes(searchedValue.trim()) ||
                                record.filetype.includes(searchedValue.trim()) ||
                                record.filename?.includes(searchedValue.trim()) ||
                                record.iban.includes(searchedValue.trim()) ||
                                Moment(record.sepaCreationDate).format(
                                  "YYYY-MM-DD"
                                ).includes(searchedValue.trim()) 
                              ) {
                                return record;
                              }

                            })
                            .map((record, i) => {
                              return (
                                <tr key={i}>
                                  <td style={{ textAlign: "center" }}>
                                    {i + countSrNo}
                                  </td>
                                  <td className="sepafilelink">
                                    <a
                                      onClick={() => clickedOnSepaFile(record)}
                                    >
                                      {record.filename}
                                    </a>
                                  </td>
                                  <td style={{ textAlign: "center" }}>
                                    {record.filetype}
                                  </td>

                                  <td>{record.iban}</td>
                                  <td>
                                    <span
                                      style={{ float: "right", border: "none" }}
                                    >
                                      &#x20AC;{record.amount}
                                    </span>
                                  </td>
                                  <td>
                                    <span
                                      style={{ float: "right", border: "none" }}
                                    >
                                      {record.numberOfTransactions}
                                    </span>
                                  </td>
                                  <td style={{ textAlign: "center" }}>CCT</td>
                                  <td>{record.fileReference}</td>

                                  <td style={{ textAlign: "center" }}>
                                    {record.sepaCreationDate
                                      ? Moment(record.sepaCreationDate).format(
                                          "YYYY-MM-DD"
                                        )
                                      : ""}
                                  </td>
                                  <td style={{ textAlign: "center" }}>
                                    {record.status == Gstatus[1] ? (
                                      <Button
                                        size="sm"
                                        style={{ backgroundColor: "green" }}
                                      >
                                        NEW
                                      </Button>
                                    ) : record.status == Gstatus[0] ? (
                                      <Button
                                        size="sm"
                                        style={{
                                          backgroundColor: "#ffbf00",
                                          color: "black",
                                        }}
                                        onClick={() =>
                                          OpenPopForTransactionDetails(record)
                                        }
                                      >
                                        {record.status}
                                      </Button>
                                    ) : record.status == Gstatus[2] ? (
                                      <Button
                                        size="sm"
                                        style={{ backgroundColor: "red" }}
                                      >
                                        {record.status}
                                      </Button>
                                    ) : record.status == Gstatus[3] ? (
                                      <Button
                                        size="sm"
                                        style={{ backgroundColor: "green" }}
                                      >
                                        {record.status}
                                      </Button>
                                    ) : (
                                       <Button
                                        size="sm"
                                        style={{ backgroundColor: "red" }}
                                      >
                                        {record.status}
                                      </Button>
                                    )}
                                  </td>
                                  <td style={{'textAlign':'center'}}>  <Button
                                          size="sm"
                                          style={{
                                            backgroundColor:
                                            record.reconcilePain002?.pain002ReconcileStatus
                                               ===
                                              pain002NCAMT053Status[2]
                                                ? "red"
                                                :record.reconcilePain002?.pain002ReconcileStatus
                                                    ===
                                                  pain002NCAMT053Status[1]
                                                ? "green"
                                                : record.reconcilePain002?.pain002ReconcileStatus
                                                    ===
                                                  pain002NCAMT053Status[0]
                                                ? "#ffbf00"
                                                : "",
                                            color:
                                            record.reconcilePain002?.pain002ReconcileStatus
                                                 ===
                                              pain002NCAMT053Status[0]
                                                ? "black"
                                                : "",
                                            fontSize: true ? "12px" : "",
                                            height: true ? "28px" : "",
                                          }}
                                          onClick={() =>
                                            OpenReconciledPain002andCamt054popupStatus(
                                              record
                                            )
                                          }
                                        >
                                          {record.reconcilePain002?.pain002ReconcileStatus}
                                        </Button></td>
                                  <td style={{'textAlign':'center'}}> <Button
                                        size="sm"
                                        style={{
                                          color:
                                            record.reconcilePain002?.status ===
                                            pain002NCAMT053Status[0]
                                              ? "black"
                                              : "",
                                          backgroundColor:
                                            record.reconcileCamt053?.status ===
                                            pain002NCAMT053Status[0]
                                              ? "#ffbf00"
                                              : record.reconcileCamt053
                                                  ?.status ===
                                                pain002NCAMT053Status[1]
                                              ? "green"
                                              : record.reconcileCamt053
                                                  ?.status ===
                                                pain002NCAMT053Status[2]
                                              ? "red"
                                              : "",
                                          fontSize: true ? "12px" : "",
                                          height: true ? "28px" : "",
                                        }}
                                        onClick={() =>
                                          OpenReconciledPain002andCamt054popupStatus(
                                            record
                                          )
                                        }
                                      >
                                        {record.reconcileCamt053?.status}
                                      </Button></td>

                                  {
                                    <td>
                                      { (record.status==Gstatus[3]) &&(record.reconcileCamt053?.status==GReconciliatioStatus[0] && record.reconcilePain002?.pain002ReconcileStatus==GReconciliatioStatus[0])? (
                                        <Button
                                          style={{ backgroundColor: "#495ede" }}
                                          size="sm"
                                          onClick={()=>callResendAPI(record.sepaFileId)}
                                        >
                                          RESEND
                                        </Button>
                                      ) : (
                                        ""
                                      )}
                                    </td>
                                  }
                                </tr>
                              );
                            })
                        ) : allReconciliationFilesDataStatus == "success" &&
                          statusMessageOfData !== "" ? (
                          <tr>
                            <td
                              colSpan="18"
                              style={{
                                border: "none",
                                color: "red",
                                textAlign: "center",
                                fontSize: "14px",
                              }}
                            >
                              {statusMessageOfData}
                            </td>
                          </tr>
                        ) : (
                          <tr style={{ border: "none" }}>
                            <td
                              colSpan="18"
                              style={{
                                color: "red",
                                textAlign: "center",
                                fontSize: "16px",
                                border: "none",
                              }}
                            >
                              No Data Available in Table
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </Table>

                  ) : (
                    ""
                  )}

                  <div className="mainPagination">

                    {totalNumberOfRecords?<PaginationComponent
                     Arraydata={totalNumberOfRecords}
                     changePageSepa={changePageSepa}
                     countOfRecords={countOfRecords}
                     forcePage={currentPage}
                    />:""}
                  </div>
                </div>
              </div>
            </Row>
          </div>
        </section>
      ) : (
        ""
      )}

{swictchToTransactions ? (
    
       <section className="transactions-table">
          <p style={{'width':'103%', 'marginTop':'10px'}}>
            <span style={{ "float": "left","fontSize":'12px',"marginLeft":"20px" }}>
              ResendSepaFile{" "}
              <span
                style={{
                  color: "#06608e",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                {" "}
                /ResendSepaFile Transactions
              </span>
            </span>{" "}
          {" "}
          <span
            style={{
              color: "#06608e",
              fontSize: "12px",
              fontWeight: "bold",
              marginLeft: "63%",
              cursor: "pointer",
            }}
            onClick={moveToMainscreen}
          >
            <FontAwesomeIcon icon={faAnglesLeft} />
            Back
          </span>
          </p>
          <div className="camt-pagination">
            {/* {retrieveTransactionsPain0001OutPutEntryCAMTTable2?.length > 0 ? <PaginationComponent
							Arraydata={retrieveTransactionsPain0001OutPutEntryCAMTTable2}
						/> : ""} */}
          </div>
          {showloader ? (
            <div className="text-center m-5 p-5">
              <Spinner
                color="primary"
                style={{
                  height: "3rem",
                  width: "3rem",
                }}
              >
                Loading...
              </Spinner>
            </div>
          ) : (
            <div className="container">
              <Table
                bordered={true}
                responsive
                className="bg-white"
                size="sm"
                style={{ textAlign: "center" }}
              >
                <thead>
                  <tr>
                    <th>FILE REFERENCE</th>
                    <th>END TO END ID</th>
                    <th>TRANSACTION AMOUNT</th>
                    <th>TRANSACTION TYPE</th>
                  <th>STATUS</th>
                  </tr>
                </thead>
                <tbody>
                  {reportCAMTnApprovednRejectedMessage2Status === "success" &&
                  retrieveTransactionsPain0001OutPutEntryCAMTnApprovednRejectedTable2.length >
                    0 &&
                  reportCAMTnApprovednRejectedMessage2 == "" ? (
                    retrieveTransactionsPain0001OutPutEntryCAMTnApprovednRejectedTable2?.map(
                      (record, index) => {
                        return (
                          <tr key={index}>
                            <td>{record.messageId}</td>
                            <td>{record.endToEndId}</td>
                            <td>
                              <span style={{ float: "right", border: "none" }}>
                                &#x20AC;{record.instructedAmount}
                              </span>
                            </td>
                            <td style={{ textAlign: "center" }}>
                              {record.transactionType}
                            </td>
                              <td>{record.status}</td>
                           
                          </tr>
                        );
                      }
                    )
                  ) : reportCAMTnApprovednRejectedMessage2Status == "success" &&
                    reportCAMTnApprovednRejectedMessage2 !== "" ? (
                    <tr>
                      <td
                        colSpan="5"
                        style={{
                          border: "none",
                          color: "red",
                          textAlign: "center",
                          fontSize: "16px",
                        }}
                      >
                        {reportCAMTnApprovednRejectedMessage2}
                      </td>
                    </tr>
                  ) : (
                    <tr style={{ border: "none" }}>
                      <td
                        colSpan="4"
                        style={{
                          color: "red",
                          textAlign: "center",
                          fontSize: "16px",
                          border: "none",
                        }}
                      >
                        No Data Available
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </div>
          )}
        </section>
      
       
      ) : (
        ""
      )}
    </div>
  );
}

export default ResendPain008SepaFile;
