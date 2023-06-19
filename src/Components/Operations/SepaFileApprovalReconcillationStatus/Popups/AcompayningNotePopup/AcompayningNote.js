import React from 'react';
import './AcompayningNote.css'
import {Table, Modal, ModalHeader,ModalBody} from 'reactstrap'

function AcompayningNote(props) {

  const {accompayningNoteTableBody,onDismissPops5,accompayningNoteToogle,TableData,accompayningMessage}=props
  return (
    <div >
        <Modal
                    size="lg"
                    fade={true}
                    isOpen={accompayningNoteToogle}
                    centered
                  >
                    <ModalHeader toggle={onDismissPops5}>
                      <div style={{ marginLeft: "275px", fontSize: "18px" }}>
                        Pain008 Accompayning Note
                      </div>
                    </ModalHeader>

                    <ModalBody>
                 
                      
                      {TableData ? (
                        <Table
                          className="accompayning-table mx-auto px-md-5"
                          responsive
                        >
                          <tbody>
                            <tr>
                              <th className="accompayning-table-header">
                                SEPAFILE ID
                              </th>
                              <td>{TableData?.id}</td>
                            </tr>

                            <tr>
                              <th className="accompayning-table-header">
                                DATE MAIL
                              </th>
                              <td>{TableData?.dateMail}</td>
                            </tr>

                            <tr>
                              <th className="accompayning-table-header">
                                BODY
                              </th>
                              <td>{accompayningNoteTableBody}</td>
                            </tr>
                            <tr>
                              <th className="accompayning-table-header">
                                CREATED USER
                              </th>
                              <td>{TableData?.createdUser}</td>
                            </tr>
                          </tbody>
                        </Table>
                      ) : (accompayningMessage!==""?
                        <Table>
                          <tbody>
                            <tr>
                              <td>{accompayningMessage}</td>
                            </tr>
                          </tbody>
                        </Table>:""
                      )}
                    </ModalBody>
                  </Modal>
    </div>
  )
}

export default AcompayningNote
