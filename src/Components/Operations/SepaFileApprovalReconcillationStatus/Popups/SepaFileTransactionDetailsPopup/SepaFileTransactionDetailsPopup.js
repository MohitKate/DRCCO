import React from "react";
import { GfileType } from "../../../../Constants/constant";
import { Modal, ModalBody, ModalHeader, Table } from "reactstrap";
import './SepaFileTransactionDetailsPopup.css'

function SepaFileTransactionDetailsPopup(props) {
  const {
    popup3InSepaFileandReconcillationStatus,
    onDismissPop3,
    objectTosetpain001npain002ncamt054Popup
  } = props;
  return (
    <div>
      <Modal
        size="xl"
       
        isOpen={popup3InSepaFileandReconcillationStatus}
      >
        <ModalHeader toggle={onDismissPop3}></ModalHeader>
        <ModalBody>
          <br />
          <br />

          <Table responsive className="bg-white transaction-details-table" bordered>
            <thead style={{ backgroundColor: "#cce0ff", color: "black" }}>
              <tr>
                <th>FileName</th>
                {objectTosetpain001npain002ncamt054Popup?.filetype == GfileType[0] ? (
                  <th>
                    Highest
                    <br /> Amount of Transactions
                  </th>
                ) : (
                  ""
                )}
                <th style={{ textAlign: "center" }}>
                  Average
                  <br /> Transaction Amount
                </th>
                <th style={{ textAlign: "center" }}>
                  Number
                  <br /> of Transactions
                </th>
              </tr>
            </thead>

            <tbody>
              {
                <>
                  <tr>
                    <td>{objectTosetpain001npain002ncamt054Popup?.filename}</td>
                    {objectTosetpain001npain002ncamt054Popup?.filetype == GfileType[0] ? <td><span style={{ float: "right", border: "none" }}>&#x20AC;{objectTosetpain001npain002ncamt054Popup?.approvalPopDetails?.highTranAmt}</span> </td> : ""}
                    <td>
                      <span style={{ float: "right", border: "none" }}>
                        &#x20AC;{objectTosetpain001npain002ncamt054Popup?.approvalPopDetails?.avgTranAmt}
                      </span>
                    </td>
                    <td>
                      <span style={{ float: "right", border: "none" }}>
                        {objectTosetpain001npain002ncamt054Popup?.approvalPopDetails?.numberOfTransactions}
                      </span>
                    </td>
                  </tr>
                </>
              }
            </tbody>
          </Table>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default SepaFileTransactionDetailsPopup;
