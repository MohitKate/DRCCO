import React, { useEffect, useState } from 'react'
import { Button, Table,Row,Col } from 'reactstrap'
import Header from '../../GlobalComponents/Header/Header'
import {ToGetCamt053CreditsRecords} from "../../Constants/AxiosHandler/request"
function Camt053Credits() {

  const [camt053CreditsTable, setcamt053CreditsTable]=useState([])
  const [camt053CreditsTableStatus, setcamt053CreditsTableStatus]=useState('')
  const [camt053CreditsTableMessage, setcamt053CreditsTableMessage]=useState('');

  const camt05CreditsApiCall=async()=>{
  let payload={

  }
  const response= await ToGetCamt053CreditsRecords(payload);
  console.log(response);
  if(response){
    setcamt053CreditsTable(response.camt053CreditRecords )
  }
  }

  useEffect(()=>{
    camt05CreditsApiCall();
  },[])
  return (
    <div>
      <Header/>
      <div className="camterrornavigationroute1">
       <b>Operations/</b> {" "}
        <span style={{ color: "#06608e", fontWeight: "bold" }}>
        Camt053 Credits Transactions
        </span>
      </div>
      <br />
      <br/>
      <div className='container'>
        <Row>
        <Col  xs='4' md='4' sm='4'><b>Camt053 Credits Transactions</b></Col>
        <Col xs='6' md='6' sm='6'></Col>
        
        
          <Col xs='2' md='2' sm='2'>
        
          </Col>

        </Row>

        <br/>

     

      </div>
     



      <div className="container-fluid">
           <Table responsive bordered className="bg-white mb-0" id="not-intimeTable">
              <thead>
                <tr>
                <th>ID</th>

                  <th>DEBITOR NAME</th>
                 
                  <th>TRANSACTION ID</th>
                  <th>AMOUNT</th>
                  
                  <th>
                  CLEAR SYSTEM REFERENCE
                   
                  </th>
                  <th>
                  REMITTANCE INFO
                  </th>
                  <th>
                  MSI SDN
                  </th>
                  <th>
                  GVC
                  </th>
                  <th>
                  DEBITOR BIC
                  </th>
                  <th>
                  DEBITOR IBAN
                  </th>
               
                </tr>
              </thead>
              <tbody>
              {/* {(camt053CreditsTableStatus=='success') && (camt053CreditsTableMessage=="") ? ( */}
                {camt053CreditsTable.length>0? (
                  camt053CreditsTable.map((record, i) => {
                    return (
                      <tr key={i}>
                        <td>{record.id}</td>
                        
                        <td>{record.debitorName}</td>
                        <td>{record.transactionId}</td>
                        <td style={{'textAlign':'right'}}> &#x20AC;{record.amount}</td>
                        <td>{record.clearSystemReference}</td>
                        <td>{record.remittanceInfo}</td>
                        <td>{record.msisdn}</td>
                        <td>{record.gvc}</td>
                        <td>{record.debitorBic}</td>
                        <td>{record.debitorIban}</td>
                        
                      </tr>
                    );
                  })
                ) : (camt053CreditsTableStatus=='success') && (camt053CreditsTableMessage!=="") ? (
                  <tr>
                    <td colSpan="12" style={{ border: "none" }}>
                      <h4 className="ErrorMessage">{camt053CreditsTableMessage}</h4>
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

           </div>
    </div>
  )
}

export default Camt053Credits
