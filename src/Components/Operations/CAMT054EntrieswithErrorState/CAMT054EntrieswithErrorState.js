import React, { useEffect, useRef, useState } from "react";
import Header from "../../GlobalComponents/Header/Header"
import { Row, Col, Label, Button, Input, Table } from "reactstrap";
import Moment from "moment";
import DatePicker from "react-datepicker";
import './CAMT054EntrieswithErrorState.css'
import FromDatePicker from "../../GlobalComponents/FromDateorCreationDatePicker/FromDatePicker";
import { dataSharing } from "../../Constants/Service/dataSharing";

function CAMT054EntrieswithErrorState() {
  const datepickerRef = useRef(null);
  const [isActive, setIsActive]=useState(false)
  const [fromDate, setFromDate] = useState(new Date());
  const [fromDate2, setFromDate2] = useState(new Date());
  const [fromDate2Time, setFromDate2Time] = useState(new Date());
  var currentYear = new Date().getFullYear();
  var currentMonth = new Date().getMonth();
  var currentDay = new Date().getDate();

  /*Function to work when  from Date is Changed from DatePicker

*/

  const updatedFromDate = (date) => {
    console.log(Moment(date).format("yyyy-MM-DD"));
    setFromDate2Time(Moment(date).format("HH:mm:ss"));

    setFromDate(date);
    const formatDate = Moment(date).format("yyyy-MM-DD");
    setFromDate2(formatDate);
  };

  useEffect(()=>{

    dataSharing.getRole().subscribe((respo)=>{
      console.log(respo,"KKKKKK");
    })
    setIsActive(true)
  })
  return (
    <div>
      <Header  isActive={isActive} />
      <div className="camterrornavigationroute1">
       <b>Operations/</b> {" "}
        <span style={{ color: "#06608e", fontWeight: "bold" }}>
          CAMT054 Entries with ErrorState
        </span>
      </div>
      <br />
      <br/>

      
      <div style={{'marginLeft':'26px'}}>
        <Row style={{'display':'flex',"columnGap":'60px',"alignItems":'baseline'}}>  
          <Col    >
          < >
                  <b style={{'fontSize':"12px","float":'left'}}>File Type:<span style={{ color: "red" }}>*</span></b>
                </>
                <Input className="error-dropdowncss shadow-sm" bsSize="sm" style={{'width':'102%'}} type="select" size='sm'>
                    <option value="FileType">FileType</option>
                    <option value="PAIN_001">PAIN_001</option>
                    <option value="PAIN_008">PAIN_008</option>
                    <option value="PAIN_008">CAMT054</option>
                  </Input>
          </Col>
         
       
                   
        <Col  >
        <>
                  <b style={{'fontSize':"12px",'float':'left'}}> Sepa File ID:<span style={{ color: "red" }}>*</span></b>
                </>
                  <Input style={{'fontSize':"12px"}} className='shadow-sm' bsSize="sm" defaultValue={'1321'} type="text"></Input>
        
        </Col>
                       
                <Col   >
                <>
                  <b style={{'fontSize':"12px",'float':'left'}}>  End To End ID:<span style={{ color: "red" }}>*</span></b>
                </>
                  <Input style={{'fontSize':"12px"}} className='shadow-sm' bsSize="sm" type="text" defaultValue={'CTCkTxgfOOsfinJ7i4AvZAC221'}></Input>
              
                </Col>
                      
              <Col   >
              <>
                  <b style={{'fontSize':"12px",'float':'left'}}> Creation Date:<span style={{ color: "red" }}>*</span></b>
                </>
                <div style={{'width':'102%'}}>

                <FromDatePicker
                onDateChange={updatedFromDate}
                date={fromDate}
                showTimeSelect={"showTimeSelect"}
                istime={true}
                Inputwidthclass={true}
                
                />
                </div>

               

              </Col>
               
            
             
             <Col >
             <Button color="primary" style={{'width':'174px',"height":'35px',"borderRadius":'0'
          }}>
                    SEARCH
                  </Button>
             </Col>
             
             
              
                
              
            
          
        </Row>
        <br/>
     

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
            {false ? (
              <tr>
                <td></td>
                <td></td>
                <td style={{ textAlign: "left" }}></td>
                <td></td>
              </tr>
            ) : false ? (
              <tr>
                <td colSpan="12" style={{ border: "none" }}>
                  <h4 className="ErrorMessage"></h4>
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
  );
}

export default CAMT054EntrieswithErrorState;
