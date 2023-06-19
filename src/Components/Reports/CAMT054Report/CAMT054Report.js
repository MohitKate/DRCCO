import React, { useEffect, useRef, useState } from "react";
import "./CAMT054Report.css";
import swal from 'sweetalert';
import {
  GetCAMT054Report,
  GetExcelForCAMT054Report,
  GetAllTenataData,
} from "../../Constants/AxiosHandler/request";
import {
  Row,
  Col,
  Button,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Table,
  Input,
  Dropdown,
  PaginationItem,
  Pagination,
  PaginationLink,
} from "reactstrap";
import DownloadImage from "../../../Assets/image/download (1).png";
import Moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import fileDownload from "js-file-download";
import Header from "../../GlobalComponents/Header/Header";
import FromDatePicker from "../../GlobalComponents/FromDateorCreationDatePicker/FromDatePicker";
import ToDatePicker from "../../GlobalComponents/ToDatePicker/ToDatePicker";

function CAMT054Report(props) {
  

  const [fileType, setFileType] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [fromDate, setFromDate] = useState(Moment(new Date()).format("yyyy-MM-DD"));
  const [endDate, setEndDate] = useState(new Date());
  const [toDate, setToDate] = useState(Moment(new Date()).format("yyyy-MM-DD"));

  const [isActiveCamt, setIsActiveCamt]=useState(false)
  
  const [tenantIdData, setTenantIdData] = useState([]);
  const [selectTenantId, setSelectTenantId] = useState("1");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showTable, setShowTable] = useState(false);

  const [payloadToDownloadExcel, setPayloadToDownloadExcel] = useState({
    format: Moment(new Date()).format("yyyy-MM-DD"),
    fileType: "ALL",
  });

  const [defaultbussinessType, setDefaultbussinessType] = useState("");

  //Object to sent when click on Download
  const exportFileType = {
    csv: "csv",
    xlsx: "xlsx",
  };



  const [tabledataStatus, setTableDataStatus] = useState("");
  const [tabledataMessage, setTableDataStatusMessage] = useState("");
  const [tabledataArray, setTableDataArray] = useState([]);

  /*Function to Open the DownloadDropdown
   */

  const toggleDowloadDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const validateFileType = () => {
    if (fileType == "") {
      swal("Please select Report type!");
      return false;
    }
    return true;
  };
  const validateBussinessType = () => {
    if (defaultbussinessType == "") {
     
      swal("Please select Bussiness type!");
      return false;
    }
    return true;
  };
  const validateTenant = () => {
    if (selectTenantId == "") {
      swal("Please select Tenant Id!");

      return false;
    }
    return true;
  };

  const validateInputs = () => {
    if (validateFileType() && validateBussinessType()) {
      getReportData();
    }
  };
  /*
    Function to get CAMT054 Report Data
    */
  const getReportData = async () => {

    // let formatDate = Moment(new Date()).format("yyyy-MM-DD");

    let payload = {
      fromDate:  fromDate,
      toDate:toDate,
      // formatDate: `${dateChanged ? fromDate : formatDate}`,
      fileType: fileType,
      tenantId: selectTenantId,
      bussinessType: defaultbussinessType,
    };

    setPayloadToDownloadExcel((prevState) => ({
      ...prevState,
      fromDate: fromDate,
      toDate:toDate,
      fileType: fileType,
      bussinessType: defaultbussinessType,
    }));

    const response = await GetCAMT054Report(payload);
    setShowTable(true);
    setTableDataArray(response.reporttransactionData);
    setTableDataStatus(response.status);
    setTableDataStatusMessage(response.message);
  };

  /*Function to work when Date is Changed from DatePicker
   */

  const updatedFormateDate = (date) => {
    setStartDate(date);

    const formatDate = Moment(date).format("YYYY-MM-DD");
    setFromDate(formatDate);
  };

  const updatedToDate=(date)=>{
    setEndDate(date);
    const todate=Moment(date).format("YYYY-MM-DD");
    setToDate(todate)
  }


  /*Function to Download Excel Formate of given parameters
   */

  const clickedOnDownloadExcel = async (payload1, exportFileType) => {
    let payload = {
      fromDate: payload1.fromDate,
      toDate:payload1.toDate,
      fileType: payload1.fileType,
      bussinessType: payload1.bussinessType,
      exportFileType: exportFileType.xlsx,
    };
    const response = await GetExcelForCAMT054Report(payload);
    fileDownload(response, "CAMT054Report.xlsx",'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  };

 

  /*Function to Download CSV Formate of given parameters
   */

  const clickedOnDownloadCSV = async (payload1, exportFileType) => {

    console.log(fromDate, toDate,"OOOOOOOOOOOO",payloadToDownloadExcel);
    let payload = {
      fromDate: payload1.fromDate,
      toDate:payload1.toDate,
      fileType: payload1.fileType,
      bussinessType: payload1.bussinessType,
      exportFileType: exportFileType.csv,
    };
    const response = await GetExcelForCAMT054Report(payload);
    fileDownload(response, "CAMT054Report.csv","text/csv");
  };

  let payload = {};
  const fetchTenantData = async () => {
    const response = await GetAllTenataData(payload);
    setTenantIdData(response);
  };

  useEffect(() => {
    fetchTenantData();
  }, []);
  useEffect(()=>{
    setIsActiveCamt(true)
     },[])
 
  return (
    <div>
      <div>
        <Header isActiveCamt={isActiveCamt}/>
      </div>
      <p className="navigationroute">
        <b>Report Section /</b>{" "}
        <span style={{ color: "#06608e", fontWeight: "bold" }}>
          CAMT054 Report
        </span>
      </p>

      <div className="container-fluid" style={{ position: "relative","fontSize":'12px' }}>
        <Row>
          <Col>
            <Table id="topTable" className="table-bordered">
              <tbody>
                <tr>
                  <td className="lbltd">
                    Business Type:<span style={{ color: "red" }}>*</span>
                  </td>
                  <td className="camt-input-width">
                    <div >
                      <Input
                        className="camt-dropdownCss shadow-sm"
                        onChange={(val) =>
                          setDefaultbussinessType(val.target.value)
                        }
                        bsSize=""
                        type="select"
                      >
                        <option value="">Select BusinessType</option>
                        <option value="MM">MM</option>
                        <option value="B2B">B2B</option>
                      </Input>
                    </div>
                  </td>

                  <td className="lbltd">
                    Report Type:<span style={{ color: "red" }}>*</span>
                  </td>
                  <td className="camt-input-width" >
                    {" "}
                    <Input
                      className="camt-dropdownCss shadow-sm"
                      onChange={(val) => setFileType(val.target.value)}
                      id="exampleSelect"
                      name="select"
                      type="select"
                    >
                      <option value="">Select Report Type</option>

                      <option value="CRDT">CREDIT</option>
                      <option value="DBIT">DEBIT</option>
                    </Input>
                  </td>

                  <td className="lbltd">Select Tenant:<span style={{ color: "red" }}>*</span></td>
                  <td className="camt-input-width">
                    <div >
                    <Input
                      className="camt-dropdownCss shadow-sm"
                      id="exampleSelect"
                      name="select"
                      type="select"
                      onChange={(e) => setSelectTenantId(e.target.value)}
                    >
                     
                      {tenantIdData && tenantIdData.length > 0
                        ? tenantIdData.map((data, i) => {
                            return (
                              <option value={data.tenantId} key={i}>
                                {data.name}
                              </option>
                            );
                          })
                        : ""}
                    </Input>
                      </div>
                  </td>
                 

                  <td className="lbltd"></td>
                  <td className="fldtd">
                    <Button
                      block
                      style={{'borderRadius':"0"}}
                      color="primary"
                      size=""
                      onClick={validateInputs}
                    >
                      SEARCH
                    </Button>
                  </td>
                </tr>
                <tr>
                  

                  <td className="lbltd">From:<span style={{ color: "red" }}>*</span></td>
                  <td >
                    <div className="date-width">

                  <FromDatePicker
                      onDateChange={updatedFormateDate}
                      date={startDate}
                      limitrange={endDate}
                      />
                    </div>
                  </td>
                  <td className="lbltd">
                    To:<span style={{ color: "red" }}>*</span>
                  </td>
                  <td >
                    <div  className="date-width">

                  <ToDatePicker
                    onDateChange={updatedToDate}
                    date={endDate}
                    limitrange={startDate}
                  />
                    </div>
                    
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>

        <br />

        {/* {tabledataArray.length>0 ? <PaginationComponent 
        	Arraydata={tabledataArray}
          changePageSepa={changePageSepa}
        /> : ""} */}

        {showTable ? (
          <Table bordered responsive className="mt-2 bg-white mb-0 accompayningnote-table">
            <thead>
              <tr>
                <th className="tableheaders">
                  Datum des
                  <br /> Dateiempfangs
                </th>
                <th className="tableheaders">
                  Datum der
                  <br /> Verarbeitung
                </th>
                <th className="tableheaders">
                  Dateiname der
                  <br /> xml-Datei
                </th>
                <th className="tableheaders">
                  Anzahl der der
                  <br /> Transaktionen der Datei
                </th>
                <th className="tableheaders">
                  Summe der der
                  <br /> Transaktionen der Datei
                </th>
                <th className="tableheaders">
                  Anzahl der Transaktionen
                  <br /> durch DRC erfolgreich verarbeitet
                </th>
                <th className="tableheaders">
                  Summe der Transaktionen
                  <br /> durch DRC erfolgreich verarbeitet
                </th>
                <th className="tableheaders">
                  Anzahl der Transaktionen <br />
                  zurueckgewiesen
                </th>
                <th className="tableheaders">
                  Summe der Transaktionen
                  <br /> zurueckgewiesen
                </th>
                <th className="tableheaders">
                  Anzahl der Transaktionen
                  <br /> noch nicht abgeschlossen
                </th>
                <th className="tableheaders">
                  Summe der Transaktionen
                  <br /> noch nicht abgeschlossen
                </th>
              </tr>
            </thead>
            <tbody>
              {tabledataStatus == "success" && tabledataMessage == "" ? (
                tabledataArray.map((data, i) => {
                  return (
                    <tr key={i}>
                      <td>{data.date_receipt}</td>
                      <td>{data.date_process}</td>
                      <td className="tableheaders">{data.file_name}</td>
                      <td className="tableheaders">{data.num_tran_file}</td>
                      <td>
                        <span style={{ float: "right", border: "none" }}>
                          &#x20AC;{data.sum_tran_file}
                        </span>
                      </td>
                      <td>{data.num_tran_processed_DRC_success}</td>
                      <td>
                        <span style={{ float: "right", border: "none" }}>
                          &#x20AC;{data.total_tran_processed_DRC_success}
                        </span>
                      </td>
                      <td>{data.num_tran_rejected}</td>
                      <td>
                        <span style={{ float: "right", border: "none" }}>
                          &#x20AC;{data.total_tran_rejected}
                        </span>
                      </td>
                      <td>
                        <span>{data.num_tran_notyet_completed}</span>
                      </td>
                      <td>
                        <span style={{ float: "right", border: "none" }}>
                          &#x20AC;{data.total_tran_notyet_completed}
                        </span>
                      </td>
                    </tr>
                  );
                })
              ) : tabledataStatus == "success" && tabledataMessage !== "" ? (
                <tr>
                  <td colSpan="12" style={{ border: "none" }}>
                    <h4 className="ErrorMessage">{tabledataMessage}</h4>
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
        ) : (
          ""
        )}

        {tabledataStatus == "success" && tabledataMessage == "" ? (
          <Dropdown
            isOpen={dropdownOpen}
            toggle={toggleDowloadDropdown}
            color="#1a2e4b"
          >
            <DropdownToggle caret className="downloadDropdown">
              Download-Format
            </DropdownToggle>
            <DropdownMenu style={{ backgroundColor: "#8bb9d1" }}>
              <DropdownItem style={{ backgroundColor: "#a6d2e8" }}>
                <div style={{ display: "flex" }}>
                  <span role="img" aria-label="Fox">
                    <img
                      src={DownloadImage}
                      className="downloadButtonImage1"
                      onClick={() =>
                        clickedOnDownloadCSV(
                          payloadToDownloadExcel,
                          exportFileType
                        )
                      }
                    />

                    <div style={{ marginLeft: "25px" }}>CSV-Download</div>
                  </span>
                </div>
              </DropdownItem>

              <DropdownItem style={{ backgroundColor: "#8bb9d1" }}>
                <div style={{ display: "flex" }}>
                  <span role="img" aria-label="Fox">
                    <img
                      src={DownloadImage}
                      className="downloadButtonImage"
                      onClick={() =>
                        clickedOnDownloadExcel(
                          payloadToDownloadExcel,
                          exportFileType
                        )
                      }
                    />
                    <div style={{ marginLeft: "27px" }}>XLS-Download</div>
                  </span>
                </div>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default CAMT054Report;
