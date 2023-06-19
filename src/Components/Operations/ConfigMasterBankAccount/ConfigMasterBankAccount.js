import React, { useState, useEffect, useRef } from "react";
import Moment from "moment";
import DatePicker from "react-datepicker";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import "react-datepicker/dist/react-datepicker.css";
import swal from "sweetalert";
import {
  faAdd,
  faEdit,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Row,
  Col,
  Table,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  Label,
  FormGroup,
} from "reactstrap";
import {
  GetAllTenataData,
  AddAccountConfiguration,
  ToGetIbanDataForConfigMasterBank,
  ToGetConfigMasterBankAccountData,
  ToUpdateBankAccount,
  ToDeleteBankAccount,
} from "../../Constants/AxiosHandler/request";
import FromDatePicker from "../../GlobalComponents/FromDateorCreationDatePicker/FromDatePicker";
import Header from "../../GlobalComponents/Header/Header";
import "./ConfigMasterBankAccount.css";
import ToDatePicker from "../../GlobalComponents/ToDatePicker/ToDatePicker";
import { GfileType } from "../../Constants/constant";
import DeleteConfirmation from "./DeleteConfirmationPopup/DeleteConfirmationPopup";

function ConfigMasterBankAccount() {

  //Variables for SSO
  const [isRole, setIsRole] = useState(false);
  const [userName, setUserName] = useState("");
  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth();
  let currentDay = new Date().getDate();
  const [dataForAddPopup, setDataForAddPopup] = useState();
  const [fromDate, setFromDate] = useState(new Date());
  const [fromDateOfAdd, setFromDateOfAdd] = useState(new Date(currentYear, currentMonth, currentDay + 1));
  const [fromDate2, setFromDate2] = useState();
  const datepickerRef = useRef(null);
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const [tenantIdData, setTenantIdData] = useState([]);
  const [tenantId, setTenantId] = useState("1");
  const [bankPlanId, setBankPlanId] = useState();
  const [bankId, setBankId] = useState();
  const [bussinessType, setBussinessType] = useState("MM");
  const [ibanData, setIbanData] = useState([]);
  const [iban, setIban] = useState("");
  const [fileType, setFileType] = useState("PAIN_001_001_03");
  const [configMasterBankAccountData, setConfigMasterBankAccountData] = useState();
  const [notAvailableResponse, setNotAvailableResponse] = useState()
  const [isActive, setisActive] = useState(false);

  const [openPopup, setopenPopup] = useState(false);




  const [dateErrorMessage, setDateErrorMessage] = useState('')
  const [configFromDate, setConfigFromDate] = useState(new Date());
  const [configFromDate2, setConfigFromDate2] = useState(Moment(new Date()).format("yyyy-MM-DD"));

  const [configToDate, setconfigToDate] = useState(new Date(currentYear + 1, currentMonth, currentDay));
  const [configToDate2, setconfigToDate2] = useState(Moment(new Date(currentYear + 1, currentMonth, currentDay)).format("yyyy-MM-DD"));

  const [configfromDate2Time, setConfigfromDate2Time] = useState(
    Moment(new Date()).format("HH:mm:ss")
  );
  const [configToDate2Time, setConfigToDate2Time] = useState(
    Moment(new Date()).format("HH:mm:ss")
  );

  const isClickedOnConfirm = async () => {

    let payload = {
      bankPlanId: bankPlanId,
    };
    const response = await ToDeleteBankAccount(payload);
    console.log(response);
    setopenPopup(false)
    searchMasterBankAccountData();

  }

  const CanclePop = () => {

    setopenPopup(!openPopup);
  };

  const toggle = (bankId) => {
    setFromDateOfAdd(new Date(currentYear, currentMonth, currentDay))
    setDateErrorMessage('')
    toGetIbanData(bussinessType);
    setBankId(bankId);
    setModal(!modal);
    setIbanData([]);
    setIban('')
  };
  const EditRecordDate = (record) => {
    const { bankId, bankPlanId, fromDate, iban } = record;
    let editDate = Moment(fromDate).toDate();
    setFromDate(fromDate ? editDate : "");
    setIban(iban);
    setBankId(bankId);
    setBankPlanId(bankPlanId);
    setModal2(true);

  };
  const toggle2 = () => {

    setModal2(false);
  };
  let stypeDatepicker = {
    color: "white",
    backgroundColor: "DodgerBlue",
    padding: "10px",
    fontFamily: "Arial",
  };

  const validatation = () => {
    if (tenantId == "") {
      swal("Please select tenant Id!");
    } else if (bussinessType == "") {
      swal("Please select Business Type!");
    } else if (fileType == "") {
      swal("Please select FileType!");
      return false
    } else {
      swal("Please select Iban!");
    }
  };

  const searchMasterBankAccountData = async () => {

    console.log(dateErrorMessage);
    if (configToDate2 < configFromDate2) {
      swal({
        title: "",
        text: `Invalid date range`,
        icon: "warning",
        button: "OK",
        className: "style",
      });
    } else {
      let payload = {
        tenantId: tenantId,
        bussinesstype: bussinessType,
        fileType: fileType,
        toDate: configToDate2,
        fromDate: configFromDate2
      };
      const response = await ToGetConfigMasterBankAccountData(payload);
      console.log(response);
      if (response.message !== '') {
        setConfigMasterBankAccountData(response.tenantBankData);
        setDataForAddPopup(response.tenantBankData[0]);
        setNotAvailableResponse(response.message)
      } else {
        setConfigMasterBankAccountData(response.tenantBankData);
        setNotAvailableResponse(response.message)
      }


    }

  };

  let payload = {};
  const fetchTenantData = async () => {
    const response = await GetAllTenataData(payload);
    setTenantIdData(response);
  };

  const toGetIbanData = async (businessType) => {
    let payload = {
      tenantId: tenantId,
      bussinesstype: businessType,
    };
    const response = await ToGetIbanDataForConfigMasterBank(payload);
    console.log(response);
    setIbanData(response);
  };

  // useEffect(()=>{
  //   toGetIbanData(bussinessType);
  // }, [bussinessType])

  /*Function to work when  from Date is Changed from DatePicker

  */

  const updatedFromDate = (date) => {//DO not touch
    setFromDate(date);
    console.log(date);
    const formatDate = Moment(date).format("yyyy-MM-DD");
    setFromDate2(formatDate);
    console.log(formatDate);
  };

  const updateConfigFromDate = (date) => {

    setConfigFromDate(date);
    const formatConfigDate = Moment(date).format('yyyy-MM-DD');
    setConfigFromDate2(formatConfigDate)
  }

  const updateConfigToDate = (date) => {
    setconfigToDate(date);
    const formatCOnfigToDate = Moment(date).format('yyyy-MM-DD');
    setconfigToDate2(formatCOnfigToDate);
  }


  const selectBussinessType = (val) => {
    setIban("");
    setIbanData([])
    setBussinessType(val);
    toGetIbanData(val);
  };

  const patchRequestUpdateBankAccount = async () => {
    let payload = {
      fromDate: fromDate2,
      updatedBy: "ADMIN",
      iban: iban
    };
    const response = await ToUpdateBankAccount(payload);
    console.log(response);
    searchMasterBankAccountData();
    setModal2(false);
  };

  const closeFromDatePopup = () => {
    setModal2(false);
  };

  const deleteRecord = async (bankplanid) => {
    console.log(bankplanid);
    setBankPlanId(bankplanid);
    setopenPopup(true);
  };

  const AddNewRecord = async () => {

    if (iban == '') {
      swal({
        title: "",
        text: `Please select Iban from list`,
        icon: "warning",
        button: "OK",
        className: "style",
      });
    } else if (Moment(fromDateOfAdd).format("yyyy-MM-DD") === Moment(new Date()).format("yyyy-MM-DD")) {
      swal({
        title: "",
        text: `Please select date other than Current Date`,
        icon: "warning",
        button: "OK",
        className: "style",
      });
    } else {

      let payload = {
        iban: iban,
        fromDate: Moment(fromDateOfAdd).format("yyyy-MM-DD"),
        updatedBy: "ADMIN",
      };
      const response = await AddAccountConfiguration(payload);
      console.log(response.CreatedRecord);
      if (response.CreatedRecord) {
        searchMasterBankAccountData();
        setModal(false);
        setDateErrorMessage('')
      } else {
        setDateErrorMessage(response.message);
        // Iban already configured in given date
      }

    }


  };

  const updateDateForAddRecord = (date) => {
    console.log(Moment(date).format('yyyy-MM-DD'));
    setFromDateOfAdd(date)
  }

  /*Function to check token in LocalStorage and extract the roles and set the State
 */
  const toGetRoles = () => {
    if (localStorage.getItem("id_token")) {
      let decoded_token = jwt_decode(localStorage.getItem("id_token"));
      let allowedRoles = process.env.REACT_APP_ALLOWEDROLES;
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
    fetchTenantData();
    searchMasterBankAccountData();
    setisActive(true);
  }, []);
  return (
    <div>
      <Header isActive={isActive} />


      <div className="container-fluid">
        <p className="header">
          <span style={{ float: "left", fontSize: "12px" }}>
            Operations /{" "}
            <span
              style={{
                color: "#06608e",
                fontSize: "12px",
                fontWeight: "bold",
              }}
            >
              Configuration of Master Bank Accounts
            </span>
          </span>
        </p>
        <br />
        {/* <Button onClick={()=>toggle2}>Clcik</Button> */}
        <Row>
          <Col>
            <Table id="topTable" className="table-bordered">
              <tbody>
                <tr>
                  <td className="lbltd">
                    Select Tenant:<span style={{ color: "red" }}>*</span>
                  </td>
                  <td className="input-width">
                    <Input
                      className="config-dropdownCss shadow-sm"
                      onChange={(e) => setTenantId(e.target.value)}
                      bsSize="sm"
                      type="select"

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
                  </td>
                  <td className="lbltd">
                    Business Type:<span style={{ color: "red" }}>*</span>
                  </td>
                  <td className="input-width">
                    <div>
                      <Input
                        className="config-dropdownCss shadow-sm"
                        onChange={(e) => selectBussinessType(e.target.value)}
                        bsSize=""
                        type="select"
                        value={bussinessType}
                      >
                        <option value="MM">MM</option>
                        <option value="B2B">B2B</option>
                      </Input>
                    </div>
                  </td>
                  {/* <td className="lbltd">
                    IBAN:<span style={{ color: "red" }}>*</span>
                  </td>
                  <td className="input-width">
                    <Input
                      className="config-dropdownCss shadow-sm"
                      bsSize=""
                      onChange={(e) => setIban(e.target.value)}
                      type="select"
                    >
                      <option value="">IBAN</option>
                      {ibanData && ibanData.length > 0
                        ? ibanData.map((data, i) => {
                            return (
                              <option value={data.iban} key={i}>
                                {data.iban}
                              </option>
                            );
                          })
                        : ""}
                    </Input>
                  </td> */}
                  <td className="lbltd">
                    File Type:<span style={{ color: "red" }}>*</span>
                  </td>
                  <td className="input-width">
                    <Input
                      className="config-dropdownCss shadow-sm"
                      bsSize="sm"
                      type="select"
                      onChange={(e) => setFileType(e.target.value)}
                      defaultValue={fileType}
                    >
                      {/* <option value={GfileType[2]}>PAIN_008</option> */}
                      <option value={GfileType[0]}>PAIN_001_001_03</option>
                    </Input>
                  </td>
                  <td className="lbltd"></td>
                  <td className="fldtd">
                    <Button
                      block
                      color="primary"
                      style={{ "borderRadius": '0' }}
                      size=""
                      onClick={searchMasterBankAccountData}
                    >
                      SEARCH
                    </Button>
                  </td>
                </tr>
                <tr>
                  <td className="lbltd">
                    From:<span style={{ color: "red" }}>*</span>
                  </td>
                  <td className="input-width">
                    {/* <FromDatePicker
                      onDateChange={updateConfigFromDate}
                      date={configFromDate}
                      
                    /> */}
                    <DatePicker
                      ref={datepickerRef}
                      selected={configFromDate}
                      minDate={new Date(currentYear - 5, 12, 1)}
                      maxDate={new Date(currentYear + 5, 11, 31)}
                      onChange={(e) => updateConfigFromDate(e)}
                      dateFormat={"yyyy-MM-dd"}
                      className="date-pickercamt shadow-sm"
                    />
                  </td>

                  <td className="lbltd">
                    To:<span style={{ color: "red" }}>*</span>
                  </td>
                  <td className="input-width">

                    <DatePicker
                      ref={datepickerRef}
                      selected={configToDate}
                      minDate={new Date(currentYear - 5, 12, 1)}
                      maxDate={new Date(currentYear + 5, 11, 31)}
                      onChange={(e) => updateConfigToDate(e)}
                      dateFormat={"yyyy-MM-dd"}
                      className="date-pickercamt shadow-sm"
                    />
                  </td>
                  <td className="lbltd">

                  </td>
                  <td className="input-width">

                  </td>
                  <td className="lbltd">

                  </td>
                  <td className="input-width">
                    <Button
                      block
                      style={{
                        "borderRadius": '0',
                        background: "linear-gradient(#088717, #054209)",
                      }}
                      size="sm"
                      onClick={toggle}
                    >
                      <FontAwesomeIcon
                        icon={faAdd}
                        style={{ marginRight: "10px" }}
                      />
                      ADD
                    </Button>
                  </td>

                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>

        <Table
          className="tablestyle mb-0 bg-white"
          size="sm"
          responsive
          bordered
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>
                BANK
                <br /> NAME
              </th>
              {/* <th>
                CREDITOR
                <br /> NAME
              </th> */}
              {/* <th>CREDITOR ID</th>
              <th>CREDITOR COUNTRY</th> */}
              {/* <th>ADDRESS</th> */}
              <th>
                ACCOUNT
                <br /> OWNER
              </th>
              <th>IBAN</th>
              <th>BIC</th>
              <th>
                TENANT
                <br />
              </th>
              <th>
                BUSINESS <br />
                TYPE
              </th>

              <th>FROM DATE</th>
              <th>STATUS</th>
              {/* <th>ACTION</th> */}
            </tr>
          </thead>
          <tbody>
            {configMasterBankAccountData?.length > 0 ? (
              configMasterBankAccountData.map((record, i) => {
                return <tr key={i}>
                  <td>{record.bankPlanId}</td>
                  <td>{record.bankName}</td>
                  {/* <td>{record.creditorName}</td> */}
                  {/* <td>{record.creditorId}</td>
               <td>{record.creditorCountry}</td> */}
                  {/* <td>{record.bankAddress}</td> */}
                  <td>{record.accountOwner}</td>
                  <td>{record.iban}</td>
                  <td>{record.bic}</td>
                  <td>{record.tenantId}</td>
                  <td>{record.businessType}</td>

                  <td>
                    {record?.fromDate
                      ? Moment(record?.fromDate).format("yyyy-MM-DD")
                      : ""}
                  </td>
                  <td>{record.status == "Active" ?
                    <span className="badge" style={{
                      backgroundColor: "green",
                      width: "60px",
                      height: "18px",
                    }}>{record.status}</span> : ""
                  }</td>

                </tr>
              })


            ) : (notAvailableResponse !== '') ?
              (
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
                    {notAvailableResponse}
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

        <Modal
          isOpen={modal}
          size="lg"
          style={{ backgroundColor: "white !important" }}
        >
          <ModalHeader toggle={toggle}></ModalHeader>
          <ModalBody>
            <Row>
              <Col md={1}>
                <FormGroup>
                  <Label for="examplePassword"></Label>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <>
                    <b style={{ fontSize: "12px" }}>IBAN<span style={{ color: "red" }}>*</span></b>
                  </>
                  <Input
                    className="config-dropdownCss shadow-sm"
                    bsSize=""
                    onChange={(e) => {
                      setDateErrorMessage('');
                      setIban(e.target.value)
                    }}
                    type="select"
                    value={iban}
                  >
                    <option value=''>Select IBAN</option>
                    {ibanData && ibanData.length > 0
                      ? ibanData.map((data, i) => {
                        return (
                          <option value={data.iban} key={i}>
                            {data.iban}
                          </option>
                        );
                      })
                      : ""}
                  </Input>
                  <small style={{ 'color': 'red', 'fontSize': '12px', "fontWeight": 'bold' }}>{(dateErrorMessage) ? dateErrorMessage : ""}</small>
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for="examplePassword"></Label>
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <>
                    <b style={{ fontSize: "12px" }}>FROM DATE<span style={{ color: "red" }}>*</span></b>
                  </>

                  <span>
                    <DatePicker
                      ref={datepickerRef}
                      selected={fromDateOfAdd}
                      minDate={new Date(currentYear, currentMonth, currentDay)}
                      maxDate={new Date(currentYear + 5, 11, 31)}
                      onChange={(e) => updateDateForAddRecord(e)}
                      dateFormat={"yyyy-MM-dd"}
                      className="date-pickercamt shadow-sm"
                    />
                  </span>
                </FormGroup>
              </Col>
            </Row>

            <br />

            <p
              style={{
                textAlign: "center",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                onClick={AddNewRecord}
                color="primary"
                size="sm"
                style={{ width: "120px" }}
              >
                Save
              </Button>
            </p>
          </ModalBody>
        </Modal>

        {/* <Modal isOpen={modal2} size="xs" className="from-date-pop">
          <ModalHeader toggle={toggle2}></ModalHeader>
          <ModalBody>
            <div className="container-fluid">
              <Table size="sm" className="from-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>IBAN</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{bankId}</td>
                    <td>{iban}</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <span>
              <FormGroup>
                <div style={{ textAlign: "center" }}>
                  <Label for="exampleEmail">
                    <b>FROM DATE</b>
                  </Label>
                </div>

                <DatePicker
                  ref={datepickerRef}
                  selected={fromDate}
                  showTimeSelect
                  minDate={new Date(currentYear - 2, 12, 1)}
                  maxDate={new Date(currentYear, currentMonth, currentDay)}
                  onChange={(e) => updatedFromDate(e)}
                  dateFormat={"dd-MM-yyyy"}
                  className="stypeDatepicker"
                />
                <br />
                <br />
              </FormGroup>
            </span>
            <p
              style={{
                display: "flex",
                alignContent: "center",
                columnGap: "46px",
                marginLeft: "56px",
              }}
            >
              <Button
                onClick={patchRequestUpdateBankAccount}
                color="primary"
                style={{ width: "150px", borderRadius: "0px" }}
              >
                SUBMIT
              </Button>
              <Button
                onClick={closeFromDatePopup}
                color="danger"
                style={{ width: "150px", borderRadius: "0px" }}
              >
                CANCEL
              </Button>
            </p>
          </ModalBody>
        </Modal> */}

        {/* <DeleteConfirmation
          openPopup={openPopup}
          CanclePop={CanclePop}
          isClickedOnConfirm={isClickedOnConfirm}
        /> */}
      </div>
    </div>
  );
}

export default ConfigMasterBankAccount;
