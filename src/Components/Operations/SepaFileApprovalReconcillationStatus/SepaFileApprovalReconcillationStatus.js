import React, { useState, useEffect } from "react";
import swal from "sweetalert";
import { Row, Col, Input, Button, Table, Spinner } from "reactstrap";

import Moment from "moment";
import { faAnglesLeft, faHandPointer } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import jwt_decode from "jwt-decode";
import PaginationComponent from "../../GlobalComponents/paginationation/Pagination";
import Header from "../../GlobalComponents/Header/Header";
import {
  GetAllReconciliationFiles,
  ProcessReconcileSepaFile,
  RetrieveTransactionsCountPain001nCAMT0n102,
  RetrieveTransactionsCountPain008,
  ApproveSepaFileData,
  RetrieveTransactionsPain0001OutPutEntry,
  RejectSepaFileTransaction,
  GetPain008TransactionAccompayningNotes,
  GetPain008TotalNumberOfRecordsSepaFileList,
  GetCAMTnPain001TotalNumberOfRecords,
} from "../../Constants/AxiosHandler/request";
import { useNavigate } from "react-router-dom";
import ReconcileStatusPain002andCamt054Popup from "./Popups/ReconcileStatusPain002andCamt054Popup/ReconcileStatusPain001NPain002NCamt054Popup";
import FromDatePicker from "../../GlobalComponents/FromDateorCreationDatePicker/FromDatePicker";
import ToDatePicker from "../../GlobalComponents/ToDatePicker/ToDatePicker";
import ApprovePopup from "./Popups/ApprovePopup/ApprovePopup";
import SepaFileTransactionDetailsPopup from "./Popups/SepaFileTransactionDetailsPopup/SepaFileTransactionDetailsPopup";
import AcompayningNote from "./Popups/AcompayningNotePopup/AcompayningNote";
import "./SepaFileApprovalReconcillationStatus.css";
import {
  Gstatus,
  GfileType,
  pain002NCAMT053Status,
} from "../../Constants/constant";

function SepaFileApprovalReconcillationStatus(props) {
  //Variables for SSO
  const [isRole, setIsRole] = useState(false);
  const [isPayment_OTCSupervisorAvailable, setIsPayment_OTCSupervisorAvailable] = useState(false);
  const [userName, setUserName] = useState("");

  //Datepiker variables

  const [isActive, setIsActive] = useState(false);
  let fromDate21 = Moment(new Date().setDate(new Date().getDate() - 7)).format(
    "yyyy-MM-DD"
  );

  const [fromDate, setFromDate] = useState(
    new Date().setDate(new Date().getDate() - 7)
  );
  const [fromDate2, setFromDate2] = useState(fromDate21);

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

  const [bothfromDateTime, setBothfromDateTime] = useState("");
  const [bothtoDateTime, setBothtoDateTime] = useState("");

  const [countSrNo, setCountSrNo] = useState(1);

  //Boolean To switch to differrent Table
  const [swictchScreenInApproveTable, setSwictchScreenInApproveTable] =
    useState(false);
  const [swictchToMainScreen, setSwictchToMainScreen] = useState(true);
  const [
    swictchScreenCAMTnApprovednRejectednProcessedTable,
    setSwictchScreenCAMTnApprovednRejectednProcessedTable,
  ] = useState(false);

  /*Variable for Pagination*/
  const [startIndex, setStartIndex] = useState(0);
  const [countOfRecords, setCountOfRecords] = useState(10);
  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageOfRetriveTransactions, setCurrentPageOfRetriveTransactions] = useState(0);
  const [startIndexOfRetriveTransactions, setStartIndexOfRetriveTransactions] = useState(0);

  const [currentPageOfInApprovalRetriveTransactions, setCurrentPageOfInApprovalRetriveTransactions] = useState(0);
  const [startIndexOfInApprovalRetriveTransactions, setStartIndexOfInApprovalRetriveTransactions] = useState(0);


  const [currentPageOfRejectedRetriveTransactions, setCurrentPageOfRejectedRetriveTransactions] = useState(0);
  const [startIndexOfRejectedRetriveTransactions, setStartIndexOfRejectedRetriveTransactions] = useState(0);

  const [totalNumberOfRecords, setTotalNumberOfRecords] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const userPerPage = 10;
  const pageVisited = pageNumber * userPerPage;

  const [fileType, setFiletype] = useState(GfileType[2]);
  const [approvalStatus, setApprovalStatus] = useState("");
  const [fileApprovalStatus, setFileApprovalStatus] = useState("");

  const navigate = useNavigate();

  //Variables of Approved/Not Approvaed/In_Approval, Main Table, CAMT Table, REJECTED Tab Tablr and Rejected Tab

  const [allReconciliationFilesData, setAllReconciliationFilesData] =
    useState();
  const [
    allReconciliationFilesDataStatus,
    setAllReconciliationFilesDataStatus,
  ] = useState();
  const [statusMessageOfData, setStatusMessageOfData] = useState("");

  const [
    tableRetriveTransactionsForAllFileType,
    setTableRetriveTransactionsForAllFileType,
  ] = useState([]);
  const [
    tableRetriveTransactionsForAllFileTypeStatus,
    setTableRetriveTransactionsForAllFileTypeStatus,
  ] = useState("");
  const [
    tableRetriveTransactionsForAllFileTypeMessage,
    setTableRetriveTransactionsForAllFileTypeMessage,
  ] = useState("");
  const [sepaFileId, setSepaFileId] = useState();

  const [
    totalCountRecordsRetriveTransactions,
    setTotalCountRecordsRetriveTransactions,
  ] = useState(0);

  //Variables for POP UP
  const [fileName, setFileName] = useState("");
  const [numberOfTransaction, setNumberOfTransaction] = useState();
  const [amount, setAmount] = useState();
  const [bussinessType, setBussinessType] = useState("");
  const [reconcileFileName, setReconcileFileName] = useState("");

  const [
    popup2InSepaFileandReconcillationStatus,
    setPopup2InSepaFileandReconcillationStatus,
  ] = useState(false);
  const [
    popup3InSepaFileandReconcillationStatus,
    setPopup3InSepaFileandReconcillationStatus,
  ] = useState(false);
  const [
    popup4InSepaFileandReconcillationStatus,
    setPopup4InSepaFileandReconcillationStatus,
  ] = useState(false);

  const [showloader, setShowloader] = useState(false);
  const [showloaderMainTable, setShowloaderMainTable] = useState(false);

  const [searchValue, setSearchValue] = useState("");
  const [searchedValue, setSearchedValue] = useState("");
  const [showMainTable, setShowMainTable] = useState(true);

  const [approvedBy, setApprovedBy] = useState("");
  const [text, setText] = useState("");
  const [transationId, setTransationId] = useState();
  const [endToEndId, setEndToEndId] = useState("");
  const [messageId, setMessageId] = useState("");
  const [rejectedByForPop, setRejectedByForPop] = useState("");
  const [objectTosetpain001npain002ncamt054Popup, setObjectTosetpain001npain002ncamt054Popup] = useState();
  const [objectToSetPain002Popup, setObjectToSetPain002Popup] = useState();

  const [accompayningNote, setAccompayningNote] = useState(false);
  const [accompayningNoteTable, setAccompayningNoteTable] = useState({});
  const [accompayningNoteTableBody, setAccompayningNoteTableBody] = useState();
  const [accompayningMessage, setAccompayningMessage] = useState("");
  const [clickedOnTab, setclickedOnTab] = useState(false)



  const clickedOnInApprovalTab = (sepafileid, status, currentPageOfInApprovalRetriveTransactions) => {


    if (fileType == GfileType[2]) {
      RetrieveTransactionsTotalCountPain008InApprovalnRejectedTab(sepafileid, Gstatus[0]);
      retriveTransactionsTable(sepafileid, status, currentPageOfInApprovalRetriveTransactions * 10)
    } else {
      RetrieveTransactionsTotalCountInApprovalnRejectedTab(sepafileid, status)
      retriveTransactionsTable(sepafileid, status, currentPageOfInApprovalRetriveTransactions)
    }

  }

  /*Retrive Transactions API Functions runs when Click on SepaFile
   */

  const retriveTransactionsTable = async (sepafileid, status, start = 0) => {

    if (
      status !== Gstatus[0]
    ) {
      status = "";
    }

    setShowloaderMainTable(true);
    setShowMainTable(false);
    let payload = {
      start: start,
      endToEndId: "",
      amountGeaterEqualsThan: 0.0,
      sepaFileId: sepafileid,
      filetype: fileType,
      status: status,
      fromDate: bothfromDateTime,
      toDate: bothtoDateTime,
    };
    const response = await RetrieveTransactionsPain0001OutPutEntry(payload);
    if (response.message == "") {
      setShowloaderMainTable(false);
      setShowMainTable(true);
      setTableRetriveTransactionsForAllFileType(response.transactionsData);
      setTableRetriveTransactionsForAllFileTypeMessage(response.message);
      setTableRetriveTransactionsForAllFileTypeStatus(response.status);
    }
    setShowloaderMainTable(false);
    setShowMainTable(true);
    setTableRetriveTransactionsForAllFileType(response.transactionsData);
    setTableRetriveTransactionsForAllFileTypeMessage(response.message);
    setTableRetriveTransactionsForAllFileTypeStatus(response.status);
  };

  const RetrieveTransactionsTotalCountPain008 = async (sepafileid, status) => {
    if (status !== Gstatus[0]) {
      status = ''
    }

    let payload = {
      sepaFileId: sepafileid,
      filetype: fileType,
      status: status,
      fromDate: bothfromDateTime,
      toDate: bothtoDateTime,
    };

    const response = await RetrieveTransactionsCountPain008(payload);
    if (response.message == "") {
      setTotalCountRecordsRetriveTransactions(response.Pain008TransactionCount);
    }
  };

  const RetrieveTransactionsTotalCount = async (sepafileid, status) => {


    if (status !== Gstatus[0]) {
      status = ''
    }

    let payload = {
      sepaFileId: sepafileid,
      filetype: fileType,
      status: status,
      fromDate: bothfromDateTime,
      toDate: bothtoDateTime,
    };

    const response = await RetrieveTransactionsCountPain001nCAMT0n102(payload);

    if (response.message == "") {
      setTotalCountRecordsRetriveTransactions(response.transactionListCount);
    }
  };


  const RetrieveTransactionsTotalCountPain008InApprovalnRejectedTab = async (sepafileid, status) => {
    if (status == Gstatus[0]) {
      status = Gstatus[0]
    } else if (status == Gstatus[2]) {
      status = Gstatus[2];
    } else {
      status = ""
    }

    let payload = {
      sepaFileId: sepafileid,
      filetype: fileType,
      status: status,
      fromDate: bothfromDateTime,
      toDate: bothtoDateTime,
    };

    const response = await RetrieveTransactionsCountPain008(payload);
    if (response.message == "") {
      setTotalCountRecordsRetriveTransactions(response.Pain008TransactionCount);
    }
  };

  const RetrieveTransactionsTotalCountInApprovalnRejectedTab = async (sepafileid, status) => {


    if (status == Gstatus[0]) {
      status = Gstatus[0]
    } else if (status == Gstatus[2]) {
      status = Gstatus[2];
    } else {
      status = ""
    }

    let payload = {
      sepaFileId: sepafileid,
      filetype: fileType,
      status: status,
      fromDate: bothfromDateTime,
      toDate: bothtoDateTime,
    };

    const response = await RetrieveTransactionsCountPain001nCAMT0n102(payload);

    if (response.message == "") {
      setTotalCountRecordsRetriveTransactions(response.transactionListCount);
    }
  };

  /*Function to Iterate the Table in Ready for Approval Tab when click in Reject Button
   */
  const iterateTableWhenRejectinPop = async (sepaFileId, status, filetype, start) => {
    setTotalCountRecordsRetriveTransactions(0);
    let payload = {
      start: start,
      endToEndId: "",
      amountGeaterEqualsThan: 0.0,
      sepaFileId: sepaFileId,
      filetype: filetype,
      status: status,
      fromDate: bothfromDateTime,
      toDate: bothtoDateTime,
      count: numberOfTransaction,
    };
    const response = await RetrieveTransactionsPain0001OutPutEntry(payload);
    if (response.message == "") {
      setTableRetriveTransactionsForAllFileType(response.transactionsData);
      setTableRetriveTransactionsForAllFileTypeMessage(response.message);
      setTableRetriveTransactionsForAllFileTypeStatus(response.status);
    }
    setTableRetriveTransactionsForAllFileType(response.transactionsData);
    setTableRetriveTransactionsForAllFileTypeMessage(response.message);
    setTableRetriveTransactionsForAllFileTypeStatus(response.status);
  };



  /* Function to reject Transaction on click of Reject button in INApproval Table*/

  const rejectSepaFileTransaction = async (transactionId, endToEndId) => {
    setTableRetriveTransactionsForAllFileTypeMessage("");
    setTableRetriveTransactionsForAllFileTypeStatus("");
    setTableRetriveTransactionsForAllFileType([]);
    setShowloaderMainTable(true);
    setTotalCountRecordsRetriveTransactions(0)
    setShowMainTable(false);
    setEndToEndId(endToEndId);
    setRejectedByForPop(userName);
    let payload = {
      user: userName,
      sepaFileId: sepaFileId,
      transactionId: transactionId,
      filetype: fileType,
      infoList: [
        {
          pain008Id: transactionId,
          comment: "Some transactions have too big amount.",
        },
      ],
    };

    const response = await RejectSepaFileTransaction(payload);
    if (response.status == "success") {
      setShowloaderMainTable(false);
      setShowMainTable(true);
      swal({
        title: "Rejected!",
        text: `Transaction with ENDTOEND ID:${endToEndId} with fileReference ${fileName} Rejected Successfully!`,
        icon: "warning",
        button: "OK!",
        className: "style",
      });
      if (fileType == GfileType[2]) {//PAIN008
        RetrieveTransactionsTotalCountPain008InApprovalnRejectedTab(sepaFileId, fileApprovalStatus);
        iterateTableWhenRejectinPop(sepaFileId, fileApprovalStatus, fileType, startIndexOfInApprovalRetriveTransactions * 10);

      } else {
        RetrieveTransactionsTotalCountInApprovalnRejectedTab(sepaFileId, fileApprovalStatus);
        iterateTableWhenRejectinPop(sepaFileId, fileApprovalStatus, fileType, startIndexOfInApprovalRetriveTransactions);

      }

    }
  };

  /* Function  on click of REJECTED Tab to get all Rejected records*/

  const rejectedTabReports = async (numberOfTransaction) => {

    setTotalCountRecordsRetriveTransactions(0);
    setTableRetriveTransactionsForAllFileTypeMessage("");
    setTableRetriveTransactionsForAllFileTypeStatus("");
    setTableRetriveTransactionsForAllFileType([]);
    setclickedOnTab(true)
    if (fileType == GfileType[2]) {

      RetrieveTransactionsTotalCountPain008InApprovalnRejectedTab(sepaFileId, Gstatus[2])
    } else {
      RetrieveTransactionsTotalCountInApprovalnRejectedTab(sepaFileId, Gstatus[2])
    }

    let payload = {
      endToEndId: "",
      amountGeaterEqualsThan: 0.0,
      sepaFileId: sepaFileId,
      filetype: fileType,
      status: Gstatus[2],
      fromDate: bothfromDateTime,
      toDate: bothtoDateTime,
      count: 10,
      start: 0
    };
    const response = await RetrieveTransactionsPain0001OutPutEntry(payload);
    if (response.message == "") {
      setTableRetriveTransactionsForAllFileTypeMessage(response.message);
      setTableRetriveTransactionsForAllFileTypeStatus(response.status);
      setTableRetriveTransactionsForAllFileType(response.transactionsData);
    } else {
      setTableRetriveTransactionsForAllFileTypeMessage(response.message);
      setTableRetriveTransactionsForAllFileTypeStatus(response.status);
      setTableRetriveTransactionsForAllFileType(response.transactionsData);
    }
  };

  /*Function to set Variables when we click on SepaFile
   */
  const TosetVarialbes = (
    sepaFileId,
    status,
    filename,
    numberOfTransactions,
    amount,
    businessType
  ) => {
    setFileName(filename);
    setNumberOfTransaction(numberOfTransactions);
    setAmount(amount);
    setSepaFileId(sepaFileId);
    setBussinessType(businessType);
    setFileApprovalStatus(status);
  };

  /*Function run when Click on SepaFile  For Main  Table.
   */
  const clickedOnSepaFile = (record) => {
    const {
      filetype,
      sepaFileId,
      status,
      filename,
      numberOfTransactions,
      amount,
      businessType,
    } = record;

    TosetVarialbes(
      sepaFileId,
      status,
      filename,
      numberOfTransactions,
      amount,
      businessType
    );

    setNumberOfTransaction(numberOfTransactions);
    setTableRetriveTransactionsForAllFileTypeMessage("");
    setTableRetriveTransactionsForAllFileTypeStatus("");
    setTableRetriveTransactionsForAllFileType([]);

    setSwictchToMainScreen(false);
    if (status == Gstatus[0]) {
      //OPEN
      setSwictchScreenInApproveTable(true);
      setSwictchScreenCAMTnApprovednRejectednProcessedTable(false);
    } else {
      //APPROVED //CAMT054 // REJECTED //APPROVED //PROCESSED
      setSwictchScreenInApproveTable(false);
      setSwictchScreenCAMTnApprovednRejectednProcessedTable(true);
    }
    navigate(
      `/Dashboard/Operations/SepaFileApprovalReconcileStatus/retrieveTransactions?sepafileid=${sepaFileId}&filetype=${filetype.toLowerCase()}&status=${status.toLowerCase()}`
    );
    if (fileType == GfileType[2]) {//PAIN008
      if (status == Gstatus[0]) {
        setFileApprovalStatus(status)
      }
      RetrieveTransactionsTotalCountPain008(sepaFileId, status);
      retriveTransactionsTable(sepaFileId, status, 0);


    } else if (fileType == GfileType[0]) {
      if (status == Gstatus[0]) {
        setFileApprovalStatus(status)
      }
      RetrieveTransactionsTotalCount(sepaFileId, status);
      retriveTransactionsTable(sepaFileId, status, 0);

    }
    else {//PAIN001 and CAMT054 and CAMT054 version2
      RetrieveTransactionsTotalCount(sepaFileId, status);
      retriveTransactionsTable(sepaFileId, status, 0);
    }
  };

  /*Function to set Variables when Click on PAIN001 and CAMT054 Column to check the Status Details
   */
  const OpenReconciledPain002andCamt054popupStatus = (
    record
  ) => {
    
    if(record?.status==Gstatus[2]){
      setPopup2InSepaFileandReconcillationStatus(false);
    }else{
      setObjectTosetpain001npain002ncamt054Popup('')
      setObjectTosetpain001npain002ncamt054Popup(record);
      setObjectToSetPain002Popup(record?.reconcilePain002?.reconcilePain002FileList);
      setPopup2InSepaFileandReconcillationStatus(true);

    }
   
  };

  /*Function to set Variables when Click on Status Column to check the Transaction Details
   */
  const OpenPopForTransactionDetails = (record) => {
    setObjectTosetpain001npain002ncamt054Popup('')
    setObjectTosetpain001npain002ncamt054Popup(record);
    setPopup3InSepaFileandReconcillationStatus(true);
  };

  /*Function to Approve Transaction on click of Approve button in Main Page
   */

  const approveSepaFile = async (sepaFileId, approvedBy, messageid, record) => {
    const { filename, numberOfTransactions, amount, businessType } = record;

    setFileName(filename);
    setNumberOfTransaction(numberOfTransactions);
    setAmount(amount);
    setBussinessType(businessType);

    setMessageId(messageid);
    setPopup4InSepaFileandReconcillationStatus(true);
    setSepaFileId(sepaFileId);
    setApprovedBy(approvedBy);
  };

  const onDismissPop2 = () => {
    setPopup2InSepaFileandReconcillationStatus(
      !popup2InSepaFileandReconcillationStatus
    );
  };

  const ReconcileStatusPain001NPain002NCamt054PopupObject = {
    objectTosetpain001npain002ncamt054Popup,
    objectToSetPain002Popup,
    popup2InSepaFileandReconcillationStatus,
    onDismissPop2,
  };
  const onDismissPop3 = () => {
    setPopup3InSepaFileandReconcillationStatus(
      !popup3InSepaFileandReconcillationStatus
    );
  };

  const SepaFileTransactionDetailsPopupObject = {
    objectTosetpain001npain002ncamt054Popup,
    popup3InSepaFileandReconcillationStatus,
    onDismissPop3

  }


  const onDismissPops5 = () => {
    setAccompayningNote(!accompayningNote);
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

  /*Function runs to get SepaFileList for Approval

  */

  const getSepaFileListForApproval = async (start = 0, recordCount = 10) => {
   
    var status = approvalStatus;
    var start = start;
    var recordCount = recordCount;

    if (fileType == GfileType[1]) {
      status = "";
    }
    setShowloaderMainTable(true);
    setShowMainTable(false);

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
      setShowloaderMainTable(false);
      setShowMainTable(true);
      setAllReconciliationFilesDataStatus(response.status);
      setAllReconciliationFilesData(response.reconciledData);
      setStatusMessageOfData(response.message);
      if (
        fileType == GfileType[0] ||
        fileType == GfileType[1] ||
        fileType == GfileType[3]
      ) {
        getCAMTnPAin001CountOfAllRecords(payload);
      } else {
        getPain008CountOfAllRecords(payload);
      }
    }
    setShowloaderMainTable(false);
    setShowMainTable(true);
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

  /*Function runs to get TOTAL COUNT  of Pain001 and CAMT from SepaFileListApprova.

  */

  const getCAMTnPAin001CountOfAllRecords = async (payload) => {
    const { filetype, fromDate, toDate } = payload;
    let payload1 = {
      fromDate: fromDate,
      toDate: toDate,
      filetype: filetype,
    };
    const response = await GetCAMTnPain001TotalNumberOfRecords(payload1);
    setTotalNumberOfRecords(response.sepaFileListCount);
  };

  /*Function require when click on SEARCH Button

  */

  const searchRecords = async () => {
    console.log(isPayment_OTCSupervisorAvailable);
    setTableRetriveTransactionsForAllFileTypeMessage("");
    setTableRetriveTransactionsForAllFileTypeStatus("");
    setTableRetriveTransactionsForAllFileType([]);
    setCurrentPage(0);
    setCurrentPageOfRetriveTransactions(0);
    setCountSrNo(1);
    // if (fileType === "FileType") {
    //   swal("Please select File Type!");
    // } else {
    getSepaFileListForApproval(0, countOfRecords);
    //}
  };

  /*Function run when Report type is seleceted
   */
  const selectFileType = (filetype) => {
    setFiletype(filetype);
    setTotalNumberOfRecords(0);
    setAllReconciliationFilesData("");
    setCountSrNo(1);
    setCurrentPage(0);
    setTableRetriveTransactionsForAllFileTypeMessage("");
    setTableRetriveTransactionsForAllFileTypeStatus("");
    setTableRetriveTransactionsForAllFileType([]);
  };

  const selectApprovalStatus = (status) => {
    setApprovalStatus(status);
    setTotalNumberOfRecords(0);
    setAllReconciliationFilesData("");
    setCountSrNo(1);
    setCurrentPage(0);
    setTableRetriveTransactionsForAllFileTypeMessage("");
    setTableRetriveTransactionsForAllFileTypeStatus("");
    setTableRetriveTransactionsForAllFileType([]);
  };

  const selectCountOfRecords = (countofRecords) => {
    // getSepaFileListForApproval(startIndex, countofRecords);
    setCountOfRecords(countofRecords);
    setCountSrNo(1);
    setCurrentPage(0);
  };
  /*Function to Reset

*/
  const Reset = () => {
    if (fileType == GfileType[2] || fileType == GfileType[1]) {//PAIN008
      if (fileApprovalStatus == Gstatus[0]) {
        setFileApprovalStatus("")
      }
    }
    setCurrentPageOfInApprovalRetriveTransactions(0);
    setCurrentPageOfRetriveTransactions(0);
    setStartIndexOfRetriveTransactions(0)
    setTotalCountRecordsRetriveTransactions(0);
    setTableRetriveTransactionsForAllFileType([]);
    setTableRetriveTransactionsForAllFileTypeStatus("");
    setTableRetriveTransactionsForAllFileTypeMessage("");
    navigate(`/Dashboard/Operations/SepaFileApprovalReconcileStatus`);

    setSwictchScreenInApproveTable(false);
    setSwictchToMainScreen(true);
    setSwictchScreenCAMTnApprovednRejectednProcessedTable(false);
  };

  /*Function when we Click on Back button

  */
  const moveToMainscreen = () => {
    Reset();
  };

  /*Function run when comment  is there in Comment box and Approved

  */
  const textTypedandApproved = async () => {
    if (text == "") {
      swal("Please add the commnets!");
    } else {
      let payload = {
        sepaFileId: sepaFileId,
        user: userName,
        fileType: fileType,
        comment: text,
      };
      if (text) {
        const response = await ApproveSepaFileData(payload);
        if (response.status == "success" && response.message == "") {
          setPopup4InSepaFileandReconcillationStatus(false);
          swal({
            title: "Approved",
            text: `SepaFile with MessageId:${messageId} Approved Successfully!`,
            icon: "success",
            button: "ok",
          });

          // iterate main table again when click on Approved button
          getSepaFileListForApproval(startIndex, countOfRecords);
          setText("");
        }
      }
    }
  };

  /*Function to Check the lenght of THE TEXT TYPED IN cOMMENT BOX
   */
  const setTextandCheckLength = (text) => {
    if (text.length == 200) {
      swal("you can enter only 200 characters!");
    }
    setText(text);
  };

  /*Function run when Comment box is cancled

  */

  const cancleOfApprovePopup = () => {
    setPopup4InSepaFileandReconcillationStatus(false);
    setText("");
  };

  /*Function runs when we change page number in Pagination
   */

  const changePageSepa = (e, pageVisited, userPerPage) => {
    if (fileType == GfileType[2]) {
      setCountSrNo(e * countOfRecords + 1);
      getSepaFileListForApproval(e * countOfRecords, countOfRecords);
      setStartIndex(e * countOfRecords);
      setCurrentPage(e);
    } else {
      setCountSrNo(e * countOfRecords + 1);
      getSepaFileListForApproval(e, countOfRecords);
      setStartIndex(e);
      setCurrentPage(e);
    }
  };

  const changePageOfRetriveTransactions = (e) => {
    if (swictchScreenCAMTnApprovednRejectednProcessedTable && fileType == GfileType[2]) {
      retriveTransactionsTable(sepaFileId, approvalStatus, e * countOfRecords);
      setCurrentPageOfRetriveTransactions(e);
      setStartIndexOfRetriveTransactions(e);
    } else {
      retriveTransactionsTable(sepaFileId, approvalStatus, e);
      setCurrentPageOfRetriveTransactions(e);
      setStartIndexOfRetriveTransactions(e);

    }

  }

  const changePageOfInApprovalRetriveTransactions = (e) => {
    if (swictchScreenInApproveTable && fileType == GfileType[2]) {
      retriveTransactionsTable(sepaFileId, fileApprovalStatus, (e) * countOfRecords);
      setCurrentPageOfInApprovalRetriveTransactions(e);
      setStartIndexOfInApprovalRetriveTransactions(e);
    } else {
      retriveTransactionsTable(sepaFileId, fileApprovalStatus, e);
      setCurrentPageOfInApprovalRetriveTransactions(e);
      setStartIndexOfInApprovalRetriveTransactions(e);


    }
  }

  const changePageOfRejectedRetriveTransactions = (e) => {
    if (swictchScreenInApproveTable && fileType == GfileType[2]) {
      retriveTransactionsTable(sepaFileId, Gstatus[2], (e) * countOfRecords);
      setCurrentPageOfRejectedRetriveTransactions(e);
      setStartIndexOfRejectedRetriveTransactions(e);
    } else {
      retriveTransactionsTable(sepaFileId, Gstatus[2], e);
      setCurrentPageOfRejectedRetriveTransactions(e);
      setStartIndexOfRejectedRetriveTransactions(e);


    }
  }

  /*Function to check token in LocalStorage and extract the roles and set the State
   */

  const toGetRoles = () => {
    if (localStorage.getItem("id_token")) {
      let decoded_token = jwt_decode(localStorage.getItem("id_token"));
      let allowedRoles = ["PAYMENT_ADMIN","PAYMENT_OTCSupervisor","PAYMENT_TreasurySupervisor"]
      const userRoles = decoded_token?.roles || [];
        console.log(decoded_token?.roles);
        const hasAllowedRole = userRoles.some(role => allowedRoles.includes(role));
        const hasPaymentOTC_SupervisorRole = decoded_token?.roles.includes("PAYMENT_OTCSupervisor");
        setIsPayment_OTCSupervisorAvailable(hasPaymentOTC_SupervisorRole);
        console.log(hasPaymentOTC_SupervisorRole);
        console.log(hasAllowedRole);
        setIsRole(hasAllowedRole);
        setUserName(decoded_token.subname);
    }

  };

  useEffect(() => {
    toGetRoles();
    searchRecords();
    setIsActive(true);
    console.log(process.env.REACT_APP_ALLOWEDROLES, isRole);
  }, []);

  /*Function to Bold words and add breaks in String for Accomoayning Notes
   */
  const checkSpaceAndBoldWordsFromString = (str) => {
    let comingString = str.split("\n");
    const final = comingString.map((val) => {
      let splitedString = val.split(":");
      if (splitedString[0] !== "") {
        return (
          <p style={{ height: "4px" }}>
            <b>{splitedString[0]}:</b>
            {splitedString[1]}
          </p>
        );
      }
    });
    setAccompayningNoteTableBody(final);
  };

  /*Function to Open Note API Popup
	
  */
  const openAccompayningNote = async (sepafileid) => {
    let payload = {
      sepaFileId: sepafileid,
    };
    const response = await GetPain008TransactionAccompayningNotes(payload);
    if (response.message == "") {
      setAccompayningNoteTable(response.Pain008TransactionNotes);
      checkSpaceAndBoldWordsFromString(response.Pain008TransactionNotes.body);
      setAccompayningNote(!accompayningNote);
    } else {
      setAccompayningNote(!accompayningNote);
      setAccompayningMessage(response.message);
    }
  };


  const handleSearch = (e) => {
    e.preventDefault();
    if (e.target.searchInput.value == "") {
      setSearchedValue('')
    }
    console.log(e.target.searchInput.value);
    setSearchedValue(e.target.searchInput.value);

  }

  const processSepaFile=async(sepaid)=>{
    console.log(sepaid);
   const payload={
      sepaFileId:sepaid
    }

    const response = await ProcessReconcileSepaFile(payload);

    console.log(response);
   


  }


  return (
    <div data-testid="sepa-file-approval-reconciliation-status"
      className="sepa-file-approval-reconciliation-status">
      <Header isActive={isActive} />

      {swictchToMainScreen ? (
        <section>
          <div className="container-fluid">
            <p className="header">
              <span style={{ float: "left", fontSize: "12px" }}>
                <b>Operations/</b>{" "}
                <span
                  style={{
                    color: "#06608e",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  SepaFile Approval and Reconcile Status
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
                      <td className="fldtd">
                        <Input
                          className="sepa-dropdownCss shadow-sm"
                          onChange={(e) => selectFileType(e.target.value)}
                          bsSize="sm"
                          type="select"
                          style={{
                            width: "102%",
                          }}
                          value={fileType}
                          data-testid="select-element-test-id"
                        >
                          <option value={GfileType[2]}>PAIN_008</option>
                          <option value={GfileType[0]}>PAIN_001_001_03</option>
                          <option value={GfileType[1]}>CAMT_054_001_08</option>
                          <option value={GfileType[3]}>CAMT_054_001_02</option>
                        </Input>
                      </td>
                      <td className="lbltd">
                        From:<span style={{ color: "red" }}>*</span>
                      </td>
                      <td>
                        <div style={{ width: "111.5%" }}>
                          <FromDatePicker
                            onDateChange={updatedFromDate}
                            date={fromDate}
                            showTimeSelect={"showTimeSelect"}
                            istime={true}
                            limitrange={toDate}
                          />
                        </div>
                      </td>
                      <td className="lbltd">
                        To:<span style={{ color: "red" }}>*</span>
                      </td>
                      <td>
                        <div style={{ width: "70.5%" }}>
                          <ToDatePicker
                            onDateChange={updatedToDate}
                            date={toDate}
                            showTimeSelect={"showTimeSelect"}
                            istime={true}
                            limitrange={fromDate}
                          />
                        </div>
                      </td>
                      <td className="lbltd"></td>
                      <td className="fldtd">
                        <Button
                          block
                          color="primary"
                          style={{ borderRadius: "0" }}
                          size=""
                          onClick={searchRecords}
                        >
                          SEARCH
                        </Button>
                      </td>
                    </tr>
                    <tr>
                      {fileType !== GfileType[1] &&
                        fileType !== GfileType[3] ? (
                        <td className="lbltd">Status:</td>
                      ) : (
                        <td></td>
                      )}
                      <td className="fldtd">
                        {fileType !== GfileType[1] &&
                          fileType !== GfileType[3] ? (
                          <Input
                            onChange={(e) =>
                              selectApprovalStatus(e.target.value)
                            }
                            bsSize=""
                            value={approvalStatus}
                            className="sepa-dropdownCss shadow-sm"
                            style={{
                              width: "102%",
                            }}
                            type="select"
                          >
                            <option value="">Select Status</option>
                            <option value={Gstatus[0]}>IN_APPROVAL</option>
                            <option value={Gstatus[1]}>APPROVED</option>
                            <option value={Gstatus[2]}>NOT_APPROVED</option>
                            <option value={Gstatus[3]}>PROCESSED</option>
                          </Input>
                        ) : (
                          ""
                        )}
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
                        <label
                          className="pe-1 ms-4"
                          style={{ fontSize: "13px" }}
                        >
                          Show
                        </label>
                        <select
                          onChange={(e) => selectCountOfRecords(e.target.value)}
                          value={countOfRecords}
                        >
                          <option value="10">10</option>
                          <option value="15">15</option>
                          <option value="25">25</option>
                        </select>
                        <label className="ps-1" style={{ fontSize: "13px" }}>
                          entries
                        </label>
                      </div>
                    </div>
                    <div className="col-md-6" style={{ zIndex: "-2px" }}>
                      <form
                        className="input-group mb-2"
                        style={{
                          float: "right",
                          margin: "auto",
                          width: "300px",
                          zIndex: "-2px",
                        }}
                        onSubmit={handleSearch}
                      >
                        <input
                          type="text"
                          className="form-control text-bg-white style-for-search"
                          name="searchInput"
                          id="username"
                          placeholder="Search Here and Click.."
                          autoComplete="off"


                        />
                        <Button
                          className="input-group-text"
                          style={{
                            backgroundColor: "#91bed5",
                            color: "#041f45"
                          }}
                          type="submit"
                        >
                          {" "}
                          <FontAwesomeIcon icon={faHandPointer} size="lg" />
                        </Button>
                      </form>
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

                        <tr className={`${(fileType == GfileType[1] &&
                          allReconciliationFilesData?.length == 0) ||
                          (fileType == GfileType[3] &&
                            allReconciliationFilesData?.length == 0) ? 'alignColumnsforCAMT054file' : 'alignColumnspace'}`}>
                          <th>Sr.No</th>
                          <th>FILE NAME</th>
                          <th>RECREATED</th>
                          <th>FILE TYPE</th>
                          <th>BUSINESS TYPE</th>
                          {fileType == GfileType[2] && <th>NOTE</th>}
                          <th>COMPANY CODE</th>
                          <th>TEF IBAN</th>
                          <th>AMOUNT</th>
                          <th>CURRENCY</th>
                          <th>
                            NUM OF
                            <br /> TRANSACTIONS
                          </th>

                          {(fileType==GfileType[1] || fileType==GfileType[3])?"":<th>TRANSACTION TYPE</th>}

                          <th>MESSAGE ID</th>
                          {(fileType==GfileType[1] || fileType==GfileType[3])?"":<th>UPLOAD <br /> DATE</th>}
                          {(fileType==GfileType[1] || fileType==GfileType[3])?"":<th>EXECUTION <br /> DATE</th>}
                          <th>
                            SEPA
                            <br /> CREATION DATE
                          </th>

                          <th>STATUS</th>

                          {(fileType !== GfileType[1] &&
                            fileType !== GfileType[3]) &&
                            <th>APPROVED BY</th>}
                          {(fileType == GfileType[0] ||
                            fileType == GfileType[2]) && <th>
                              RECONCILE
                              <br /> PAIN002
                            </th>
                          }

                          <th>
                            RECONCILE
                            <br /> CAMT053
                          </th>


                         <th>ACTION</th>

                        </tr>

                      </thead>

                      <tbody>
                        {allReconciliationFilesDataStatus === "success" &&
                          allReconciliationFilesData.length > 0 &&
                          statusMessageOfData == "" ? (
                          allReconciliationFilesData.filter((record) => {
                            return (searchedValue == "") ? record : record.fileReference.includes(searchedValue) || record.filename.includes(searchedValue)

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
                                    {record.relatedFileId === null
                                      ? "NO"
                                      : "YES"}
                                  </td>
                                  <td style={{ textAlign: "center" }}>
                                    {record.filetype}
                                  </td>
                                  <td style={{ textAlign: "center" }}>
                                    {record.businessType}
                                  </td>
                                  {fileType == GfileType[2] ? (
                                    <td>
                                      {record.status == Gstatus[3] ? (
                                        <div
                                          style={{
                                            textAlign: "center",
                                            textDecoration: "underline",
                                            cursor: "pointer",
                                            color: "blue",
                                          }}
                                          onClick={() =>
                                            openAccompayningNote(
                                              record.sepaFileId
                                            )
                                          }
                                        >
                                          Note
                                        </div>
                                      ) : (
                                        <div style={{ textAlign: "center" }}>
                                          NA
                                        </div>
                                      )}
                                    </td>
                                  ) : (
                                    ""
                                  )}
                                  <td>{record.companyCode}</td>
                                  <td>{record.iban}</td>
                                  <td>
                                    <span
                                      style={{ float: "right", border: "none" }}
                                    >
                                      &#x20AC;{record.amount}
                                    </span>
                                  </td>
                                  <td style={{ textAlign: "center" }}>EUR</td>
                                  <td>
                                    <span
                                      style={{ float: "right", border: "none" }}
                                    >
                                      {record.numberOfTransactions}
                                    </span>
                                  </td>
                                  {(fileType==GfileType[1] || fileType==GfileType[3])?"": <td style={{ textAlign: "center" }}>{(record.filetype == GfileType[0]) ? "CCT" : (record.filetype == GfileType[2]) ? "CDD" : ""}</td>}
                                  <td>{record.fileReference}</td>
                                  {(fileType==GfileType[1] || fileType==GfileType[3])?"":
                                  <td style={{ textAlign: "center" }}>
                                  {record.uploadDate
                                    ? Moment(record.uploadDate).format(
                                      "YYYY-MM-DD"
                                    )
                                    : ""}
                                </td>}

                            {(fileType==GfileType[1] || fileType==GfileType[3])?"": <td style={{ textAlign: "center" }}>
                                    {fileType == GfileType[1]
                                      ? ""
                                      : record.executionDate
                                        ? Moment(record.executionDate).format(
                                          "YYYY-MM-DD"
                                        )
                                        : ""}
                                  </td>}
                                  
                                  
                                  <td style={{ textAlign: "center" }}>
                                    {record.sepaCreationDate
                                      ? Moment(record.sepaCreationDate).format(
                                        "YYYY-MM-DD"
                                      )
                                      : ""}
                                  </td>

                                  <td style={{ textAlign: "center" }}>
                                    <Button
                                      size="sm"
                                      style={{
                                        backgroundColor:
                                          record.status === Gstatus[1]
                                            ? "green"
                                            : record.status === Gstatus[0]
                                              ? "#ffbf00"
                                              : record?.status === Gstatus[2]
                                                ? "red"
                                                : record?.status === Gstatus[3]
                                                  ? "green"
                                                  : record?.status === Gstatus[4]
                                                    ? "red"
                                                    : record?.status === Gstatus[5]
                                                      ? "#91bed5"
                                                      : "",

                                        color:
                                          record.status === Gstatus[0]
                                            ? "black"
                                            : "",

                                        height: "28px",
                                        fontSize: "12px",
                                      }}
                                      onClick={
                                        Gstatus[0]
                                          ? () =>
                                            OpenPopForTransactionDetails(
                                              record
                                            )
                                          : null
                                      }
                                    >
                                      {record.status}
                                    </Button>
                                  </td>

                                  {fileType !== GfileType[1] &&
                                    fileType !== GfileType[3] ? (
                                    <td>{record.approverUser}</td>
                                  ) : (

                                    ""
                                  )}
                                  {/* td for Pain002 */}
                                  {fileType !== GfileType[1] &&
                                    fileType !== GfileType[3] ? (
                                    <td style={{ textAlign: "center" }}>
                                      <Button
                                        size="sm"
                                        style={{
                                          backgroundColor:
                                            record.reconcilePain002?.pain002ReconcileStatus ===
                                              pain002NCAMT053Status[2]
                                              ? "red"
                                              : record.reconcilePain002?.pain002ReconcileStatus
                                                 ===
                                                pain002NCAMT053Status[1]
                                                ? "green"
                                                : record.reconcilePain002?.pain002ReconcileStatus
                                                   ===
                                                  pain002NCAMT053Status[0]
                                                  ? "#ffbf00"
                                                  : "",

                                          color:
                                            record.reconcilePain002?.pain002ReconcileStatus ===
                                              pain002NCAMT053Status[0]
                                              ? "black"
                                              : "",
                                          width: "93px",
                                          height: "28px",
                                          fontSize: "12px",
                                        }}
                                        onClick={() =>
                                          OpenReconciledPain002andCamt054popupStatus(
                                            record
                                          )
                                        }
                                      >
                                        {record?.reconcilePain002?.pain002ReconcileStatus}
                                      </Button>
                                    </td>
                                  ) : (
                                    ""
                                  )}

                                  {/* td for CAMT53 */}
                                  <td style={{ textAlign: "center" }}>
                                    <Button
                                      size="sm"
                                      style={{
                                        color:
                                          record.reconcileCamt053?.status ===
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
                                        width: "93px",
                                        height: "28px",
                                        fontSize: "12px",
                                      }}
                                      onClick={() =>
                                        OpenReconciledPain002andCamt054popupStatus(
                                          record
                                        )
                                      }
                                    >
                                      {record.reconcileCamt053?.status}
                                    </Button>
                                  </td>


                                  <td>
                                    {isRole &&
                                      record.status == Gstatus[0] ? (
                                      <Button
                                        style={{ backgroundColor: "green" }}
                                        size="sm"
                                        onClick={(e) =>
                                          approveSepaFile(
                                            record.sepaFileId,
                                            userName,
                                            record.fileReference,
                                            record
                                          )
                                        }
                                      >
                                        APPROVE
                                      </Button>
                                    ) : 
                                   true && (record.status == Gstatus[6] || record.status == Gstatus[7])?
                                    <Button
                                    style={{ backgroundColor: "green" }}
                                    size="sm"
                                    onClick={()=>processSepaFile(record.sepaFileId)}
                                  >
                                    PROCESS
                                  </Button>:  ""}
                                  </td>

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
                    {allReconciliationFilesData?.length > 0 ? (
                      <PaginationComponent
                        Arraydata={totalNumberOfRecords}
                        changePageSepa={changePageSepa}
                        countOfRecords={countOfRecords}
                        forcePage={currentPage}
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <div className="popup1InSepaFileandReconcillationStatus">
                  <ReconcileStatusPain002andCamt054Popup
                    {...ReconcileStatusPain001NPain002NCamt054PopupObject}
                  />

                  <SepaFileTransactionDetailsPopup
                    {...SepaFileTransactionDetailsPopupObject}
                  />

                  {/* Pop when click on Approved Button */}
                  <AcompayningNote
                    TableData={accompayningNoteTable}
                    accompayningNoteTableBody={accompayningNoteTableBody}
                    accompayningNoteToogle={accompayningNote}
                    onDismissPops5={onDismissPops5}
                    accompayningMessage={accompayningMessage}
                  />

                  <ApprovePopup
                    textTypedandApproved={textTypedandApproved}
                    setTextandCheckLength={setTextandCheckLength}
                    cancleOfApprovePopup={cancleOfApprovePopup}
                    text={text}
                    fileName={fileName}
                    numberOfTransaction={numberOfTransaction}
                    amount={amount}
                    bussinessType={bussinessType}
                    popup4InSepaFileandReconcillationStatus={
                      popup4InSepaFileandReconcillationStatus
                    }
                  />
                </div>
              </div>
            </Row>
          </div>
        </section>
      ) : (
        ""
      )}

      {swictchScreenInApproveTable ? (
        <section>
          <br />
          <span style={{ float: "left", fontSize: "12px", marginLeft: "19px" }}>
            <b>Operations/</b>{" "}
            <span
              style={{
                color: "#06608e",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              SepaFile Approval and Reconcile Status
            </span>
          </span>
          <span
            style={{
              color: "#06608e",
              fontSize: "14px",
              fontWeight: "bold",
              marginLeft: "66%",
              cursor: "pointer",
            }}
            onClick={moveToMainscreen}
          >
            <FontAwesomeIcon icon={faAnglesLeft} />
            Back
          </span>
          <br />
          <div>
            <div className="container">
              <div className="row py-2">
                <div className="col-sm"></div>
                <div className="col-sm">
                  <Table className="bg-white sepaTable-in-transaction" bordered>
                    <tbody>
                      <tr>
                        <th scope="row" style={{ textAlign: "left" }}>
                          SepaFile Name:
                        </th>
                        <td style={{ textAlign: "left" }}>{fileName}</td>
                        <th scope="row" style={{ textAlign: "left" }}>
                          No. of Transactions:
                        </th>
                        <td style={{ textAlign: "left" }}>
                          {numberOfTransaction}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" style={{ textAlign: "left" }}>
                          Total Amount:
                        </th>
                        <td style={{ textAlign: "left" }}>€ {amount}</td>
                        <th scope="row" style={{ textAlign: "left" }}>
                          Business Type:
                        </th>
                        <td style={{ textAlign: "left" }}>{bussinessType}</td>
                      </tr>
                    </tbody>
                  </Table>
                </div>
                <div className="col-sm"></div>
              </div>

              <div className="row">
                <ul id="navtab" className="nav nav-tabs">
                  <li className="nav-item" style={{ width: "225px" }}>
                    <a
                      className="nav-link active"
                      style={{ whiteSpace: "nowrap" }}
                      aria-current="page"
                      id="navtabs"
                      data-bs-toggle="tab"
                      data-bs-target="#approved"
                      role="tab"
                      aria-controls="home"
                      aria-selected="false"
                      href="#"
                      onClick={() =>
                        clickedOnInApprovalTab(sepaFileId, "IN_APPROVAL", currentPageOfInApprovalRetriveTransactions)
                      }
                    >
                      {Gstatus[0]}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      aria-current="page"
                      id="navtab"
                      data-bs-toggle="tab"
                      data-bs-target="#reject"
                      role="tab"
                      aria-controls="home"
                      aria-selected="false"
                      onClick={() => rejectedTabReports(numberOfTransaction)}
                    >
                      REJECTED
                    </a>
                  </li>
                </ul>
                <div className="tab-content pt-2  bg-white" id="myTabContent">
                  <div
                    className="tab-pane fade active show"
                    id="approved"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
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
                      <><Table
                        bordered
                        responsive
                        id="approved_table"
                        className="transaction-table1"
                        style={{ width: "100%" }}
                      >
                        <thead>
                          <tr>
                            <th>FILE REFERENCE</th>
                            <th>END TO END ID</th>
                            <th>TRANSACTION AMOUNT</th>

                            <th>STATUS</th>
                            <th>ACTION</th>
                          </tr>
                        </thead>

                        <tbody>
                          {tableRetriveTransactionsForAllFileTypeStatus ==
                            "success" &&
                            tableRetriveTransactionsForAllFileType.length > 0 &&
                            tableRetriveTransactionsForAllFileTypeMessage ==
                            "" ? (
                            tableRetriveTransactionsForAllFileType.map(
                              (record, index) => {
                                return (
                                  <tr key={index}>
                                    <td>{record.messageId}</td>
                                    <td>{record?.endToEndId}</td>
                                    <td>
                                      <span
                                        style={{
                                          float: "right",
                                          border: "none",
                                        }}
                                      >
                                        &#x20AC;{record.instructedAmount}
                                      </span>
                                    </td>

                                    <td>{record.status}</td>
                                    <td>
                                      {isRole && (record.status == Gstatus[0]) ? (
                                        <Button
                                          size="sm"
                                          style={{ backgroundColor: "#9a1414" }}
                                          onClick={(e) => rejectSepaFileTransaction(
                                            record.id,
                                            record.endToEndId
                                          )}
                                        >
                                          REJECT
                                        </Button>
                                      ) : 
                                       ""
                                      }
                                    </td>
                                  </tr>
                                );
                              }
                            )
                          ) : tableRetriveTransactionsForAllFileTypeStatus ==
                            "success" &&
                            tableRetriveTransactionsForAllFileTypeMessage !==
                            "" ? (
                            <tr>
                              <td style={{ border: "none" }}></td>
                              <td style={{ border: "none" }}></td>
                              <td
                                colSpan="6"
                                style={{
                                  border: "none",
                                  color: "red",
                                  textAlign: "center",
                                  fontSize: "16px",
                                }}
                              >
                                {tableRetriveTransactionsForAllFileTypeMessage}
                              </td>
                            </tr>
                          ) : tableRetriveTransactionsForAllFileTypeStatus ==
                            "success" &&
                            tableRetriveTransactionsForAllFileType.length ==
                            0 ? (
                            <tr>
                              <td
                                colSpan="6"
                                style={{
                                  border: "none",
                                  color: "red",
                                  textAlign: "center",
                                  fontSize: "16px",
                                }}
                              >
                                {tableRetriveTransactionsForAllFileTypeMessage}
                              </td>
                            </tr>
                          ) : (
                            <tr style={{ border: "none" }}>
                              <td
                                colSpan="6"
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
                        <div style={{ 'float': "right" }}>
                          {tableRetriveTransactionsForAllFileType.length > 0 ? <PaginationComponent
                            Arraydata={totalCountRecordsRetriveTransactions}
                            changePageSepa={changePageOfInApprovalRetriveTransactions}
                            forcePage={currentPageOfInApprovalRetriveTransactions} /> : ""}
                        </div>

                      </>
                    ) : (
                      ""
                    )}
                  </div>

                  <div
                    className="tab-pane fade"
                    id="reject"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <Table
                      id="rejected_table"
                      bordered
                      responsive
                      className="transaction-table2"
                      style={{ width: "100%" }}
                    >
                      <thead>
                        <tr>
                          <th>FILE REFERENCE</th>
                          <th>END TO END ID</th>
                          <th>TRANSACTION AMOUNT</th>

                          <th>STATUS</th>
                          <th>REJECTED BY</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableRetriveTransactionsForAllFileTypeStatus ==
                          "success" &&
                          tableRetriveTransactionsForAllFileType.length > 0 &&
                          tableRetriveTransactionsForAllFileTypeMessage == "" ? (
                          tableRetriveTransactionsForAllFileType.map(
                            (record, i) => {
                              return (
                                <tr key={i}>
                                  <td>{record.messageId}</td>
                                  <td>{record.endToEndId}</td>
                                  <td>
                                    <span
                                      style={{ float: "right", border: "none" }}
                                    >
                                      &#x20AC;{record.instructedAmount}
                                    </span>
                                  </td>

                                  <td>{record.status}</td>
                                  <td>{record.rejectedBy}</td>
                                </tr>
                              );
                            }
                          )
                        ) : tableRetriveTransactionsForAllFileTypeStatus ==
                          "success" &&
                          tableRetriveTransactionsForAllFileTypeMessage !==
                          "" ? (
                          <tr>
                            <td
                              colSpan="6"
                              style={{
                                border: "none",
                                color: "red",
                                textAlign: "center",
                                fontSize: "16px",
                              }}
                            >
                              {tableRetriveTransactionsForAllFileTypeMessage}
                            </td>
                          </tr>
                        ) : tableRetriveTransactionsForAllFileTypeStatus ==
                          "success" &&
                          tableRetriveTransactionsForAllFileType.length == 0 ? (
                          <tr>
                            <td
                              colSpan="6"
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
                        ) : (
                          <tr>
                            <td
                              colSpan="6"
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
                    <div style={{ 'float': "right" }}>
                      {totalCountRecordsRetriveTransactions > 0 ? <PaginationComponent
                        Arraydata={totalCountRecordsRetriveTransactions}
                        changePageSepa={changePageOfRejectedRetriveTransactions}
                        forcePage={currentPageOfRejectedRetriveTransactions} /> : ""}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}

      {swictchScreenCAMTnApprovednRejectednProcessedTable ? (
        <section className="sepaapprovalreconcilation-camt054-table">
          <span style={{ float: "left", fontSize: "12px", marginTop: "5px" }}>
            <b>Operations/</b>{" "}
            <span
              style={{
                color: "#06608e",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              SepaFile Approval and Reconcile Status
            </span>
          </span>
          <span
            style={{
              color: "#06608e",
              fontSize: "12px",
              fontWeight: "bold",
              marginLeft: "73%",
              cursor: "pointer",
            }}
            onClick={moveToMainscreen}
          >
            <FontAwesomeIcon icon={faAnglesLeft} />
            Back
          </span>

          <div>
            <div className="row py-2">
              <div className="col-sm"></div>
              <div className="col-sm">
                <Table className="bg-white sepaTable-in-transaction" bordered>
                  <tbody>
                    <tr>
                      <th scope="row" style={{ textAlign: "left" }}>
                        SepaFile Name:
                      </th>
                      <td style={{ textAlign: "left" }}>{fileName}</td>
                      <th scope="row" style={{ textAlign: "left" }}>
                        No. of Transactions:
                      </th>
                      <td style={{ textAlign: "left" }}>
                        {numberOfTransaction}
                      </td>
                    </tr>
                    <tr>
                      <th scope="row" style={{ textAlign: "left" }}>
                        Total Amount:
                      </th>
                      <td style={{ textAlign: "left" }}>€ {amount}</td>
                      <th scope="row" style={{ textAlign: "left" }}>
                        Business Type:
                      </th>
                      <td style={{ textAlign: "left" }}>{bussinessType}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>
              <div className="col-sm"></div>
            </div>

            <br />

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
                bordered={true}
                responsive
                className="bg-white transaction-table1"
                size="sm"
                style={{ textAlign: "center" }}
              >
                <thead>
                  <tr>
                    <th>FILE REFERENCE</th>
                    <th>END TO END ID</th>
                    <th>TRANSACTION AMOUNT</th>

                    {(fileType == GfileType[1] || fileType == GfileType[3]) ? "" : <th>STATUS</th>}
                    {(fileType == GfileType[1] || fileType == GfileType[3]) ? <th>INSTRUCTED_AMOUNT</th> : ""}
                    {(fileType == GfileType[1] || fileType == GfileType[3]) ? <th>CHARGES_AMOUNT</th> : ""}
                  </tr>
                </thead>
                <tbody>
                  {tableRetriveTransactionsForAllFileTypeStatus === "success" &&
                    tableRetriveTransactionsForAllFileType.length > 0 &&
                    tableRetriveTransactionsForAllFileTypeMessage == "" ? (
                    tableRetriveTransactionsForAllFileType?.map(
                      (record, index) => {
                        return (
                          <tr key={index}>
                            <td>{record.messageId}</td>
                            <td>{record.endToEndId}</td>
                            <td>
                              <span style={{ float: "right", border: "none" }}>
                                &#x20AC;{(fileType==GfileType[3] ||fileType== GfileType[1]) ? record.transactionAmount  :(fileType==GfileType[0] || fileType==GfileType[2])? record.instructedAmount:""}
                              </span>
                            </td>
                            {(fileType == GfileType[1] || fileType == GfileType[3]) ? "" :
                              <td>{record.status}</td>

                            }
                            {(fileType == GfileType[1] || fileType == GfileType[3]) ? <td>{record.instructedAmount}</td> : ""}
                            {(fileType == GfileType[1] || fileType == GfileType[3]) ? <td>{record.chargesAmount}</td> : ""}
                          </tr>
                        );
                      }
                    )
                  ) : tableRetriveTransactionsForAllFileTypeStatus ==
                    "success" &&
                    tableRetriveTransactionsForAllFileTypeMessage !== "" ? (
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
                        {tableRetriveTransactionsForAllFileTypeMessage}
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
            ) : (
              ""
            )}
          </div>
          <div className="mainPagination">
            {tableRetriveTransactionsForAllFileType.length > 0 ? (
              <PaginationComponent
                Arraydata={totalCountRecordsRetriveTransactions}
                changePageSepa={changePageOfRetriveTransactions}
                forcePage={currentPageOfRetriveTransactions}
              />
            ) : (
              ""
            )}
          </div>
        </section>
      ) : (
        ""
      )}
    </div>
  );
}

export default SepaFileApprovalReconcillationStatus;
