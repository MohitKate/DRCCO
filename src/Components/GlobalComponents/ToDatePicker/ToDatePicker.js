import React,{useRef} from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function ToDatePicker({ onDateChange, date, showTimeSelect, istime,limitrange}) {
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
    <div>
        <>
    <div>
        <DatePicker
          ref={datepickerRef}
          showTimeSelect
          selected={date}
          minDate={limitrange}
          maxDate={new Date(currentYear, currentMonth, currentDay)}
          onChange={(e) => updatedFormateDate(e)}
          className="date-pickercamt shadow-sm"
          dateFormat={istime?"dd-MM-yyyy HH:mm:ss":"dd-MM-yyyy"}
        />
      </div>
    </>
    </div>
  )
}

export default ToDatePicker
