import React, { useEffect, useRef, useState } from "react";
import { Row, Col, Label, Button, Input, Table } from "reactstrap";
import Moment from "moment";
import { RetrieveTransactionsPain0001OutPutEntry } from "../../Constants/AxiosHandler/request";
import DatePicker from "react-datepicker";
import Header from "../../GlobalComponents/Header/Header";
import "./Pain008AdHocSearchTransactions.css";
import FromDatePicker from "../../GlobalComponents/FromDateorCreationDatePicker/FromDatePicker";
import { GfileType, Gstatus } from "../../Constants/constant";
import ToDatePicker from "../../GlobalComponents/ToDatePicker/ToDatePicker";

function Pain008AdHocSearchTransactions() {
  const [fileType, setFiletype] = useState(GfileType[2]);
  const [fileStatus, setFileStatus] = useState("");
  const datepickerRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [fromDate, setFromDate] = useState(new Date());
  const [fromDate2, setFromDate2] = useState(
    Moment(new Date()).format("yyyy-MM-DD")
  );
  const [fromDate2Time, setFromDate2Time] = useState(
    Moment(new Date()).format("HH:mm:ss")
  );
  const [toDate2Time, setToDate2Time] = useState(
    Moment(new Date()).format("HH:mm:ss")
  );

  const [toDate, setToDate] = useState(new Date());
  const [toDate2, setToDate2] = useState(
    Moment(new Date()).format("yyyy-MM-DD")
  );
  const [endToEndId, setEndToEndId] = useState("");
  const [amountGeaterEqualsThan, setAmountGeaterEqualsThan] = useState(0);
  const [sepaFileId, setSepaFileId] = useState("");

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

  /*Retrive Transactions API Functions runs when Click on SepaFile
   */

  const retriveTransactionsTable = async () => {
    let payload = {
      start:0,
      endToEndId: endToEndId,
      amountGeaterEqualsThan: amountGeaterEqualsThan,
      sepaFileId: sepaFileId,
      filetype: GfileType[2],
      status: fileStatus,
      fromDate: fromDate2 + "T" + fromDate2Time,
      toDate: toDate2 + "T" + toDate2Time
    };
    const response = await RetrieveTransactionsPain0001OutPutEntry(payload);
    console.log(response, "CAMT and approved or Rejected Table");
    if (response.message == "") {
      setTableRetriveTransactionsForAllFileType(response.transactionsData);
      setTableRetriveTransactionsForAllFileTypeMessage(response.message);
      setTableRetriveTransactionsForAllFileTypeStatus(response.status);
    }

    setTableRetriveTransactionsForAllFileType(response.transactionsData);
    setTableRetriveTransactionsForAllFileTypeMessage(response.message);
    setTableRetriveTransactionsForAllFileTypeStatus(response.status);
  };

  /*Function to work when  from Date is Changed from DatePicker
   */

  const updatedFromDate = (date) => {
    console.log(Moment(date).format("yyyy-MM-DD"));
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

  useEffect(() => {
    setIsActive(true);
  }, []);
  return (
    <div>
      <Header isActive={isActive} />
      <div className="adHocRoute">
        <b>Operations/</b>{" "}
        <span style={{ color: "#06608e", fontWeight: "bold" }}>
         Pain008 Ad Hoc Search Transactions
        </span>
      </div>
      <br />
      <br />

      <div style={{ marginLeft: "15px" }}>
        <Row>
          <Col xs="2" md="2">
            <>
              <b style={{ fontSize: "12px", float: "left" }}>
                {" "}
                From Date:<span style={{ color: "red" }}>*</span>
              </b>
            </>
            <div>
              <FromDatePicker
                onDateChange={updatedFromDate}
                date={fromDate}
                showTimeSelect={"showTimeSelect"}
                istime={true}
                limitrange={toDate}
              />
            </div>
          </Col>

          <Col xs="2" md="2">
            <>
              <b style={{ fontSize: "12px", float: "left" }}>
                {" "}
                To Date:<span style={{ color: "red" }}>*</span>
              </b>
            </>
            <ToDatePicker
              onDateChange={updatedToDate}
              date={toDate}
              showTimeSelect={"showTimeSelect"}
              istime={true}
              limitrange={fromDate}
            />
          </Col>

          <Col xs="2" md="2">
            <>
              <b style={{ fontSize: "12px", float: "left" }}> Status:</b>
            </>
            <Input
              onChange={(e) => setFileStatus(e.target.value)}
              bsSize=""
              value={fileStatus}
              className="sepa-dropdownCss shadow-sm"
              type="select"
            >
              <option value="">Select Status</option>
              <option value={"NEW"}>NEW</option>
              <option value={"IN_APPROVAL"}>IN_APPROVAL</option>
              <option value={"NOTIFY"}>NOTIFY</option>
              <option value={"IN_NOTIFICATION"}>IN_NOTIFICATION</option>
              <option value={"NOTIFICATION_FAILED"}>NOTIFICATION_FAILED</option>
              <option value={"PROCESSED"}>PROCESSED</option>
              <option value={"FAILED"}>FAILED</option>
              <option value={"NOTIFY_BILLING"}>NOTIFY_BILLING</option>
              <option value={"IN_BILLING_NOTIFICATION"}>
                IN_BILLING_NOTIFICATION
              </option>
              <option value={"BILLING_NOTIFICATION_FAILED"}>
                BILLING_NOTIFICATION_FAILED
              </option>
              <option value={"NOT_APPROVED"}>NOT_APPROVED</option>
            </Input>
          </Col>
          <Col xs="2" md="2">
            <>
              <b style={{ fontSize: "12px", float: "left" }}>
                {" "}
                Amount:<span style={{ color: "black" }}>&gt;&#61;</span>
              </b>
            </>
            <div style={{ width: "102%" }}>
              <Input
                onChange={(e) => setAmountGeaterEqualsThan(e.target.value)}
                style={{ fontSize: "12px", height: "34px" }}
                className="shadow-sm"
                bsSize="sm"
                type="text"
                defaultValue={amountGeaterEqualsThan}
              ></Input>
            </div>
          </Col>

          <Col xs="2" md="2">
            <>
              <b style={{ fontSize: "12px", float: "left" }}> Sepa File ID:</b>
            </>
            <Input
              onChange={(e) => setSepaFileId(e.target.value)}
              style={{ fontSize: "12px", height: "34px" }}
              className="shadow-sm"
              bsSize="sm"
              defaultValue={sepaFileId}
              type="text"
            ></Input>
          </Col>

          <Col xs="2" md="2">
            <>
              <p></p>
            </>
            <Button
              color="primary"
              onClick={retriveTransactionsTable}
              style={{ width: "170px", height: "35px", borderRadius: "0" }}
            >
              SEARCH
            </Button>
          </Col>
        </Row>
      </div>
      <br />
      <div style={{ marginLeft: "15px" }}>
        <Row>
          <Col xs="2" md="2">
            <>
              <b style={{ fontSize: "12px", float: "left" }}> End To End ID:</b>
            </>
            <Input
              onChange={(e) => setEndToEndId(e.target.value)}
              style={{ fontSize: "12px", height: "34px" }}
              className="shadow-sm"
              bsSize="sm"
              type="text"
              defaultValue={endToEndId}
            ></Input>
          </Col>
        </Row>
      </div>

      <div className="container-fluid">
        <Table
          responsive
          bordered
          className="mt-2 bg-white mb-0 accompayningnote-table"
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
            {tableRetriveTransactionsForAllFileTypeStatus === "success" &&
            tableRetriveTransactionsForAllFileType.length > 0 &&
            tableRetriveTransactionsForAllFileTypeMessage == "" ? (
              tableRetriveTransactionsForAllFileType.map((record, i) => {
                return (
                  <tr key={i}>
                    <td>{record.messageId}</td>
                    <td>{record.endToEndId}</td>

                    <td style={{ textAlign: "right" }}>
                      <span>&#x20AC;{record.instructedAmount}</span>
                    </td>
                    <td>{record.transactionType}</td>
                    <td>{record.status}</td>
                  </tr>
                );
              })
            ) : tableRetriveTransactionsForAllFileTypeStatus === "success" && tableRetriveTransactionsForAllFileTypeMessage!== "" ? (
              <tr>
                <td colSpan="12" style={{ border: "none" }}>
                  <h4 className="ErrorMessage">{tableRetriveTransactionsForAllFileTypeMessage}</h4>
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

        <div style={{ float: "right", marginTop: "10px" }}></div>
      </div>
    </div>
  );
}

export default Pain008AdHocSearchTransactions;
