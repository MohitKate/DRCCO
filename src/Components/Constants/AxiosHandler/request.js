import { postHandler } from './axiosRequestHandler';
import { getHandler } from './axiosRequestHandler';
import {patchHandler} from './axiosRequestHandler';
import {deleteHandler} from './axiosRequestHandler';
import {putHandler} from './axiosRequestHandler';

/*Post Calls

*/

/*Post Call for ReconcillationReportData GetReconcillationReportData
Total API's==1
*/
export const GetReconcillationReportData = async payload => {
  return await postHandler('pain002reconciliation', payload);
};


/*Post Call for SepaFile Approval GetSepaFileData
Total API's==1
*/

export const GetSepaFileData = async payload => {
  return await postHandler('pain001SepaFile', payload);
};

export const ApproveSepaFileData = async payload => {
  return await postHandler('approveSepaFile', payload);
};

export const RejectSepaFileTransaction = async payload => {
  return await postHandler('rejectTransaction', payload);
};

export const GetCAMT053ReportData = async payload => {
  return await postHandler('camt053reconciliation', payload);
};

export const GetAllReconciliationFiles = async payload => {
  return  await postHandler('getSepaFileListForAppproval', payload);
};


export const ProcessReconcileSepaFile = async payload =>{
  return await postHandler('processReconcileSepaFile', payload);
}








/*Get Calls

*/
export const RejectSepaFileTransactionForTab = async payload => {
  return getHandler('retrieveRejectTransactions', payload);
}

/*Get Call for SepaFile Approval RetrieveTransactionsPain0001OutPutEntry
Total API's==1
*/
export const RetrieveTransactionsPain0001OutPutEntry = async (payload) => {
  return getHandler('retrieveTransactions', payload);
};

export const RetrieveTransactionsCountPain001nCAMT0n102= async (payload) => {
  return getHandler('retrieveTransactionsCountPain001nCAMT0102', payload);
};

export const RetrieveTransactionsCountPain008= async (payload) => {
  return getHandler('retrieveTransactionsCountPain008', payload);
};



/*Get Call for CAMT054Report GetCAMT054Report,GetExcelForCAMT054Report 
Total API's==2
*/

export const GetCAMT054Report = async (payload) => {
  return getHandler('postprocessreport/getreport', payload);
};

export const GetExcelForCAMT054Report = async (payload) => {
  return getHandler('postprocessreport/exportExcel', payload);
};
/*----------------------------------------------------------------------*/ 


/*Get Call for ReconcillationReportData and SepaFile Approval   GetAllTenataData
Total API's==1
*/
export const GetAllTenataData = async (payload) => {
  return getHandler('getAllTenantData', payload);
};

export const GetIbanByTenantId = async payload => {
  return await getHandler('getIbanByTenantId', payload);
};


// For Pain008AccompanyingNote Component
export const GetPain008TransactionNoteList = async payload=>{
  return await getHandler('getPain008TransactionNoteList', payload);
}

// For Pain008AccompanyingNote Component
export const GetPain001TransactionNoteList = async payload=>{
  return await getHandler('getPain001NotesList', payload);
}


// For Pain008AccompanyingNote Pagination Component
export const GetPain008TransactionNoteListPagination = async payload=>{
  return await getHandler('getPain008/note/count', payload);
}


export const GetPain001TransactionNoteListPagination = async payload =>{
  return await getHandler('getPain001/note/count',payload)
}





// For SepaFileApprovalReconcileStatus Component
export const GetPain008TransactionAccompayningNotes= async payload =>{
  return await getHandler('getPain008TransactionNotes', payload);

}

export const GetPain008TotalNumberOfRecordsSepaFileList = async payload => {
  return  await getHandler('getPain008/file/count', payload);
};

export const GetCAMTnPain001TotalNumberOfRecords = async payload => {
  return  await getHandler('getSepaFileListCount', payload);
};


export const GetNotProcessedPain008Transactions= async payload => {
  return  await getHandler('transaction/getNotProcessedTransactions', payload);
};
//--------------------------------------------
//FR Logout
export const LogOutFR = async payload => {
  return  await getHandler('forgerockLogout', payload);
};
//-------------------


//Configuration Master Bank Accounts

export const ToGetIbanDataForConfigMasterBank= async payload => {
  return  await getHandler('bank/tenantIbanList', payload);
};

export const ToGetConfigMasterBankAccountData= async payload => {
  return  await getHandler('tenantBankList', payload);
};


//for CAMT053 Credits API
export const ToGetCamt053CreditsRecords= async payload => {
  return  await getHandler('camt053Credits', payload);
};


export const ToDeleteBankAccount= async payload => {
  return  await deleteHandler('bank/deleteAccountConfigItem', payload);
};
export const ToUpdateBankAccount= async payload => {
  
  return  await patchHandler('bank/{iban}/updateTenantBankDetails', payload);
};
export const AddAccountConfiguration= async payload => {

  return  await putHandler('bank/addAccountConfigItem', payload);
};









//---------------------

//Resend SepaFile

export const ResendSepaFileCall= async payload => {
  return  await getHandler('file/reSend', payload);
};

//----------------------