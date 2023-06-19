import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import Moment from "moment";
import "./FromDatepickerstyle.css"
import "react-datepicker/dist/react-datepicker.css";


const FromDatePicker = ({ onDateChange, date, showTimeSelect, istime,classNamedatepicker,Inputwidthclass}) => {
  const datepickerRef = useRef(null);
  
  let currentYear = new Date().getFullYear();
  let currentMonth = new Date().getMonth();
  let currentDay = new Date().getDate();

  /*Function to work when Date is Changed from DatePicker
   */

  const updatedFormateDate = (date) => {
    onDateChange(date);
  };
  return (
    <>
      {istime?<div>
        <DatePicker
          ref={datepickerRef}
          locale={""}
          showTimeSelect
        
        
          selected={date}
          minDate={new Date(currentYear - 2, 12, 1)}
          maxDate={new Date(currentYear, currentMonth, currentDay)}
          onChange={(e) => updatedFormateDate(e)}
          className="date-pickercamt shadow-sm"
          dateFormat={istime?"dd-MM-yyyy HH:mm:ss":"dd-MM-yyyy"}
        />
      </div>:
       <DatePicker
       ref={datepickerRef}
       
      
       
       selected={date}
       minDate={new Date(currentYear - 2, 12, 1)}
       maxDate={new Date(currentYear, currentMonth, currentDay)}
       onChange={(e) => updatedFormateDate(e)}
       className={classNamedatepicker? "date-picker shadow-sm":"date-pickercamt shadow-sm"}
       dateFormat={istime?"dd-MM-yyyy HH:mm:ss":"dd-MM-yyyy"}
     />

      }
    </>
  );
};
export default FromDatePicker;
