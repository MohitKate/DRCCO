import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCoffee,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "bootstrap/dist/js/bootstrap.bundle";

import DRC_CarveoutDashboard from "../src/Components/GlobalComponents/Dashboard/DRC_carveoutDashboard";
import CAMT054Report from "./Components/Reports/CAMT054Report/CAMT054Report";
import Login from "./Components/GlobalComponents/Login/Login";
import AddRole from "./Components/GlobalComponents/Header/Add Role/AddRole";
import CAMT053Report from "./Components/Reports/CAMT053Report/CAMT053Report";
import Pain008AccompanyingNote from "./Components/Reports/Pain008AccompanyingNote/Pain008AccompanyingNote";
import CAMT054EntrieswithErrorState from "./Components/Operations/CAMT054EntrieswithErrorState/CAMT054EntrieswithErrorState";
import Pain008AdHocSearchTransactions from "./Components/Operations/Pain008AdHocSearchTransactions/Pain008AdHocSearchTransactions";
import NotInTimeProcessedTransaction from "./Components/Operations/NotInTimeProcessedTransaction/NotInTimeProcessedTransaction";
import ResendSepaFile from "./Components/Operations/ResendSepaFile/ResendSepaFile";
import ConfigMasterBankAccount from "./Components/Operations/ConfigMasterBankAccount/ConfigMasterBankAccount";
import SepaFileApprovalReconcillationStatus from "./Components/Operations/SepaFileApprovalReconcillationStatus/SepaFileApprovalReconcillationStatus";
import Camt053Credits from "./Components/Operations/Camt053Credits/Camt053Credits";
import Pain001AccompanyingNote from "./Components/Reports/Pain001AccompanyingNote/Pain001AccompanyingNote";


library.add(faCoffee, faCalendarDays);
function App() {
  return (
    <div className="App">
      <Router basename={process.env.REACT_APP_PAYMENT_GUI_BASE_URL_DRCCO}>
        <Routes>



          <Route path="/" element={<Login />} />

          <Route path="/Dashboard" element={<DRC_CarveoutDashboard />} />


          <Route path="/Dashboard/Report_CAMT054" element={<CAMT054Report />} />
          <Route path="/Dashboard/Report_CAMT053" element={<CAMT053Report />} />
          <Route
            path="/Dashboard/Reports/Pain008AccompanyingNote"
            element={<Pain008AccompanyingNote />}
          />

          <Route
            path="/Dashboard/Reports/Pain001AccompanyingNote"
            element={<Pain001AccompanyingNote/>}
          />
         
          <Route path="/Dashboard/Add_Role" element={<AddRole />} />

          <Route
            path="/Dashboard/Operations/CAMT054EntrieswithErrorState"
            element={<CAMT054EntrieswithErrorState />}
          />
          <Route
            path="/Dashboard/Operations/Pain008AdHocSearchTransactions"
            element={<Pain008AdHocSearchTransactions />}
          />
          <Route
            path="/Dashboard/Operations/NotInTimeProcessedTransaction"
            element={<NotInTimeProcessedTransaction />}
          />

          <Route
            path="/Dashboard/Operations/ConfigMasterBankAccounts"
            element={<ConfigMasterBankAccount />}
          />





          <Route
            path="/Dashboard/Operations/ResendSepaFile"
            element={<ResendSepaFile />}
          >
            <Route
              path="pain008Transactions/*"
              element={<ResendSepaFile />}
            />
          </Route>

          <Route
            exact
            path="/Dashboard/Operations/SepaFileApprovalReconcileStatus"
            element={<SepaFileApprovalReconcillationStatus />}
          />
          <Route
            path='/Dashboard/Operations/SepaFileApprovalReconcileStatus/retrieveTransactions?/*'
            element={<SepaFileApprovalReconcillationStatus />}
          />






          <Route
            path="/Dashboard/Operations/camt053Credits"
            element={<Camt053Credits />}
          />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
