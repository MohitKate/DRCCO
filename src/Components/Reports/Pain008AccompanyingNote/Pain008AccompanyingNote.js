import React, { useEffect, useRef, useState } from "react";
import {
  Row,
  Table,
  Button,
  Col,
  Label,
  Dropdown,Spinner,
  DropdownItem,
} from "reactstrap";
import Header from "../../GlobalComponents/Header/Header";
import {
  GetPain008TransactionNoteList,
  GetPain008TransactionNoteListPagination,
} from "../../Constants/AxiosHandler/request";
import DownloadImage from "../../../Assets/image/download (1).png";
import "./Pain008AccompanyingNote.css";
import Moment from "moment";
import DatePicker from "react-datepicker";

import FromDatePicker from "../../GlobalComponents/FromDateorCreationDatePicker/FromDatePicker";
import ToDatePicker from "../../GlobalComponents/ToDatePicker/ToDatePicker";
import Pagination from "../../GlobalComponents/paginationation/Pagination";

function Pain008AccompanyingNote() {
  const [isActiveCamt, setIsActiveCamt] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showloaderMainTable, setShowloaderMainTable] = useState(false);
  const [showMainTable, setShowMainTable] = useState(true);
  const [fromDate2, setFromDate2] = useState(
    Moment(new Date()).format("YYYY-MM-DD")
  );
  const [toDate2, setToDate2] = useState(
    Moment(new Date()).format("YYYY-MM-DD")
  );
  const [fromDate2Time, setFromDate2Time] = useState(
    Moment(new Date()).format("HH:mm:ss")
  );
  const [toDate2Time, setToDate2Time] = useState(
    Moment(new Date()).format("HH:mm:ss")
  );
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [countSrNo, setCountSrNo] = useState(1);
  const [totalNoOfRecords, setTotalNoOfRecords] = useState();
  const [currentPage, setCurrentPage] = useState(0);


  const [startIndex, setStartIndex] = useState(0);
  const [countOfRecords, setCountOfRecords] = useState(5);

  const [pain008TransactionNoteList, setPain008TransactionNoteList] = useState(
    []
  );
  const [pain008TransactionNoteListBody, setPain008TransactionNoteListBody] =
    useState([]);
  const [
    pain008TransactionNoteListStatus,
    setPain008TransactionNoteListStatus,
  ] = useState("");
  const [
    pain008TransactionNoteListMessage,
    setPain008TransactionNoteListMessage,
  ] = useState("");

  /*Function to Open the DownloadDropdown
   */

  const toggleDowloadDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

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



  const SearchPain008TransactionNoteList = async (startindex =0,countOfrecords = 5) => {
    let start = startindex;
    let recordCount = countOfrecords;
    setShowloaderMainTable(true);
    setShowMainTable(false)
   

    let payload = {
      start: start,
      count: recordCount,
      fromDate: fromDate2 + "T" + fromDate2Time,
      toDate: toDate2 + "T" + toDate2Time,
    };

     GetPain008TransactionNoteListCount(payload);


    const response = await GetPain008TransactionNoteList(payload);

    console.log(response);
    if (response.message == "") {
    
      setShowloaderMainTable(false);
      setShowMainTable(true)
      setPain008TransactionNoteList(response.Pain008TransactionNoteList);
      setPain008TransactionNoteListStatus(response.status);
      setPain008TransactionNoteListMessage(response.message);
    } else {
      setShowloaderMainTable(false);
      setShowMainTable(true);
      setPain008TransactionNoteListStatus(response.status);
      setPain008TransactionNoteListMessage(response.message);
    }
  };

  const GetPain008TransactionNoteListCount = async (payload) => {
    const { fromDate, toDate } = payload;

    const payload1 = {
      fromDate: fromDate,
      toDate: toDate,
    };
    const response = await GetPain008TransactionNoteListPagination(payload1);
    if(response.status=='success' && response.message==''){
      setTotalNoOfRecords(response.Pain008TransactionCount)
    }
  };

  const changePageSepa = (e) => {
    SearchPain008TransactionNoteList(e * countOfRecords, countOfRecords);
    setCountSrNo(e * countOfRecords + 1);
    setStartIndex(e * countOfRecords);
    setCurrentPage(e);
  };

  const adjustBody=(body)=>{
      const splitedString = body.split("\n");
     return splitedString.map((part)=>{
        let parts=part.split(":");
        return parts[0]?<span><span><b>{parts[0]}</b>{":"}{parts[1]}</span><br /></span>:""
      })
    
  }



  useEffect(()=>{
    setIsActiveCamt(true);
  })
  return (
    <div>
      <div>
        <Header  isActiveCamt={isActiveCamt}/>
        
      </div>

      <div className="pain008navigationroute">
        <b>Report Section/</b>{" "}
        <span style={{ color: "#06608e", fontWeight: "bold" }}>
         Pain008 Accompanying Note
        </span>
      </div>
      <br />
      <div style={{"marginLeft":'19px'}}>
        <Row >
          <Col xs="2" sm="2" md="2">
           
              <>
                <b style={{'fontSize':"12px","float":"left"}}>FROM:<span style={{ color: "red" }}>*</span></b>
                
                </>
              <FromDatePicker
                          onDateChange={updatedFromDate}
                          date={fromDate}
                          showTimeSelect={"showTimeSelect"}
                          istime={true}
                          limitrange={toDate}
                        />
                     
                      
                      
                       
           
          </Col>
          

          <Col  xs="2" sm={{offset:1}} md="2">
           
             <>
                <b style={{'fontSize':"12px","float":"left"}}>TO: <span style={{ color: "red" }}>*</span></b>
               
                </>
              <ToDatePicker
                          onDateChange={updatedToDate}
                          date={toDate}
                          showTimeSelect={"showTimeSelect"}
                          istime={true}
                          limitrange={fromDate}
                        />
           
          </Col>
          
          <Col xs="4" sm={{offset:3}} md="4">
            <>
            </>
            <Button
             style={{'width':'184px',"height":'35px',"borderRadius":'0',"marginTop":'20px',
             "marginLeft":'208px'
            }}
              color="primary"
              onClick={()=>SearchPain008TransactionNoteList(0,5)}
            >
              SEARCH
            </Button>
          </Col>
          
        </Row>
      </div>
      <br />
      <div className="container-fluid">
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
       {showMainTable? <Table
          responsive
          bordered
          className="mt-2 bg-white mb-0 accompayningnote-table"
        >
          <thead>
            <tr>
            <th className="tableheaders">Sr.No</th>
              <th className="tableheaders">SEPA FILE ID</th>
              <th className="tableheaders">DATE MAIL</th>
              <th className="tableheaders">BODY</th>
              <th className="tableheaders">CREATED USER</th>
            </tr>
          </thead>
          <tbody>
            {pain008TransactionNoteListStatus == "success" &&
            pain008TransactionNoteList?.length > 0 &&
            pain008TransactionNoteListMessage == "" ? (
              pain008TransactionNoteList.map((record, i) => {
                return (
                  <tr key={i}>
                    <td>{i+countSrNo}</td>
                    <td>{record.id}</td>
                    <td>{record.dateMail}</td>
                    <td style={{ textAlign: "left" }}>
                      {adjustBody(record.body)}
                    </td>
                    <td>{record.createdUser}</td>
                  </tr>
                );
              })
            ) : pain008TransactionNoteListStatus == "success" &&
              pain008TransactionNoteListMessage !== "" ? (
              <tr>
                <td colSpan="12" style={{ border: "none" }}>
                  <h4 className="ErrorMessage">
                    {pain008TransactionNoteListMessage}
                  </h4>
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
        </Table>:""}
      </div>

     {pain008TransactionNoteList?.length > 0? <div className="m-2" style={{'float':'right'}}>
        <Pagination
         
          Arraydata={totalNoOfRecords}
          changePageSepa={changePageSepa}
          countOfRecords={countOfRecords}
          forcePage={currentPage}
          Pain008AccompanyingNote={true}
        />
      </div>:""}
     
    </div>
  );
}

export default Pain008AccompanyingNote;
