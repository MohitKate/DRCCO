import React from 'react'
import { Table, ModalBody, ModalHeader, Modal } from 'reactstrap';
import './ReconcileStatusPain001NPain002NCamt054Popup.css'
import { GfileType, pain002NCAMT053Status } from '../../../../Constants/constant';
import Moment from 'moment';
function ReconcileStatusPain001NPain002NCamt054Popup(props) {

  const { popup2InSepaFileandReconcillationStatus, onDismissPop2,
    objectTosetpain001npain002ncamt054Popup, objectToSetPain002Popup } = props
  return (
    <div>
      <Modal
        size="xl"
        isOpen={popup2InSepaFileandReconcillationStatus}
      >
        <ModalHeader toggle={onDismissPop2}></ModalHeader>
        <ModalBody>
          <br />

          <br />

          <Table
            responsive
            className="bg-white reconciled-status-popup"
            bordered
          >
            <thead
              style={{ backgroundColor: "#cce0ff", color: "black" }}
            >
              <tr>
                <th>FileName</th>
                <th>FileType</th>
                <th>Creation Date</th>
                <th
                  className="tableheaders"
                  style={{ textAlign: "center" }}
                >
                  Number of<br /> Transactions
                </th>
                <th
                  className="tableheaders"
                  style={{ textAlign: "center" }}
                >
                  Total Amount
                </th>
                <th
                  className="tableheaders"
                  style={{ textAlign: "center" }}
                >
                  Reconciled Status
                </th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{objectTosetpain001npain002ncamt054Popup?.filename}</td>
                <td>{objectTosetpain001npain002ncamt054Popup?.filetype}</td>
                <td>{Moment(objectTosetpain001npain002ncamt054Popup?.sepaCreationDate).format("YYYY-MM-DD")}</td>
                <td style={{ textAlign: "center" }}>
                  {objectTosetpain001npain002ncamt054Popup?.numberOfTransactions}
                </td>
                <td>
                  <span style={{ float: "right", border: "none" }}>
                    &#x20AC;{objectTosetpain001npain002ncamt054Popup?.amount}
                  </span>
                </td>
                <td style={{ textAlign: "center" }}>
                  <span style={{ border: "none" }}>
                    {objectTosetpain001npain002ncamt054Popup?.reconcileStatus == pain002NCAMT053Status[2] ? (
                      <span
                        className="badge"
                        style={{
                          backgroundColor: "red",
                          width: "100px",
                          height: "20px",
                        }}
                      >
                        {objectTosetpain001npain002ncamt054Popup?.reconcileStatus}
                      </span>
                    ) : objectTosetpain001npain002ncamt054Popup?.reconcileStatus ==
                      pain002NCAMT053Status[1] ? (
                      <span
                        className="badge"
                        style={{
                          backgroundColor: "green",
                          width: "100px",
                          height: "20px",
                        }}
                      >
                        {" "}
                        {objectTosetpain001npain002ncamt054Popup?.reconcileStatus}
                      </span>
                    ) : objectTosetpain001npain002ncamt054Popup?.reconcileStatus ==
                      pain002NCAMT053Status[0] ? (
                      <span
                        className="badge"
                        style={{
                          backgroundColor: "#FFBF00",
                          width: "100px",
                          height: "20px",
                          border: "0.5px solid black",
                          color: "black",
                          fontSize: "10px",
                        }}
                      >
                        {" "}
                        {objectTosetpain001npain002ncamt054Popup?.reconcileStatus}
                      </span>
                    ) : (
                      ""
                    )}
                  </span>
                </td>
              </tr>
            </tbody>
          </Table>
          <br />
          <br />

          <Table
            responsive
            className="reconciled-status-popup bg-white"
            bordered
          >
            <thead
              style={{ backgroundColor: "#cce0ff", color: "black" }}
            >
              <tr>
                <th
                  className="tableheaders"
                  style={{ textAlign: "center" }}
                >
                  FileName
                </th>
                <th
                  className="tableheaders"
                  style={{ textAlign: "center" }}
                >
                  FileType
                </th>
                <th
                  className="tableheaders"
                  style={{ textAlign: "center" }}
                >
                  Message Id Ntry
                </th>
                <th
                className="tableheaders"
                style={{ textAlign: "center" }}>
                PaymentInfoStatus
                </th>
              
                <th
                  className="tableheaders"
                  style={{ textAlign: "center" }}
                >
                  Creation Date
                </th>
                <th
                  className="tableheaders"
                  style={{ textAlign: "center" }}
                >
                  Number of<br /> Transactions
                </th>
                <th
                  className="tableheaders"
                  style={{ textAlign: "center" }}
                >
                  Total Amount
                </th>
                <th
                  className="tableheaders"
                  style={{ textAlign: "center" }}
                >
                  Reconciled Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>

                <td>{objectTosetpain001npain002ncamt054Popup?.reconcileCamt053?.camt053FileName}</td>
                <td>CAMT_053_001_02</td>
                <td style={{ textAlign: "center" }}>
                  <span>{objectTosetpain001npain002ncamt054Popup?.reconcileCamt053?.entryDtlsMessageId}</span>
                </td>
               <td></td>
                <td style={{ textAlign: "center" }}>
                  <span>
                    {objectTosetpain001npain002ncamt054Popup?.reconcileCamt053?.camt053CreationDate==("Invalid date" && null)
                      ? ""
                      : Moment(objectTosetpain001npain002ncamt054Popup?.reconcileCamt053?.camt053CreationDate).format("YYYY-MM-DD")}
                  </span>
                </td>
                <td style={{ textAlign: "center" }}>
                  {objectTosetpain001npain002ncamt054Popup?.reconcileCamt053?.numberOfTransactions}
                </td>
                <td style={{ textAlign: "right" }}>
                  {objectTosetpain001npain002ncamt054Popup?.reconcileCamt053?.amount === null || "" ? (
                    <span style={{ border: "none" }}>
                      {objectTosetpain001npain002ncamt054Popup?.reconcileCamt053?.amount}
                    </span>
                  ) : (
                    <span style={{ border: "none" }}>
                      &#x20AC;{objectTosetpain001npain002ncamt054Popup?.reconcileCamt053?.amount}
                    </span>
                  )}
                </td>
                <td style={{ textAlign: "center" }}>
                  <span style={{ border: "none" }}>
                    {objectTosetpain001npain002ncamt054Popup?.reconcileCamt053?.status == pain002NCAMT053Status[2] ? (
                      <span
                        className="badge"
                        style={{
                          backgroundColor: "red",
                          width: "100px",
                          height: "20px",
                        }}
                      >
                        {objectTosetpain001npain002ncamt054Popup?.reconcileCamt053?.status}
                      </span>
                    ) : objectTosetpain001npain002ncamt054Popup?.reconcileCamt053?.status ==
                      pain002NCAMT053Status[1] ? (
                      <span
                        className="badge"
                        style={{
                          backgroundColor: "green",
                          width: "100px",
                          height: "20px",
                        }}
                      >
                        {" "}
                        {objectTosetpain001npain002ncamt054Popup?.reconcileCamt053?.status}
                      </span>
                    ) : objectTosetpain001npain002ncamt054Popup?.reconcileCamt053?.status ==
                      pain002NCAMT053Status[0] ? (
                      <span
                        className="badge"
                        style={{
                          backgroundColor: "#FFBF00",
                          width: "100px",
                          height: "20px",
                          border: "0.5px solid black",
                          color: "black",
                          fontSize: "10px",
                        }}
                      >
                        {" "}
                        {objectTosetpain001npain002ncamt054Popup?.reconcileCamt053?.status}
                      </span>
                    ) : (
                      ""
                    )}
                  </span>
                </td>
              </tr>

              {objectTosetpain001npain002ncamt054Popup?.filetype !== GfileType[1] && objectTosetpain001npain002ncamt054Popup?.filetype !== GfileType[3] && objectToSetPain002Popup?.length>0 ? (
                objectToSetPain002Popup?.map((item, i) => {

                  return <tr key={i}>
                    <td>{item?.pain002FileName}</td>
                    <td>PAIN_002_001_02</td>
                    <td style={{ 'textAlign': 'center' }}>{item.messageID}</td>
                    <td style={{ 'textAlign': 'center' }}>{item.paymentInfoStatus}</td>
                    <td style={{ 'textAlign': 'center' }}>{item.pain002CreationDate == ("Invalid date" && null) ? "" : Moment(item.pain002CreationDate).format("yyyy-MM-DD")}</td>
                    <td style={{ 'textAlign': 'center' }}>{item.numberOfTransactions}</td>
                    <td style={{ 'textAlign': 'right' }}>{item.amount}</td>
                    <td style={{ textAlign: "center" }}>
                      <span style={{ border: "none" }}>
                        {item.status == pain002NCAMT053Status[2] ? (
                          <span
                            className="badge"
                            style={{
                              backgroundColor: "red",
                              width: "100px",
                              height: "20px",

                            }}
                          >
                            {item.status}
                          </span>
                        ) : item.status ==
                          pain002NCAMT053Status[1] ? (
                          <span
                            className="badge"
                            style={{
                              backgroundColor: "green",
                              width: "100px",
                              height: "20px",
                            }}
                          >
                            {" "}
                            {item.status}
                          </span>
                        ) : item.status ==
                          pain002NCAMT053Status[0] ? (
                          <span
                            className="badge"
                            style={{
                              backgroundColor: "#FFBF00",
                              width: "100px",
                              height: "20px",
                              border: "0.5px solid black",
                              color: "black",
                              fontSize: "10px",
                            }}
                          >
                            {" "}
                            {item.status}
                          </span>
                        ) : (
                          <span
                          className="badge"
                          style={{
                            backgroundColor: "rgb(193 190 181)",
                            width: "100px",
                            height: "20px",
                            border: "0.5px solid black",
                            color: "black",
                            fontSize: "10px",
                          }}
                        >
                          {" "}
                          {item.status}
                        </span>
                        )}
                      </span>
                    </td>

                  </tr>
                })

            //  <tr>
            //    <td>{objectTosetpain001npain002ncamt054Popup?.reconcilePain002?.pain002FileName}</td>
            //    <td>PAIN_002_001_02</td>
            //    <td>{objectTosetpain001npain002ncamt054Popup?.reconcilePain002?.messageID}</td>
            //    <td style={{'textAlign':'center'}}>{objectTosetpain001npain002ncamt054Popup?.reconcilePain002?.pain002CreationDate==("Invalid date" && null) ? "" : Moment(objectTosetpain001npain002ncamt054Popup?.reconcilePain002?.pain002CreationDate).format("yyyy-MM-DD")}</td>
            //    <td style={{'textAlign':'center'}}>{objectTosetpain001npain002ncamt054Popup?.reconcilePain002?.numberOfTransactions}</td>
            //    <td style={{'textAlign':'right'}}>
            //    {objectTosetpain001npain002ncamt054Popup?.reconcilePain002?.amount === null || "" ? (
            //         <span style={{ border: "none" }}>
            //           {objectTosetpain001npain002ncamt054Popup?.reconcilePain002?.amount}
            //         </span>
            //       ) : (
            //         <span style={{ border: "none" }}>
            //           &#x20AC;{objectTosetpain001npain002ncamt054Popup?.reconcilePain002?.amount}
            //         </span>
            //       )}
               
            //    </td>
            //    <td style={{'textAlign':'center'}}>
               
            //    <span style={{ border: "none" }}>
            //            {objectTosetpain001npain002ncamt054Popup?.reconcilePain002?.status == pain002NCAMT053Status[2] ? (
            //              <span
            //            className="badge"
            //                style={{
            //                  backgroundColor: "red",
            //                  width: "100px",
            //                height: "20px",

            //                }}
            //              >
            //                {objectTosetpain001npain002ncamt054Popup?.reconcilePain002?.status}
            //              </span>
            //            ) : objectTosetpain001npain002ncamt054Popup?.reconcilePain002?.status ==
            //              pain002NCAMT053Status[1] ? (
            //              <span
            //                className="badge"
            //                style={{
            //                  backgroundColor: "green",
            //                  width: "100px",
            //                  height: "20px",
            //                }}
            //           >
            //                {" "}
            //                {objectTosetpain001npain002ncamt054Popup?.reconcilePain002?.status}
            //              </span>
            //            ) : objectTosetpain001npain002ncamt054Popup?.reconcilePain002?.status ==
            //              pain002NCAMT053Status[0] ? (
            //              <span
            //                className="badge"
            //                  style={{
            //                    backgroundColor: "#FFBF00",
            //                    width: "100px",
            //                    height: "20px",
            //                    border: "0.5px solid black",
            //                    color: "black",
            //                    fontSize: "10px",
            //                  }}
            //                >
            //                  {" "}
            //                  {objectTosetpain001npain002ncamt054Popup?.reconcilePain002?.status}
            //                </span>
            //            ) : (
            //                ""
            //              )}
            //            </span>
            //    </td>
            
               
            //  </tr>
              ) : (
                ""
              )}
            </tbody>
          </Table>
          <br />
        </ModalBody>
      </Modal>
    </div>
  )
}

export default ReconcileStatusPain001NPain002NCamt054Popup
