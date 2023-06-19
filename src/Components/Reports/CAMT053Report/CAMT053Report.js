import React,{ useRef, useState,useEffect} from 'react';
import {
  Row, Col, Button, Input, Table
} from 'reactstrap';
import DatePicker from "react-datepicker";
import {
   GetCAMT053ReportData
} from '../../Constants/AxiosHandler/request';
import Moment from 'moment';
import Header from '../../GlobalComponents/Header/Header'

function CAMT053Report() {

   const datepickerRef1 = useRef(null);
   const datepickerRef2 = useRef(null);
   const [startDate1, setStartDate1] = useState(new Date());
   const [startDate2, setStartDate2] = useState(new Date());
  const [dateChanged1, setDateChanged1] = useState(false);
  const [dateChanged2, setDateChanged2] = useState(false);
  const [dateVariable, setDateVariable] = useState('');
  const [tenantId, setTenantId] = useState('');
  const [tenantValue, setTenantValue] = useState('Select Tenant ID');
  const [tenantdata, setTenantdata] = useState([]);
  const [defaultbussinessType, setDefaultbussinessType] = useState('Bussiness Type');
  
const GetCAMT0543ReportData=async()=>{
   let formatDate = Moment(new Date()).format('yyyy-MM-DD')
   if (dateChanged1) {
      let payload = {
         creationDate: dateVariable,
       
      };

      const response = await GetCAMT053ReportData(payload);
      console.log(response);
     
    }else{
      let payload = {
         creationDate: formatDate,
       
      };

      const response = await GetCAMT053ReportData(payload);
      console.log(response);

    }
  

}



  var currentYear = (new Date).getFullYear();
  var currentMonth = (new Date).getMonth();
  var currentDay = (new Date).getDate();
  var currentYear2 = (new Date).getFullYear();
  var currentMonth2 = (new Date).getMonth();
  var currentDay2 = (new Date).getDate();

    /*Function to activate when datePicker1 is Changed by user*/

    const updatedFormateDatePicker1 = (date) => {
      setDateChanged1(true)
       const formatDate = Moment(date).format('YYYY-MM-DD')
      console.log('Datepicker1',formatDate);
      setStartDate1(date);
   }


       /*Function to activate when datePicker2 is Changed by user*/

       const updatedFormateDatePicker2 = (date) => {
        
         const formatDate = Moment(date).format('YYYY-MM-DD');
         console.log('Datepicker2',formatDate);
         setStartDate2(date);
       
      }


 
 
  return (
    <div>
      <Header />
      <div className="container-fluid">
      <p className='navigationroute'>Report Section / <span style={{ 'color': "#06608e", 'fontWeight': 'bold' }}>CAMT053 Report</span></p>

      <Row >
                  <Col sm={{
                     offset: 0,
                     size: 3
                  }} >
                     <div>
                        <DatePicker ref={datepickerRef1} selected={startDate1} minDate={new Date((currentYear - 1), 12, 1)} maxDate={new Date(currentYear, currentMonth, currentDay)} onChange={(e) => updatedFormateDatePicker1(e)} className="date-pickercamt" dateFormat={'yyyy-MM-dd'}
                        />

                     </div>
                  </Col>
                  <Col sm={{
                     offset: 0,
                     size: 3
                  }}>
                     {/* <div>
                        <DatePicker ref={datepickerRef2} selected={startDate2} minDate={new Date((currentYear2 - 1), 12, 1)} maxDate={new Date(currentYear2, currentMonth2, currentDay2)} onChange={(e) => updatedFormateDatePicker2(e)} className="date-pickercamt" dateFormat={'yyyy-MM-dd'}
                        />

                     </div> */}
                    
                  </Col>

                  <Col sm={{
                     offset: 3,
                     size: 3
                  }}>
                     <Button
                        block
                        color="primary"
                      onClick={GetCAMT0543ReportData} >
                        SEARCH
                     </Button>
                  </Col>
               </Row>

        

        <Row>


          
        <div style={{ 'width': '100%' }}>
                     <Table
                        hover
                        bordered
                        responsive
                        striped
                        className='mt-3 bg-light'
                        id='example'
                        size='sm'
                     >
                        <thead>
                          
                           <tr>
                              <th>
                                 ENTRY DTLSMESSAGE ID
                              </th>
                             
                              <th>
                                 NUMBER OF TRANSACTION
                              </th>
                              <th>
                                 TOTAL AMOUNT
                              </th>
                              <th>
                                GVC
                              </th>
                              <th>
                                 PAYMENT INFO ID
                              </th>
                              <th>
                                 CREATION DATE
                              </th>
                              <th>
                                 STATUS
                              </th>

                           </tr>
                        </thead>
                        <tbody>
                        {true ? 
                 <><tr>
                             <td>CTX220325AC54001494</td>
                             <td>3</td>
                             <td>49</td>
                             <td >189</td>
                             <td >RCUR-5642</td>
                             <td>9/28/2022 0:00</td>
                             <td><span >RAITT_NEW</span></td>


                          </tr><tr>
                                <td>CTX220325AC54001494</td>
                                <td>6</td>
                                <td>79</td>
                                <td >189</td>
                                <td >RCUR-5642</td>
                                <td>9/28/2022 0:00</td>
                                <td><span>RAITT_NEW</span></td>


                             </tr><tr>
                                <td>CTX220325AC54001494</td>
                                <td>9</td>
                                <td>89</td>
                                <td >199</td>
                                <td >RCUR-5642</td>
                                <td>9/25/2022 0:00</td>
                                <td><span >RAITT_NEW</span></td>


                             </tr><tr>
                                <td>CTX220325AC54001494</td>
                                <td>3</td>
                                <td>49</td>
                                <td >189</td>
                                <td >RCUR-5642</td>
                                <td>9/22/2022 0:00</td>
                                <td><span  >RAITT_NEW</span></td>


                             </tr><tr>
                                <td>CTX220325AC54001494</td>
                                <td>7</td>
                                <td>48</td>
                                <td >189</td>
                                <td >RCUR-5642</td>
                                <td>9/08/2022 0:00</td>
                                <td><span >RAITT_NEW</span></td>


                             </tr><tr>
                                <td>CTX220325AC54001494</td>
                                <td>0</td>
                                <td>4</td>
                                <td >19</td>
                                <td >RCUR-5642</td>
                                <td>9/28/2022 0:00</td>
                                <td><span >RAITT_NEW</span></td>


                             </tr></>:
                false?
                  <tr >
                    <td colSpan="10" style={{ 'border': 'none' }}><h4 className='ErrorMessage'>No data in Backend</h4></td>
                  </tr> :
                  <><tr>

                    <td colSpan="16" style={{ 'border': 'none',"textAlign":'left' }}><h4 className='ErrorMessage'>No Data Available</h4></td>

                  </tr>

                  </>
              }
                       
                             

                         
                        </tbody>
                     </Table>
                  </div>

        </Row>
       

      </div>
    </div>
  )
}

export default CAMT053Report
