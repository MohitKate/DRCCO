import axios from "axios";


const environemt = process.env.REACT_APP_PAYMENT_GUI_ENVIRONMENT
  ? process.env.REACT_APP_PAYMENT_GUI_ENVIRONMENT
  : "local";

const end_point =
  environemt === "local"
    ? process.env.REACT_APP_PAYMENT_GUI_BASEURL
    : process.env.REACT_APP_PAYMENT_GUI_BASEURL;

const authorizationBasic1 = window.btoa(
  process.env.REACT_APP_PAYMENT_GUI_USERNAME +
  ":" +
  process.env.REACT_APP_PAYMENT_GUI_PASSWORD
);
const authorizationBasic2 = window.btoa(
  process.env.REACT_APP_MOCK_PAYMENT_GUI_USERNAME +
  ":" +
  process.env.REACT_APP_MOCK_PAYMENT_GUI_PASSWORD
);


const baseUrl = `${end_point}`;

const headers = {
  "Content-Type": "application/json",
  Authorization: "Basic " + authorizationBasic1,

};
const config = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Basic " + authorizationBasic1,

  }
};
const headers1 = {
  "Content-Type": "application/json",
  Authorization: "Basic " + authorizationBasic2,

};
const commonPayload = {};

const postsepaCreationDate = async (url, payload, header) => {
  try {
    const response = await axios.post(
      `${baseUrl}/${url}?sepaCreationDate=${payload.formatDate}&tenantId=${payload.tenantId}`,
      { ...commonPayload },
      {
        headers: { ...headers, ...header },
      }
    );
    return response.data;
  } catch (err) {
    console.log("error", err.toJSON(), err.name, err.fileName, err.message);
    return err;
  }
};







export const postHandler = async (url, payload = {}, header = {}) => {
  // switch (url) {
  //   case "pain002reconciliation":
  //   case "pain001SepaFile":
  //     postsepaCreationDate(url, payload, header);
  //     break;
  // }

  if (url == "rejectTransaction") {
    const { filetype, infoList, user } = payload;
    const infoList1 = infoList;
    const payload1 = {
      user: user,
      fileType: filetype,
      infoList: infoList1,
    };
    return axios
      .post(
        `${baseUrl}/${url}?sepaFileId=${payload.sepaFileId}&transactionId=${payload.transactionId}`,
        { ...commonPayload, ...payload1 },
        {
          headers: { ...headers, ...header },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log("error", err.toJSON(), err.name, err.fileName, err.message);
        return err;
      });
  } else if (url == "getSepaFileListForAppproval") {

    return axios
      .post(
        `${baseUrl}/${url}?start=${payload.start}&count=${payload.count}&fromDate=${payload.fromDate}&toDate=${payload.toDate}&status=${payload.status}&fileType=${payload.filetype}`,
        { ...commonPayload },
        {
          headers: { ...headers, ...header },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log("error", err.toJSON(), err.name, err.fileName, err.message);
        return err;
      });
  } else if (url == "approveSepaFile") {
    const { fileType, comment, sepaFileId, user } = payload;
    let requestPayload = {
      user: user,
      fileType: fileType,
      comment: comment,
    };
    return axios
      .post(
        `${baseUrl}/${url}?sepaFileId=${sepaFileId}&approvedBy=${user}`,
        requestPayload,
        {
          headers: { ...headers, ...header },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log(
          "error ",
          err.toJSON(),
          err.name,
          err.fileName,
          err.message
        );
        return err;
      });
  } else if (url == "camt053reconciliation") {
    return axios
      .post(
        `${baseUrl}/${url}?CreationDate=${payload.creationDate}`,
        { ...commonPayload },
        {
          headers: { ...headers, ...header },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log("error", err.toJSON(), err.name, err.fileName, err.message);
        return err;
      });
  }else if (url == "processReconcileSepaFile") {
    return axios
      .post(
        `${baseUrl}/${url}?sepaFileId=${payload.sepaFileId}`,
        { ...commonPayload },
        {
          headers: { ...headers, ...header },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log("error", err.toJSON(), err.name, err.fileName, err.message);
        return err;
      });
  }
};

//GET CALLS
export const getHandler = async (url, payload = {}, header = {}) => {

  //  switch (url) {
  //   case "postprocessreport/getreport":
  //     const URL=`${baseUrl}/${url}?reportFromDate=${payload.fromDate}&reportType=${payload.fileType}&tenantId=${payload.tenantId}&businessType=${payload.bussinessType}&reportToDate=${payload.toDate}`
  //   case "postprocessreport/exportExcel":
  //     const URL=`${baseUrl}/${url}?reportFromDate=${payload.fromDate}&reportToDate=${payload.toDate}&reportType=${payload.fileType}&businessType=${payload.bussinessType}&exportType=${payload.exportFileType}`


  //     return axios
  //     .get(
  //       `${URL}`,
  //       {
  //         headers: { ...headers, ...header },
  //       },


  //     )
  //     .then((response) => {
  //       return response.data;
  //     })
  //     .catch((err) => {
  //       console.log("error", err.toJSON(), err.name, err.fileName, err.message);
  //       return err;
  //     });

  //     break;
  // }

  if (url == "postprocessreport/getreport") {
    return axios
      .get(
        `${baseUrl}/${url}?reportFromDate=${payload.fromDate}&reportType=${payload.fileType}&tenantId=${payload.tenantId}&businessType=${payload.bussinessType}&reportToDate=${payload.toDate}`,
        {
          headers: { ...headers, ...header },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log("error", err.toJSON(), err.name, err.fileName, err.message);
        return err;
      });
  } else if (url == "postprocessreport/exportExcel") {
    return axios({
      url: `${baseUrl}/${url}?reportFromDate=${payload.fromDate}&reportToDate=${payload.toDate}&reportType=${payload.fileType}&businessType=${payload.bussinessType}&exportType=${payload.exportFileType}`,
      method: "GET",
      headers: {
        Authorization: "Basic " + authorizationBasic1,
      },
      responseType: "blob", // Important
    })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log("error", err.toJSON(), err.name, err.fileName, err.message);
        return err;
      });
  }


  else if (url == "getAllTenantData") {
    console.log(headers, "From get tenant data");
    return axios
      .get(`${baseUrl}/${url}`, {
        // headers: { ...headers, ...header }
        headers: headers,
      })
      .then((response) => {
        return response.data.tenantdata;
      })
      .catch((err) => {
        console.log("error", err.toJSON(), err.name, err.fileName, err.message);
        return err;
      });
  } else if (url == "retrieveTransactions") {
    return axios
      .get(
        `${baseUrl}/${url}?fileType=${payload.filetype}&status=${payload.status}&start=${payload.start}&count=${10}&fromDate=${payload.fromDate}&toDate=${payload.toDate}&amountGeaterEqualsThan=${payload.amountGeaterEqualsThan}&endToEndId=${payload.endToEndId}&sepaFileId=${payload.sepaFileId}`,
        {
          headers: { ...headers, ...header },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log("error", err.toJSON(), err.name, err.fileName, err.message);
        return err;
      });

  } else if (url == "retrieveTransactionsCountPain001nCAMT0102") {
    return axios
      .get(
        `${baseUrl}/transaction/list/count/${payload.sepaFileId}?fileType=${payload.filetype
        }&fromDate=${payload.fromDate
        }&toDate=${payload.toDate}&status=${payload.status}`,
        {
          headers: { ...headers, ...header },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log("error", err.toJSON(), err.name, err.fileName, err.message);
        return err;
      });
  }

  else if (url == "retrieveTransactionsCountPain008") {
    return axios
      .get(
        `${baseUrl}/getPain008/transaction/count?fileId=${payload.sepaFileId}&fromDate=${payload.fromDate
        }&toDate=${payload.toDate}&status=${payload.status}`,
        {
          headers: { ...headers, ...header },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log("error", err.toJSON(), err.name, err.fileName, err.message);
        return err;
      });
  }


  else if (url == "getPain008TransactionNoteList") {
    return axios
      .get(
        `${baseUrl}/${url}?start=${payload.start}&count=${payload.count}&fromDate=${payload.fromDate}&toDate=${payload.toDate}`,
        {
          headers: { ...headers, ...header },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log("error", err.toJSON(), err.name, err.fileName, err.message);
        return err;
      });
  }  else if (url == "getPain001NotesList") {
    return axios
      .get(
        `${baseUrl}/${url}?start=${payload.start}&count=${payload.count}&fromDate=${payload.fromDate}&toDate=${payload.toDate}`,
        {
          headers: { ...headers, ...header },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log("error", err.toJSON(), err.name, err.fileName, err.message);
        return err;
      });
  }
  
  
  
  
  else if (url == "getPain008TransactionNotes") {
    return axios
      .get(`${baseUrl}/${url}/${payload.sepaFileId}`, {
        headers: { ...headers, ...header },
      })
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log("error", err.toJSON(), err.name, err.fileName, err.message);
        return err;
      });
  } else if (url == "getPain008/file/count") {
    return axios
      .get(
        `${baseUrl}/${url}?fromDate=${payload.fromDate}&toDate=${payload.toDate}&status=${payload.status}`,
        {
          headers: { ...headers, ...header },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log("error", err.toJSON(), err.name, err.fileName, err.message);
        return err;
      });
  } else if (url == "getSepaFileListCount") {
    return axios
      .get(
        `${baseUrl}/${url}?fromDate=${payload.fromDate}&toDate=${payload.toDate}&fileType=${payload.filetype}`,
        {
          headers: { ...headers, ...header },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log("error", err.toJSON(), err.name, err.fileName, err.message);
        return err;
      });
  } else if (url == "getPain008/note/count") {
    return axios
      .get(
        `${baseUrl}/${url}?fromDate=${payload.fromDate}&toDate=${payload.toDate}`,
        {
          headers: { ...headers, ...header },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log("error", err.toJSON(), err.name, err.fileName, err.message);
        return err;
      });
  }else if (url == "getPain001/note/count") {
    return axios
      .get(
        `${baseUrl}/${url}?fromDate=${payload.fromDate}&toDate=${payload.toDate}`,
        {
          headers: { ...headers, ...header },
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log("error", err.toJSON(), err.name, err.fileName, err.message);
        return err;
      });
  }
  
  
  
  else if (url == "transaction/getNotProcessedTransactions") {
    return axios
      .get(
        `${baseUrl}/${url}?date=${payload.date}`,
        {
          headers: { ...headers }
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log("error", err.toJSON(), err.name, err.fileName, err.message);
        return err;
      });
  }
  else if (url == "file/reSend") {
    return axios
      .get(
        `${baseUrl}/file/${payload.fileId}/reSend`,
        {
          headers: { ...headers }
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log("error", err.toJSON(), err.name, err.fileName, err.message);
        return err;
      });
  }
  else if (url == "bank/tenantIbanList") {
    return axios
      .get(
        `${baseUrl}/${url}/?businessType=${payload.bussinesstype}&tenantId=${payload.tenantId}`,
        {
          headers: { ...headers }
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log("error", err.toJSON(), err.name, err.fileName, err.message);
        return err;
      });
  }

  else if (url == "tenantBankList") {
    return axios
      .get(
        `${baseUrl}/${url}?tenantId=${payload.tenantId}&businessType=${payload.bussinesstype}&fileType=${payload.fileType}&fromDate=${payload.fromDate}&toDate=${payload.toDate}`,
        {
          headers: { ...headers }
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log("error", err.toJSON(), err.name, err.fileName, err.message);
        return err;
      });
  }
  else if (url == "forgerockLogout") {

    window.location.href = `${process.env.REACT_APP_FR_LOGOUT_API}?id_token_hint=${payload.id_token_hint}&post_logout_redirect_uri=${payload.post_logout_redirect_uri}&client_id=${payload.client_id}`

  }

  else if (url = "camt053Credits") {
    return axios
      .get(
        `${baseUrl}/${url}
      `,
        {
          headers: { ...headers }
        }
      )
      .then((response) => {
        return response.data;
      })
      .catch((err) => {
        console.log("error", err.toJSON(), err.name, err.fileName, err.message);
        return err;
      });
  }
  // else if (url == "retrieveRejectTransactions") {
  //   return axios
  //     .get(`${baseUrl}/${url}/${payload.sepaFileId}?pageNo=1&pageSize=10`, {
  //       headers: { ...headers, ...header },
  //     })
  //     .then((response) => {
  //       return response.data;
  //     })
  //     .catch((err) => {
  //       console.log("error", err.toJSON(), err.name, err.fileName, err.message);
  //       return err;
  //     });
  // }
  // else if (url == "getIbanByTenantId") {
  //   return axios
  //     .get(`${baseUrl}/${url}?tenantId=${payload.tenantId}`, {
  //       headers: { ...headers, ...header },
  //     })
  //     .then((response) => {
  //       return response.data;
  //     })
  //     .catch((err) => {
  //       console.log("error", err.toJSON(), err.name, err.fileName, err.message);
  //       return err;
  //     });
  // }

  // else if (url == "deleteBankAccount") {
  //   return axios
  //     .get(
  //       `${baseUrl}/${url}?tenantId=${payload.tenantId}&businessType=${payload.bussinesstype}&iban=${payload.iban}
  //       `,
  //       {
  //         headers: {...headers}
  //       }
  //     )
  //     .then((response) => {
  //       return response.data;
  //     })
  //     .catch((err) => {
  //       console.log("error", err.toJSON(), err.name, err.fileName, err.message);
  //       return err;
  //     });
  // }
  
  }





/**Calls of Configure Master bank Accounts */

export const patchHandler = async (url, payload = {}, header = {}) => {

  const {iban, fromDate, updatedBy} =payload;
  const payload1={
    fromDate: fromDate,
      updatedBy: updatedBy,
  }
  if (url == "bank/{iban}/updateTenantBankDetails") {

    return fetch(`${baseUrl}/bank/${iban}/updateTenantBankDetails`, {
      method: 'PATCH',
      body: JSON.stringify(payload1),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: "Basic " + authorizationBasic1,
      }
    }).then((r) => r.json()).then((data) => console.log(data))


  }

};

/**Calls of Configure Master bank Accounts */
export const deleteHandler = async (url, payload = {}, header = {}) => {
  if (url == 'bank/deleteAccountConfigItem') {
    return axios.delete(`${baseUrl}/${url}?bankPlanId=${payload.bankPlanId}`, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: "Basic " + authorizationBasic1,
      }
    }).then((response) => {
      return response.data;
    })
      .catch((err) => {
        console.log("error", err.toJSON(), err.name, err.fileName, err.message);
        return err;
      });

  }

}


/**Calls of Configure Master bank Accounts */
export const putHandler = async (url, payload = {}, header = {}) => {
  if (url == 'bank/addAccountConfigItem') {
    return axios.put(`${baseUrl}/${url}`, payload,
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
          Authorization: "Basic " + authorizationBasic1,
        }
      }).then((response) => {
        return response.data;
      }).catch(({response}) => {
      
          return response.data;
        });

  }

}



