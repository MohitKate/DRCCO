import React from "react";
import { Modal, ModalBody, Label, FormGroup, Button, Input,Table } from "reactstrap";
import './ApprovePopup.css'

function ApprovePopup(props) {
  const {
    setTextandCheckLength,
    cancleOfApprovePopup,
    text,
    popup4InSepaFileandReconcillationStatus,
    textTypedandApproved,
    fileName,
    numberOfTransaction,
    bussinessType,amount
  } = props;
  
  return (
    <div>
      <Modal
        size="lg"
        fade={true}
        isOpen={popup4InSepaFileandReconcillationStatus}
        centered
      >
        <ModalBody className="mt-0 visible-alert-confirm">
        <Table className="approve-popup" bordered>
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

          <FormGroup>
            <Label htmlFor="exampleText">
              <h6> Comments:</h6>
            </Label>

            <Input
              className={
                text.length > 1 ? "commentbox-text" : "commentbox-notext"
              }
              id="exampleText"
              name="text"
              value={text}
              onChange={(e) => setTextandCheckLength(e.target.value)}
              type="textarea"
            />
          </FormGroup>
          <div style={{ float: "right" }}>
            <Button
              style={{ backgroundColor: "green" }}
              onClick={textTypedandApproved}
            >
              Approve
            </Button>
            {"     "}
            <Button
              style={{ color: "black", backgroundColor: "white" }}
              onClick={cancleOfApprovePopup}
            >
              Cancel
            </Button>
          </div>
        </ModalBody>
      </Modal>


      
    </div>
  );
}

export default ApprovePopup;
